import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { getCurrentBoardProfile } from "@/lib/boardContext";
import { prisma } from "@/lib/db";
import StudentNav from "@/components/StudentNav";
import ProgressCards from "@/components/ProgressCards";
import StageToggle from "@/components/StageToggle";

const STAGE_TITLES: Record<number, string> = {
  1: "HW 설계",
  2: "제작/조립",
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
    <main className="mx-auto max-w-3xl px-4 py-10">
      <StudentNav studentName={user.name} boardProfile={boardProfile} />
      <ProgressCards progress={progress} />

      <section className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-bold">
            Stage {stage}: {STAGE_TITLES[stage]}
          </h2>
          <StageToggle stage={stage} initialStatus={current.status} />
        </div>

        <div className="mt-6 rounded-lg border border-dashed border-gray-300 p-6 text-sm text-gray-400">
          (콘텐츠 준비 중 — Stage {stage} 학습 콘텐츠가 이 자리에 표시됩니다.)
        </div>

        {children}
      </section>
    </main>
  );
}
