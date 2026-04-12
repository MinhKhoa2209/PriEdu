import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PriEdu - AI Educational Platform",
  description: "Advanced AI-powered learning for primary education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
