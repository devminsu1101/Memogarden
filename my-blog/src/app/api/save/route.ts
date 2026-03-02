// src/app/api/save/route.ts 수정

import { savePostToGithub } from "@/lib/github";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { title, content, category } = await request.json();

  if (!title || !content || !category) {
    return NextResponse.json({ error: "모든 항목을 입력해주세요." }, { status: 400 });
  }

  // category 인자 추가
  const result = await savePostToGithub(title, content, category);

  if (result.success) {
    return NextResponse.json({ message: "성공!" });
  } else {
    return NextResponse.json({ error: "실패" }, { status: 500 });
  }
}