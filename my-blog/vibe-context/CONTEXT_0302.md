# 🌿 Memogarden 프로젝트 컨텍스트 (2026-03-02)

## 1. 프로젝트 현황
- **프레임워크:** Next.js 15 (App Router) / TypeScript / Tailwind CSS
- **핵심 라이브러리:** `@octokit/rest` (GitHub API), `@uiw/react-md-editor` (Markdown Editor)
- **현재 상태:** 1차 빌드 완료 (글쓰기 -> 깃허브 저장 -> 카테고리별 목록 조회)

## 2. 주요 구현 로직
- **GitHub 연동 (`src/lib/github.ts`):** - `savePostToGithub`: 제목/카테고리를 받아 `content/{category}/{title}.md` 경로로 커밋.
  - `getPostList`: 특정 카테고리 폴더의 파일 목록을 Octokit으로 호출 (404 에러 핸들링 완료).
- **글쓰기 페이지 (`src/app/write/page.tsx`):** - 카테고리 선택(`Frontend`, `Mendix`, `Vibe Coding`) 및 에디터 UI.
- **메인 페이지 (`src/app/page.tsx`):** - `searchParams`를 `await`로 언래핑(Unwrap)하여 카테고리별 동적 목록 렌더링.

## 3. 환경 설정 (Secret)
- `.env.local`에 `GITHUB_TOKEN`, `GITHUB_OWNER`, `GITHUB_REPO` 설정됨.
- `tsconfig.json`에 `@/*` alias 설정 완료.

## 4. 다음 작업 브리핑 (Next Steps)
- **상세 페이지:** `src/app/post/[category]/[slug]/page.tsx` 생성 및 마크다운 본문 출력.
- **스타일링:** 마크다운 본문을 예쁘게 보여줄 `react-markdown` 또는 `tailwind-typography` 도입.
- **네비게이션:** 현재 리스트 클릭 시 상세 페이지로 이동하는 링크 연결.