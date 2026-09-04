import type { BoardProfile } from "@/lib/boardContext";

export default function BoardBadge({ profile }: { profile: BoardProfile | null }) {
  if (!profile) {
    return (
      <span className="inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800">
        보드 미선택
      </span>
    );
  }

  return (
    <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
      현재 보드: {profile.displayName}
    </span>
  );
}
