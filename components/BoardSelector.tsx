"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { BoardProfile } from "@/lib/boardContext";

export default function BoardSelector({
  profiles,
  currentBoardType,
}: {
  profiles: BoardProfile[];
  currentBoardType: string | null;
}) {
  const router = useRouter();
  const [submittingId, setSubmittingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSelect(boardId: string) {
    setSubmittingId(boardId);
    setError(null);
    try {
      const res = await fetch("/api/board", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ boardType: boardId }),
      });
      if (!res.ok) throw new Error("failed");
      router.push("/stage1-hw");
      router.refresh();
    } catch {
      setError("보드 선택에 실패했습니다. 다시 시도해주세요.");
      setSubmittingId(null);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {error && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        {profiles.map((profile) => {
          const selected = currentBoardType === profile.boardId;
          return (
            <div
              key={profile.boardId}
              className={`flex flex-col justify-between rounded-xl border p-5 shadow-sm ${
                selected ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white"
              }`}
            >
              <div>
                <h3 className="text-lg font-semibold">{profile.displayName}</h3>
                <p className="mt-1 text-xs text-gray-500">
                  코드 언어: {profile.codeTemplate.language}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  통신 방식: {profile.communication.type}
                </p>
                <p className="mt-3 text-sm text-gray-700">
                  지원 센서: {profile.supportedSensors.map((s) => s.name).join(", ")}
                </p>
              </div>
              <button
                onClick={() => handleSelect(profile.boardId)}
                disabled={submittingId !== null}
                className={`mt-4 rounded-md px-4 py-2 text-sm font-medium disabled:opacity-50 ${
                  selected
                    ? "bg-blue-600 text-white"
                    : "border border-gray-300 hover:bg-gray-100"
                }`}
              >
                {submittingId === profile.boardId
                  ? "선택 중..."
                  : selected
                  ? "선택됨 (계속하기)"
                  : "이 보드 선택하기"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
