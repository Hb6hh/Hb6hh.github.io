import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hamad Yazid — Cybersecurity Portfolio",
  description:
    "Cybersecurity enthusiast, CTF player, and aspiring security professional. Explore my skills, certifications, and CTF achievements.",
  keywords: ["cybersecurity", "CTF", "hacking", "portfolio", "PicoCTF"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
