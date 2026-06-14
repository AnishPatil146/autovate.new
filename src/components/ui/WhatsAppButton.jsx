
export default function WhatsAppButton() {
  const phoneNumber = '919096861443';
  const message = encodeURIComponent("Hello Autovate! I'd like to book a free automation strategy call for my business.");
  
  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:bg-[#20ba5a] transition-all duration-300 hover:scale-110 active:scale-95 group"
      aria-label="Contact support on WhatsApp"
      id="whatsapp-floating-cta"
    >
      {/* 3s Pulsing Glow Ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366]/30 animate-slow-ping"></span>
      
      {/* Official WhatsApp Logo SVG */}
      <svg className="w-8 h-8 relative z-10" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fill="#FFF" d="M12.003 21c-1.74 0-3.41-.49-4.86-1.4l-.35-.22-3.61.95.96-3.52-.24-.38A9.87 9.87 0 0 1 2.15 11.19c.005-5.46 4.45-9.9 9.91-9.9 2.65 0 5.14 1.03 7.01 2.9a9.83 9.83 0 0 1 2.91 7.02c-.005 5.46-4.45 9.9-9.91 9.9h-.07z" style={{ fill: '#25D366' }} />
        <path fill="#FFF" d="M12.003 0C5.38 0 .01 5.37.006 11.99c0 2.11.55 4.18 1.6 6L0 24l6.15-1.61c1.78.97 3.79 1.48 5.84 1.48h.01c6.62 0 12-5.37 12-11.99c0-3.21-1.25-6.22-3.51-8.48A11.9 11.9 0 0 0 12.003 0zm5.52 17.02c-.23.64-1.34 1.22-1.85 1.3-.5.08-1.52.12-3.11-.53a10.2 10.2 0 0 1-4.71-4.14c-.81-1.08-1.45-2.45-1.45-3.87 0-1.46.77-2.18 1.05-2.47.27-.3.6-.37.79-.37.2 0 .39 0 .56.01.18 0 .42-.07.65.48.24.58.82 2 .89 2.15.07.15.12.33.02.53-.1.2-.15.33-.3.5-.15.16-.32.37-.46.5-.15.15-.3.31-.13.6.17.3 1.09 3.01 2.5 4.27 1.4 1.25 2.58 1.64 2.95 1.82.37.18.59.15.8-.08.23-.26.96-1.12 1.22-1.51.27-.39.53-.33.9-.19.36.14 2.3.1 2.7.29.39.2.65.3.72.43.08.13.08.76-.15 1.4z" />
      </svg>
      
      {/* Label on Hover */}
      <span className="absolute right-16 bg-[#111] border border-[#25D366]/30 text-[#25D366] text-xs px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-xl">
        Chat Strategy With Us
      </span>
    </a>
  );
}

