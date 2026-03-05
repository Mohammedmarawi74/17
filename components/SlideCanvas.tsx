
import React from 'react';
import { SlideContent } from '../types';

interface SlideCanvasProps {
  content: SlideContent;
  canvasRef?: React.RefObject<HTMLDivElement>;
}

const SlideCanvas: React.FC<SlideCanvasProps> = ({ content, canvasRef }) => {
  const pColor = content.primaryColor || '#003366';
  const sColor = content.secondaryColor || '#008080';
  const bgColor = content.backgroundColor || '#ffffff';
  const txtColor = content.textColor || '#0f172a';

  return (
    <div 
      ref={canvasRef}
      id="slide-canvas"
      className="poster-root relative w-[800px] h-[1000px] overflow-hidden shadow-2xl flex flex-col font-['IBM_Plex_Sans_Arabic']"
      style={{ border: `1px solid ${pColor}10`, backgroundColor: bgColor, color: txtColor }}
    >
      {/* Dynamic Style Injection for User Overrides */}
      <style>{content.customCss || ''}</style>

      {/* Decorative Background Elements */}
      <div className="poster-bg-decor absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <svg width="100%" height="100%" viewBox="0 0 800 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="850" cy="-50" r="500" fill={sColor} fillOpacity="0.03" />
          <path d="M-100 800C100 850 400 750 800 900V1000H-100V800Z" fill={pColor} fillOpacity="0.02" />
        </svg>
      </div>

      {/* Custom Logo - Placed in the top-right corner, adjusted position and size as requested */}
      {content.logoUrl && (
        <div className="absolute top-6 right-4 z-20 h-10 w-24 flex items-center justify-end">
          <img 
            src={content.logoUrl} 
            alt="Corporate Logo" 
            className="h-full object-contain max-w-full drop-shadow-sm" 
          />
        </div>
      )}

      {/* Top Banner Title */}
      <div className="relative z-10 pt-10 pb-2 text-center">
        <h3 className="poster-top-title text-3xl font-black tracking-tight" style={{ color: sColor }}>
          {content.topTitle}
        </h3>
      </div>

      {/* Main Hero Header */}
      <div className="relative z-10 px-8 mb-6">
        <div 
          className="poster-header rounded-3xl p-8 text-center text-white shadow-2xl relative overflow-hidden"
          style={{ 
            background: `linear-gradient(145deg, ${pColor} 0%, ${sColor} 100%)` 
          }}
        >
          {/* Subtle Pattern overlay */}
          <div className="absolute inset-0 opacity-10 mix-blend-overlay">
            <svg width="100%" height="100%" viewBox="0 0 100 100">
               <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                 <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
               </pattern>
               <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>
          
          <h1 className="poster-header-title text-4xl font-black mb-3 leading-[1.2] relative z-20">
            {content.headerTitle}
          </h1>
          <div className="h-1 w-16 bg-white/30 mx-auto mb-3 rounded-full" />
          <p className="poster-header-subtitle text-xl font-medium opacity-90 relative z-20">
            {content.headerSubtitle}
          </p>
        </div>
      </div>

      {/* Content Area - Using justify-between to spread content efficiently */}
      <div className="relative z-10 flex-grow px-10 flex flex-col justify-between pb-4">
        
        {/* Section 1: Majors */}
        <div className="poster-section">
          <div className="flex justify-end mb-4">
            <div 
              className="poster-section-badge text-white px-8 py-2 rounded-l-full text-xl font-bold shadow-lg transform translate-x-10"
              style={{ backgroundColor: pColor }}
            >
              {content.section1Title}
            </div>
          </div>
          
          <div className="flex justify-center gap-12 pt-1">
            {content.section1Items.slice(0, 2).map((item, idx) => (
              <div key={idx} className="poster-item-box flex flex-col items-center gap-3 group">
                <div 
                  className="poster-item-icon w-24 h-24 rounded-[1.8rem] flex items-center justify-center shadow-xl bg-white border-2 transition-transform group-hover:scale-105"
                  style={{ borderColor: `${sColor}20` }}
                >
                  {idx === 0 ? (
                     <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke={sColor} strokeWidth="1.2">
                        <path d="M12 2L1 21h22L12 2zM12 18a1 1 0 100-2 1 1 0 000 2zM12 14V8" />
                        <path d="M8 21h8" strokeLinecap="round"/>
                     </svg>
                  ) : (
                    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke={sColor} strokeWidth="1.2">
                       <path d="M4 14.5l8-4 8 4-8 4-8-4zM12 10.5V3M8 6l4-3 4 3" strokeLinecap="round" strokeLinejoin="round"/>
                       <path d="M4 17.5l8 4 8-4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <div className="poster-item-label bg-white px-4 py-1.5 rounded-xl border border-slate-100 shadow-sm">
                  <span className="font-black text-slate-800 text-lg">{item}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: List */}
        <div className="poster-section mt-2">
          <div className="flex justify-end mb-4">
            <div 
              className="poster-section-badge text-white px-8 py-2 rounded-l-full text-xl font-bold shadow-lg transform translate-x-10"
              style={{ backgroundColor: pColor }}
            >
              {content.section2Title}
            </div>
          </div>
          
          <div className="poster-requirements-container rounded-[2rem] p-6 mr-12 relative overflow-hidden border border-slate-200/50 backdrop-blur-sm shadow-inner min-h-[180px]" style={{ backgroundColor: `${pColor}05` }}>
             <ul className="space-y-4">
               {content.section2Items.slice(0, 4).map((item, idx) => (
                 <li key={idx} className="poster-list-item flex items-start gap-4 text-right">
                    <div 
                      className="poster-list-bullet min-w-[12px] h-[12px] rounded-full mt-2 shadow-sm" 
                      style={{ backgroundColor: sColor }} 
                    />
                    <span className="text-xl font-bold leading-tight" style={{ color: txtColor }}>{item}</span>
                 </li>
               ))}
             </ul>
             <div className="absolute top-0 right-0 w-1 h-full" style={{ backgroundColor: sColor }} />
          </div>
        </div>

        {/* Action / Deadline Area - Fixed positioning relative to bottom */}
        <div className="flex justify-center items-center gap-8 mt-2 px-6">
          <div className="poster-qr-area flex-shrink-0">
            <div className="p-2.5 bg-white rounded-3xl border-[3px] shadow-xl" style={{ borderColor: pColor }}>
               <div className="w-24 h-24 bg-white relative p-1">
                 <svg viewBox="0 0 100 100" fill="black">
                   <rect width="100" height="100" fill="white" />
                   <rect x="10" y="10" width="30" height="30" />
                   <rect x="60" y="10" width="30" height="30" />
                   <rect x="10" y="60" width="30" height="30" />
                   <rect x="50" y="50" width="40" height="40" opacity="0.8" />
                   <rect x="15" y="15" width="20" height="20" fill="white" />
                   <rect x="65" y="15" width="20" height="20" fill="white" />
                   <rect x="15" y="65" width="20" height="20" fill="white" />
                 </svg>
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6 bg-white border-2 rounded-lg flex items-center justify-center shadow-sm" style={{ borderColor: pColor }}>
                       <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: sColor }} />
                    </div>
                 </div>
               </div>
               <div className="text-center mt-1 font-black text-[10px] uppercase tracking-widest" style={{ color: pColor }}>
                  {content.qrCodeText}
               </div>
            </div>
          </div>

          <div 
            className="poster-deadline-badge text-white px-8 py-6 rounded-[2rem] shadow-2xl text-center flex-grow flex flex-col justify-center relative overflow-hidden group min-h-[110px]"
            style={{ backgroundColor: pColor }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-white/20" />
            <div className="text-lg font-medium opacity-80 mb-1">{content.deadlineTitle}</div>
            <div className="text-3xl font-black">{content.deadlineDate}</div>
          </div>
        </div>
      </div>

      {/* Footer - New Design: Clean minimal with 5px accent bar */}
      <div className="poster-footer mt-auto relative z-10">
        {/* Text Row */}
        <div className="flex items-center justify-between px-8 py-5 bg-white/80 backdrop-blur-sm border-t border-slate-100">
          {/* Right Side: منصة المستثمر */}
          <div className="flex items-center">
            <span 
              className="text-[24px] font-black tracking-wide"
              style={{ color: sColor }}
            >
              منصة المستثمر
            </span>
          </div>

          {/* Left Side: al_investor.com */}
          <div className="flex items-center">
            <span 
              className="text-[24px] font-black tracking-wide"
              style={{ color: pColor }}
            >
              al_investor.com
            </span>
          </div>
        </div>
        
        {/* 5px Color Bar */}
        <div 
          className="w-full"
          style={{ 
            height: '5px',
            background: `linear-gradient(90deg, ${pColor} 0%, ${sColor} 50%, ${pColor} 100%)`
          }}
        />
      </div>
    </div>
  );
};

export default SlideCanvas;
