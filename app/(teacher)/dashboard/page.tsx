import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/session";
import { prisma } from "@/lib/db";
import LogoutButton from "@/components/LogoutButton";

export default async function TeacherDashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.role !== "teacher") redirect("/");

  const classes = await prisma.class.findMany({
    where: { teacherId: user.id },
    orderBy: { createdAt: "asc" },
    include: { students: true },
  });

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="maker-panel mb-7 flex items-center justify-between rounded-[2rem] p-5 sm:p-7">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-400 to-violet-500 text-3xl shadow-lg shadow-indigo-200" aria-hidden="true">🧑‍🏫</div>
          <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-indigo-600">Teacher Control Lab</p>
          <h1 className="mt-1 text-2xl font-black text-slate-900">{user.name}님의 대시보드</h1>
          </div>
        </div>
        <LogoutButton />
      </div>

      {classes.length === 0 ? (
        <p className="rounded-2xl border-2 border-dashed border-sky-200 bg-white/70 py-10 text-center text-sm text-slate-400">🧪 아직 생성된 반이 없습니다.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {classes.map((c) => (
            <div
              key={c.id}
              className="maker-panel rounded-2xl p-5"
            >
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-lg font-black text-slate-800">🏫 {c.name}</h2>
                <Link
                  href={`/class/${c.id}`}
                  className="rounded-xl bg-sky-50 px-3 py-2 text-sm font-bold text-sky-700 hover:bg-sky-100"
                >
                  반 상세 보기 →
                </Link>
              </div>
              <p className="text-sm text-gray-500">학생 수: {c.students.length}명</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
