import { Link } from 'react-router-dom';
import logoImg from '../assets/logo.png';

export default function AboutUs() {
  return (
    <div className="bg-[#f1f5f9] min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 space-y-8">
        {/* Brand Banner Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-gray-200 shadow-sm text-center">
          <div className="inline-block p-2 bg-white rounded-2xl shadow-md border border-gray-100 mb-4">
            <img
              src={logoImg}
              alt="Shoonysesikhar (शून्य से शिखर)"
              className="h-24 sm:h-32 w-auto object-contain mx-auto"
            />
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Shoonysesikhar (शून्य से शिखर)
          </h1>
          <p className="text-sm sm:text-base font-bold text-[#d60000] mt-1">
            "सत्य की खोज जनता की आवाज"
          </p>
          <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto mt-2">
            राष्ट्रीय हिंदी समाचार पत्र एवं डिजिटल न्यूज़ नेटवर्क — मध्य प्रदेश, छत्तीसगढ़, गुजरात, राजस्थान व उत्तर प्रदेश
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <div className="w-1.5 h-6 bg-[#d60000] rounded-full"></div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">हमारा परिचय एवं उद्देश्य</h2>
          </div>

          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            <strong>Shoonysesikhar (शून्य से शिखर) समाचार पत्र</strong> मध्य प्रदेश, छत्तीसगढ़, गुजरात, राजस्थान, उत्तर प्रदेश और पूरे देश का एक स्वतंत्र, निष्पक्ष और निर्भीक समाचार पत्र एवं डिजिटल न्यूज़ नेटवर्क है। हमारा संकल्प है — समाज के अंतिम पंक्ति के व्यक्ति की आवाज बनना और जनहित के मुद्दों को पूरी जिम्मेदारी के साथ उठाना।
          </p>

          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            जैसे नाम से ही स्पष्ट है — <em>'शून्य से शिखर'</em> — हम मानते हैं कि सच्ची पत्रकारिता वही है जो ज़मीनी हकीकत को शासन, प्रशासन और समाज के सर्वोच्च शिखर तक पहुँचाए। हम किसी भी राजनीतिक दल, दबाव अथवा व्यावसायिक हितों से ऊपर उठकर तथ्यों पर आधारित प्रामाणिक समाचार पाठकों तक पहुँचाने के लिए प्रतिबद्ध हैं।
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="bg-red-50/60 border border-red-200/70 p-4 rounded-xl text-center">
              <i className="fa-solid fa-scale-balanced text-2xl text-[#d60000] mb-2"></i>
              <h3 className="text-sm font-bold text-gray-900">निष्पक्षता</h3>
              <p className="text-xs text-gray-600 mt-1">बिना किसी पूर्वाग्रह के सत्य और प्रमाणिक समाचारों का निरंतर प्रकाशन।</p>
            </div>
            <div className="bg-emerald-50/60 border border-emerald-200/70 p-4 rounded-xl text-center">
              <i className="fa-solid fa-users text-2xl text-emerald-600 mb-2"></i>
              <h3 className="text-sm font-bold text-gray-900">जनसरोकार</h3>
              <p className="text-xs text-gray-600 mt-1">प्रदेशों व ग्रामीण आंचल के आम नागरिकों व किसानों की समस्याओं को सर्वोच्च प्राथमिकता।</p>
            </div>
            <div className="bg-blue-50/60 border border-blue-200/70 p-4 rounded-xl text-center">
              <i className="fa-solid fa-bolt text-2xl text-blue-600 mb-2"></i>
              <h3 className="text-sm font-bold text-gray-900">तीव्र कवरेज</h3>
              <p className="text-xs text-gray-600 mt-1">डिजिटल पोर्टल, यूट्यूब और व्हाट्सएप के जरिए ब्रेकिंग अपडेट्स।</p>
            </div>
          </div>
        </div>

        {/* Editorial & Office Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Office Contact */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs space-y-3">
            <h3 className="text-base font-bold text-gray-900 pb-2 border-b border-gray-100 flex items-center gap-2">
              <i className="fa-solid fa-building text-[#d60000]"></i>
              संपादकीय व संपर्क कार्यालय
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-600">
              <li className="flex items-start gap-2.5">
                <i className="fa-solid fa-location-dot text-[#d60000] mt-1 shrink-0"></i>
                <span><strong>राज्य ब्यूरो:</strong> मध्य प्रदेश • छत्तीसगढ़ • गुजरात • राजस्थान • उत्तर प्रदेश</span>
              </li>
              <li className="flex items-center gap-2.5">
                <i className="fa-solid fa-phone text-[#d60000] shrink-0"></i>
                <span><strong>फोन / WhatsApp:</strong> +91 7800076067</span>
              </li>
              <li className="flex items-center gap-2.5">
                <i className="fa-solid fa-envelope text-[#d60000] shrink-0"></i>
                <span><strong>ईमेल:</strong> editor@shoonysesikhar.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <i className="fa-solid fa-newspaper text-[#d60000] shrink-0"></i>
                <span><strong>प्रकाशन:</strong> राष्ट्रीय दैनिक हिंदी समाचार पत्र</span>
              </li>
            </ul>
          </div>

          {/* Connect With Us */}
          <div className="bg-[#111827] text-white rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <i className="fa-solid fa-share-nodes text-red-500"></i>
                डिजिटल प्लेटफॉर्म्स से जुड़ें
              </h3>
              <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                हजारों जागरूक पाठक प्रतिदिन हमारे डिजिटल नेटवर्क से जुड़कर सटीक और निष्पक्ष खबरों का लाभ उठा रहे हैं।
              </p>
            </div>

            <div className="space-y-2.5">
              <a
                href="https://wa.me/917800076067"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs transition"
              >
                <span className="flex items-center gap-2">
                  <i className="fa-brands fa-whatsapp text-lg"></i>
                  WhatsApp: +91 7800076067
                </span>
                <span>संपर्क करें ↗</span>
              </a>

              <a
                href="https://www.facebook.com/share/1bnDaDncxd/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs transition"
              >
                <span className="flex items-center gap-2">
                  <i className="fa-brands fa-facebook-f text-base"></i>
                  फेसबुक पेज फॉलो करें
                </span>
                <span>फॉलो करें ↗</span>
              </a>

              <a
                href="https://www.youtube.com/@Shoonyseshikharnews?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs transition"
              >
                <span className="flex items-center gap-2">
                  <i className="fa-brands fa-youtube text-lg"></i>
                  यूट्यूब चैनल सब्सक्राइब करें
                </span>
                <span>सब्सक्राइब ↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
