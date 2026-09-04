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
      <body className="min-h-screen bg-gray-50 text-gray-900">{children}</body>
    </html>
  );
}
