---
title: "**DAY 06** [실전] 광고 클릭률 2배 올리는 색상 배치와 레이아웃 설계"
date: "2026-04-01"
category: "[연재] 바이브 코딩으로 블로그 만들기"
description: "헤더·푸터·색상·타이포를 수익 관점에서 다시 설계하고, 애드센스와 조화되는 링크 색·체크리스트까지."
tags: ["바이브코딩", "VibeCoding", "블로그만들기", "연재", "디자인", "애드센스", "Tailwind"]
---

> **바이브 코딩으로 블로그 만들기 시리즈**
> 코딩을 몰라도 AI와 대화하며 ‘내 소유’ 수익형 웹사이트를 만드는 15일 여정

---

지금까지 우리는 ‘작동하는 블로그’를 만들었습니다. 브라우저에 뭔가가 뜨고, 글을 클릭하면 상세 페이지가 열리는 상태까지 왔습니다.

하지만 솔직히 말하면 지금 블로그의 디자인은 ‘AI가 대충 만들어준’ 수준입니다. 작동은 하지만, 돈을 벌 준비가 된 디자인은 아닙니다.

앞으로의 미션은 명확합니다. <strong>‘작동하는 블로그’를 ‘돈 버는 블로그’로 바꾸는 것.</strong>

오늘은 그 첫 번째 단계로 헤더·푸터·전체 색상을 수익 관점에서 다시 설계합니다. AI에게 “이거 바꿔줘”라고 말하는 것만으로 디자인이 실시간으로 바뀌는 경험을 하게 될 겁니다. 바이브 코딩의 진가가 드러나는 날입니다.

---

## 왜 ‘예쁜 디자인’이 아니라 ‘돈 되는 디자인’인가

디자인을 다듬는다고 하면 대부분 이런 걸 떠올립니다. 그러데이션, 애니메이션, 화려한 배너, 개성 있는 폰트.

수익형 블로그에서는 이 모든 게 **독**입니다.

이유를 한 가지만 기억하세요. <strong>블로그 디자인의 목적은 ‘보여주기’가 아니라 ‘읽히기’입니다.</strong> 방문자가 글을 읽는 데 집중할수록 체류 시간이 늘고, 체류 시간이 늘수록 광고를 볼 확률이 높아지고, 광고를 볼 확률이 높아질수록 클릭률이 올라갑니다.

```
화려한 디자인의 흐름:
방문자 → 눈이 바쁨 → 글 집중 ↓ → 체류 시간 ↓ → 광고 무시 → 수익 ↓

깔끔한 디자인의 흐름:
방문자 → 눈이 편함 → 글 집중 ↑ → 체류 시간 ↑ → 광고 자연 노출 → 수익 ↑
```

[DAY 02](/posts/vibe-coding-blog-day-02)에서 분석한 월 100만 원 블로그들이 전부 ‘심심한’ 디자인이었던 이유가 바로 이겁니다. 의도적으로 심심하게 만든 겁니다.

---

## 오늘 다듬을 3가지

오늘 AI에게 요청할 디자인 수정은 크게 세 가지입니다.

<div class="not-prose wireframe-gshape wireframe-gshape--table" role="img" aria-label="DAY 06 오늘 다듬을 세 가지: 헤더, 본문·사이드바 유지, 푸터, 색상·타이포">
  <table class="wireframe-table">
    <caption class="wireframe-table__caption">오늘 다듬을 3가지</caption>
    <tbody>
      <tr>
        <th scope="row">① 헤더 (Header)</th>
        <td class="wireframe-table__hint">← 첫인상 + 내비게이션</td>
      </tr>
      <tr class="wireframe-table__row-tall">
        <td class="wireframe-table__span" colspan="2">
          본문 + 사이드바<br />
          <span class="wireframe-inset__sub">(오늘은 건드리지 않음)</span>
        </td>
      </tr>
      <tr>
        <th scope="row">② 푸터 (Footer)</th>
        <td class="wireframe-table__hint">← 신뢰감 + 애드센스 필수 링크</td>
      </tr>
      <tr>
        <th scope="row">③ 전체 색상·타이포그래피</th>
        <td class="wireframe-table__hint">← 가독성 + 광고 대비</td>
      </tr>
    </tbody>
  </table>
</div>

하나씩 갑시다.

---

## ① 헤더: 3초 안에 ‘여기 믿을 만하네’를 전달하라

방문자가 블로그에 들어오면 가장 먼저 보는 것이 헤더입니다. 구글 검색에서 클릭해 들어온 사람은 **3초 안에** ‘이 사이트가 신뢰할 만한가’를 판단합니다. 판단 기준은 의외로 단순합니다.

- 로고(또는 사이트 이름)가 있는가?
- 메뉴가 정돈되어 있는가?
- 전문적인 느낌인가, 아마추어 느낌인가?

### 수익형 블로그 헤더의 황금 공식

<div class="not-prose wireframe-gshape wireframe-gshape--header-schematic" role="img" aria-label="데스크톱 헤더: 로고·카테고리·다크모드 배치">
  <div class="wireframe-table__caption">데스크톱 헤더</div>
  <div class="wireframe-header-schematic__band">
    <div class="wireframe-header-schematic__track">
      <div class="wireframe-header-schematic__cell wireframe-header-schematic__cell--start">📝 BlogName</div>
      <div class="wireframe-header-schematic__cell wireframe-header-schematic__cell--center">카테고리1 · 카테고리2 · 카테고리3</div>
      <div class="wireframe-header-schematic__cell wireframe-header-schematic__cell--end">🌙</div>
    </div>
    <div class="wireframe-header-schematic__track wireframe-header-schematic__track--labels">
      <div class="wireframe-header-schematic__cell wireframe-header-schematic__cell--start wireframe-inset__sub">로고/이름</div>
      <div class="wireframe-header-schematic__cell wireframe-header-schematic__cell--center wireframe-inset__sub">핵심 카테고리 3~5개</div>
      <div class="wireframe-header-schematic__cell wireframe-header-schematic__cell--end wireframe-inset__sub">다크모드</div>
    </div>
  </div>
</div>

<div class="not-prose wireframe-gshape wireframe-gshape--header-schematic wireframe-gshape--narrow" role="img" aria-label="모바일 헤더: 로고·햄버거·다크모드">
  <div class="wireframe-table__caption">모바일 헤더</div>
  <div class="wireframe-header-schematic__band">
    <div class="wireframe-header-schematic__track">
      <div class="wireframe-header-schematic__cell wireframe-header-schematic__cell--start">📝 BlogName</div>
      <div class="wireframe-header-schematic__cell wireframe-header-schematic__cell--center">☰</div>
      <div class="wireframe-header-schematic__cell wireframe-header-schematic__cell--end">🌙</div>
    </div>
    <div class="wireframe-header-schematic__track wireframe-header-schematic__track--labels">
      <div class="wireframe-header-schematic__cell wireframe-header-schematic__cell--start wireframe-inset__sub">로고/이름</div>
      <div class="wireframe-header-schematic__cell wireframe-header-schematic__cell--center wireframe-inset__sub">햄버거 메뉴</div>
      <div class="wireframe-header-schematic__cell wireframe-header-schematic__cell--end wireframe-inset__sub">다크모드</div>
    </div>
  </div>
</div>

핵심 원칙 세 가지입니다.

**원칙 1: 높이를 낮게 유지하라** 

헤더가 높으면 본문(= 광고가 있는 영역)이 밀려 내려갑니다. 방문자가 스크롤하기 전에 광고를 한 번이라도 더 보게 하려면 헤더는 60~70px로 얇게 만들어야 합니다.

**원칙 2: 카테고리는 5개 이하로** 

메뉴가 많으면 선택 장애가 옵니다. 핵심 카테고리 3~5개만 노출하세요. 나머지는 ‘전체 카테고리’ 드롭다운으로 숨기면 됩니다.

**원칙 3: 검색 기능은 나중에** 

글이 50개 미만일 때 검색 기능은 불필요합니다. 초기에는 카테고리 내비게이션만으로 충분합니다. 글이 쌓이면 그때 추가해도 됩니다.

### AI에게 헤더 수정 요청하기

Cursor 채팅창(Ctrl+L)을 열고 아래 프롬프트를 입력하세요.

```
Header 컴포넌트를 수정해줘.

1. 헤더 높이: 64px (패딩 포함)
2. 배경: 흰색(라이트) / #1a1a1a(다크), 하단에 1px 연한 회색 보더
3. 왼쪽: 블로그 이름 텍스트 (굵게, 20px, 포인트 컬러 #2563EB)
4. 가운데~오른쪽: 카테고리 내비게이션 3~5개 (일반 텍스트, hover 시 포인트 컬러)
5. 오른쪽 끝: 다크모드 토글 버튼 (아이콘)
6. 모바일(768px 미만): 카테고리 숨기고 햄버거 메뉴(☰)로 대체
7. 햄버거 클릭 시 드롭다운으로 카테고리 표시
8. 헤더는 스크롤 시 상단 고정(sticky)

현재 Header.tsx 파일을 확인하고 수정해줘.
```

AI가 코드를 수정하고 작업을 완료하면 브라우저에서 `http://localhost:3000/`에 접속해 변화를 확인하세요.

![요청대로 수정된 헤더의 모습](/image-day06/day06-01.png)

> **마음에 안 들면?** 구체적으로 말해주세요. ‘로고 글자 크기를 24px로 키워줘’, ‘카테고리 사이 간격을 더 넓혀줘’, ‘햄버거 메뉴 아이콘을 X로 바꿔줘’. 바이브 코딩에서 수정 요청은 무한으로 가능합니다. AI는 짜증내지 않습니다.

---

## ② 푸터: ‘있으면 신뢰, 없으면 탈락’

푸터는 방문자가 거의 안 보는 영역입니다. 그런데 왜 중요할까요?

**구글 애드센스 심사관은 봅니다.**

애드센스 승인을 받으려면 블로그에 반드시 있어야 하는 페이지가 3개 있습니다. 개인정보처리방침, 소개(About), 문의(Contact). 이 페이지들로의 링크가 보통 푸터에 들어갑니다. DAY 12에서 이 페이지들을 AI로 생성할 텐데, 지금은 푸터에 링크 자리만 잡아두는 겁니다.

### 수익형 블로그 푸터의 구조

<figure>
  <img src="/image-day06/day06-02.png" alt="수익형 블로그 푸터의 구조" class="md-img-natural" loading="lazy" />
  <figcaption>수익형 블로그 푸터의 구조</figcaption>
</figure>

푸터에 들어갈 요소는 이게 전부입니다. 화려할 필요 없습니다. SNS 링크, 최근 글 목록, 태그 클라우드 같은 건 넣지 마세요. 푸터가 복잡해지면 오히려 ‘아마추어 블로그’ 느낌이 납니다.

### AI에게 푸터 수정 요청하기

```
Footer 컴포넌트를 수정해줘.

1. 배경: 라이트 모드 #f9fafb / 다크 모드 #111827
2. 상단에 1px 연한 회색 보더
3. 내용 구성 (위에서 아래로):
   - 블로그 이름 (굵게, 포인트 컬러)
   - 한 줄 소개 텍스트: "바이브 코딩으로 만든 수익형 블로그"
   - 링크 3개: 소개(/about) · 개인정보처리방침(/privacy) · 문의(/contact)
   - 저작권 표시: © 2025 BlogName. All rights reserved.
4. 전체 텍스트 가운데 정렬
5. 링크는 hover 시 포인트 컬러, 밑줄 없음
6. 패딩: 위아래 40px
7. 글자 크기: 14px (본문보다 작게)

현재 Footer.tsx 파일을 확인하고 수정해줘.
```

커서에서 작업이 완료되면 푸터가 요청대로 변경된 것을 확인할 수 있습니다. 

<figure>
  <img src="/image-day06/day06-03.png" alt="요청에 맞게 변경된 푸터" class="md-img-natural" loading="lazy" />
  <figcaption>요청에 맞게 변경된 푸터</figcaption>
</figure>

---

## ③ 전체 색상·타이포그래피: 광고가 ‘자연스럽게’ 보이는 환경 만들기

여기가 오늘 포스팅의 핵심입니다. 색상과 글꼴 설정이 광고 클릭률에 직접적인 영향을 미치는 이유를 설명하겠습니다.

### 구글 애드센스 광고는 어떻게 생겼나?

애드센스 광고의 대부분은 이렇게 생겼습니다.

<div class="not-prose wireframe-gshape wireframe-gshape--table" role="img" aria-label="애드센스 텍스트형 광고 예시: 썸네일·파란 제목·회색 설명·초록 URL">
  <table class="wireframe-table">
    <caption class="wireframe-table__caption">애드센스 광고 예시</caption>
    <tbody>
      <tr>
        <td class="wireframe-table__span" colspan="2">
          <div class="wireframe-adsense-mock">
            <div class="wireframe-adsense-mock__thumb" aria-hidden="true">이미지</div>
            <div class="wireframe-adsense-mock__text">
              <div class="wireframe-adsense-mock__title">광고 제목 (파란색 링크)</div>
              <div class="wireframe-adsense-mock__desc">설명 텍스트 (회색)</div>
              <div class="wireframe-adsense-mock__url">광고주 URL (초록색)</div>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

광고의 제목은 **파란색**, 설명은 **회색**, URL은 **초록색**입니다. 구글 검색 결과와 거의 똑같은 형태입니다.

이제 핵심입니다. **블로그의 링크 색상과 광고의 링크 색상이 비슷하면 광고가 콘텐츠의 일부처럼 보입니다.** 이게 클릭률을 올리는 비밀입니다.

DAY 02에서 포인트 컬러를 파란색(#2563EB)으로 정한 이유가 여기에 있습니다. 애드센스 광고의 기본 링크 색상과 톤이 비슷하기 때문입니다. 광고가 이질적으로 튀지 않고, 블로그의 자연스러운 일부처럼 녹아듭니다.

> <strong>광고를 속이라는 건가요?</strong> 
아닙니다. 구글 애드센스 정책은 광고와 콘텐츠가 구분되어야 한다고 명시합니다. 광고 영역에는 반드시 ‘광고’ 또는 ‘Sponsored’ 표시가 있습니다. 여기서 말하는 건 블로그 전체의 색상 톤이 광고와 조화를 이루도록 설계하라는 것이지, 광고를 콘텐츠로 위장하라는 게 아닙니다.

### 수익형 블로그의 색상 시스템

<div class="not-prose wireframe-gshape wireframe-gshape--table" role="img" aria-label="라이트·다크 모드별 블로그 색상 토큰과 헥스 코드">
  <table class="wireframe-table wireframe-table--compare3">
    <caption class="wireframe-table__caption">수익형 블로그 색상 시스템</caption>
    <thead>
      <tr>
        <th scope="col">역할</th>
        <th scope="col">라이트 모드</th>
        <th scope="col">다크 모드</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">배경색</th>
        <td>
          <div class="wireframe-color-cell">
            <span class="wireframe-color-swatch" style="background-color: #ffffff" aria-hidden="true"></span>
            <div class="wireframe-color-cell__main">
              <span>#FFFFFF</span>
              <span class="wireframe-inset__sub">(흰색)</span>
            </div>
          </div>
        </td>
        <td>
          <div class="wireframe-color-cell">
            <span class="wireframe-color-swatch" style="background-color: #121212" aria-hidden="true"></span>
            <div class="wireframe-color-cell__main">
              <span>#121212</span>
              <span class="wireframe-inset__sub">(짙은 회색)</span>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <th scope="row">본문 글자색</th>
        <td>
          <div class="wireframe-color-cell">
            <span class="wireframe-color-swatch" style="background-color: #333333" aria-hidden="true"></span>
            <div class="wireframe-color-cell__main">
              <span>#333333</span>
            </div>
          </div>
        </td>
        <td>
          <div class="wireframe-color-cell">
            <span class="wireframe-color-swatch" style="background-color: #e0e0e0" aria-hidden="true"></span>
            <div class="wireframe-color-cell__main">
              <span>#E0E0E0</span>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <th scope="row">보조 텍스트</th>
        <td>
          <div class="wireframe-color-cell">
            <span class="wireframe-color-swatch" style="background-color: #6b7280" aria-hidden="true"></span>
            <div class="wireframe-color-cell__main">
              <span>#6B7280</span>
              <span class="wireframe-inset__sub">(회색)</span>
            </div>
          </div>
        </td>
        <td>
          <div class="wireframe-color-cell">
            <span class="wireframe-color-swatch" style="background-color: #9ca3af" aria-hidden="true"></span>
            <div class="wireframe-color-cell__main">
              <span>#9CA3AF</span>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <th scope="row">포인트 컬러</th>
        <td>
          <div class="wireframe-color-cell">
            <span class="wireframe-color-swatch" style="background-color: #2563eb" aria-hidden="true"></span>
            <div class="wireframe-color-cell__main">
              <span>#2563EB</span>
              <span class="wireframe-inset__sub">(파란색)</span>
            </div>
          </div>
        </td>
        <td>
          <div class="wireframe-color-cell">
            <span class="wireframe-color-swatch" style="background-color: #3b82f6" aria-hidden="true"></span>
            <div class="wireframe-color-cell__main">
              <span>#3B82F6</span>
              <span class="wireframe-inset__sub">(밝은 파란)</span>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <th scope="row">링크 색상</th>
        <td>
          <div class="wireframe-color-cell">
            <span class="wireframe-color-swatch" style="background-color: #2563eb" aria-hidden="true"></span>
            <div class="wireframe-color-cell__main">
              <span>#2563EB</span>
            </div>
          </div>
        </td>
        <td>
          <div class="wireframe-color-cell">
            <span class="wireframe-color-swatch" style="background-color: #3b82f6" aria-hidden="true"></span>
            <div class="wireframe-color-cell__main">
              <span>#3B82F6</span>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <th scope="row">링크 hover</th>
        <td>
          <div class="wireframe-color-cell">
            <span class="wireframe-color-swatch" style="background-color: #1d4ed8" aria-hidden="true"></span>
            <div class="wireframe-color-cell__main">
              <span>#1D4ED8</span>
              <span class="wireframe-inset__sub">(진한 파란)</span>
            </div>
          </div>
        </td>
        <td>
          <div class="wireframe-color-cell">
            <span class="wireframe-color-swatch" style="background-color: #60a5fa" aria-hidden="true"></span>
            <div class="wireframe-color-cell__main">
              <span>#60A5FA</span>
              <span class="wireframe-inset__sub">(더 밝은 파란)</span>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <th scope="row">보더/구분선</th>
        <td>
          <div class="wireframe-color-cell">
            <span class="wireframe-color-swatch" style="background-color: #e5e7eb" aria-hidden="true"></span>
            <div class="wireframe-color-cell__main">
              <span>#E5E7EB</span>
            </div>
          </div>
        </td>
        <td>
          <div class="wireframe-color-cell">
            <span class="wireframe-color-swatch" style="background-color: #2d2d2d" aria-hidden="true"></span>
            <div class="wireframe-color-cell__main">
              <span>#2D2D2D</span>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <th scope="row">카드 배경</th>
        <td>
          <div class="wireframe-color-cell">
            <span class="wireframe-color-swatch" style="background-color: #f9fafb" aria-hidden="true"></span>
            <div class="wireframe-color-cell__main">
              <span>#F9FAFB</span>
            </div>
          </div>
        </td>
        <td>
          <div class="wireframe-color-cell">
            <span class="wireframe-color-swatch" style="background-color: #1e1e1e" aria-hidden="true"></span>
            <div class="wireframe-color-cell__main">
              <span>#1E1E1E</span>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

이 색상표를 통째로 AI에게 전달하면 됩니다.

### 타이포그래피(글꼴) 설정

<div class="not-prose wireframe-gshape wireframe-gshape--table" role="img" aria-label="본문·제목·단락·최대 너비 등 타이포그래피 설정값과 목적">
  <table class="wireframe-table wireframe-table--compare3 wireframe-table--typography">
    <caption class="wireframe-table__caption">타이포그래피(글꼴) 설정</caption>
    <thead>
      <tr>
        <th scope="col">항목</th>
        <th scope="col">설정값</th>
        <th scope="col">이유</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">본문 글꼴 크기</th>
        <td>18px</td>
        <td>모바일에서도 편한 읽기</td>
      </tr>
      <tr>
        <th scope="row">본문 줄간격</th>
        <td>1.8 (line-height)</td>
        <td>눈의 피로 감소</td>
      </tr>
      <tr>
        <th scope="row">제목(H1) 크기</th>
        <td>32px</td>
        <td>시선 집중</td>
      </tr>
      <tr>
        <th scope="row">소제목(H2) 크기</th>
        <td>24px</td>
        <td>구조 구분</td>
      </tr>
      <tr>
        <th scope="row">소소제목(H3) 크기</th>
        <td>20px</td>
        <td>세부 구분</td>
      </tr>
      <tr>
        <th scope="row">단락 간격</th>
        <td>24px (margin)</td>
        <td>호흡 확보</td>
      </tr>
      <tr>
        <th scope="row">본문 최대 너비</th>
        <td>720px</td>
        <td>한 줄에 60~70자 유지</td>
      </tr>
    </tbody>
  </table>
</div>

> **왜 본문 최대 너비가 720px인가요?** 한 줄이 너무 길면 눈이 다음 줄 시작점을 찾기 어렵습니다. 타이포그래피 연구에 따르면, 한 줄에 60~70자(영문 기준)가 가장 읽기 편합니다. 한글은 글자 폭이 영문보다 넓으니, 720px 정도가 적당합니다.

### AI에게 전체 스타일 수정 요청하기

```
블로그 전체의 색상과 타이포그래피를 수정해줘.
globals.css와 tailwind.config.ts를 함께 수정해야 할 수 있어.

## 색상 시스템 (CSS 변수로 관리)

라이트 모드:
- 배경: #FFFFFF
- 본문 글자: #333333
- 보조 텍스트: #6B7280
- 포인트/링크: #2563EB
- 링크 hover: #1D4ED8
- 보더/구분선: #E5E7EB
- 카드 배경: #F9FAFB

다크 모드:
- 배경: #121212
- 본문 글자: #E0E0E0
- 보조 텍스트: #9CA3AF
- 포인트/링크: #3B82F6
- 링크 hover: #60A5FA
- 보더/구분선: #2D2D2D
- 카드 배경: #1E1E1E

## 타이포그래피

- 글꼴: 시스템 기본 폰트 (별도 웹폰트 로드 없이)
- 본문: 18px, line-height 1.8
- H1: 32px, font-weight 800
- H2: 24px, font-weight 700
- H3: 20px, font-weight 600
- 단락 간격(p): margin-bottom 24px
- 본문 영역 최대 너비: 720px

## 추가 사항

- 모든 링크: 밑줄 없음, hover 시 색상 변경만
- 코드 블록: 라이트 모드 배경 #F3F4F6, 다크 모드 배경 #1E1E1E
- 이미지: border-radius 8px, 최대 너비 100%

CSS 변수를 :root와 .dark 클래스로 분리해서 관리해줘.
```

> **시스템 기본 폰트를 쓰는 이유** 구글 폰트 같은 웹폰트를 로드하면 페이지 로딩 속도가 느려집니다. 로딩 속도는 구글 검색 순위에 직접 영향을 주는 요소입니다. 시스템 폰트(Apple SD Gothic Neo, Malgun Gothic 등)를 쓰면 추가 로딩 없이 즉시 표시됩니다. 속도 = SEO = 방문자 수 = 수익. 이 공식을 잊지 마세요.

---

## 수정 결과 확인하기

세 가지 프롬프트를 모두 적용했으면, 브라우저에서 `localhost:3000`을 새로고침합니다.

### 체크리스트: 이 항목들이 되어 있나요?

하나씩 눈으로 확인해보세요.

**헤더**
- [ ] 높이가 얇아졌는가? (화면의 1/10 이하)
- [ ] 블로그 이름이 왼쪽에 파란색으로 보이는가?
- [ ] 카테고리 메뉴가 정돈되어 있는가?
- [ ] 다크모드 토글이 작동하는가?
- [ ] 스크롤 시 헤더가 상단에 고정되는가?
- [ ] 브라우저 폭을 줄였을 때 햄버거 메뉴로 바뀌는가?

**푸터**
- [ ] 블로그 이름 + 한 줄 소개가 있는가?
- [ ] 소개/개인정보처리방침/문의 링크 3개가 있는가?
- [ ] 저작권 표시가 있는가?
- [ ] 링크를 클릭하면 해당 페이지로 이동하는가? (아직 페이지가 없어서 404가 나도 정상)

**전체 색상·타이포그래피**
- [ ] 본문 글자가 까만색(#000)이 아닌 짙은 회색(#333)인가?
- [ ] 링크가 파란색인가?
- [ ] 다크모드로 전환했을 때 색상이 자연스럽게 바뀌는가?
- [ ] 본문 글자 크기가 충분히 큰가? (18px)
- [ ] 줄간격이 넉넉한가?

### 안 되는 항목이 있다면?

DAY 05에서 배운 에러 대처 3단계를 그대로 씁니다.

1. 안 되는 부분을 구체적으로 AI에게 말하기: “다크모드 토글을 눌러도 색상이 안 바뀌어. 확인하고 수정해줘.”
2. 서버 재시작: `Ctrl + C` → `npm run dev`
3. 그래도 안 되면: “다크모드 기능을 처음부터 다시 구현해줘.”

---

## 디자인 수정, 얼마나 자유롭게 가능한가?

오늘 경험해 봤듯이, AI에게 구체적으로 요청하면 디자인을 거의 무한대로 수정할 수 있습니다. 몇 가지 예시를 더 들어 보겠습니다. 지금 당장 해 봐도 되고, 나중에 해도 됩니다.

```
"헤더 배경색을 네이비(#1E3A5F)로 바꾸고 글자를 흰색으로 해줘"

"블로그 이름 옆에 이모지 📝 추가해줘"

"푸터에 '맨 위로' 버튼 추가해줘"

"카테고리 메뉴에 hover 시 밑줄 애니메이션 넣어줘"

"본문 H2 소제목 왼쪽에 파란색 세로 막대 장식 넣어줘"

"모바일에서 글자 크기를 16px로 줄여줘"
```

전부 한국어 한 줄이면 됩니다. 코드를 볼 필요도 없습니다. 결과가 마음에 안 들면 “되돌려줘”라고 하면 됩니다.

이게 바이브 코딩으로 디자인하는 방법입니다. 피그마도, 포토샵도, CSS 지식도 필요 없습니다. <strong>“이렇게 해줘”라고 말할 줄만 알면 됩니다.</strong>

---

## 오늘 해서는 안 되는 실수

디자인 수정이 재밌어서 빠지기 쉬운 함정이 있습니다.

<strong>❌ “완벽하게 만들어야지” 함정</strong>

헤더 색상을 열 번 바꾸고, 글꼴 크기를 1px 단위로 조정하고, 둥근 모서리를 6px로 할지 8px로 할지 고민하는 것. 이건 디자인이 아니라 집착입니다. 지금 블로그를 보는 사람은 여러분 한 명뿐입니다. 80%만 괜찮으면 넘어가세요. 글이 30개 쌓이고 방문자가 오기 시작한 뒤에 다듬어도 늦지 않습니다.

<strong>❌ “이것저것 추가해야지” 함정</strong>

애니메이션, 파티클 효과, 마우스 커서 커스텀, 스크롤 진행 바… 전부 로딩 속도를 느리게 만듭니다. 수익형 블로그에서 로딩 속도 1초 증가는 이탈률 7% 증가와 같다는 연구 결과가 있습니다. **빼는 게 디자인**입니다.

<strong>❌ “남의 블로그처럼 만들어야지” 함정</strong>

벤치마킹은 DAY 02에서 이미 했습니다. 지금부터는 남의 블로그를 보면서 “저건 왜 저렇게 했지?”를 분석하는 건 좋지만, “저것처럼 똑같이 해달라”고 AI에게 스크린샷을 보내는 건 비효율적입니다. 원칙(가독성, 깔끔함, 광고 조화)을 지키면 자연스럽게 비슷한 결과가 나옵니다.


이제 블로그가 눈에 띄게 달라졌을 겁니다. 어제의 ‘AI가 대충 만들어준’ 느낌에서, 오늘은 ‘누가 만든 건지 모르겠지만 깔끔하네’ 수준으로 올라왔습니다.

---

### 오늘의 에러 119 🚨

*이 코너는 매 회 해당 단계에서 자주 겪는 문제와 해결법을 다룹니다.*

**에러 1: 다크모드 토글을 눌러도 아무 변화가 없다**

→ 다크모드 구현에는 여러 방식이 있는데, Tailwind CSS의 `darkMode: ‘class’` 설정이 빠져 있을 가능성이 높습니다. AI에게 “tailwind.config.ts에서 darkMode를 ‘class’로 설정했는지 확인하고, html 태그에 dark 클래스를 토글하는 로직이 있는지 점검해줘”라고 요청하세요.

**에러 2: 헤더가 sticky인데 본문 위에 겹쳐 보인다**

→ 헤더가 고정되면 본문이 헤더 높이만큼 가려집니다. AI에게 “헤더가 sticky일 때 본문 시작 위치가 헤더 아래로 오도록 body 또는 main에 padding-top을 헤더 높이만큼 추가해줘”라고 요청하세요.

**에러 3: 햄버거 메뉴를 눌러도 드롭다운이 안 뜬다**

→ 모바일 메뉴는 상태 관리(열림/닫힘)가 필요한데, 이 로직이 빠졌거나 `useState`가 서버 컴포넌트에서 사용되어 에러가 나는 경우입니다. AI에게 “Header 컴포넌트 맨 위에 ‘use client’가 있는지 확인하고, 모바일 메뉴 토글 기능을 다시 구현해줘”라고 요청하세요.

**에러 4: 색상은 바뀌었는데 일부 요소만 이전 색상이 남아 있다**

→ Tailwind의 인라인 클래스(`bg-white`, `text-black` 등)가 CSS 변수보다 우선 적용되는 경우입니다. AI에게 “모든 컴포넌트에서 하드코딩된 색상 클래스를 찾아서 CSS 변수로 교체해줘”라고 요청하세요. 한 번에 안 되면 “Header.tsx에서 하드코딩된 색상만 먼저 수정해줘”처럼 파일별로 나눠서 요청하는 게 더 정확합니다.

