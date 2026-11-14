import { useState, useEffect } from 'react';
import YouTubeSyncModal from '../components/YouTubeSyncModal';
import {
  getSavedVideos,
  getPlayerEmbedUrl,
  YOUTUBE_CHANNEL_HANDLE,
  YOUTUBE_CHANNEL_NAME,
  YOUTUBE_CHANNEL_URL,
  YOUTUBE_SUBSCRIBE_URL,
  YOUTUBE_UPLOADS_PLAYLIST_ID
} from '../services/youtube';

export default function Videos() {
  const [videoList, setVideoList] = useState(getSavedVideos);
  const [selectedVideo, setSelectedVideo] = useState(videoList[0] || { id: 'JMtcOSyvHy4' });
  const [autoStreamMode, setAutoStreamMode] = useState(true);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('सभी');

  useEffect(() => {
    const handleStorage = () => setVideoList(getSavedVideos());
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const categories = ['सभी', 'मध्य प्रदेश', 'छत्तीसगढ़', 'गुजरात', 'राजस्थान', 'उत्तर प्रदेश', 'ग्राउंड रिपोर्ट', 'क्राइम बुलेटिन', 'धर्म-संस्कृति', 'हादसा'];

  const filteredVideos = videoList.filter((vid) => {
    const matchesSearch = vid.title.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesCat = selectedCategory === 'सभी' || vid.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="bg-[#0f172a] text-white min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        {/* Channel Branding & Subscription Bar */}
        <div className="bg-[#1e293b] rounded-2xl p-4 sm:p-6 border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-red-700 to-red-500 flex items-center justify-center text-white text-3xl shadow-lg shrink-0">
              <i className="fa-brands fa-youtube"></i>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-white">
                  {YOUTUBE_CHANNEL_NAME}
                </h1>
                <span className="bg-red-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                  {YOUTUBE_CHANNEL_HANDLE}
                </span>
                <span className="flex items-center gap-1 text-[11px] bg-emerald-950 text-emerald-400 font-bold px-2.5 py-0.5 rounded-full border border-emerald-800">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 live-pulse"></span>
                  ऑटो-अपडेट सक्रिय
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                आधिकारिक डिजिटल समाचार एवं वीडियो प्रसारण नेटवर्क | मध्य प्रदेश, छत्तीसगढ़, गुजरात, राजस्थान व उत्तर प्रदेश
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setIsSyncModalOpen(true)}
              className="bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-semibold px-4 py-2.5 rounded-xl border border-gray-700 transition flex items-center gap-2"
            >
              <i className="fa-solid fa-plus text-red-400"></i>
              नई वीडियो जोड़ें / सिंक
            </button>
            <a
              href={YOUTUBE_SUBSCRIBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl shadow-md transition"
            >
              <i className="fa-brands fa-youtube text-base"></i>
              चैनल Subscribe करें
            </a>
          </div>
        </div>

        {/* Featured Live Video Player */}
        <div className="bg-black rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
          <div className="relative aspect-video max-h-[580px] w-full">
            <iframe
              className="absolute inset-0 w-full h-full"
              src={getPlayerEmbedUrl(selectedVideo.id, autoStreamMode)}
              title="शून्य से शिखर वीडियो समाचार"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="p-4 sm:p-6 bg-[#1e293b] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                {autoStreamMode ? (
                  <span className="text-xs bg-red-600 text-white font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white live-pulse"></span>
                    ऑटो-स्ट्रीम: चैनल पर अपलोड हुआ सबसे नया वीडियो
                  </span>
                ) : (
                  <span className="text-xs bg-gray-700 text-gray-200 font-bold px-2.5 py-0.5 rounded">
                    {selectedVideo.category || 'वीडियो समाचार'}
                  </span>
                )}
                <span className="text-xs text-gray-400">
                  {selectedVideo.date || 'हालिया अपलोड'}
                </span>
              </div>
              <h2 className="text-base sm:text-xl font-bold text-white">
                {autoStreamMode
                  ? `${videoList[0]?.title || 'दैनिक वीडियो बुलेटिन'} (ऑटो-अपडेटेड)`
                  : selectedVideo.title}
              </h2>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setAutoStreamMode(!autoStreamMode)}
                className={`text-xs font-bold px-3 py-2 rounded-lg transition flex items-center gap-1.5 ${
                  autoStreamMode
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <i className="fa-solid fa-arrows-rotate"></i>
                {autoStreamMode ? 'ऑटो मोड सक्रिय' : 'ऑटो मोड चालू करें'}
              </button>
              <a
                href={autoStreamMode ? YOUTUBE_CHANNEL_URL : `https://youtube.com/watch?v=${selectedVideo.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-gray-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition flex items-center gap-1"
              >
                YouTube ↗
              </a>
            </div>
          </div>
        </div>

        {/* Video Gallery with Search & Filters */}
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-800">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <i className="fa-solid fa-photo-film text-red-500"></i>
                दैनिक ग्राउंड रिपोर्ट एवं वीडियो गैलरी
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                कुल {videoList.length} वीडियो उपलब्ध • चैनल {YOUTUBE_CHANNEL_HANDLE} से लाइव
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="वीडियो खोजें (उदा. भोपाल, रायपुर, जयपुर, अहमदाबाद, लखनऊ)..."
                className="w-full bg-[#1e293b] border border-gray-700 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition ${
                  selectedCategory === c
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Videos Grid */}
          {filteredVideos.length === 0 ? (
            <div className="bg-[#1e293b] rounded-2xl p-12 text-center border border-gray-800">
              <i className="fa-solid fa-video-slash text-4xl text-gray-600 mb-2"></i>
              <p className="text-gray-400 text-sm">इस खोज के लिए कोई वीडियो नहीं मिला।</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredVideos.map((vid) => {
                const isSelected = !autoStreamMode && vid.id === selectedVideo.id;
                return (
                  <div
                    key={vid.id}
                    onClick={() => {
                      setSelectedVideo(vid);
                      setAutoStreamMode(false);
                      window.scrollTo({ top: 120, behavior: 'smooth' });
                    }}
                    className={`bg-[#1e293b] rounded-xl overflow-hidden border cursor-pointer group hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between ${
                      isSelected
                        ? 'border-red-500 ring-2 ring-red-500/50 shadow-xl'
                        : 'border-gray-800 hover:border-gray-700'
                    }`}
                  >
                    <div className="relative aspect-video bg-black overflow-hidden">
                      <img
                        src={vid.thumbnail || `https://i.ytimg.com/vi/${vid.id}/hqdefault.jpg`}
                        alt={vid.title}
                        className="w-full h-full object-cover group-hover:opacity-90 transition"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition">
                        <div className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                          <i className="fa-solid fa-play text-sm ml-0.5"></i>
                        </div>
                      </div>
                      {vid.duration && (
                        <span className="absolute bottom-2 right-2 text-[10px] bg-black/80 font-bold text-white px-2 py-0.5 rounded">
                          {vid.duration}
                        </span>
                      )}
                      <span className="absolute top-2 left-2 text-[10px] bg-[#d60000] font-bold text-white px-2 py-0.5 rounded shadow">
                        {vid.category || 'कवरेज'}
                      </span>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <h4 className="text-sm font-bold text-gray-100 group-hover:text-red-400 transition line-clamp-2 leading-snug">
                        {vid.title}
                      </h4>
                      <div className="flex items-center justify-between text-xs text-gray-400 mt-3 pt-2 border-t border-gray-700/50">
                        <span>{vid.date}</span>
                        <span className="text-red-400 font-semibold group-hover:underline flex items-center gap-1">
                          चलाएं <i className="fa-solid fa-play text-[9px]"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Sync / Add Video Modal */}
      <YouTubeSyncModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        onVideosUpdated={(updated) => {
          setVideoList(updated);
          if (updated.length > 0) setSelectedVideo(updated[0]);
        }}
      />
    </div>
  );
}
