import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthSession from "./_components/auth_session";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "X",
  description: "X-SNS Clone",
  icons: {
    icon: "/favicon.png",
  },
};

type Props = {
  children: React.ReactNode;
};
export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthSession>{children}</AuthSession>
      </body>
    </html>
  );
}
