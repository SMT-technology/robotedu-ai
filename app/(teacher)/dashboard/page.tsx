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
    <main className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">교사</p>
          <h1 className="text-xl font-bold">{user.name}님의 대시보드</h1>
        </div>
        <LogoutButton />
      </div>

      {classes.length === 0 ? (
        <p className="text-sm text-gray-500">아직 생성된 반이 없습니다.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {classes.map((c) => (
            <div
              key={c.id}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-lg font-semibold">{c.name}</h2>
                <Link
                  href={`/class/${c.id}`}
                  className="text-sm text-blue-600 hover:underline"
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
