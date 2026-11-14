import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { news, states, trendingNews } from '../data/news';
import NewsCard from '../components/NewsCard';
import BreakingTicker from '../components/BreakingTicker';
import AdBanner from '../components/AdBanner';
import YouTubeSyncModal from '../components/YouTubeSyncModal';
import {
  getSavedVideos,
  getPlayerEmbedUrl,
  YOUTUBE_CHANNEL_HANDLE,
  YOUTUBE_CHANNEL_URL,
  YOUTUBE_SUBSCRIBE_URL,
  YOUTUBE_UPLOADS_PLAYLIST_ID
} from '../services/youtube';

export default function Home() {
  const [selectedState, setSelectedState] = useState('सभी');
  const [videoList, setVideoList] = useState(getSavedVideos);
  const [activeVideoId, setActiveVideoId] = useState(videoList[0]?.id || 'JMtcOSyvHy4');
  const [autoStreamMode, setAutoStreamMode] = useState(true);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);

  // Sync state if storage changes
  useEffect(() => {
    const handleStorage = () => setVideoList(getSavedVideos());
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Filter news for regional section
  const regionalNews =
    selectedState === 'सभी'
      ? news
      : news.filter((n) => n.state === selectedState);

  // Grouped news
  const leadArticle = news.find((n) => n.isLead) || news[0];
  const subLeadArticles = news.filter((n) => n.featured && n.id !== leadArticle.id).slice(0, 2);
  const rajneetiNews = news.filter((n) => n.category === 'राजनीति').slice(0, 4);
  const apradhNews = news.filter((n) => n.category === 'अपराध').slice(0, 4);
  const sarkariNews = news.filter((n) => n.category === 'सरकारी योजना').slice(0, 4);
  const otherNews = news.filter((n) => ['खेल', 'मनोरंजन', 'व्यापार', 'धर्म'].includes(n.category)).slice(0, 4);

  return (
    <div className="bg-[#f1f5f9] min-h-screen">
      {/* 1. Breaking News Ticker */}
      <BreakingTicker />

      <main className="max-w-7xl mx-auto px-4 py-4 sm:py-6 space-y-8">
        {/* Top 728x90 Leaderboard Ad */}
        <div className="hidden sm:block">
          <AdBanner slot="top" />
        </div>

        {/* 2. MAIN HERO SECTION (UPTV Live 3-Column Split Layout) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (8 cols): Lead Story + 2 Sub-leads */}
          <div className="lg:col-span-8 space-y-6">
            {/* Big Lead News */}
            <NewsCard article={leadArticle} variant="lead" />

            {/* 2 Sub-lead Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {subLeadArticles.map((article) => (
                <NewsCard key={article.id} article={article} variant="featured" />
              ))}
            </div>
          </div>

          {/* Right Column (4 cols): UPTV Live Sidebar Widgets */}
          <div className="lg:col-span-4 space-y-5">
            {/* Widget 1: Trending News / फटाफट 5 */}
            <div className="bg-white rounded-xl shadow-xs border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-[#d60000] to-[#b00000] text-white px-4 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-fire text-amber-300"></i>
                  <h3 className="text-sm font-bold tracking-wide">ट्रेंडिंग न्यूज़ / फटाफट 5</h3>
                </div>
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-medium">लाइव</span>
              </div>
              <div className="p-3 divide-y divide-gray-100">
                {trendingNews.map((item, idx) => (
                  <Link
                    key={item.id}
                    to={news[idx] ? `/news/${news[idx].id}` : '/'}
                    className="flex items-start gap-3 py-3 group first:pt-1 last:pb-1"
                  >
                    <span className="w-6 h-6 rounded-full bg-red-100 text-[#d60000] font-black text-xs flex items-center justify-center shrink-0 group-hover:bg-[#d60000] group-hover:text-white transition">
                      0{idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-gray-800 group-hover:text-[#d60000] transition line-clamp-2 leading-snug">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-3 text-[10px] text-gray-400 mt-1.5">
                        <span className="text-gray-500 font-medium">#{item.category}</span>
                        <span>•</span>
                        <span><i className="fa-regular fa-clock text-[9px] mr-1"></i>{item.time}</span>
                        <span>•</span>
                        <span><i className="fa-regular fa-eye text-[9px] mr-1"></i>{item.views}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Widget 2: WhatsApp Community Join Banner */}
            <div className="bg-gradient-to-br from-[#128C7E] to-[#075E54] text-white rounded-xl p-4 shadow-sm relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 text-white/10 text-8xl">
                <i className="fa-brands fa-whatsapp"></i>
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-emerald-200 text-xs font-bold mb-1">
                  <i className="fa-solid fa-bell"></i>
                  <span>सीधे अपने फोन पर पाएं खबरें</span>
                </div>
                <h4 className="text-base font-bold text-white mb-1.5">
                  Shoonysesikhar के WhatsApp से जुड़ें
                </h4>
                <p className="text-xs text-emerald-100 mb-3.5 leading-relaxed">
                  मध्य प्रदेश, छत्तीसगढ़, गुजरात, राजस्थान और उत्तर प्रदेश की ब्रेकिंग न्यूज़, वीडियो और ई-पेपर सीधे अपने फोन पर पाएं।
                </p>
                <a
                  href="https://wa.me/917800076067"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full bg-white text-[#075E54] font-bold text-xs py-2.5 px-4 rounded-lg shadow-sm hover:bg-emerald-50 transition"
                >
                  <i className="fa-brands fa-whatsapp text-base text-green-600"></i>
                  WhatsApp: 7800076067
                </a>
              </div>
            </div>

            {/* Widget 3: YouTube Channel Live Sync Widget */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-lg">
                    <i className="fa-brands fa-youtube"></i>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 leading-tight">Shoonysesikhar</h4>
                    <p className="text-[11px] text-red-600 font-semibold">{YOUTUBE_CHANNEL_HANDLE}</p>
                  </div>
                </div>
                <span className="flex items-center gap-1 text-[10px] bg-red-50 text-red-600 font-bold px-2 py-0.5 rounded-full border border-red-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 live-pulse"></span>
                  डेली वीडियो
                </span>
              </div>
              <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                दैनिक ग्राउंड रिपोर्ट, अपराध बुलेटिन और लाइव खबरों के लिए हमारा आधिकारिक यूट्यूब चैनल सब्सक्राइब करें।
              </p>
              <div className="flex gap-2">
                <a
                  href={YOUTUBE_SUBSCRIBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 bg-[#d60000] hover:bg-[#b00000] text-white text-xs font-bold py-2 px-3 rounded-lg transition"
                >
                  <i className="fa-brands fa-youtube"></i>
                  Subscribe
                </a>
                <button
                  onClick={() => setIsSyncModalOpen(true)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-xs font-semibold transition"
                  title="ऑटो सिंक सेटिंग्स"
                >
                  <i className="fa-solid fa-gear"></i>
                </button>
              </div>
            </div>

            {/* Widget 4: E-Paper Download Card */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase text-amber-700 bg-amber-200/60 px-2 py-0.5 rounded">
                  दैनिक ई-पेपर
                </span>
                <h4 className="text-sm font-bold text-gray-900 mt-1">आज का डिजिटल अखबार</h4>
                <p className="text-[11px] text-gray-500 mt-0.5">राष्ट्रीय संस्करण — PDF पढ़ें</p>
              </div>
              <Link
                to="/about"
                className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition shrink-0"
              >
                डाउनलोड करें
              </Link>
            </div>

            {/* Widget 5: 300x250 Ad Banner */}
            <AdBanner slot="sidebar" />
          </div>
        </section>

        {/* 3. REGIONAL & DISTRICT NEWS (City Switcher Tabs) */}
        <section className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-200 mb-5">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-6 bg-[#d60000] rounded-full"></div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                राज्य एवं राष्ट्रीय विशेष समाचार
              </h2>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-1.5">
              {states.map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedState(st)}
                  className={`text-xs px-3 py-1.5 rounded-full font-semibold transition ${
                    selectedState === st
                      ? 'bg-[#d60000] text-white shadow-xs'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {regionalNews.slice(0, 8).map((art) => (
              <NewsCard key={art.id} article={art} variant="default" />
            ))}
          </div>
        </section>

        {/* 4. VIDEO BULLETIN SECTION (AUTOMATIC DAILY YOUTUBE STREAM) */}
        <section className="bg-[#111827] text-white rounded-2xl p-4 sm:p-6 shadow-md overflow-hidden">
          {/* Section Header with Live Stream Badges */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-3 border-b border-gray-800">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-red-600 live-pulse"></span>
              <div>
                <h2 className="text-lg sm:text-xl font-black tracking-wide text-white flex items-center gap-2">
                  <i className="fa-brands fa-youtube text-red-500"></i>
                  दैनिक वीडियो बुलेटिन ({YOUTUBE_CHANNEL_HANDLE})
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  यूट्यूब चैनल पर जैसे ही नई वीडियो आती है, यहाँ स्वतः अपडेट होकर दिखाई देती है
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setAutoStreamMode(true)}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                  autoStreamMode
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <i className="fa-solid fa-arrows-rotate"></i>
                ऑटो-स्ट्रीम (ताजा अपलोड्स)
              </button>

              <button
                onClick={() => setIsSyncModalOpen(true)}
                className="bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-semibold px-3 py-1.5 rounded-lg transition flex items-center gap-1"
                title="वीडियो जोड़ें या सिंक करें"
              >
                <i className="fa-solid fa-plus text-red-400"></i>
                नई वीडियो / सिंक
              </button>

              <Link
                to="/videos"
                className="text-xs font-semibold text-red-400 hover:text-red-300 flex items-center gap-1 transition ml-1"
              >
                सभी वीडियो ({videoList.length}) →
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Main Video Player */}
            <div className="lg:col-span-8 bg-black rounded-xl overflow-hidden shadow-lg border border-gray-800">
              <div className="relative aspect-video">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={getPlayerEmbedUrl(activeVideoId, autoStreamMode)}
                  title="शून्य से शिखर वीडियो बुलेटिन"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-4 bg-[#1f2937] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold mb-1">
                    {autoStreamMode ? (
                      <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-white rounded-full live-pulse"></span>
                        ऑटो-प्लेलिस्ट मोड: चैनल की नवीनतम वीडियो चल रही है
                      </span>
                    ) : (
                      <span className="text-red-400 flex items-center gap-1">
                        <i className="fa-solid fa-circle-play"></i>
                        चयनित वीडियो
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white line-clamp-2">
                    {autoStreamMode
                      ? `${videoList[0]?.title || 'शून्य से शिखर दैनिक वीडियो समाचार'} (नवीनतम अपलोड)`
                      : (videoList.find((v) => v.id === activeVideoId)?.title || 'शून्य से शिखर समाचार')}
                  </h3>
                </div>

                <a
                  href={YOUTUBE_SUBSCRIBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition whitespace-nowrap self-start sm:self-center shrink-0 flex items-center gap-1.5"
                >
                  <i className="fa-brands fa-youtube"></i>
                  Subscribe Channel
                </a>
              </div>
            </div>

            {/* Video Playlist Cards (Scrollable List of Real Channel Videos) */}
            <div className="lg:col-span-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                  <i className="fa-solid fa-list-check text-red-500"></i>
                  दैनिक अपलोड्स सूची ({videoList.length}):
                </p>
                <span className="text-[10px] text-gray-400">क्लिक कर चलाएं</span>
              </div>

              <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
                {videoList.slice(0, 10).map((vid) => {
                  const isCurrent = !autoStreamMode && vid.id === activeVideoId;
                  return (
                    <button
                      key={vid.id}
                      onClick={() => {
                        setActiveVideoId(vid.id);
                        setAutoStreamMode(false);
                      }}
                      className={`w-full text-left flex gap-2.5 p-2 rounded-xl border transition ${
                        isCurrent
                          ? 'bg-red-950/60 border-red-500 shadow-md ring-1 ring-red-500'
                          : 'bg-gray-800/60 border-gray-700/60 hover:bg-gray-800'
                      }`}
                    >
                      <div className="relative w-24 h-15 rounded-lg overflow-hidden shrink-0 bg-black flex items-center justify-center">
                        <img
                          src={vid.thumbnail || `https://i.ytimg.com/vi/${vid.id}/hqdefault.jpg`}
                          alt={vid.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                          <i className={`fa-solid fa-play text-xs ${isCurrent ? 'text-red-500 scale-125' : 'text-white'}`}></i>
                        </div>
                        {vid.duration && (
                          <span className="absolute bottom-1 right-1 text-[8px] bg-black/80 text-white px-1 rounded font-bold">
                            {vid.duration}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-gray-200 line-clamp-2 leading-snug">
                          {vid.title}
                        </h4>
                        <div className="flex items-center justify-between text-[10px] text-gray-400 mt-1">
                          <span className="text-red-400 font-medium">#{vid.category || 'वीडियो'}</span>
                          <span>{vid.date}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 flex items-center justify-between">
                <a
                  href={YOUTUBE_CHANNEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-red-400 hover:text-red-300 font-semibold flex items-center gap-1"
                >
                  <i className="fa-brands fa-youtube"></i>
                  YouTube पर सभी वीडियो ↗
                </a>
                <button
                  onClick={() => setIsSyncModalOpen(true)}
                  className="text-xs text-gray-400 hover:text-white"
                >
                  + वीडियो जोड़ें
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 5. POLITICS & CRIME SECTION (2-Column Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Politics (राजनीति) */}
          <section className="bg-white rounded-xl p-4 sm:p-5 border border-gray-200 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b-2 border-gray-100 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-blue-700 rounded-sm"></span>
                <h3 className="text-base sm:text-lg font-bold text-gray-900">राजनीति (Politics)</h3>
              </div>
              <Link
                to="/category/राजनीति"
                className="text-xs font-bold text-blue-700 hover:underline"
              >
                सभी राजनीति खबरें →
              </Link>
            </div>
            <div className="space-y-3">
              {rajneetiNews.map((item) => (
                <NewsCard key={item.id} article={item} variant="horizontal" />
              ))}
            </div>
          </section>

          {/* Crime (अपराध व कानून व्यवस्था) */}
          <section className="bg-white rounded-xl p-4 sm:p-5 border border-gray-200 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b-2 border-gray-100 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-slate-900 rounded-sm"></span>
                <h3 className="text-base sm:text-lg font-bold text-gray-900">क्राइम बुलेटिन (Crime)</h3>
              </div>
              <Link
                to="/category/अपराध"
                className="text-xs font-bold text-[#d60000] hover:underline"
              >
                सभी अपराध खबरें →
              </Link>
            </div>
            <div className="space-y-3">
              {apradhNews.map((item) => (
                <NewsCard key={item.id} article={item} variant="horizontal" />
              ))}
            </div>
          </section>
        </div>

        {/* 6. GOVT SCHEMES & PUBLIC INTEREST (सरकारी योजनाएं) */}
        <section className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-gray-200 mb-5">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-6 bg-emerald-600 rounded-full"></div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                सरकारी योजनाएं, रोजगार व जनहित
              </h2>
            </div>
            <Link
              to="/category/सरकारी योजना"
              className="text-xs font-bold text-emerald-600 hover:underline"
            >
              सभी योजनाएं देखें →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sarkariNews.map((art) => (
              <NewsCard key={art.id} article={art} variant="default" />
            ))}
          </div>
        </section>

        {/* 7. SPORTS, ENTERTAINMENT & FAITH (अन्य विविध खबरें) */}
        <section className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-gray-200 mb-5">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-6 bg-amber-500 rounded-full"></div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                खेल, मनोरंजन एवं धर्म-संस्कृति
              </h2>
            </div>
            <Link
              to="/category/खेल"
              className="text-xs font-bold text-[#d60000] hover:underline"
            >
              और खबरें देखें →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherNews.map((art) => (
              <NewsCard key={art.id} article={art} variant="default" />
            ))}
          </div>
        </section>
      </main>

      {/* Sync / Add Video Modal */}
      <YouTubeSyncModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        onVideosUpdated={(updated) => {
          setVideoList(updated);
          if (updated.length > 0) setActiveVideoId(updated[0].id);
        }}
      />
    </div>
  );
}
