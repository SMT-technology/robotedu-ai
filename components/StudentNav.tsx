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
    <header className="mb-8 flex flex-col gap-3 border-b border-gray-200 pb-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">학생</p>
          <h1 className="text-lg font-bold">{studentName}</h1>
        </div>
        <div className="flex items-center gap-2">
          <BoardBadge profile={boardProfile} />
          <LogoutButton />
        </div>
      </div>
      <nav className="flex flex-wrap gap-2 text-sm">
        <Link
          href="/onboarding"
          className="rounded-md border border-gray-300 px-3 py-1.5 hover:bg-gray-100"
        >
          보드 다시 선택
        </Link>
        {STAGES.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="rounded-md border border-gray-300 px-3 py-1.5 hover:bg-gray-100"
          >
            {s.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
