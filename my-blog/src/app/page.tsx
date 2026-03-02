import { getPostList } from "@/lib/github";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const resolveParams = await searchParams
  const currentCategory = resolveParams.category || "frontend"; // 기본값
  const posts = await getPostList(currentCategory);

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 capitalize">
          {currentCategory.replace(/-/g, " ")} 🌱
        </h1>
        <p className="text-gray-500 mt-2">이 카테고리에 심어진 기록들입니다.</p>
      </header>

      {posts.length > 0 ? (
        <div className="grid gap-4">
          {posts.map((post) => (
            <div
              key={post.fileName}
              className="group p-6 border rounded-xl hover:border-green-500 hover:shadow-md transition-all bg-white cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold group-hover:text-green-600 capitalize">
                  {post.title}
                </h2>
                <span className="text-sm text-gray-400">View Post →</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed">
          <p className="text-gray-400 text-lg">
            {currentCategory} 카테고리에는 아직 심어진 기록이 없네요. 첫 글을 남겨보세요!
          </p>
        </div>
      )}
    </div>
  );
}