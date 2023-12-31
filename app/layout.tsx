import type { Metadata } from "next";
import "./globals.css";
import ToasterContext from "@/context/ToasterContext";

export const metadata: Metadata = {
  title: "Shinshu Hiroba",
  description: "信大大学の学生コミュニティ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <ToasterContext />
        {children}
      </body>
    </html>
  );
}
