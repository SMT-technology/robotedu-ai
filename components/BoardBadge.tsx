import type { BoardProfile } from "@/lib/boardContext";

export default function BoardBadge({ profile }: { profile: BoardProfile | null }) {
  if (!profile) {
    return (
      <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700">
        ⚠️ 보드 미선택
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-bold text-sky-700 shadow-sm">
      🔌 현재 보드: {profile.displayName}
    </span>
  );
}
