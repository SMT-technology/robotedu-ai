import Link from "next/link";
import type { BoardProfile } from "@/lib/boardContext";
import BoardBadge from "@/components/BoardBadge";
import LogoutButton from "@/components/LogoutButton";

const STAGES = [
  { href: "/stage1-hw", label: "Stage 1: HW 설계" },
  { href: "/stage2-build", label: "Stage 2: 제작/조립" },
  { href: "/stage3-sw", label: "Stage 3: SW 구동 도우미" },
  { href: "/stage4-ai", label: "Stage 4: AI 기술 탑재" },
];

export default function StudentNav({
  studentName,
  boardProfile,
}: {
  studentName: string;
  boardProfile: BoardProfile | null;
}) {
  return (
    <header className="maker-panel mb-6 flex flex-col gap-4 rounded-[2rem] p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-500 text-2xl shadow-lg shadow-sky-200" aria-hidden="true">🤖</div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-sky-600">Maker Crew · 학생</p>
            <h1 className="text-lg font-black text-slate-900">{studentName}의 로봇 랩</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <BoardBadge profile={boardProfile} />
          <LogoutButton />
        </div>
      </div>
      <nav className="flex flex-wrap gap-2 border-t border-sky-100 pt-4 text-sm">
        <Link
          href="/onboarding"
          className="rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-2 font-semibold text-indigo-700 hover:bg-indigo-100"
        >
          보드 다시 선택
        </Link>
        {STAGES.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="rounded-xl border border-sky-100 bg-white px-3 py-2 font-semibold text-slate-600 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
          >
            {s.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
