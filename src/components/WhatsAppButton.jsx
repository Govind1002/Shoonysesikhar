export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/917800076067"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-bold px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 group border-2 border-white/50"
      aria-label="WhatsApp 7800076067"
    >
      <i className="fa-brands fa-whatsapp text-lg sm:text-xl"></i>
      <span className="hidden sm:inline font-bold tracking-wide">WhatsApp: 7800076067</span>
      <span className="w-2 h-2 rounded-full bg-white live-pulse"></span>
    </a>
  );
}
