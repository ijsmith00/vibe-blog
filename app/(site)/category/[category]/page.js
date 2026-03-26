import { notFound } from "next/navigation";

import Breadcrumb from "@/app/components/Breadcrumb";
import PostCard from "@/app/components/PostCard";
import { normalizeCategory } from "@/lib/category";
import {
  absolutePageUrl,
  SITE_NAME,
  ogImageMetadata,
} from "@/lib/site-config";
import {
  getAllCategories,
  getPostsByCategory,
} from "@/lib/posts";

function categoryFromParam(raw) {
  if (typeof raw !== "string" || raw.trim() === "") return "";
  try {
    return normalizeCategory(decodeURIComponent(raw));
  } catch {
    return normalizeCategory(raw);
  }
}

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((category) => ({ category }));
}

export async function generateMetadata({ params }) {
  const { category: categoryParam } = await params;
  const label = categoryFromParam(categoryParam);
  const categories = await getAllCategories();
  if (!label || !categories.includes(label)) {
    return { title: SITE_NAME };
  }

  const description = `${label} 카테고리 글 목록 — ${SITE_NAME}`;
  const canonical = absolutePageUrl(`/category/${encodeURIComponent(label)}`);
  const ogImage = ogImageMetadata(null, label);

  return {
    title: label,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      title: label,
      description,
      siteName: SITE_NAME,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: label,
      description,
      images: [ogImage],
    },
  };
}

export default async function CategoryPage({ params }) {
  const { category: categoryParam } = await params;
  const label = categoryFromParam(categoryParam);
  const categories = await getAllCategories();

  if (!label || !categories.includes(label)) {
    notFound();
  }

  const posts = await getPostsByCategory(label);
  const count = posts.length;

  return (
    <div className="pb-16 pt-10">
      <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
        <header className="w-full min-w-0">
          <Breadcrumb
            items={[
              { label: "홈", href: "/" },
              { label: "카테고리", href: "/category" },
              { label, href: null },
            ]}
            maxLastLength={30}
          />
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-text-main dark:text-dm-text sm:text-4xl md:text-5xl">
            {label}{" "}
            <span className="text-2xl font-bold text-text-sub dark:text-dm-muted sm:text-3xl md:text-4xl">
              ({count})
            </span>
          </h1>
        </header>
      </div>

      {count === 0 ? (
        <p className="rounded-lg border border-dashed border-border bg-bg-sub px-6 py-14 text-center text-base text-text-sub dark:border-dm-border dark:bg-dm-bg dark:text-dm-muted">
          아직 작성된 글이 없습니다
        </p>
      ) : (
        <div className="grid w-full min-w-0 grid-cols-1 justify-items-stretch gap-x-6 gap-y-8 sm:gap-x-8 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-8">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
