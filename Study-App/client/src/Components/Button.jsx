// Button.jsx
const Button = ({ type = "button", text, onClick, disabled }) => (
  <button
    type={type}  // ✅ must be here
    onClick={onClick}
    disabled={disabled}
    className={`
      relative px-8 py-4 
      bg-gradient-to-r from-sky-200/25 to-sky-300/25 
      backdrop-blur-md 
      text-sky-800 font-bold text-lg
      rounded-2xl 
      border border-sky-200/40
      shadow-lg hover:shadow-2xl
      hover:from-sky-300/35 hover:to-sky-400/35 
      hover:border-sky-300/60
      hover:scale-105 hover:-translate-y-1
      active:scale-95 active:translate-y-0
      transition-all duration-300 ease-out
      group overflow-hidden
      ${disabled 
        ? 'opacity-50 cursor-not-allowed hover:scale-100 hover:translate-y-0 hover:from-sky-200/25 hover:to-sky-300/25' 
        : 'hover:ring-4 hover:ring-sky-200/30'
      }
    `}
  >
    {/* Shimmer Effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
    
    {/* Glowing Orbs */}
    <div className="absolute -top-2 -left-2 w-4 h-4 bg-sky-300/40 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-sky-200/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
    
    {/* Text Content */}
    <span className="relative z-10 drop-shadow-sm">
      {text}
    </span>
    
    {/* Inner Glow */}
    <div className="absolute inset-0 bg-gradient-to-r from-sky-100/10 via-sky-200/5 to-sky-100/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
  </button>
)

export default Button