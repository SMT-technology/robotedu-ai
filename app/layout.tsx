import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "로봇 교육 웹앱",
  description: "아두이노/마이크로비트 기반 로봇 교육 웹앱",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50 text-slate-900 antialiased selection:bg-sky-200 selection:text-sky-950">
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-sky-100/70 to-transparent"
        />
        <div className="relative min-h-screen [&_button]:min-h-11 [&_button]:!rounded-2xl">
          {children}
        </div>
      </body>
    </html>
  );
}
