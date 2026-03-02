"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

// 클라이언트 사이드에서만 렌더링되도록 동적 임포트
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function WritePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("**여기에 내용을 작성하세요!**");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/save", {
        method: "POST",
        body: JSON.stringify({ title, content }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        alert("🎉 깃허브에 글이 저장되고 잔디가 심어졌습니다!");
      } else {
        alert("저장에 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
      alert("에러가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">새 글 작성 🌱</h1>
      <input
        type="text"
        placeholder="글 제목 (파일명이 됩니다)"
        className="w-full p-3 mb-4 border rounded-lg text-black"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div data-color-mode="light">
        <MDEditor value={content} onChange={(v) => setContent(v || "")} height={400} />
      </div>
      <button
        onClick={handleSave}
        disabled={loading}
        className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
      >
        {loading ? "저장 중..." : "깃허브에 심기 (Commit)"}
      </button>
    </div>
  );
}