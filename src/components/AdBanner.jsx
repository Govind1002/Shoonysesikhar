export default function AdBanner({ slot = 'top' }) {
  const isTop = slot === 'top';

  if (isTop) {
    return (
      <div className="w-full my-3">
        <div className="w-full max-w-4xl mx-auto h-20 sm:h-24 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 border border-dashed border-gray-300 rounded-lg flex items-center justify-between px-4 sm:px-6 shadow-2xs">
          <div className="flex items-center gap-3">
            <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded font-bold uppercase">
              विज्ञापन
            </span>
            <div>
              <p className="text-xs sm:text-sm font-bold text-gray-700">
                अपना विज्ञापन यहाँ प्रदर्शित करें (728 × 90 Leaderboard)
              </p>
              <p className="text-[11px] text-gray-400 hidden sm:block">
                मध्य प्रदेश, छत्तीसगढ़, गुजरात, राजस्थान और उत्तर प्रदेश के लाखों पाठकों तक सीधी पहुँच
              </p>
            </div>
          </div>
          <a
            href="https://wa.me/917800076067"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#d60000] hover:bg-[#b00000] text-white text-xs font-semibold px-3 py-1.5 rounded transition shrink-0 whitespace-nowrap"
          >
            विज्ञापन दें
          </a>
        </div>
      </div>
    );
  }

  // Sidebar Ad (300x250)
  return (
    <div className="w-full bg-white rounded-xl border border-dashed border-gray-300 p-4 text-center shadow-2xs">
      <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded font-bold uppercase">
        विज्ञापन (300 × 250)
      </span>
      <div className="my-4 py-6 bg-gray-50 rounded-lg border border-gray-200">
        <i className="fa-solid fa-rectangle-ad text-3xl text-gray-300 mb-2"></i>
        <h5 className="text-xs font-bold text-gray-700">व्यापारिक प्रचार हेतु स्थान</h5>
        <p className="text-[11px] text-gray-400 mt-1">Shoonysesikhar विज्ञापन सेवा</p>
      </div>
      <a
        href="https://wa.me/917800076067"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block w-full bg-[#d60000] hover:bg-[#b00000] text-white text-xs font-bold py-2 rounded-lg transition"
      >
        संपर्क करें: +91 7800076067
      </a>
    </div>
  );
}
