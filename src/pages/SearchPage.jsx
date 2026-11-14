import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { news } from '../data/news';
import NewsCard from '../components/NewsCard';
import AdBanner from '../components/AdBanner';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchInput, setSearchInput] = useState(query);

  const filteredNews = query.trim()
    ? news.filter((n) => {
        const q = query.toLowerCase();
        return (
          n.title.toLowerCase().includes(q) ||
          n.description.toLowerCase().includes(q) ||
          n.category.toLowerCase().includes(q) ||
          n.state.toLowerCase().includes(q) ||
          (n.tags && n.tags.some((t) => t.toLowerCase().includes(q)))
        );
      })
    : [];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ q: searchInput.trim() });
    }
  };

  return (
    <div className="bg-[#f1f5f9] min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-500 mb-4 flex items-center gap-1.5">
          <Link to="/" className="hover:text-[#d60000] transition">होम</Link>
          <span>›</span>
          <span className="text-gray-800 font-semibold">खोज परिणाम</span>
        </nav>

        {/* Search Input Box */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-xs mb-6">
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 mb-3">
            खबरें खोजें
          </h1>
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="कीवर्ड, विषय या राज्य दर्ज करें (उदा. मध्य प्रदेश, छत्तीसगढ़, गुजरात, राजस्थान, उत्तर प्रदेश)..."
                className="w-full text-sm pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#d60000] focus:ring-1 focus:ring-[#d60000]"
              />
            </div>
            <button
              type="submit"
              className="bg-[#d60000] hover:bg-[#b00000] text-white font-bold text-sm px-6 py-2.5 rounded-lg transition shrink-0"
            >
              खोजें
            </button>
          </form>

          {query && (
            <p className="text-xs text-gray-500 mt-3">
              '<strong>{query}</strong>' के लिए खोज परिणाम: <span className="text-[#d60000] font-bold">{filteredNews.length}</span> खबरें मिलीं
            </p>
          )}
        </div>

        {/* Search Results */}
        {query ? (
          filteredNews.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center border border-gray-200 shadow-xs">
              <i className="fa-solid fa-magnifying-glass text-4xl text-gray-300 mb-3 block"></i>
              <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-1">
                कोई खबर नहीं मिली
              </h3>
              <p className="text-xs text-gray-500 max-w-md mx-auto mb-4">
                कृपया कोई अन्य कीवर्ड जैसे 'मध्य प्रदेश', 'राजस्थान', 'योजना' या 'अपराध' लिखकर खोजें।
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredNews.map((article) => (
                <NewsCard key={article.id} article={article} variant="default" />
              ))}
            </div>
          )
        ) : (
          <div className="bg-white rounded-xl p-8 text-center border border-gray-200 shadow-xs">
            <p className="text-sm text-gray-500">ऊपर दिए गए बॉक्स में कोई भी शब्द लिखकर सर्च करें।</p>
          </div>
        )}

        {/* Ad */}
        <div className="mt-8">
          <AdBanner slot="top" />
        </div>
      </div>
    </div>
  );
}
