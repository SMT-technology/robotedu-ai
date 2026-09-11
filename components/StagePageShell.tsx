import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { getCurrentBoardProfile } from "@/lib/boardContext";
import { prisma } from "@/lib/db";
import StudentNav from "@/components/StudentNav";
import ProgressCards from "@/components/ProgressCards";
import StageToggle from "@/components/StageToggle";

const STAGE_TITLES: Record<number, string> = {
  1: "탐색 · 아이디어 보드 (Tinkering)",
  2: "설계 · 메이킹 일지 (Making)",
  3: "SW 구동 도우미 (AI 힌트 기반 코딩 지원)",
  4: "로봇에 AI 기술 탑재",
};

export default async function StagePageShell({
  stage,
  children,
}: {
  stage: 1 | 2 | 3 | 4;
  children?: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.role !== "student") redirect("/dashboard");
  if (!user.boardType) redirect("/onboarding");

  const boardProfile = await getCurrentBoardProfile();

  const progress = await Promise.all(
    [1, 2, 3, 4].map((s) =>
      prisma.progress.upsert({
        where: { userId_stage: { userId: user.id, stage: s } },
        update: {},
        create: { userId: user.id, stage: s, status: "not_started" },
      })
    )
  );

  const current = progress.find((p) => p.stage === stage)!;

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
      <StudentNav studentName={user.name} boardProfile={boardProfile} />
      <ProgressCards progress={progress} />

      <section className="maker-panel dot-grid mt-6 overflow-hidden rounded-[2rem] p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="mb-1 text-xs font-black uppercase tracking-[0.2em] text-sky-600">⚡ Maker Mission {stage}</p>
            <h2 className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl">Stage {stage}: {STAGE_TITLES[stage]}</h2>
          </div>
          <StageToggle stage={stage} initialStatus={current.status} />
        </div>

        {!children && (
          <div className="mt-6 rounded-2xl border-2 border-dashed border-sky-200 bg-white/70 p-8 text-center text-sm font-medium text-slate-400">
            <div className="mb-3 text-4xl" aria-hidden="true">🚧</div>
            콘텐츠 준비 중 — Stage {stage} 학습 콘텐츠가 이 자리에 표시됩니다.
          </div>
        )}

        {children}
      </section>
    </main>
  );
}
