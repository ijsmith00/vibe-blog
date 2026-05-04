# 카테고리/태그 시스템 복원 가이드

AdSense 승인 후 카테고리/태그 시스템을 복원할 때 참고.

## 비활성화 일자
2026-05-03

## 비활성화 사유
AdSense 승인을 위한 사이트 단순화. 카테고리 시스템 코드는 보존하고 UI/라우트만 비활성화.

## 보존된 항목
- `lib/category.js` (전체)
- `lib/posts.js`의 카테고리/태그 함수들: `getAllCategories`, `getCategoryNavItems`, `getCategorySummaries`, `getPostsByCategory`, `getAllTags`, `getPostsByTag`, `getRelatedPosts`, `normalizeCategory`, `isPublicPostEntry`
- `app/components/PostListWithFilter.js`
- `lib/post-jsonld.js`의 `articleSection`, `keywords` 필드
- `posts/_archive/` 안 글들의 frontmatter (category, tags 데이터 그대로)

## 비활성화된 항목
1. `lib/config.js`의 `SITE_CATEGORY_DEFS = []` (빈 배열)
2. 헤더 카테고리 드롭다운/모바일 아코디언 제거
3. 푸터 카테고리 링크 제거
4. `app/(site)/layout.js`의 `getCategoryNavItems` 호출 제거
5. `app/(site)/page.js`에서 `PostListWithFilter` 미사용 (단순 PostCard 그리드)
6. `app/(site)/posts/[slug]/page.js`:
   - Breadcrumb 카테고리 단계 제거
   - 카테고리 pill 배지 제거
   - 태그 리스트 제거
   - 관련 글 JSX 블록 `{false && ...}` 처리 (TODO 주석 위치)
   - JSON-LD BreadcrumbList의 카테고리 단계 제거
7. `app/sitemap.js`에서 카테고리/태그 URL 생성 블록 제거
8. `app/(site)/category/`, `app/(site)/tag/`, `app/(site)/categories/page.js` 디렉터리/파일 삭제
9. `next.config.mjs`의 옛 카테고리 redirect 5개 삭제
10. `next.config.mjs`에 `/categories → /` redirect 추가

## 복원 절차

### Step 1: 라우트 디렉터리 복원
Git 히스토리에서 비활성화 직전 커밋을 찾아 라우트 파일 복원:

```bash
# 비활성화 커밋의 부모 커밋(즉 비활성화 직전 상태) 찾기
git log --all --oneline -- "app/(site)/category"

# 복원
git checkout <parent_commit> -- "app/(site)/category" "app/(site)/tag" "app/(site)/categories"
```

### Step 2: 카테고리 정의 추가
`lib/config.js`의 `SITE_CATEGORY_DEFS`에 새 컨셉에 맞는 카테고리 정의 추가:

```js
export const SITE_CATEGORY_DEFS = [
  { slug: 'idaho-life', label: '아이다호 일지', private: false },
  { slug: 'cooking', label: '요리', private: false },
  // 등등
];
```

### Step 3: UI 복원
다음 파일들에서 카테고리 메뉴/링크 블록을 Git 히스토리 참고해서 다시 추가:
- `app/components/Header.js` (카테고리 드롭다운 + 모바일 아코디언)
- `app/components/Footer.js` (FOOTER_LINKS에 /category 추가)
- `app/(site)/layout.js` (getCategoryNavItems 호출 + Header에 prop 전달)
- `app/components/NotFoundContent.js` (필요 시)

### Step 4: 홈 페이지 복원
`app/(site)/page.js`를 PostListWithFilter 사용하도록 변경:

```jsx
import PostListWithFilter from '@/app/components/PostListWithFilter';

export default async function HomePage() {
  const posts = await getPublicPosts();
  return <PostListWithFilter posts={posts} />;
}
```

### Step 5: 글 상세 페이지 복원
`app/(site)/posts/[slug]/page.js`에서:
- Breadcrumb 카테고리 단계 추가
- 카테고리 pill 배지 추가
- 태그 리스트 추가
- 관련 글 JSX의 `{false && ...}` 를 `{related.length > 0 && ...}` 로 변경
- JSON-LD BreadcrumbList 카테고리 단계 추가

(Git 히스토리의 비활성화 직전 버전을 참고)

### Step 6: sitemap 복원
`app/sitemap.js`에 카테고리/태그 URL 생성 블록 다시 추가.

### Step 7: redirect 정리
`next.config.mjs`의 `/categories → /` redirect 제거 (필요 시).

### Step 8: 기존 글 복원 (선택)
`posts/_archive/` 안 글 중 살리고 싶은 것을 `posts/`로 이동:

```bash
# 예: 특정 글만 살리기
mv posts/_archive/some-post.md posts/

# 또는 모두 살리기
mv posts/_archive/*.md posts/
```

### Step 9: 빌드 검증
```bash
rm -rf .next
npm run build
```

---

## 예상 작업 시간
30분 ~ 1시간 (Git 복원 + UI 재연결 + 카테고리 재정의)