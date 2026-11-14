import { Link } from 'react-router-dom';
import { categories } from '../data/news';
import logoImg from '../assets/logo.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0f172a] text-gray-300 border-t-4 border-[#d60000] mt-12">
      {/* Upper Footer: Logo & Quick Links */}
      <div className="max-w-7xl mx-auto px-4 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <img
                src={logoImg}
                alt="Shoonysesikhar (शून्य से शिखर)"
                className="h-16 w-auto object-contain rounded bg-white p-1"
              />
              <div>
                <span className="text-xl font-black text-white group-hover:text-red-400 transition leading-none block">
                  Shoonysesikhar
                </span>
                <span className="text-xs text-gray-300 font-semibold block mt-1">
                  शून्य से शिखर — राष्ट्रीय हिंदी समाचार पत्र
                </span>
                <span className="text-[11px] text-[#d60000] font-semibold italic">
                  "सोच नई, पहल नई, रह नई"
                </span>
              </div>
            </Link>

            <p className="text-xs text-gray-400 leading-relaxed">
              Shoonysesikhar (शून्य से शिखर) समाचार पत्र मध्य प्रदेश, छत्तीसगढ़, गुजरात, राजस्थान, उत्तर प्रदेश और पूरे देश का अग्रणी डिजिटल व प्रिंट समाचार माध्यम है। हम निष्पक्ष पत्रकारिता, जमीनी सरोकार और जन-जन की आवाज को प्रमुखता से उठाते हैं।
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href="https://www.youtube.com/@Shoonyseshikharnews"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition text-sm"
                title="YouTube Channel (@Shoonyseshikharnews)"
              >
                <i className="fa-brands fa-youtube"></i>
              </a>
              <a
                href="https://wa.me/917800076067"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded bg-green-600 hover:bg-green-700 text-white flex items-center justify-center transition text-sm"
                title="WhatsApp (7800076067)"
              >
                <i className="fa-brands fa-whatsapp"></i>
              </a>
              <a
                href="https://www.facebook.com/share/1bnDaDncxd/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition text-sm"
                title="Facebook Page"
              >
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded bg-black hover:bg-gray-800 text-white flex items-center justify-center transition text-sm border border-gray-700"
                title="X (Twitter)"
              >
                <i className="fa-brands fa-x-twitter"></i>
              </a>
            </div>
          </div>

          {/* Categories Navigation (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-[#d60000] pl-2.5">
              प्रमुख समाचार श्रेणियाँ
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {categories.map((cat) => (
                <Link
                  key={cat}
                  to={`/category/${encodeURIComponent(cat)}`}
                  className="text-gray-400 hover:text-white hover:translate-x-1 transition-all py-1 flex items-center gap-1.5"
                >
                  <i className="fa-solid fa-angle-right text-[10px] text-red-500"></i>
                  {cat}
                </Link>
              ))}
              <Link
                to="/videos"
                className="text-amber-400 hover:text-amber-300 hover:translate-x-1 transition-all py-1 flex items-center gap-1.5 font-bold"
              >
                <i className="fa-solid fa-play text-[9px]"></i>
                वीडियो समाचार
              </Link>
              <Link
                to="/about"
                className="text-gray-400 hover:text-white hover:translate-x-1 transition-all py-1 flex items-center gap-1.5"
              >
                <i className="fa-solid fa-angle-right text-[10px] text-red-500"></i>
                हमारे बारे में
              </Link>
            </div>
          </div>

          {/* Contact & Editorial Office (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-[#d60000] pl-2.5">
              संपादकीय एवं संपर्क कार्यालय
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li className="flex items-start gap-2.5">
                <i className="fa-solid fa-location-dot text-[#d60000] mt-1 shrink-0"></i>
                <span>राज्य ब्यूरो: मध्य प्रदेश • छत्तीसगढ़ • गुजरात • राजस्थान • उत्तर प्रदेश</span>
              </li>
              <li className="flex items-center gap-2.5">
                <i className="fa-solid fa-phone text-[#d60000] shrink-0"></i>
                <span>फोन / WhatsApp: +91 7800076067</span>
              </li>
              <li className="flex items-center gap-2.5">
                <i className="fa-solid fa-envelope text-[#d60000] shrink-0"></i>
                <span>ईमेल: editor@shoonysesikhar.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <i className="fa-solid fa-globe text-[#d60000] shrink-0"></i>
                <span>वेबसाइट: www.shoonysesikhar.com</span>
              </li>
            </ul>

            <div className="pt-2">
              <div className="bg-gray-800/80 rounded-lg p-2.5 border border-gray-700/60 text-[11px] text-gray-400">
                <p className="font-semibold text-gray-300">पत्रकारिता आचार संहिता:</p>
                <p className="mt-0.5">प्रेस काउंसिल ऑफ इंडिया के दिशा-निर्देशों एवं डिजिटल मीडिया आचार संहिता 2021 के अनुपालन हेतु संकल्पित।</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Strip */}
      <div className="bg-[#090d16] border-t border-gray-800 text-xs text-gray-500 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p>
            © {currentYear} <strong className="text-gray-300">Shoonysesikhar (शून्य से शिखर)</strong>। सर्वाधिकार सुरक्षित।
          </p>
          <div className="flex items-center gap-4 text-xs">
            <Link to="/about" className="hover:text-gray-300 transition">गोपनीयता नीति</Link>
            <span>•</span>
            <Link to="/about" className="hover:text-gray-300 transition">नियम एवं शर्तें</Link>
            <span>•</span>
            <Link to="/about" className="hover:text-gray-300 transition">अस्वीकरण</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
