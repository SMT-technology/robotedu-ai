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
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="maker-panel mb-6 flex flex-wrap items-center justify-between gap-4 rounded-[2rem] p-5 sm:p-7">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-500 text-3xl shadow-lg shadow-sky-200" aria-hidden="true">🔌</div>
          <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-600">Maker Lab Setup</p>
          <h1 className="mt-1 text-2xl font-black text-slate-900">나의 로봇 보드 선택</h1>
          <p className="mt-1 text-sm text-slate-500">
            {user.name}님, 이번 로봇 프로젝트에서 사용할 보드를 선택해주세요.
          </p>
          </div>
        </div>
        <LogoutButton />
      </div>
      <BoardSelector profiles={profiles} currentBoardType={user.boardType} />
    </main>
  );
}
