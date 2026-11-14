import { Link } from 'react-router-dom';
import { breakingNews, news } from '../data/news';

export default function BreakingTicker() {
  return (
    <div className="bg-white border-b border-gray-200 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-stretch">
        {/* Flashing Breaking Badge */}
        <div className="bg-[#d60000] text-white flex items-center gap-2 px-3 sm:px-4 py-2 shrink-0 z-10 shadow-md">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-300 live-pulse inline-block shadow-xs"></span>
          <span className="text-xs sm:text-sm font-black tracking-wider uppercase whitespace-nowrap">
            ब्रेकिंग न्यूज़
          </span>
        </div>

        {/* Scrolling Headlines */}
        <div className="ticker-wrapper flex-1 flex items-center py-2 bg-gray-50/70 overflow-hidden">
          <div className="ticker-content flex items-center text-xs sm:text-sm font-semibold text-gray-800">
            {breakingNews.map((item, idx) => (
              <span key={idx} className="inline-flex items-center mx-4 group cursor-pointer">
                <i className="fa-solid fa-bolt-lightning text-[#d60000] text-[11px] mr-2"></i>
                <Link
                  to={news[idx] ? `/news/${news[idx].id}` : '/'}
                  className="hover:text-[#d60000] transition hover:underline"
                >
                  {item}
                </Link>
                <span className="text-gray-300 ml-4 font-normal">|</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
