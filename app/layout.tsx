import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import Navbar from "./_components/Navbar";
import "@/app/_styles/globals.css";

const quicksand = Quicksand({
  weight: ["700", "600", "500", "400"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Fieldify",
    default: "Welcome | Fieldify",
  },
  description: "Football Field reservation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${quicksand.className} font-bold antialiased min-h-screen bg-primary-950 text-primary-100 flex flex-col relative`}
      >
        <Navbar />
        <div className="flex-1 px-10 py-14 w-full">
          <main className="max-w-6xl mx-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
