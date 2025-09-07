import React from "react";

const Navbar = ({ logo, title, onButtonClick, buttonName }) => {
  return (
    <nav className="absolute top-8 left-1/2 transform -translate-x-1/2 w-[55%] bg-sky-100/30 backdrop-blur-md rounded-3xl shadow-lg border border-sky-200/40 px-8 py-4 flex items-center justify-between">
      {/* Left Section: Logo + Title */}
      <div className="flex items-center space-x-4">
        {logo && (
          <img
            src={logo}
            alt="logo"
            className="h-12 w-12 rounded-full bg-white/80 backdrop-blur-sm p-2 shadow-lg border border-sky-200/50"
          />
        )}
        <span className="text-2xl font-bold text-sky-800/90 tracking-wide">{title}</span>
      </div>

      {/* Right Section: Button */}
      <button
        onClick={onButtonClick}
        className="px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-200/50 to-sky-300/50 backdrop-blur-sm text-sky-800 font-semibold border border-sky-300/40 hover:from-sky-300/60 hover:to-sky-400/60 hover:shadow-lg hover:scale-105 transform transition-all duration-300 ease-out"
      >
        {buttonName}
      </button>
    </nav>
  );
};

export default Navbar;