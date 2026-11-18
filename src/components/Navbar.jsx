import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { categories } from '../data/news';
import logoImg from '../assets/logo.png';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hindiDays = ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];
  const hindiMonths = [
    'जनवरी', 'फरवरी', 'मार्च', 'अप्रैल', 'मई', 'जून',
    'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'
  ];

  const dateStr = `${hindiDays[currentTime.getDay()]}, ${currentTime.getDate()} ${hindiMonths[currentTime.getMonth()]} ${currentTime.getFullYear()}`;
  const timeStr = currentTime.toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMenuOpen(false);
      setSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* 1. TOP UTILITY BAR (UPTV Live Style) */}
      <div className="bg-[#111827] text-gray-300 text-xs border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex flex-wrap items-center justify-between gap-2">
          {/* Left: Date, Time & Unnao Weather */}
          <div className="flex items-center gap-3 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 text-gray-200">
              <i className="fa-regular fa-calendar-days text-[#d60000]"></i>
              <span className="font-medium">{dateStr}</span>
            </span>
            <span className="hidden md:inline text-gray-500">|</span>
            <span className="hidden md:flex items-center gap-1 text-gray-300">
              <i className="fa-regular fa-clock text-[#d60000]"></i>
              <span>{timeStr}</span>
            </span>
            <span className="hidden lg:inline text-gray-500">|</span>
            <span className="hidden lg:flex items-center gap-1.5 bg-gray-800/80 px-2 py-0.5 rounded text-amber-400">
              <i className="fa-solid fa-cloud-sun"></i>
              <span>लाइव मौसम 28°C</span>
            </span>
          </div>

          {/* Right: Quick Action Pills & Social Icons */}
          <div className="flex items-center gap-3 ml-auto">
            <Link
              to="/videos"
              className="hidden sm:inline-flex items-center gap-1 bg-[#d60000] hover:bg-[#b00000] text-white px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition"
            >
              <span className="w-1.5 h-1.5 bg-white rounded-full live-pulse"></span>
              लाइव टीवी
            </Link>
            <Link
              to="/about"
              className="hidden sm:inline-flex items-center gap-1 bg-gray-800 hover:bg-gray-700 text-gray-200 px-2 py-0.5 rounded text-[11px] transition"
            >
              <i className="fa-solid fa-newspaper text-amber-400"></i>
              ई-पेपर
            </Link>

            {/* Social Icons */}
            <div className="flex items-center gap-2 border-l border-gray-700 pl-2">
              <a
                href="https://www.youtube.com/@Shoonyseshikharnews"
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 flex items-center justify-center rounded bg-red-600 hover:bg-red-700 text-white transition text-[11px]"
                title="YouTube Channel (@Shoonyseshikharnews)"
              >
                <i className="fa-brands fa-youtube"></i>
              </a>
              <a
                href="https://wa.me/917800076067"
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 flex items-center justify-center rounded bg-green-600 hover:bg-green-700 text-white transition text-[11px]"
                title="WhatsApp (7800076067)"
              >
                <i className="fa-brands fa-whatsapp"></i>
              </a>
              <a
                href="https://www.facebook.com/share/1bnDaDncxd/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 flex items-center justify-center rounded bg-blue-600 hover:bg-blue-700 text-white transition text-[11px]"
                title="Facebook"
              >
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a
                href="https://x.com/shoonyseshikhar"
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 flex items-center justify-center rounded bg-black hover:bg-gray-800 text-white transition text-[11px]"
                title="X / Twitter"
              >
                <i className="fa-brands fa-x-twitter"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN BRAND HEADER */}
      <div className="bg-white border-b border-gray-200 py-2.5">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4">
          {/* Logo & Brand Identity */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <div className="relative p-1 bg-white rounded-lg shadow-sm border border-gray-100 group-hover:border-red-300 transition">
              <img
                src={logoImg}
                alt="Shoonysesikhar (शून्य से शिखर)"
                className="h-14 sm:h-16 w-auto object-contain rounded"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight leading-none group-hover:text-[#d60000] transition">
                  Shoonysesikhar
                </span>
                <span className="bg-[#d60000] text-white text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
                  Live
                </span>
              </div>
              <span className="text-[11px] text-gray-600 font-semibold tracking-wider mt-0.5">
                शून्य से शिखर — राष्ट्रीय हिंदी समाचार पत्र
              </span>
              <span className="text-[10px] text-[#d60000] italic font-medium">
                "सत्य की खोज जनता की आवाज"
              </span>
            </div>
          </Link>

          {/* Center/Right 728x90 Leaderboard Ad / Promotion banner (Desktop) */}
          <div className="hidden lg:flex flex-1 max-w-xl mx-4">
            <div className="w-full h-16 border border-dashed border-gray-300 rounded-lg bg-gray-50 flex items-center justify-between px-4 py-2 hover:bg-red-50/50 transition">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 text-[#d60000] flex items-center justify-center font-bold text-lg">
                  <i className="fa-solid fa-bullhorn"></i>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-800">विज्ञापन स्थान उपलब्ध (728 × 90)</p>
                  <p className="text-[11px] text-gray-500">व्यापारिक प्रचार हेतु संपर्क करें: +91 7800076067</p>
                </div>
              </div>
              <a
                href="https://wa.me/917800076067"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#d60000] hover:bg-[#b00000] text-white text-xs font-semibold px-3 py-1.5 rounded transition"
              >
                संपर्क करें
              </a>
            </div>
          </div>

          {/* Mobile Right Controls: Search button & Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:text-[#d60000] transition"
              aria-label="खोजें"
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#d60000] text-white hover:bg-[#b00000] transition"
              aria-label="मेनू खोलें"
            >
              <i className={`fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'} text-lg`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Search Input Collapse */}
        {searchOpen && (
          <div className="lg:hidden px-4 pt-2 pb-1 border-t border-gray-100 bg-gray-50">
            <form onSubmit={handleSearchSubmit} className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="खबर या कीवर्ड खोजें..."
                className="flex-1 text-sm border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:border-[#d60000]"
                autoFocus
              />
              <button
                type="submit"
                className="bg-[#d60000] text-white px-4 py-1.5 rounded-md text-sm font-semibold hover:bg-[#b00000]"
              >
                खोजें
              </button>
            </form>
          </div>
        )}
      </div>

      {/* 3. MAIN RED NAVIGATION BAR (UPTV Live Signature Style) */}
      <nav className="bg-[#d60000] text-white shadow-inner">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* Desktop Categories List */}
          <ul className="hidden lg:flex items-center overflow-x-auto whitespace-nowrap scrollbar-none py-0">
            <li>
              <Link
                to="/"
                className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 text-sm font-bold tracking-wide transition border-b-2 ${
                  location.pathname === '/'
                    ? 'bg-[#a40000] border-white text-white'
                    : 'border-transparent hover:bg-[#b00000] text-gray-100'
                }`}
              >
                <i className="fa-solid fa-house text-xs"></i>
                होम
              </Link>
            </li>
            {categories.map((cat) => {
              const isActive = location.pathname === `/category/${encodeURIComponent(cat)}`;
              return (
                <li key={cat}>
                  <Link
                    to={`/category/${encodeURIComponent(cat)}`}
                    className={`inline-block px-3 py-2.5 text-sm font-semibold transition border-b-2 ${
                      isActive
                        ? 'bg-[#a40000] border-white text-white'
                        : 'border-transparent hover:bg-[#b00000] text-gray-100'
                    }`}
                  >
                    {cat}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                to="/videos"
                className={`inline-flex items-center gap-1 px-3 py-2.5 text-sm font-bold transition border-b-2 ${
                  location.pathname === '/videos'
                    ? 'bg-[#a40000] border-white text-white'
                    : 'border-transparent hover:bg-[#b00000] text-amber-300'
                }`}
              >
                <i className="fa-solid fa-play text-xs text-white bg-red-800 p-0.5 rounded-full"></i>
                वीडियो
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`inline-block px-3 py-2.5 text-sm font-semibold transition border-b-2 ${
                  location.pathname === '/about'
                    ? 'bg-[#a40000] border-white text-white'
                    : 'border-transparent hover:bg-[#b00000] text-gray-100'
                }`}
              >
                हमारे बारे में
              </Link>
            </li>
          </ul>

          {/* Desktop Right Search Bar */}
          <div className="hidden lg:flex items-center py-1.5">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ताजा खबर खोजें..."
                className="w-44 focus:w-56 transition-all duration-300 bg-white/15 text-white placeholder-gray-200 text-xs rounded-full pl-3 pr-8 py-1.5 focus:bg-white focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none"
              />
              <button
                type="submit"
                className="absolute right-2 text-gray-200 hover:text-white focus:outline-none"
                aria-label="खोजें"
              >
                <i className="fa-solid fa-magnifying-glass text-xs"></i>
              </button>
            </form>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {menuOpen && (
          <div className="lg:hidden bg-[#a40000] border-t border-red-800 px-4 py-3 text-sm">
            <ul className="grid grid-cols-2 gap-2">
              <li>
                <Link
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded hover:bg-[#850000] text-white font-bold"
                >
                  <i className="fa-solid fa-house text-xs"></i>
                  होम
                </Link>
              </li>
              {categories.map((cat) => (
                <li key={cat}>
                  <Link
                    to={`/category/${encodeURIComponent(cat)}`}
                    onClick={() => setMenuOpen(false)}
                    className="block p-2 rounded hover:bg-[#850000] text-gray-100 font-medium"
                  >
                    • {cat}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/videos"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded hover:bg-[#850000] text-amber-300 font-bold"
                >
                  <i className="fa-solid fa-play text-xs"></i>
                  वीडियो
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  onClick={() => setMenuOpen(false)}
                  className="block p-2 rounded hover:bg-[#850000] text-gray-100 font-medium"
                >
                  • हमारे बारे में
                </Link>
              </li>
            </ul>

            {/* Mobile Social & Actions */}
            <div className="mt-4 pt-3 border-t border-red-800 flex items-center justify-between">
              <a
                href="https://wa.me/917800076067"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full"
              >
                <i className="fa-brands fa-whatsapp text-sm"></i>
                WhatsApp 7800076067
              </a>
              <a
                href="https://www.youtube.com/@Shoonyseshikharnews"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-white text-red-600 text-xs font-bold px-3 py-1.5 rounded-full"
              >
                <i className="fa-brands fa-youtube text-sm"></i>
                यूट्यूब
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
