import Link from "next/link";

import PostCard from "@/app/components/PostCard";
import SearchBar from "@/app/components/SearchBar";
import { SITE_NAME } from "@/lib/site-config";
import { searchPosts } from "@/lib/posts";

export async function generateMetadata({ searchParams }) {
  const sp = await searchParams;
  const qRaw = sp?.q;
  const q =
    typeof qRaw === "string"
      ? qRaw.trim()
      : Array.isArray(qRaw)
        ? String(qRaw[0] ?? "").trim()
        : "";
  const title = q ? `"${q}" 검색 · ${SITE_NAME}` : `검색 · ${SITE_NAME}`;
  return {
    title,
    description: q
      ? `${SITE_NAME}에서 「${q}」에 대한 검색 결과입니다.`
      : `${SITE_NAME} 글 검색`,
  };
}

function parseParamsQ(searchParams) {
  const qRaw = searchParams?.q;
  if (typeof qRaw === "string") return qRaw.trim();
  if (Array.isArray(qRaw)) return String(qRaw[0] ?? "").trim();
  return "";
}

export default async function SearchPage({ searchParams }) {
  const sp = await searchParams;
  const q = parseParamsQ(sp);
  const results = q ? await searchPosts(q) : [];

  return (
    <div className="pb-16 pt-10">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold tracking-tight text-text-main dark:text-dm-text sm:text-3xl">
          검색
        </h1>
        <p className="mt-2 text-sm text-text-sub dark:text-dm-muted">
          제목, 설명, 카테고리, 태그에서 찾습니다 (대소문자 구분 없음).
        </p>
        <div className="mt-6 max-w-2xl">
          <SearchBar defaultValue={q} />
        </div>
      </div>

      {q ? (
        <>
          <p className="mb-6 text-sm text-text-sub dark:text-dm-muted">
            {results.length > 0
              ? `「${q}」에 대한 결과 ${results.length}건`
              : `「${q}」에 대한 결과가 없습니다.`}
          </p>
          {results.length > 0 ? (
            <div className="grid w-full min-w-0 grid-cols-1 justify-items-stretch gap-x-6 gap-y-8 sm:gap-x-8 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-8">
              {results.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className="rounded-lg border border-dashed border-border bg-bg-sub px-6 py-12 text-center text-text-sub dark:border-dm-border dark:bg-dm-bg dark:text-dm-muted">
              검색 결과가 없습니다. 다른 키워드로 검색해보세요.
            </p>
          )}
        </>
      ) : (
        <p className="text-sm text-text-sub dark:text-dm-muted">
          위 검색창에 키워드를 입력한 뒤 검색해 주세요.
        </p>
      )}

      <p className="mt-10 text-center">
        <Link
          href="/"
          className="text-sm font-medium text-primary hover:underline dark:text-blue-400"
        >
          ← 홈으로
        </Link>
      </p>
    </div>
  );
}
