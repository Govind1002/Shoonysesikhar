import { useParams, Link } from 'react-router-dom';
import { news, categories, trendingNews } from '../data/news';
import NewsCard from '../components/NewsCard';
import AdBanner from '../components/AdBanner';

export default function CategoryPage() {
  const { name } = useParams();
  const decodedName = decodeURIComponent(name || '');

  const filteredNews = news.filter((n) => n.category === decodedName);

  return (
    <div className="bg-[#f1f5f9] min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-500 mb-4 flex items-center gap-1.5">
          <Link to="/" className="hover:text-[#d60000] transition">होम</Link>
          <span>›</span>
          <span className="text-gray-800 font-semibold">{decodedName}</span>
        </nav>

        {/* Category Header */}
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-gray-200 shadow-xs mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-[#d60000] rounded-full"></div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-gray-900 leading-none">
                {decodedName} समाचार
              </h1>
              <p className="text-xs text-gray-500 mt-1">
                शून्य से शिखर — {decodedName} से संबंधित सभी ताजा और प्रामाणिक खबरें
              </p>
            </div>
          </div>
          <span className="self-start sm:self-center bg-red-50 text-[#d60000] border border-red-200 text-xs font-bold px-3 py-1 rounded-full">
            {filteredNews.length} खबरें उपलब्ध
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Grid (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {filteredNews.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center border border-gray-200 shadow-xs">
                <i className="fa-regular fa-newspaper text-5xl text-gray-300 mb-3 block"></i>
                <h3 className="text-lg font-bold text-gray-700 mb-1">
                  इस श्रेणी में अभी कोई खबर उपलब्ध नहीं है
                </h3>
                <p className="text-xs text-gray-400 mb-5">
                  हमारी रिपोर्टिंग टीम शीघ्र ही नई खबरें अपडेट करेगी।
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-1.5 bg-[#d60000] text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-[#b00000] transition"
                >
                  होम पेज पर जाएं
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredNews.map((article) => (
                  <NewsCard key={article.id} article={article} variant="featured" />
                ))}
              </div>
            )}

            {/* Ad Banner */}
            <AdBanner slot="top" />
          </div>

          {/* Sidebar (4 cols) */}
          <aside className="lg:col-span-4 space-y-5">
            {/* All Categories Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-xs">
              <h3 className="text-sm font-bold text-gray-900 mb-3 pb-2 border-b border-gray-100 flex items-center gap-2">
                <i className="fa-solid fa-layer-group text-[#d60000]"></i>
                अन्य श्रेणियाँ
              </h3>
              <ul className="space-y-1.5 text-xs">
                {categories.map((cat) => {
                  const isActive = cat === decodedName;
                  return (
                    <li key={cat}>
                      <Link
                        to={`/category/${encodeURIComponent(cat)}`}
                        className={`flex items-center justify-between p-2 rounded-lg transition font-medium ${
                          isActive
                            ? 'bg-red-50 text-[#d60000] font-bold border-l-4 border-[#d60000]'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-[#d60000]'
                        }`}
                      >
                        <span>{cat}</span>
                        <i className="fa-solid fa-angle-right text-[10px] text-gray-400"></i>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* WhatsApp Card */}
            <div className="bg-emerald-800 text-white rounded-xl p-4 shadow-xs">
              <div className="flex items-center gap-2 mb-2">
                <i className="fa-brands fa-whatsapp text-2xl text-green-400"></i>
                <h4 className="text-sm font-bold">WhatsApp 7800076067</h4>
              </div>
              <p className="text-xs text-emerald-100 mb-3">
                Shoonysesikhar — सभी राज्यों की पल-पल की खबरें सीधे आपके फोन पर।
              </p>
              <a
                href="https://wa.me/917800076067"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-white text-emerald-900 font-bold text-xs py-2 rounded-lg shadow-sm hover:bg-emerald-50 transition"
              >
                WhatsApp पर जुड़ें ↗
              </a>
            </div>

            {/* Trending News */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-xs">
              <h3 className="text-sm font-bold text-gray-900 mb-3 pb-2 border-b border-gray-100 flex items-center gap-2">
                <i className="fa-solid fa-fire text-[#d60000]"></i>
                आज की ट्रेंडिंग खबरें
              </h3>
              <div className="space-y-3">
                {trendingNews.slice(0, 4).map((t, i) => (
                  <Link
                    key={t.id}
                    to={news[i] ? `/news/${news[i].id}` : '/'}
                    className="flex items-start gap-2.5 group"
                  >
                    <span className="w-5 h-5 rounded-full bg-gray-100 text-[#d60000] font-bold text-xs flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <h4 className="text-xs font-semibold text-gray-800 group-hover:text-[#d60000] transition line-clamp-2">
                      {t.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>

            {/* Ad */}
            <AdBanner slot="sidebar" />
          </aside>
        </div>
      </div>
    </div>
  );
}
