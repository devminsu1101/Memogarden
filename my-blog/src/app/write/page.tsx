"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function WritePage() {
  const categories = ["Frontend", "Mendix", "Vibe Coding"];
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("**새로운 가든의 기록을 시작하세요!**");
  const [category, setCategory] = useState(categories[0]); // 기본값 설정
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!title) return alert("제목을 입력해주세요!");
    setLoading(true);
    
    try {
      const res = await fetch("/api/save", {
        method: "POST",
        body: JSON.stringify({ title, content, category }), // category 추가 전송
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        alert(`🎉 [${category}] 폴더에 잔디를 심었습니다!`);
        setTitle("");
      } else {
        alert("저장에 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
      alert("에러 발생");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-green-700">새 글 심기 🌱</h1>
      
      <div className="flex gap-4 mb-4">
        {/* 카테고리 선택 셀렉트 박스 */}
        <select 
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-3 border rounded-lg bg-white text-gray-700 font-medium"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="글 제목"
          className="flex-1 p-3 border rounded-lg text-black focus:outline-green-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div data-color-mode="light">
        <MDEditor value={content as string} onChange={(v) => setContent(v || "")} height={500} />
      </div>

      <button
        onClick={handleSave}
        disabled={loading}
        className="mt-6 w-full py-4 bg-green-600 text-white rounded-xl font-bold text-lg hover:bg-green-700 transition-all shadow-lg disabled:bg-gray-400"
      >
        {loading ? "가든에 심는 중..." : "깃허브에 기록하기 (Commit)"}
      </button>
    </div>
  );
}