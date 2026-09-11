"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="border border-slate-200 bg-white/80 px-3.5 py-2 text-sm font-semibold text-slate-600 shadow-sm hover:border-slate-300 hover:bg-white"
    >
      로그아웃
    </button>
  );
}
