import { useState } from 'react';
import {
  YOUTUBE_CHANNEL_HANDLE,
  YOUTUBE_UPLOADS_PLAYLIST_ID,
  YOUTUBE_CHANNEL_URL,
  addVideoToList,
  syncWithYouTubeAPI
} from '../services/youtube';

export default function YouTubeSyncModal({ isOpen, onClose, onVideosUpdated }) {
  const [videoUrl, setVideoUrl] = useState('');
  const [category, setCategory] = useState('ताजा खबर');
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('shunya_youtube_api_key') || '');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  if (!isOpen) return null;

  const handleAddVideo = async (e) => {
    e.preventDefault();
    if (!videoUrl.trim()) return;
    setLoading(true);
    setMsg(null);
    try {
      const updated = await addVideoToList(videoUrl.trim(), category);
      setMsg({ type: 'success', text: 'वीडियो सफलतापूर्वक जुड़ गया और वेबसाइट पर लाइव हो गया!' });
      setVideoUrl('');
      if (onVideosUpdated) onVideosUpdated(updated);
    } catch (err) {
      setMsg({ type: 'error', text: err.message || 'वीडियो जोड़ने में विफल' });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveApiKey = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      if (apiKey.trim()) {
        localStorage.setItem('shunya_youtube_api_key', apiKey.trim());
        const fetched = await syncWithYouTubeAPI(apiKey.trim());
        if (fetched && onVideosUpdated) onVideosUpdated(fetched);
        setMsg({ type: 'success', text: `API Key सेव हो गई! ${fetched?.length || 0} वीडियो स्वतः सिंक हो गए!` });
      } else {
        localStorage.removeItem('shunya_youtube_api_key');
        setMsg({ type: 'info', text: 'API Key हटा दी गई।' });
      }
    } catch (err) {
      setMsg({ type: 'error', text: 'API Key से सिंक नहीं हो सका। कृपया जांचें कि Key वैध है।' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-[#1e293b] text-white rounded-2xl max-w-lg w-full border border-gray-700 shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="bg-[#0f172a] px-6 py-4 flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white text-lg">
              <i className="fa-brands fa-youtube"></i>
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                यूट्यूब ऑटो-सिंक सेटिंग्स
              </h3>
              <p className="text-xs text-red-400 font-medium">{YOUTUBE_CHANNEL_HANDLE} (दैनिक अपलोड्स)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-800 text-gray-400 hover:text-white flex items-center justify-center transition"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {msg && (
            <div
              className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                msg.type === 'success'
                  ? 'bg-emerald-950/80 border border-emerald-600 text-emerald-300'
                  : msg.type === 'error'
                  ? 'bg-red-950/80 border border-red-600 text-red-300'
                  : 'bg-blue-950/80 border border-blue-600 text-blue-300'
              }`}
            >
              <i className={`fa-solid ${msg.type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}`}></i>
              <span>{msg.text}</span>
            </div>
          )}

          {/* Section 1: Built-in Auto Playlist Info */}
          <div className="bg-[#0f172a] p-4 rounded-xl border border-gray-800">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 live-pulse"></span>
              स्वचालित डेली वीडियो मोड (पहले से सक्रिय)
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              वेबसाइट का मुख्य प्लेयर YouTube की ऑफिशियल <strong>Uploads Playlist</strong> (<code className="text-red-400">{YOUTUBE_UPLOADS_PLAYLIST_ID}</code>) से सीधे जुड़ा है। जैसे ही आप चैनल पर नई वीडियो अपलोड करते हैं, प्लेयर में वह वीडियो बिना किसी कोड बदलाव के <strong>अपने आप सबसे ऊपर</strong> आ जाती है।
            </p>
          </div>

          {/* Section 2: Quick Add Single Video */}
          <form onSubmit={handleAddVideo} className="space-y-3 bg-[#0f172a] p-4 rounded-xl border border-gray-800">
            <h4 className="text-xs font-bold text-gray-200 uppercase tracking-wider flex items-center gap-2">
              <i className="fa-solid fa-plus text-red-500"></i>
              नई वीडियो तुरंत जोड़ें (1-क्लिक)
            </h4>
            <p className="text-[11px] text-gray-400">
              यूट्यूब से नई वीडियो का लिंक यहाँ पेस्ट करें, उसका टाइटल व थंबनेल अपने-आप आ जाएगा:
            </p>
            <div className="space-y-2">
              <input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="उदा. https://youtube.com/watch?v=JMtcOSyvHy4"
                className="w-full bg-[#1e293b] border border-gray-700 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
              />
              <div className="flex gap-2">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="bg-[#1e293b] border border-gray-700 rounded-lg px-3 py-1.5 text-xs text-gray-300 focus:outline-none"
                >
                  <option value="ताजा खबर">ताजा खबर</option>
                  <option value="मध्य प्रदेश">मध्य प्रदेश</option>
                  <option value="छत्तीसगढ़">छत्तीसगढ़</option>
                  <option value="गुजरात">गुजरात</option>
                  <option value="राजस्थान">राजस्थान</option>
                  <option value="उत्तर प्रदेश">उत्तर प्रदेश</option>
                  <option value="क्राइम बुलेटिन">क्राइम बुलेटिन</option>
                  <option value="ग्राउंड रिपोर्ट">ग्राउंड रिपोर्ट</option>
                  <option value="धर्म-संस्कृति">धर्म-संस्कृति</option>
                </select>
                <button
                  type="submit"
                  disabled={loading || !videoUrl.trim()}
                  className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold text-xs py-2 px-4 rounded-lg transition flex items-center justify-center gap-2"
                >
                  {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-cloud-arrow-up"></i>}
                  वीडियो लाइव करें
                </button>
              </div>
            </div>
          </form>

          {/* Section 3: Optional YouTube Data API v3 Key */}
          <form onSubmit={handleSaveApiKey} className="space-y-3 bg-[#0f172a] p-4 rounded-xl border border-gray-800">
            <h4 className="text-xs font-bold text-gray-200 uppercase tracking-wider flex items-center gap-2">
              <i className="fa-solid fa-key text-amber-400"></i>
              YouTube Data API Key (वैकल्पिक ऑटो-सिंक)
            </h4>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              Google Cloud Console से निशुल्क YouTube Data API v3 Key डालने पर पूरी वीडियो ग्रिड अपने-आप हर घंटे रिफ्रेश होती रहेगी:
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="flex-1 bg-[#1e293b] border border-gray-700 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs py-2 px-4 rounded-lg transition whitespace-nowrap"
              >
                सिंक करें
              </button>
            </div>
          </form>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#0f172a] px-6 py-3 border-t border-gray-800 flex items-center justify-between text-xs text-gray-400">
          <a
            href={YOUTUBE_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-400 hover:underline flex items-center gap-1 font-semibold"
          >
            <i className="fa-brands fa-youtube"></i>
            यूट्यूब पर चैनल खोलें ↗
          </a>
          <button
            onClick={onClose}
            className="bg-gray-800 hover:bg-gray-700 text-gray-200 px-4 py-1.5 rounded-lg transition font-medium"
          >
            बंद करें
          </button>
        </div>
      </div>
    </div>
  );
}
