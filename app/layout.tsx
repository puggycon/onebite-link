import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "한입 링크",
  description: "나만의 링크 모음",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
