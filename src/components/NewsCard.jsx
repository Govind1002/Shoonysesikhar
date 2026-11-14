import { Link } from 'react-router-dom';

const categoryBadges = {
  'उत्तर प्रदेश': 'bg-[#d60000]',
  'मध्य प्रदेश': 'bg-blue-600',
  'छत्तीसगढ़': 'bg-emerald-600',
  'गुजरात': 'bg-amber-600',
  'राजस्थान': 'bg-rose-700',
  'राजनीति': 'bg-blue-700',
  'अपराध': 'bg-slate-900',
  'सरकारी योजना': 'bg-emerald-700',
  'खेल': 'bg-orange-600',
  'मनोरंजन': 'bg-purple-600',
  'स्वास्थ्य': 'bg-teal-600',
  'शिक्षा': 'bg-indigo-600',
  'व्यापार': 'bg-cyan-700',
  'धर्म': 'bg-red-800'
};

export default function NewsCard({ article, variant = 'default' }) {
  if (!article) return null;

  const badgeColor = categoryBadges[article.category] || 'bg-[#d60000]';

  // 1. LEAD STORY (Big Hero Card)
  if (variant === 'lead') {
    return (
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-gray-200 transition-all group">
        <Link to={`/news/${article.id}`} className="block relative img-scale-hover aspect-video sm:aspect-21/9 max-h-96">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
          
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className={`text-white text-xs font-bold px-2.5 py-1 rounded shadow-sm ${badgeColor}`}>
              {article.category}
            </span>
            <span className="bg-red-600/90 text-white text-[11px] font-semibold px-2 py-0.5 rounded backdrop-blur-xs">
              <i className="fa-solid fa-star text-amber-300 mr-1"></i> मुख्य समाचार
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
            <h2 className="text-lg sm:text-2xl md:text-3xl font-extrabold leading-tight text-white group-hover:text-red-300 transition-colors line-clamp-3">
              {article.title}
            </h2>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-gray-300 mt-2.5">
              <span className="flex items-center gap-1.5">
                <i className="fa-regular fa-clock text-red-400"></i>
                {article.timeAgo || article.date}
              </span>
              <span className="flex items-center gap-1.5">
                <i className="fa-regular fa-user text-red-400"></i>
                {article.author}
              </span>
              <span className="flex items-center gap-1.5">
                <i className="fa-solid fa-location-dot text-red-400"></i>
                {article.state}
              </span>
            </div>
          </div>
        </Link>
        
        <div className="p-4 sm:p-5 bg-white">
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed line-clamp-3">
            {article.description}
          </p>
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 text-xs">
            <Link
              to={`/news/${article.id}`}
              className="inline-flex items-center gap-1 text-[#d60000] font-bold hover:underline"
            >
              पूरी खबर पढ़ें <i className="fa-solid fa-arrow-right text-[11px]"></i>
            </Link>
            <div className="flex items-center gap-2 text-gray-400">
              <span>शेयर करें:</span>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(article.title + ' ' + window.location.origin + '/news/' + article.id)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition"
                title="WhatsApp पर शेयर करें"
              >
                <i className="fa-brands fa-whatsapp text-xs"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. HORIZONTAL LIST CARD (For Sidebars / Compact lists)
  if (variant === 'horizontal') {
    return (
      <Link
        to={`/news/${article.id}`}
        className="group flex gap-3 p-2.5 bg-white rounded-lg border border-gray-100 hover:border-gray-300 hover:shadow-xs transition"
      >
        <div className="relative w-24 sm:w-28 h-20 shrink-0 rounded-md overflow-hidden img-scale-hover bg-gray-100">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <span className={`inline-block text-[10px] font-bold text-white px-1.5 py-0.5 rounded ${badgeColor}`}>
              {article.category}
            </span>
            <h4 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-[#d60000] transition line-clamp-2 mt-1 leading-snug">
              {article.title}
            </h4>
          </div>
          <p className="text-[11px] text-gray-400 flex items-center gap-1 mt-1">
            <i className="fa-regular fa-clock text-gray-400 text-[10px]"></i>
            {article.timeAgo || article.date}
          </p>
        </div>
      </Link>
    );
  }

  // 3. FEATURED MEDIUM CARD (Sub-lead stories)
  if (variant === 'featured') {
    return (
      <Link
        to={`/news/${article.id}`}
        className="group block bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition h-full flex flex-col"
      >
        <div className="relative aspect-16/10 overflow-hidden img-scale-hover bg-gray-100">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <span className={`absolute top-2 left-2 text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-xs ${badgeColor}`}>
            {article.category}
          </span>
        </div>
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-[#d60000] transition leading-snug line-clamp-2">
              {article.title}
            </h3>
            <p className="text-gray-500 text-xs mt-2 line-clamp-2 leading-relaxed">
              {article.description}
            </p>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-400 mt-3 pt-2 border-t border-gray-100">
            <span className="flex items-center gap-1">
              <i className="fa-regular fa-clock text-[11px]"></i>
              {article.timeAgo || article.date}
            </span>
            <span className="text-[#d60000] font-semibold group-hover:underline">पढ़ें →</span>
          </div>
        </div>
      </Link>
    );
  }

  // 4. DEFAULT STANDARD CARD (Grid layout)
  return (
    <Link
      to={`/news/${article.id}`}
      className="group block bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition h-full flex flex-col news-card-hover"
    >
      <div className="relative aspect-16/10 overflow-hidden img-scale-hover bg-gray-100">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <span className={`absolute top-2 left-2 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs ${badgeColor}`}>
          {article.category}
        </span>
      </div>
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-[#d60000] transition leading-snug line-clamp-2 mb-1.5">
            {article.title}
          </h3>
          <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed mb-2">
            {article.description}
          </p>
        </div>
        <div>
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {article.tags.slice(0, 2).map((t) => (
                <span key={t} className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                  #{t}
                </span>
              ))}
            </div>
          )}
          <div className="flex items-center justify-between text-[11px] text-gray-400 pt-2 border-t border-gray-100">
            <span className="flex items-center gap-1">
              <i className="fa-regular fa-clock text-[10px]"></i>
              {article.timeAgo || article.date}
            </span>
            <span className="text-gray-500 font-medium">{article.state || 'राष्ट्रीय'}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
