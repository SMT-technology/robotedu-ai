import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "로봇 메이커 랩 🤖",
  description: "아두이노/마이크로비트 기반 로봇 교육 웹앱",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-cyan-200 selection:text-cyan-950">
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-white to-violet-100/70" />
          <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-cyan-200/40 blur-3xl" />
          <div className="absolute -right-20 top-1/3 h-80 w-80 rounded-full bg-violet-200/40 blur-3xl" />

          <span className="robot-orbit left-[6%] top-[12%] hidden -rotate-12 sm:flex">⚙️</span>
          <span className="robot-orbit right-[7%] top-[9%] hidden rotate-12 sm:flex">🚀</span>
          <span className="robot-orbit bottom-[12%] left-[5%] hidden rotate-6 lg:flex">🔧</span>
          <span className="robot-orbit bottom-[10%] right-[6%] hidden -rotate-6 lg:flex">💡</span>
        </div>

        <div className="robot-app relative z-10 min-h-screen">
          {children}
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none fixed bottom-4 right-4 z-20 hidden items-center gap-2 rounded-full border border-white/80 bg-white/80 px-4 py-2 text-sm font-bold text-cyan-800 shadow-lg shadow-cyan-200/50 backdrop-blur sm:flex"
        >
          <span className="text-xl" role="img">🤖</span>
          함께 만들어 봇!
        </div>
      </body>
    </html>
  );
}
