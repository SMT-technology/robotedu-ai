"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type DemoUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  boardType: string | null;
};

export default function LoginPage() {
  const router = useRouter();
  const [teachers, setTeachers] = useState<DemoUser[]>([]);
  const [students, setStudents] = useState<DemoUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [loggingInId, setLoggingInId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/auth/demo-users")
      .then((res) => res.json())
      .then((data) => {
        setTeachers(data.teachers ?? []);
        setStudents(data.students ?? []);
      })
      .catch(() => setError("데모 계정을 불러오지 못했습니다."))
      .finally(() => setLoading(false));
  }, []);

  async function handleLogin(userId: string) {
    setLoggingInId(userId);
    setError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      if (!res.ok) throw new Error("login failed");
      router.push("/");
      router.refresh();
    } catch {
      setError("로그인에 실패했습니다.");
      setLoggingInId(null);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center gap-8 px-4 py-12">
      <div>
        <h1 className="text-2xl font-bold">로봇 교육 웹앱</h1>
        <p className="mt-1 text-sm text-gray-500">
          지금은 실제 인증 없이, 아래 데모 계정 중 하나를 선택해 로그인합니다.
        </p>
      </div>

      {error && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
      )}

      {loading ? (
        <p className="text-sm text-gray-500">불러오는 중...</p>
      ) : (
        <div className="flex flex-col gap-6">
          <section>
            <h2 className="mb-2 text-sm font-semibold text-gray-600">교사로 로그인</h2>
            <div className="flex flex-wrap gap-2">
              {teachers.map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleLogin(t.id)}
                  disabled={loggingInId !== null}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm hover:bg-gray-100 disabled:opacity-50"
                >
                  {loggingInId === t.id ? "로그인 중..." : `${t.name} (교사)`}
                </button>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-2 text-sm font-semibold text-gray-600">학생으로 로그인</h2>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {students.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleLogin(s.id)}
                  disabled={loggingInId !== null}
                  className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-left text-sm shadow-sm hover:bg-gray-100 disabled:opacity-50"
                >
                  <div className="font-medium">{s.name}</div>
                  <div className="text-xs text-gray-500">
                    {s.boardType ? `보드: ${s.boardType}` : "보드 미선택"}
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
