import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { getCategoryNavItems } from "@/lib/posts";

export default async function SiteLayout({ children }) {
  const categoryNavItems = await getCategoryNavItems();

  return (
    <>
      <Header categoryNavItems={categoryNavItems} />
      <main className="flex min-h-0 min-w-0 flex-1 flex-col">
        <div className="mx-auto w-full max-w-[1200px] page-gutter">{children}</div>
      </main>
      <Footer />
    </>
  );
}
