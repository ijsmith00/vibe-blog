import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default async function SiteLayout({ children }) {
  return (
    <>
      <Header />
      <main className="flex min-h-0 min-w-0 flex-1 flex-col">
        <div className="mx-auto w-full max-w-[1200px] page-gutter">{children}</div>
      </main>
      <Footer />
    </>
  );
}
