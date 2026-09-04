import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import arduinoProfile from "@/board-profiles/arduino-uno.json";
import microbitProfile from "@/board-profiles/microbit.json";
import BoardSelector from "@/components/BoardSelector";
import LogoutButton from "@/components/LogoutButton";
import type { BoardProfile } from "@/lib/boardContext";

export default async function OnboardingPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.role !== "student") redirect("/dashboard");

  const profiles: BoardProfile[] = [arduinoProfile, microbitProfile as unknown as BoardProfile];

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">보드 선택</h1>
          <p className="mt-1 text-sm text-gray-500">
            {user.name}님, 이번 로봇 프로젝트에서 사용할 보드를 선택해주세요.
          </p>
        </div>
        <LogoutButton />
      </div>
      <BoardSelector profiles={profiles} currentBoardType={user.boardType} />
    </main>
  );
}
