import React from "react";

const InfoCard = ({ image, title, description, onClick }) => {
  return (
    <div 
      onClick={onClick} 
      className="max-w-sm w-full bg-white/15 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden hover:scale-105 hover:bg-white/20 transition-all duration-500 ease-out border border-sky-200/30 group cursor-pointer"
      style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
    >
      {/* Upper half - Image with Overlay */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-sky-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Floating Glass Effect */}
        <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      {/* Lower half - Info with Glass Morphism */}
      <div className="relative p-6 flex flex-col justify-between h-40 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-md">
        {/* Subtle Inner Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-sky-100/10 via-sky-200/5 to-sky-100/10 rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="relative z-10">
          <h2 className="text-xl font-bold text-sky-800 group-hover:text-sky-900 transition-colors duration-300 mb-2 drop-shadow-sm">
            {title}
          </h2>
          <p className="text-sm text-sky-700/90 leading-relaxed line-clamp-3 group-hover:text-sky-800/95 transition-colors duration-300">
            {description}
          </p>
        </div>

    

        {/* Decorative Elements */}
        <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-br from-sky-200/20 to-sky-300/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute -top-2 -left-2 w-12 h-12 bg-gradient-to-tr from-sky-100/30 to-sky-200/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      </div>

      {/* Outer Glow Ring */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-sky-200/20 via-sky-300/10 to-sky-200/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 scale-105"></div>
    </div>
  );
};

export default InfoCard;