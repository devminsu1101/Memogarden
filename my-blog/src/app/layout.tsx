import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const categories = ["Frontend", "Mendix", "Vibe Coding"]; // 나중에 서버에서 가져올 수도 있어요.

  return (
    <html lang="ko">
      <body className="flex flex-col h-screen bg-gray-50">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b flex items-center px-8 shrink-0 shadow-sm">
          <div className="text-2xl font-bold text-green-600 flex items-center gap-2">
            🌱 <span className="tracking-tight">Memogarden</span>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Side Bar */}
          <aside className="w-64 bg-white border-r p-6 flex flex-col gap-4 overflow-y-auto">
            <nav>
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Categories</h2>
              <ul className="space-y-2">
                {categories.map((cat) => (
                  <li key={cat}>
                    <a 
                      href={`/?category=${cat.replace(/\s+/g, "-").toLowerCase()}`}
                      className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-md transition-colors"
                    >
                      {cat}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-auto">
              <a href="/write" className="block text-center bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700">
                새 글 심기
              </a>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto bg-white p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}