import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { getAllCategories } from "@/lib/posts";

export default async function SiteLayout({ children }) {
  const categories = await getAllCategories();

  return (
    <>
      <Header categories={categories} />
      <main className="flex min-h-0 min-w-0 flex-1 flex-col">
        <div className="mx-auto w-full max-w-[1200px] page-gutter">{children}</div>
      </main>
      <Footer categories={categories} />
    </>
  );
}
