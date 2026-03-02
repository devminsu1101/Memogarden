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
export async function savePostToGithub(title: string, content: string) {
  // 제목에서 공백을 '-'로 바꾸고 소문자로 변환하여 파일명 생성
  const fileName = `${title.replace(/\s+/g, "-").toLowerCase()}.md`;
  const path = `content/${fileName}`; // 레포지토리 내 content 폴더에 저장

  try {
    let sha: string | undefined;

    // 1. 기존에 같은 이름의 파일이 있는지 확인 (수정 시 필요)
    try {
      const { data }: any = await octokit.repos.getContent({
        owner,
        repo,
        path,
      });
      sha = data.sha; // 파일이 존재하면 고유한 ID(sha)를 가져옵니다.
    } catch (e) {
      // 파일이 없으면 sha 없이 진행 (신규 생성)
    }

    // 2. 깃허브로 파일 전송 (커밋!)
    const response = await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: `📝 Memogarden: ${title} 기록`,
      content: Buffer.from(content).toString("base64"), // 내용은 base64로 인코딩 필수
      sha, // 기존 파일이 있을 때만 포함됨
    });

    return { success: true, data: response.data };
  } catch (error) {
    console.error("GitHub API Error:", error);
    return { success: false, error };
  }
}