import { Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { getAllCategories } from "@/lib/posts";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "일주일 완성! 바이브 코딩",
  description: "일주일 만에 바이브 코딩으로 수익형 블로그를 만들어요!",
};

export default async function RootLayout({ children }) {
  const categories = await getAllCategories();

  return (
    <html
      lang="ko"
      className={`${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
        />
      </head>
      <body className="min-h-full flex flex-col bg-bg-main text-text-main transition-colors dark:bg-dm-bg dark:text-dm-text">
        <Header categories={categories} />
        <main className="flex-1 w-full">
          <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
