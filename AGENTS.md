<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## 블로그 포스트 frontmatter (에이전트)

사용자가 본문만 제공하고 frontmatter·게시 형식은 에이전트가 채우는 경우:

- **`date`는 글을 포매팅·커밋하는 그날**을 쓴다. `America/Boise` 기준 ISO 8601+시각 (예: `2026-06-30T14:00:00-07:00`).
- 다른 글 날짜, 본문 서사 시점(“4월에 냈다” 등), 임의 추정 날짜로 `date`를 넣지 않는다.
- 같은 날 여러 글을 올리면 시각까지 넣어 목록 순서가 맞게 한다.
- `date`를 비우면 사이트는 파일 수정 시각(`mtime`)을 쓰지만, **에이전트는 `date`를 항상 명시**한다.
