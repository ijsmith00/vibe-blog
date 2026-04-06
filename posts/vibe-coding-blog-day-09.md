---
title: "**DAY 09** [실전] 구글 검색 1페이지에 내 글 올리는 세팅 (코딩 없이 10분)"
date: "2026-04-04"
category: "[연재] 바이브 코딩으로 블로그 만들기"
description: "메타 태그·Open Graph·sitemap·robots로 구글이 블로그를 찾게 하는 SEO 입문. AI 프롬프트로 코딩 없이 10분 만에 끝내는 설정과 흔한 오해·에러 대응까지 정리한다."
tags: ["바이브코딩", "VibeCoding", "블로그만들기", "연재", "SEO", "구글검색", "메타태그", "Next.js"]
---

> **바이브 코딩으로 블로그 만들기 시리즈**
> 코딩을 몰라도 AI와 대화하며 ‘내 소유’ 수익형 웹사이트를 만드는 15일 여정

---

[DAY 08](/posts/vibe-coding-blog-day-08)에서 자동 목차와 카테고리 시스템을 완성했습니다. 블로그로서의 핵심 기능은 사실상 끝났습니다.

그런데 한 가지 심각한 문제가 있습니다.

**지금 이 블로그를 구글에서 검색하면 나올까요?**

안 나옵니다. 정확히 말하면, 구글이 이 블로그의 존재 자체를 모릅니다.

비유하자면 이런 겁니다. 세상에서 가장 맛있는 빵집을 차렸는데, 간판도 없고, 지도에도 안 나오고, 전화번호부에도 없는 상태. 아무리 빵이 맛있어도 아무도 못 찾아옵니다.

오늘은 이 빵집에 **간판을 달고, 지도에 등록하고, 전화번호부에 올리는** 작업을 합니다. 웹에서는 이걸 **SEO(Search Engine Optimization, 검색 엔진 최적화)**라고 부릅니다.

이름은 거창하지만, AI에게 시키면 10분이면 끝납니다.

---

## SEO를 안 하면 벌어지는 일 vs 하면 벌어지는 일

먼저 현실적인 차이를 봅시다.

```
SEO 설정 안 한 블로그:
- 구글이 블로그 존재를 모름
- 검색 결과에 안 뜸
- 방문자 경로: 직접 URL 입력 또는 SNS 공유뿐
- 일 방문자: 0~5명
- 월 수익: 0원

SEO 설정한 블로그:
- 구글이 블로그를 발견하고 색인(등록)
- 검색 결과에 노출 시작 (2~4주 후)
- 방문자 경로: 구글 검색 유입 (전체의 70~90%)
- 일 방문자: 글 개수와 품질에 따라 50~500명+
- 월 수익: 글이 쌓이면서 점진적 증가
```

수익형 블로그의 방문자 70~90%는 구글 검색에서 옵니다. SEO는 선택이 아닙니다. 이게 안 되면 나머지 모든 게 무의미합니다.

> <strong> ‘네이버나 다음 검색은요?’라고 물으실 분들께 </strong>
>
> 한국에서 블로그 하면 네이버나 다음을 먼저 떠올립니다. 하지만 우리가 만든 **자체 호스팅 블로그는 네이버나 다음 검색에서 불리합니다.** 이유는 명확합니다.
>
> 네이버나 다음은 자사 플랫폼(네이버 블로그, 카페, 지식iN, 티스토리 블로그)의 콘텐츠를 검색 상단에 우선 노출합니다. 외부 사이트는 ‘웹사이트’ 탭에 밀려나는데, 이 탭까지 클릭하는 사용자는 극소수입니다. 네이버 서치어드바이저에 사이트를 등록할 수는 있지만, 네이버 블로그 대비 노출 순위에서 구조적으로 밀릴 수밖에 없습니다.
>
> 반면 구글은 **콘텐츠의 품질과 SEO 설정만으로 공정하게 순위를 매깁니다.** 네이버 블로그든, 티스토리 블로그든, 워드프레스든 Next.js든 동일한 기준입니다. 오히려 로딩 속도가 빠른 정적 사이트(우리 블로그)가 유리합니다.
>
> 그리고 결정적인 차이가 하나 더 있습니다. **블로그의 ‘저품질’ 리스크입니다.** 네이버나 티스토리 블로그는 어느 날 갑자기 검색 노출이 급감하는 ‘저품질 판정’을 받을 수 있습니다. 기준이 불투명하고, 복구도 어렵습니다. 수개월간 쌓아온 글이 하루아침에 검색에서 사라지는 겁니다. 자체 블로그에는 이런 리스크가 없습니다. 구글이 특정 글의 순위를 낮출 수는 있지만, 블로그 전체를 ‘저품질’로 묶어서 매장하는 일은 없습니다.
>
> **결론: 구글 SEO에 집중하세요.** 한국 검색 시장에서 구글의 점유율은 꾸준히 올라가고 있고(모바일 기준 40% 이상), 해외 방문자까지 포함하면 구글이 압도적입니다. 네이버는 나중에 서치어드바이저 등록만 해두면 됩니다.

---

## 오늘 설정할 4가지

이름만 들으면 어려워 보이지만, 하나씩 뜯어보면 전부 ‘구글에게 내 블로그 정보를 알려주는 것’입니다.

<div class="not-prose wireframe-gshape wireframe-gshape--table" role="img" aria-label="오늘 설정할 SEO 네 가지: 메타 태그, Open Graph, sitemap, robots">
  <table class="wireframe-table wireframe-table--arrow-sep">
    <caption class="wireframe-table__caption">오늘 설정할 4가지</caption>
    <tbody>
      <tr>
        <th scope="row">① 메타 태그</th>
        <td class="wireframe-table__arrow" aria-hidden="true">→</td>
        <td class="wireframe-table__hint">각 페이지의 ‘명함’</td>
      </tr>
      <tr>
        <th scope="row">② Open Graph</th>
        <td class="wireframe-table__arrow" aria-hidden="true">→</td>
        <td class="wireframe-table__hint">SNS 공유 시 보이는 ‘미리보기’</td>
      </tr>
      <tr>
        <th scope="row">③ sitemap.xml</th>
        <td class="wireframe-table__arrow" aria-hidden="true">→</td>
        <td class="wireframe-table__hint">블로그 전체 ‘지도’</td>
      </tr>
      <tr>
        <th scope="row">④ robots.txt</th>
        <td class="wireframe-table__arrow" aria-hidden="true">→</td>
        <td class="wireframe-table__hint">검색 로봇에게 보내는 ‘안내문’</td>
      </tr>
    </tbody>
  </table>
</div>

---

## ① 메타 태그: 구글 검색 결과에 보이는 ‘명함’

구글에서 뭔가를 검색하면 결과가 이렇게 뜹니다.

<div class="not-prose wireframe-gshape wireframe-gshape--table" role="img" aria-label="구글 검색 결과 한 칸: URL, 제목, 설명">
  <table class="wireframe-table wireframe-table--arrow-sep wireframe-table--serp-mock">
    <caption class="wireframe-table__caption">구글 검색 결과 한 칸</caption>
    <tbody>
      <tr>
        <td>myblog.com &gt; blog &gt; next-js-tutorial</td>
        <td class="wireframe-table__arrow" aria-hidden="true">←</td>
        <td class="wireframe-table__hint">URL (회색)</td>
      </tr>
      <tr>
        <td>Next.js로 블로그 만드는 완전 가이드</td>
        <td class="wireframe-table__arrow" aria-hidden="true">←</td>
        <td class="wireframe-table__hint">title 태그</td>
      </tr>
      <tr class="wireframe-table__row-tall">
        <td>코딩 초보도 따라할 수 있는 Next.js 블로그 제작 튜토리얼. 바이브 코딩으로 30분 만에 완성하는…</td>
        <td class="wireframe-table__arrow" aria-hidden="true">←</td>
        <td class="wireframe-table__hint">meta description</td>
      </tr>
    </tbody>
  </table>
</div>

여기서 ‘title 태그’와 ‘meta description’이 **메타 태그**입니다. 이게 제대로 설정되어 있지 않으면 구글이 임의로 내용을 가져다 쓰는데, 대부분 엉망입니다.

### 메타 태그가 하는 일

<div class="not-prose wireframe-gshape wireframe-gshape--table" role="img" aria-label="메타 태그 종류와 역할">
  <table class="wireframe-table wireframe-table--arrow-sep">
    <caption class="wireframe-table__caption">메타 태그가 하는 일</caption>
    <tbody>
      <tr>
        <th scope="row"><code>&lt;title&gt;</code></th>
        <td class="wireframe-table__arrow" aria-hidden="true">→</td>
        <td class="wireframe-table__hint">브라우저 탭 + 검색 결과 제목</td>
      </tr>
      <tr>
        <th scope="row"><code>&lt;description&gt;</code></th>
        <td class="wireframe-table__arrow" aria-hidden="true">→</td>
        <td class="wireframe-table__hint">검색 결과의 2줄 요약</td>
      </tr>
      <tr>
        <th scope="row"><code>&lt;canonical&gt;</code></th>
        <td class="wireframe-table__arrow" aria-hidden="true">→</td>
        <td class="wireframe-table__hint">“이 글의 원본 주소는 여기야” (중복 방지)</td>
      </tr>
      <tr>
        <th scope="row"><code>&lt;viewport&gt;</code></th>
        <td class="wireframe-table__arrow" aria-hidden="true">→</td>
        <td class="wireframe-table__hint">모바일 화면 설정</td>
      </tr>
    </tbody>
  </table>
</div>

### AI에게 메타 태그 설정 요청하기

```
블로그 전체의 메타 태그(SEO)를 설정해줘.
Next.js App Router의 metadata API를 사용해서 구현해줘.

## 1. 글로벌 메타 데이터 (app/layout.tsx)

- title 기본값: "BlogName - 블로그 한 줄 설명"
- title template: "%s | BlogName" (각 페이지 제목 뒤에 블로그 이름 붙이기)
- description 기본값: "블로그의 전체 설명 (50~160자)"
- 기본 URL 설정 (metadataBase): 나중에 실제 도메인으로 교체할 예정이니 
  일단 "https://myblog.com"으로 설정
- viewport: width=device-width, initial-scale=1
- charset: utf-8
- 언어: ko-KR

## 2. 홈페이지 메타 데이터 (app/page.tsx)

- title: "BlogName - 블로그 한 줄 설명" (기본값과 동일)
- description: 블로그 전체 소개

## 3. 포스트 상세 페이지 메타 데이터 (app/blog/[slug]/page.tsx)

- title: frontmatter의 title 값 사용
- description: frontmatter의 description 값 사용
- 각 포스트마다 고유한 canonical URL 자동 생성
- 작성일(article:published_time) 포함

## 4. 카테고리 페이지 메타 데이터

- title: "[카테고리명] 관련 글 모음"
- description: "[카테고리명] 카테고리의 최신 글을 모아놓은 페이지입니다."

## 5. 소개 페이지 메타 데이터

- title: "소개"
- description: "BlogName 소개 페이지"

모든 페이지에서 generateMetadata 함수를 사용하고,
동적 페이지(포스트, 카테고리)는 params에서 데이터를 가져와서 
동적으로 메타 태그를 생성해줘.
```

Cursor에서 프롬프트를 실행한 후 성공했다는 내용의 메시지가 뜨는지 확인하고 다음 단계로 넘어갑니다. 

---

## ② Open Graph: 카카오톡·트위터에 공유하면 뜨는 ‘미리보기 카드’

카카오톡이나 트위터에 블로그 링크를 보내면 이런 카드가 뜹니다.

<div class="not-prose wireframe-og-card-figure" role="img" aria-label="Open Graph 미리보기 카드 예시: 썸네일, 제목, 설명, 도메인">
  <div class="wireframe-og-card">
    <div class="wireframe-og-card__image">썸네일 이미지 · og:image</div>
    <div class="wireframe-og-card__body">
      <div class="wireframe-og-card__line">
        <p class="wireframe-og-card__text wireframe-og-card__text--title">Next.js로 블로그 만드는 완전 가이드</p>
        <span class="wireframe-og-card__tag">og:title</span>
      </div>
      <div class="wireframe-og-card__line">
        <p class="wireframe-og-card__text wireframe-og-card__text--desc">코딩 초보도 따라할 수 있는…</p>
        <span class="wireframe-og-card__tag">og:description</span>
      </div>
      <div class="wireframe-og-card__line">
        <p class="wireframe-og-card__text wireframe-og-card__text--url">myblog.com</p>
        <span class="wireframe-og-card__tag">og:url</span>
      </div>
    </div>
  </div>
</div>

이 카드가 예쁘게 나오면 클릭률이 올라갑니다. 설정이 안 되어 있으면 텍스트 URL만 덩그러니 붙는데, 아무도 안 누릅니다.

### AI에게 Open Graph 설정 요청하기

```
Open Graph와 Twitter Card 메타 태그를 추가해줘.
방금 설정한 metadata에 이어서 추가하면 돼.

## 1. 글로벌 Open Graph (app/layout.tsx)

- og:type: "website"
- og:locale: "ko_KR"
- og:site_name: "BlogName"
- 기본 og:image: "/images/og-default.png" (1200x630px)
  → 이 이미지는 나중에 만들 예정이니 경로만 설정

## 2. 포스트 상세 페이지 Open Graph

- og:type: "article"
- og:title: frontmatter의 title
- og:description: frontmatter의 description
- og:image: frontmatter의 thumbnail (없으면 기본 이미지)
- og:url: 해당 포스트의 전체 URL
- article:published_time: frontmatter의 date
- article:section: frontmatter의 category

## 3. Twitter Card

- twitter:card: "summary_large_image"
- twitter:title: og:title과 동일
- twitter:description: og:description과 동일
- twitter:image: og:image와 동일

metadata 객체 안에 openGraph와 twitter 필드로 추가해줘.
```

> **og:image 크기가 중요합니다.** 권장 크기는 1200x630px입니다. 이보다 작으면 SNS에서 잘려 보이고, 크면 로딩이 느립니다. 지금은 이미지가 없으니 나중에 Canva(무료) 같은 도구로 기본 OG 이미지를 만들면 됩니다.

---

## ③ sitemap.xml: 구글에게 건네는 블로그 ‘지도’

sitemap.xml은 <strong>“내 블로그에 이런 페이지들이 있어”</strong>라고 구글에게 알려주는 목록 파일입니다.

```
sitemap.xml이 하는 일:

구글 검색 로봇 → sitemap.xml을 읽음 
               → "아, 이 블로그에 페이지가 15개 있구나"
               → 15개를 전부 방문해서 색인(등록)
               → 검색 결과에 노출 시작

sitemap.xml이 없으면:

구글 검색 로봇 → 블로그 홈페이지만 발견
               → 링크를 따라가며 페이지를 하나씩 찾아야 함
               → 놓치는 페이지 발생
               → 일부 글이 검색에 안 뜸
```

### AI에게 sitemap 생성 요청하기

```
sitemap.xml을 자동 생성하도록 설정해줘.

Next.js App Router의 sitemap.ts 방식을 사용해줘.

## 요구사항

1. app/sitemap.ts 파일 생성
2. 포함할 URL:
   - 홈페이지 (/)
   - 소개 페이지 (/about)
   - 모든 블로그 포스트 (/blog/[slug]) — content/posts에서 자동 추출
   - 모든 카테고리 페이지 (/category/[name]) — 자동 추출
3. 각 URL에 포함할 정보:
   - url: 전체 URL
   - lastModified: 포스트는 frontmatter의 date, 나머지는 현재 날짜
   - changeFrequency: 포스트는 "monthly", 홈은 "daily", 나머지 "yearly"
   - priority: 홈 1.0, 포스트 0.8, 카테고리 0.5, 나머지 0.3
4. 새 글을 추가하면 자동으로 sitemap에 반영되어야 함
5. URL의 기본 도메인: "https://myblog.com" (나중에 변경 예정)

빌드 시 자동으로 /sitemap.xml이 생성되도록 해줘.
```

### 확인 방법

설정 후 브라우저에서 `localhost:3000/sitemap.xml`을 열어보세요. XML 형식으로 블로그의 모든 페이지 목록이 보여야 합니다.

```xml
이런 형태가 나오면 성공:

<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://myblog.com/</loc>
    <lastmod>2025-06-20</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://myblog.com/blog/first-post</loc>
    <lastmod>2025-06-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  ...
</urlset>
```

---

## ④ robots.txt: 검색 로봇에게 보내는 ‘안내문’

robots.txt는 검색 로봇이 블로그에 처음 왔을 때 **가장 먼저 읽는 파일**입니다.

‘어디는 와도 되고, 어디는 오지 마세요. 그리고 사이트 지도는 여기 있어요.’라는 안내문입니다.

```
robots.txt의 역할:

구글 로봇 → myblog.com/robots.txt를 먼저 읽음
           → "모든 페이지 크롤링 허용, sitemap은 여기"
           → sitemap.xml을 찾아서 읽음
           → 전체 페이지 색인 시작
```

### AI에게 robots.txt 생성 요청하기

```
robots.txt 파일을 생성해줘.

Next.js App Router의 robots.ts 방식을 사용해줘.

## 요구사항

1. app/robots.ts 파일 생성
2. 내용:
   - 모든 검색 엔진 크롤러 허용 (User-Agent: *)
   - 모든 경로 크롤링 허용 (Allow: /)
   - _next/static 등 불필요한 경로는 차단하지 않아도 됨 
     (Next.js가 자동 처리)
   - Sitemap 위치 명시: https://myblog.com/sitemap.xml
3. 기본 도메인: "https://myblog.com" (나중에 변경)

빌드 시 자동으로 /robots.txt가 생성되도록 해줘.
```

### 확인 방법

브라우저에서 `localhost:3000/robots.txt`를 열어보세요.

```
이렇게 나오면 성공:

User-Agent: *
Allow: /
Sitemap: https://myblog.com/sitemap.xml
```

---

## 빠뜨리기 쉬운 SEO 설정 3가지

위 4가지가 필수이고, 아래 3가지는 하면 좋은 추가 설정입니다. 지금 같이 해두면 나중에 편합니다.

### 추가 1: 구조화된 데이터 (JSON-LD)

구글 검색 결과에서 가끔 이런 걸 보셨을 겁니다.

```
일반 검색 결과:
  제목
  설명 2줄

구조화된 데이터가 있는 검색 결과:
  제목
  ⭐⭐⭐⭐⭐ (4.8) · 리뷰 234개
  📅 2025-06-15 · ✍️ 작성자: 홍길동
  설명 2줄
```

아래쪽이 훨씬 눈에 띄죠? 이걸 **리치 스니펫(Rich Snippet)**이라고 하는데, 구조화된 데이터를 넣어야 나옵니다.

```
포스트 상세 페이지에 JSON-LD 구조화된 데이터를 추가해줘.

## 요구사항

1. 각 포스트에 Article 타입의 JSON-LD 삽입
2. 포함할 정보:
   - @type: "BlogPosting"
   - headline: frontmatter title
   - description: frontmatter description
   - datePublished: frontmatter date
   - author: { @type: "Person", name: "블로그 운영자 이름" }
   - url: 해당 포스트의 전체 URL
3. <script type="application/ld+json"> 태그로 head에 삽입
4. Next.js의 metadata API 또는 직접 script 태그 방식 중 편한 것으로

블로그 운영자 이름은 "BlogName"으로 설정해줘. 
나중에 바꿀 수 있게 상수로 분리하면 좋겠어.
```

### 추가 2: canonical URL

같은 글이 여러 URL로 접근 가능하면 구글이 ‘중복 콘텐츠’로 판단할 수 있습니다. canonical 태그는 ‘이 글의 진짜 주소는 이거야’라고 선언하는 겁니다.

메타 태그 설정할 때 이미 포함했을 수 있지만, 확인 차원에서 AI에게 물어보세요.

```
모든 페이지에 canonical URL이 제대로 설정되어 있는지 확인해줘.
각 페이지의 metadata에 alternates.canonical이 있어야 해.
포스트 페이지는 /blog/[slug] 형태의 URL이 canonical이어야 해.
```

### 추가 3: 404 페이지 커스텀

방문자가 잘못된 URL로 들어왔을 때 기본 404 페이지는 밋밋합니다. 커스텀 404 페이지를 만들면 이탈률을 줄일 수 있습니다.

```
커스텀 404 페이지를 만들어줘 (app/not-found.tsx).

1. "페이지를 찾을 수 없습니다" 메시지
2. 홈으로 돌아가기 버튼 (포인트 컬러)
3. 최근 인기글 3개 링크 (이탈 방지)
4. 전체 레이아웃(헤더+푸터) 유지
5. 디자인은 블로그 전체 스타일과 통일
```

---

## SEO 설정이 실제로 작동하는지 확인하는 법

설정을 다 했으면 눈으로 확인해야 합니다.

### 확인 1: 페이지 소스 보기

브라우저에서 `localhost:3000`을 열고, 마우스 우클릭 → <strong>‘페이지 소스 보기’</strong>를 선택합니다.

`<head>` 태그 안에서 아래 항목들을 찾아보세요.

```html
확인할 것들:

<title>BlogName - 블로그 설명</title>                            ✅ 있어야 함
<meta name="description" content="블로그 설명..."/>              ✅ 있어야 함
<meta property="og:title" content="..."/>                      ✅ 있어야 함
<meta property="og:description" content="..."/>                ✅ 있어야 함
<meta property="og:image" content="..."/>                      ✅ 있어야 함
<meta name="twitter:card" content="summary_large_image"/>      ✅ 있어야 함
<link rel="canonical" href="..."/>                             ✅ 있어야 함
```

포스트 상세 페이지에서도 같은 방법으로 확인하세요. title과 description이 해당 글의 내용으로 바뀌어 있어야 합니다.

### 확인 2: sitemap과 robots.txt

```
브라우저에서 직접 열어보세요:

localhost:3000/sitemap.xml  → XML 목록이 보이면 ✅
localhost:3000/robots.txt   → 텍스트가 보이면 ✅
```

### 확인 3: 구글 리치 결과 테스트

구글에서 제공하는 무료 도구로 구조화된 데이터를 검증할 수 있습니다. 배포 후에 사용할 수 있으니 지금은 URL만 기억해두세요.

```
https://search.google.com/test/rich-results
→ 배포 후 블로그 URL을 입력하면 구조화된 데이터가 제대로 되어 있는지 검사
```

---

## SEO에 대한 흔한 오해 바로잡기

SEO를 처음 접하면 빠지기 쉬운 함정들이 있습니다.

**오해 1: “SEO 설정하면 바로 검색에 뜨겠지?”**

→ 아닙니다. 구글이 블로그를 발견하고, 크롤링하고, 색인하고, 순위를 매기는 데까지 **최소 2~4주**가 걸립니다. 새 블로그는 더 오래 걸릴 수 있습니다. DAY 13에서 구글 서치 콘솔에 등록하면 이 과정을 빠르게 할 수 있습니다.

**오해 2: “메타 태그만 잘 쓰면 1페이지에 뜨는 거 아니야?”**

→ 메타 태그는 ‘입장권’입니다. 검색 결과에 나올 **자격**을 얻는 것이지, 1페이지를 **보장**하는 게 아닙니다. 검색 순위를 결정하는 진짜 요인은 콘텐츠의 품질, 글의 길이와 깊이, 체류 시간, 백링크(다른 사이트가 내 글을 링크하는 것) 등 수십 가지입니다. 오늘은 입장권을 받은 것이고, 순위를 올리는 건 꾸준한 글쓰기로 이루어집니다.

**오해 3: “키워드를 최대한 많이 넣어야 해”**

→ 2010년대 초반에는 통했지만, 지금은 역효과입니다. ‘키워드 스터핑(stuffing)’이라고 해서, 구글이 이런 글을 감지하면 오히려 순위를 내립니다. title과 description에 핵심 키워드를 자연스럽게 1~2번 포함하는 것으로 충분합니다.

**오해 4: “SEO 플러그인 같은 거 안 써도 되나?”**

→ 워드프레스에서는 Yoast SEO 같은 플러그인이 필수였지만, 우리는 Next.js의 metadata API로 직접 설정하고 있습니다. 플러그인이 하는 일을 우리가 직접 한 겁니다. 오히려 불필요한 코드가 없어서 더 가볍고 빠릅니다.

---


### 오늘의 에러 119 🚨

*이 코너는 매 회 해당 단계에서 자주 겪는 문제와 해결법을 다룹니다.*

**에러 1: `localhost:3000/sitemap.xml`에 접속하면 404가 뜬다**

→ `app/sitemap.ts` 파일의 위치가 잘못되었거나, 함수 export 방식이 틀렸을 수 있습니다. AI에게 “sitemap.ts 파일이 app 폴더 바로 아래에 있는지 확인하고, export default function sitemap() 형태로 되어 있는지 점검해줘”라고 요청하세요. Next.js는 `app/sitemap.ts`를 자동으로 `/sitemap.xml` 경로로 매핑합니다.

**에러 2: 페이지 소스를 봤는데 meta 태그가 하나도 없다**

→ Next.js App Router에서 metadata를 설정하는 방식이 잘못된 겁니다. `generateMetadata` 함수가 아닌 일반 변수로 선언했거나, `export`를 빠뜨렸을 수 있습니다. AI에게 “app/layout.tsx에서 metadata export가 정확한 형식인지 확인해줘. export const metadata: Metadata = {...} 또는 export async function generateMetadata() 형태여야 해”라고 요청하세요.

**에러 3: Open Graph 이미지가 안 뜬다**

→ 지금은 이미지 파일이 실제로 없으므로 정상입니다. `/public/images/og-default.png` 경로에 1200x630px 이미지를 넣으면 해결됩니다. 급하면 AI에게 “public/images 폴더에 1200x630px 크기의 간단한 OG 기본 이미지를 SVG로 만들어줘. 블로그 이름과 간단한 설명 텍스트만 포함해줘”라고 요청해도 됩니다.

**에러 4: 빌드 시 “metadataBase property is not set” 경고가 뜬다**

→ `app/layout.tsx`의 metadata에 `metadataBase`가 설정되지 않아서 나오는 경고입니다. AI에게 “layout.tsx의 metadata에 metadataBase: new URL(‘https://myblog.com’)을 추가해줘”라고 요청하세요. 이 URL은 DAY 11에서 실제 도메인을 연결한 뒤 변경하면 됩니다.
