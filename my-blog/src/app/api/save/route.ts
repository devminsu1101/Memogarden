import { savePostToGithub } from "@/lib/github";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { title, content } = await request.json();

  if (!title || !content) {
    return NextResponse.json({ error: "제목과 내용을 입력해주세요." }, { status: 400 });
  }

  const result = await savePostToGithub(title, content);

  if (result.success) {
    return NextResponse.json({ message: "성공적으로 저장되었습니다!" });
  } else {
    return NextResponse.json({ error: "저장 실패" }, { status: 500 });
  }
}