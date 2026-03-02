import { Octokit } from "@octokit/rest";

// .env.local에 저장한 정보를 불러옵니다.
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const owner = process.env.GITHUB_OWNER || "";
const repo = process.env.GITHUB_REPO || "";

// 아래 내용을 추가해서 값이 잘 들어오는지 확인해봅시다.
console.log("DEBUG:", { owner, repo, hasToken: !!process.env.GITHUB_TOKEN });

if (!owner || !repo) {
  console.error("에러: GITHUB_OWNER 또는 GITHUB_REPO 설정이 비어있습니다. .env.local 파일을 확인하세요.");
}

/**
 * 깃허브에 마크다운 파일을 생성하거나 수정하는 함수
 */
// src/lib/github.ts 수정

export async function savePostToGithub(title: string, content: string, category: string) {
  // 카테고리명을 폴더명으로 변환 (소문자, 공백은 '-')
  const folderName = category.replace(/\s+/g, "-").toLowerCase();
  const fileName = `${title.replace(/\s+/g, "-").toLowerCase()}.md`;
  
  // 경로를 content/카테고리명/파일명.md 로 설정
  const path = `content/${folderName}/${fileName}`; 

  try {
    let sha: string | undefined;

    try {
      const { data }: any = await octokit.repos.getContent({ owner, repo, path });
      sha = data.sha;
    } catch (e) {
      // 신규 파일
    }

    const response = await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: `📝 [${category}] ${title} 기록`,
      content: Buffer.from(content).toString("base64"),
      sha,
    });

    return { success: true, data: response.data };
  } catch (error) {
    console.error("GitHub API Error:", error);
    return { success: false, error };
  }
}

/**
 * 특정 카테고리(폴더) 내의 파일 목록을 가져오는 함수
 */
export async function getPostList(category: string) {
  // 카테고리를 폴더명 형식으로 변환
  const folderName = category.replace(/\s+/g, "-").toLowerCase();
  const path = `content/${folderName}`;

  try {
    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path,
    });

    if (Array.isArray(data)) {
      // .md 파일만 필터링하고 이름에서 .md 확장자 제거
      return data
        .filter((file) => file.name.endsWith(".md"))
        .map((file) => ({
          title: file.name.replace(".md", "").replace(/-/g, " "),
          fileName: file.name,
          path: file.path,
        }));
    }
    return [];
  } catch (error : any) {
    // 폴더가 없는 카테고리라 나오는 404 에러 
    if (error.status === 404) {
      return [] 
    }
    console.error("목록 가져오기 실패:", error);
    return [];
  }
}