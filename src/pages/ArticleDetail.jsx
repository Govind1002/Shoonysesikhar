import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { news, trendingNews } from '../data/news';
import NewsCard from '../components/NewsCard';
import AdBanner from '../components/AdBanner';

export default function ArticleDetail() {
  const { id } = useParams();
  const [copied, setCopied] = useState(false);
  const article = news.find((n) => n.id === parseInt(id));

  if (!article) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="w-16 h-16 bg-red-100 text-[#d60000] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
          !
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">खबर नहीं मिली</h2>
        <p className="text-gray-500 text-sm mb-6">यह खबर हटा दी गई है या इसका लिंक गलत हो सकता है।</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[#d60000] text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-[#b00000] transition"
        >
          <i className="fa-solid fa-house text-xs"></i>
          मुख्य पृष्ठ पर वापस जाएं
        </Link>
      </div>
    );
  }

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const relatedNews = news.filter((n) => n.category === article.category && n.id !== article.id).slice(0, 4);

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="bg-[#f1f5f9] min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-500 mb-4 flex flex-wrap items-center gap-1.5">
          <Link to="/" className="hover:text-[#d60000] transition">होम</Link>
          <span>›</span>
          <Link to={`/category/${encodeURIComponent(article.category)}`} className="hover:text-[#d60000] transition">
            {article.category}
          </Link>
          <span>›</span>
          <span className="text-gray-700 font-medium truncate max-w-xs sm:max-w-md">
            {article.title}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Article Content (8 cols) */}
          <main className="lg:col-span-8 bg-white rounded-xl p-4 sm:p-7 border border-gray-200 shadow-xs">
            {/* Category Pill & Location */}
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-[#d60000] text-white text-xs font-bold px-2.5 py-1 rounded">
                {article.category}
              </span>
              <span className="text-xs text-gray-500 font-semibold bg-gray-100 px-2 py-0.5 rounded">
                📍 {article.state}
              </span>
            </div>

            {/* Article Headline */}
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-4">
              {article.title}
            </h1>

            {/* Author & Timestamp Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500 py-3 border-y border-gray-100 mb-5">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 font-semibold text-gray-700">
                  <i className="fa-regular fa-user text-[#d60000]"></i>
                  {article.author}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <i className="fa-regular fa-calendar text-[#d60000]"></i>
                  {article.date} ({article.timeAgo || 'हालिया'})
                </span>
              </div>

              {/* Share Pills Top */}
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-gray-400 mr-1 hidden sm:inline">शेयर करें:</span>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(article.title + ' ' + currentUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center transition"
                  title="WhatsApp पर शेयर करें"
                >
                  <i className="fa-brands fa-whatsapp text-xs"></i>
                </a>
                <a
                  href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition"
                  title="Facebook पर शेयर करें"
                >
                  <i className="fa-brands fa-facebook-f text-xs"></i>
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(currentUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-black hover:bg-gray-800 text-white flex items-center justify-center transition"
                  title="Twitter पर शेयर करें"
                >
                  <i className="fa-brands fa-x-twitter text-xs"></i>
                </a>
              </div>
            </div>

            {/* Featured Image */}
            <div className="rounded-xl overflow-hidden mb-6 bg-gray-100 aspect-16/10">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Full Story Content */}
            <div className="space-y-4 text-gray-800 text-base sm:text-lg leading-relaxed">
              <p className="font-semibold text-gray-900 border-l-4 border-[#d60000] pl-3 py-1 bg-red-50/50 rounded-r">
                {article.description}
              </p>

              <p>
                <strong>राज्य ब्यूरो:</strong> संबंधित क्षेत्र में इस विषय को लेकर प्रशासनिक स्तर पर भी बैठकों का दौर जारी है। सक्षम अधिकारियों ने आवश्यक दिशा-निर्देश जारी करते हुए व्यवस्थाओं को और अधिक सुदृढ़ बनाने के निर्देश दिए हैं।
              </p>

              {/* In-article highlight box */}
              <div className="my-6 p-4 rounded-xl bg-amber-50 border border-amber-200">
                <h4 className="text-sm font-bold text-amber-900 flex items-center gap-2 mb-1">
                  <i className="fa-solid fa-circle-info text-amber-600"></i>
                  विशेष बिंदु:
                </h4>
                <ul className="list-disc list-inside text-xs sm:text-sm text-amber-950 space-y-1">
                  <li>Shoonysesikhar की टीम ग्राउंड जीरो पर लगातार मौजूद रहकर स्थिति पर नजर बनाए हुए है।</li>
                  <li>जनता की समस्याओं को प्रशासन तक पहुँचाने के लिए हमारा नेटवर्क सक्रिय है।</li>
                  <li>नई अपडेट्स के लिए पाठक हमारे आधिकारिक WhatsApp चैनल से निरंतर जुड़े रहें।</li>
                </ul>
              </div>

              <p>
                स्थानीय नागरिकों का कहना है कि समाचार पत्र द्वारा इस मुद्दे को प्रमुखता से उठाए जाने से शासन-प्रशासन की सक्रियता बढ़ी है। आगामी दिनों में इस दिशा में और महत्वपूर्ण फैसले आने की उम्मीद है।
              </p>

              <p>
                Shoonysesikhar (शून्य से शिखर) समाचार पत्र अपने पाठकों से अपील करता है कि किसी भी प्रकार की अफवाह पर ध्यान न दें और केवल प्रमाणित खबरों पर ही विश्वास करें।
              </p>
            </div>

            {/* Tags Strip */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-8 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-gray-500 mr-1">टैग्स:</span>
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Bottom Sharing Bar */}
            <div className="mt-6 p-4 rounded-xl bg-gray-50 border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs font-bold text-gray-700">
                इस खबर को अपने दोस्तों और ग्रुप में शेयर करें:
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(article.title + ' ' + currentUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-[#25D366] text-white text-xs font-bold px-3 py-2 rounded-lg hover:bg-[#20bd5a] transition"
                >
                  <i className="fa-brands fa-whatsapp text-sm"></i> WhatsApp
                </a>
                <button
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1.5 bg-gray-800 text-white text-xs font-bold px-3 py-2 rounded-lg hover:bg-black transition"
                >
                  <i className="fa-solid fa-copy text-xs"></i>
                  {copied ? 'लिंक कॉपी हो गया!' : 'लिंक कॉपी'}
                </button>
              </div>
            </div>

            {/* Related News Section */}
            {relatedNews.length > 0 && (
              <div className="mt-10 pt-6 border-t-2 border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-5 bg-[#d60000] rounded-full"></div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {article.category} से जुड़ी अन्य खबरें
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedNews.map((rel) => (
                    <NewsCard key={rel.id} article={rel} variant="featured" />
                  ))}
                </div>
              </div>
            )}
          </main>

          {/* Right Sidebar (4 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* WhatsApp Card */}
            <div className="bg-[#075E54] text-white rounded-xl p-4 shadow-xs">
              <div className="flex items-center gap-2 text-emerald-200 text-xs font-bold mb-1">
                <i className="fa-brands fa-whatsapp text-lg text-green-400"></i>
                <span>Shoonysesikhar</span>
              </div>
              <h4 className="text-sm font-bold mb-2">व्हाट्सएप पर तुरंत जुड़ें</h4>
              <p className="text-xs text-emerald-100 mb-3 leading-relaxed">
                रोजाना सभी राज्यों की ताजा खबरें, ब्रेकिंग अपडेट और ई-पेपर सीधे अपने फोन पर पाएं।
              </p>
              <a
                href="https://wa.me/917800076067"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-white text-[#075E54] font-bold text-xs py-2 rounded-lg shadow-sm hover:bg-emerald-50 transition"
              >
                WhatsApp: 7800076067
              </a>
            </div>

            {/* Trending News Widget */}
            <div className="bg-white rounded-xl shadow-xs border border-gray-200 overflow-hidden">
              <div className="bg-[#d60000] text-white px-4 py-2.5 flex items-center justify-between">
                <h3 className="text-sm font-bold flex items-center gap-2">
                  <i className="fa-solid fa-fire text-amber-300"></i>
                  सर्वाधिक पढ़ी गई खबरें
                </h3>
              </div>
              <div className="p-3 divide-y divide-gray-100">
                {trendingNews.map((item, idx) => (
                  <Link
                    key={item.id}
                    to={news[idx] ? `/news/${news[idx].id}` : '/'}
                    className="flex items-start gap-3 py-2.5 group"
                  >
                    <span className="w-5 h-5 rounded-full bg-red-100 text-[#d60000] font-black text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <h4 className="text-xs font-bold text-gray-800 group-hover:text-[#d60000] transition line-clamp-2 leading-snug">
                      {item.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>

            {/* YouTube Widget */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-xs">
              <h4 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                <i className="fa-brands fa-youtube text-red-600"></i>
                हमारा यूट्यूब चैनल
              </h4>
              <p className="text-xs text-gray-500 mb-3">
                ताजा वीडियो और लाइव रिपोर्ट देखने के लिए सब्सक्राइब करें।
              </p>
              <a
                href="https://youtube.com/watch?v=sloN6AFMpes"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-2 rounded-lg transition"
              >
                चैनल पर जाएं ↗
              </a>
            </div>

            {/* Sidebar Ad Banner */}
            <AdBanner slot="sidebar" />
          </aside>
        </div>
      </div>
    </div>
  );
}
