
import React, { useState, useRef } from 'react';
import { SlideContent, AppState } from './types';
import { DEFAULT_SLIDE, THEMES, LOGO_OPTIONS } from './constants';
import SlideCanvas from './components/SlideCanvas';
import { generateSlideContent } from './services/geminiService';
import { toBlob } from 'html-to-image';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    slides: [{ ...DEFAULT_SLIDE }],
    activeSlideId: DEFAULT_SLIDE.id,
    isGenerating: false,
    activeTab: 'ai'
  });

  const [prompt, setPrompt] = useState('');
  const canvasRef = useRef<HTMLDivElement>(null);

  const activeSlide = state.slides.find(s => s.id === state.activeSlideId) || state.slides[0];

  const updateSlide = (updates: Partial<SlideContent>) => {
    setState(prev => ({
      ...prev,
      slides: prev.slides.map(s => s.id === prev.activeSlideId ? { ...s, ...updates } : s)
    }));
  };

  const handleAIRequest = async () => {
    if (!prompt.trim()) return;
    setState(prev => ({ ...prev, isGenerating: true }));
    try {
      const result = await generateSlideContent(prompt);
      updateSlide(result);
      setState(prev => ({ ...prev, activeTab: 'text' }));
    } catch (e) {
      console.error(e);
      alert('حدث خطأ أثناء توليد المحتوى');
    } finally {
      setState(prev => ({ ...prev, isGenerating: false }));
    }
  };

  const SNIPPETS = [
    { name: 'ذهبي فاخر', css: '.poster-header {\n  background: linear-gradient(135deg, #d4af37 0%, #f9f295 50%, #b8860b 100%) !important;\n  color: #1a1a1a !important;\n  box-shadow: 0 10px 40px rgba(212, 175, 55, 0.4) !important;\n}\n.poster-header-title { color: #1a1a1a !important; }' },
    { name: 'عنوان مفرغ', css: '.poster-header-title {\n  color: transparent !important;\n  -webkit-text-stroke: 2px white !important;\n  font-size: 4rem !important;\n}' },
    { name: 'بدون نقش', css: '.poster-bg-decor { display: none !important; }' },
    { name: 'حاوية زجاجية', css: '.poster-requirements-container {\n  background: rgba(255, 255, 255, 0.4) !important;\n  backdrop-filter: blur(12px) !important;\n  border: 1px solid rgba(255, 255, 255, 0.6) !important;\n}' },
    { name: 'نص عريض جداً', css: '.poster-header-title { font-weight: 900 !important; letter-spacing: -2px !important; }' },
    { name: 'تدرج ريترو', css: '.poster-root {\n  background: linear-gradient(180deg, #fef3c7 0%, #fde68a 100%) !important;\n}' }
  ];

  const applySnippet = (snippetCss: string) => {
    const currentCss = activeSlide.customCss || '';
    updateSlide({ customCss: currentCss + '\n' + snippetCss });
  };

  const handleAddSlide = () => {
    const newId = Date.now().toString();
    const newSlide = { ...activeSlide, id: newId };
    setState(prev => ({
      ...prev,
      slides: [...prev.slides, newSlide],
      activeSlideId: newId
    }));
  };

  const handleDownload = async () => {
    if (canvasRef.current === null) return;
    
    // Show a loading indicator if needed (optional)
    const btn = document.activeElement as HTMLButtonElement;
    const originalText = btn.innerText;
    btn.innerText = 'جاري المعالجة...';
    btn.disabled = true;

    try {
      // 1. Ensure all fonts are loaded before capturing
      await document.fonts.ready;

      // 2. Capture as Blob with optimized settings
      const blob = await toBlob(canvasRef.current, {
        cacheBust: true,
        pixelRatio: 2, // High DPI for crisp text and fonts
        backgroundColor: activeSlide.backgroundColor || '#ffffff',
        // Filter out elements that might cause CORS issues during cloning
        filter: (node: HTMLElement) => {
          const exclusionClasses = ['canvas-container-wrapper']; 
          return !exclusionClasses.some(cls => node.classList?.contains(cls));
        },
      });
      
      if (!blob) throw new Error('Failed to create image blob');

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `agriserv-design-${Date.now()}.png`;
      link.href = url;
      link.click();
      
      // Cleanup
      setTimeout(() => URL.revokeObjectURL(url), 100);
    } catch (err) {
      console.error('Download failed', err);
      alert('حدثت مشكلة أثناء تصدير الصورة. تأكد من جودة اتصال الإنترنت وحاول مرة أخرى.');
    } finally {
      btn.innerText = originalText;
      btn.disabled = false;
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#1e293b] overflow-hidden" dir="rtl">
      {/* Sidebar */}
      <div className="w-[400px] bg-[#0f172a] text-slate-300 flex flex-col shadow-2xl border-l border-slate-800 z-[100]">
        {/* Navigation Tabs */}
        <div className="grid grid-cols-4 border-b border-slate-800">
          {[
            { id: 'ai', icon: '✨', label: 'الذكاء' },
            { id: 'text', icon: '☰', label: 'المحتوى' },
            { id: 'design', icon: '🎨', label: 'الهوية' },
            { id: 'customize', icon: '⚡', label: 'متقدم' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setState(prev => ({ ...prev, activeTab: tab.id as any }))}
              className={`flex flex-col items-center py-5 transition-all border-b-2 ${
                state.activeTab === tab.id 
                ? 'bg-[#1e293b] text-emerald-400 border-emerald-500' 
                : 'border-transparent text-slate-500 hover:text-slate-300 hover:bg-[#1e293b]/30'
              }`}
            >
              <span className="text-2xl mb-1">{tab.icon}</span>
              <span className="text-[11px] font-black uppercase tracking-wider">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-8 custom-scrollbar">
          {state.activeTab === 'ai' && (
            <div className="space-y-6 animate-in fade-in duration-300 slide-in-from-right-2">
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl">
                 <h2 className="text-emerald-400 font-black text-sm mb-2">توليد المحتوى الذكي</h2>
                 <p className="text-[11px] text-slate-400 leading-relaxed">أدخل فكرة البرنامج التدريبي أو الإعلان وسيقوم الذكاء الاصطناعي بصياغة المحتوى بأسلوب الشركة.</p>
              </div>
              <textarea
                className="w-full bg-[#1e293b] border border-slate-700 rounded-xl p-4 text-sm focus:ring-2 focus:ring-emerald-500 outline-none text-white transition-all placeholder:text-slate-600"
                rows={6}
                placeholder="مثال: إعلان عن دورة تدريبية في سلامة الأغذية تستهدف المهندسين الزراعيين..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <button
                onClick={handleAIRequest}
                disabled={state.isGenerating}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-black transition-all disabled:opacity-50 shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2"
              >
                {state.isGenerating ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /><span>جاري التوليد...</span></>
                ) : (
                  <><span>توليد المحتوى السحري</span><span className="text-xl">✨</span></>
                )}
              </button>
            </div>
          )}

          {state.activeTab === 'text' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h2 className="text-slate-400 font-black text-xs uppercase tracking-widest">تعديل نصوص الشريحة</h2>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] text-slate-500 font-bold mr-2">العنوان العلوي</label>
                  <input type="text" className="w-full bg-[#1e293b] border border-slate-700 rounded-lg p-3 text-sm text-white focus:border-emerald-500 outline-none" value={activeSlide.topTitle} onChange={(e) => updateSlide({ topTitle: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] text-slate-500 font-bold mr-2">العنوان الرئيسي</label>
                  <textarea className="w-full bg-[#1e293b] border border-slate-700 rounded-lg p-3 text-sm text-white focus:border-emerald-500 outline-none" rows={2} value={activeSlide.headerTitle} onChange={(e) => updateSlide({ headerTitle: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] text-slate-500 font-bold mr-2">العنوان الفرعي</label>
                  <input type="text" className="w-full bg-[#1e293b] border border-slate-700 rounded-lg p-3 text-sm text-white focus:border-emerald-500 outline-none" value={activeSlide.headerSubtitle} onChange={(e) => updateSlide({ headerSubtitle: e.target.value })} />
                </div>
              </div>
            </div>
          )}

          {state.activeTab === 'design' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <section>
                <h2 className="text-slate-400 font-black text-xs uppercase tracking-widest mb-4">الثيمات الجاهزة</h2>
                <div className="grid grid-cols-2 gap-3">
                  {THEMES.map((theme) => (
                    <button
                      key={theme.name}
                      onClick={() => updateSlide({ 
                        primaryColor: theme.primary, 
                        secondaryColor: theme.secondary,
                        backgroundColor: theme.bg,
                        textColor: theme.text 
                      })}
                      className={`flex flex-col p-3 rounded-2xl border transition-all text-right ${
                        activeSlide.primaryColor === theme.primary && activeSlide.backgroundColor === theme.bg
                        ? 'bg-emerald-500/10 border-emerald-500 shadow-lg ring-1 ring-emerald-500/50' 
                        : 'bg-[#1e293b] border-slate-800 hover:border-slate-700 shadow-md'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-3">
                         <span className="text-[11px] font-bold text-slate-200">{theme.name}</span>
                         <div className="flex -space-x-1">
                           <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.primary }} />
                           <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.secondary }} />
                         </div>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800/50 overflow-hidden flex">
                         <div className="h-full" style={{ width: '40%', backgroundColor: theme.primary }} />
                         <div className="h-full" style={{ width: '60%', backgroundColor: 'rgba(255,255,255,0.1)' }} />
                      </div>
                    </button>
                  ))}
                </div>
              </section>

              <section className="pt-6 border-t border-slate-800">
                <h2 className="text-slate-400 font-black text-xs uppercase tracking-widest mb-6">تخصيص الألوان</h2>
                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                  <div className="space-y-2">
                    <label className="text-[11px] text-slate-500 font-black mr-2 uppercase tracking-widest">الأساسي</label>
                    <div className="flex items-center gap-2 bg-[#1e293b] p-2 rounded-xl border border-slate-700">
                      <div className="w-6 h-6 rounded-md shadow-inner relative overflow-hidden" style={{ backgroundColor: activeSlide.primaryColor }}>
                        <input type="color" className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" value={activeSlide.primaryColor} onChange={(e) => updateSlide({ primaryColor: e.target.value })} />
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase">{activeSlide.primaryColor}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] text-slate-500 font-black mr-2 uppercase tracking-widest">الثانوي</label>
                    <div className="flex items-center gap-2 bg-[#1e293b] p-2 rounded-xl border border-slate-700">
                      <div className="w-6 h-6 rounded-md shadow-inner relative overflow-hidden" style={{ backgroundColor: activeSlide.secondaryColor }}>
                        <input type="color" className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" value={activeSlide.secondaryColor} onChange={(e) => updateSlide({ secondaryColor: e.target.value })} />
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase">{activeSlide.secondaryColor}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] text-slate-500 font-black mr-2 uppercase tracking-widest">النصوص</label>
                    <div className="flex items-center gap-2 bg-[#1e293b] p-2 rounded-xl border border-slate-700">
                      <div className="w-6 h-6 rounded-md shadow-inner relative overflow-hidden" style={{ backgroundColor: activeSlide.textColor }}>
                        <input type="color" className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" value={activeSlide.textColor} onChange={(e) => updateSlide({ textColor: e.target.value })} />
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase">{activeSlide.textColor}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] text-slate-500 font-black mr-2 uppercase tracking-widest">الخلفية</label>
                    <div className="flex items-center gap-2 bg-[#1e293b] p-2 rounded-xl border border-slate-700">
                      <div className="w-6 h-6 rounded-md shadow-inner relative overflow-hidden border border-slate-800" style={{ backgroundColor: activeSlide.backgroundColor }}>
                        <input type="color" className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" value={activeSlide.backgroundColor} onChange={(e) => updateSlide({ backgroundColor: e.target.value })} />
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase">{activeSlide.backgroundColor}</span>
                    </div>
                  </div>
                </div>
              </section>

              <section className="pt-6 border-t border-slate-800">
                <h2 className="text-slate-400 font-black text-xs uppercase tracking-widest mb-4">رفع باركود مخصص</h2>
                <div className="space-y-4">
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700 rounded-2xl p-6 bg-slate-800/50 hover:border-emerald-500 transition-all cursor-pointer group relative overflow-hidden">
                    <input 
                      type="file" 
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            updateSlide({ qrCodeUrl: reader.result as string });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🖼️</div>
                    <span className="text-[11px] font-bold text-slate-400 text-center">اسحب صورة الباركود أو انقر هنا</span>
                  </div>
                  {activeSlide.qrCodeUrl && (
                    <button 
                      onClick={() => updateSlide({ qrCodeUrl: undefined })}
                      className="w-full py-2 bg-red-900/20 text-red-400 rounded-xl text-[10px] font-black hover:bg-red-900/30 transition-all"
                    >
                      حذف الباركود الحالي
                    </button>
                  )}
                </div>
              </section>

              <section className="pt-6 border-t border-slate-800">
                <h2 className="text-slate-400 font-black text-xs uppercase tracking-widest mb-4">اختر شعاراً</h2>
                <div className="grid grid-cols-2 gap-3">
                  {LOGO_OPTIONS.map((logo) => (
                    <button
                      key={logo.id}
                      onClick={() => updateSlide({ logoOption: logo.id as 1 | 2 | 3 | 4, logoUrl: logo.src })}
                      className={`relative p-3 rounded-2xl border-2 transition-all overflow-hidden group ${
                        activeSlide.logoOption === logo.id
                        ? 'border-emerald-500 bg-emerald-500/10 ring-2 ring-emerald-500/20'
                        : 'border-slate-700 bg-slate-800 hover:border-slate-600'
                      }`}
                    >
                      <div className="aspect-square flex items-center justify-center bg-white rounded-xl p-2 mb-2">
                        <img 
                          src={logo.src} 
                          alt={logo.alt}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-300">{logo.alt}</span>
                        {activeSlide.logoOption === logo.id && (
                          <span className="text-emerald-500 text-lg">✓</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                
                {activeSlide.logoOption && (
                  <button
                    onClick={() => updateSlide({ logoOption: null, logoUrl: undefined })}
                    className="w-full mt-3 py-2.5 bg-red-900/20 border border-red-900/40 text-red-400 rounded-xl text-xs font-black hover:bg-red-900/30 transition flex items-center justify-center gap-2"
                  >
                    <span>🗑️</span>
                    <span>إزالة الشعار</span>
                  </button>
                )}
              </section>
            </div>
          )}

          {state.activeTab === 'customize' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <section>
                <h2 className="text-slate-400 font-black text-xs uppercase tracking-widest mb-4">تنسيقات CSS سريعة</h2>
                <div className="grid grid-cols-2 gap-2">
                  {SNIPPETS.map((snippet) => (
                    <button key={snippet.name} onClick={() => applySnippet(snippet.css)} className="bg-[#1e293b] border border-slate-700 hover:border-emerald-500 p-3 rounded-xl text-[11px] font-bold text-slate-400 text-center transition-all">{snippet.name}</button>
                  ))}
                </div>
              </section>
              <section className="space-y-3">
                <h2 className="text-slate-400 font-black text-xs uppercase tracking-widest">محرر CSS المتقدم</h2>
                <textarea className="w-full h-80 bg-[#020617] border border-slate-800 rounded-xl p-4 font-mono text-[12px] text-emerald-400 focus:ring-1 focus:ring-emerald-500 outline-none leading-relaxed custom-scrollbar" placeholder="/* أدخل كود CSS المخصص هنا... */" value={activeSlide.customCss} onChange={(e) => updateSlide({ customCss: e.target.value })} spellCheck={false} />
              </section>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-slate-800 bg-[#020617]/50">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-black text-white text-xs">A</div>
             <div className="flex flex-col">
               <span className="text-xs font-black text-white uppercase tracking-wider">AgriServ Design</span>
               <span className="text-[9px] text-slate-500">منصة التصميم الوطنية المتكاملة</span>
             </div>
          </div>
        </div>
      </div>

      <div className="flex-grow flex flex-col bg-[#0f172a] relative">
        <div className="h-16 bg-[#1e293b]/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-8 text-slate-300 z-50 shadow-md">
          <div className="flex items-center gap-8">
             <div className="flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-sm font-black tracking-tight">مشروع الكاروسيل الاحترافي v1.2</span>
             </div>
             <div className="h-6 w-px bg-slate-700 hidden sm:block" />
             <div className="hidden lg:flex gap-6">
               <button className="text-[11px] font-bold text-slate-500 hover:text-white transition uppercase tracking-widest">ملف</button>
               <button className="text-[11px] font-bold text-slate-500 hover:text-white transition uppercase tracking-widest">عرض</button>
               <button className="text-[11px] font-bold text-slate-500 hover:text-white transition uppercase tracking-widest">إعدادات</button>
             </div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={handleAddSlide} className="px-5 py-2 bg-slate-800 border border-slate-700 text-slate-300 rounded-xl text-[11px] font-black hover:bg-slate-700 transition uppercase tracking-wider">مضاعفة الشريحة</button>
            <button onClick={handleDownload} className="px-8 py-2.5 bg-emerald-600 text-white rounded-xl text-[11px] font-black hover:bg-emerald-500 transition shadow-xl shadow-emerald-500/20 uppercase tracking-wider">تصدير التصميم</button>
          </div>
        </div>

        {/* Canvas Engine with Improved Scaling and Scroll Support */}
        <div className="flex-grow overflow-auto p-8 md:p-12 lg:p-20 flex flex-col items-center bg-[#020617] bg-grid-slate-900/[0.1] relative custom-scrollbar">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900/0 via-slate-950/40 to-slate-950" />
          
          <div className="canvas-container transform scale-[0.5] sm:scale-[0.6] lg:scale-[0.7] xl:scale-[0.8] 2xl:scale-90 origin-top mb-20 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] hover:shadow-[0_0_100px_rgba(16,185,129,0.15)] flex-shrink-0">
             <SlideCanvas content={activeSlide} canvasRef={canvasRef} />
          </div>
          
          {/* Bottom spacer to ensure footer of canvas is visible after scaling */}
          <div className="h-20 w-full flex-shrink-0" />
        </div>

        {/* Timeline Navigator */}
        <div className="h-36 bg-[#0f172a] border-t border-slate-800/50 p-6 flex gap-6 overflow-x-auto custom-scrollbar items-center flex-shrink-0 z-[100]">
           {state.slides.map((slide, index) => (
             <div key={slide.id} onClick={() => setState(prev => ({ ...prev, activeSlideId: slide.id }))} className={`relative min-w-[100px] h-[110px] border-2 rounded-2xl cursor-pointer transition-all overflow-hidden flex-shrink-0 bg-white group ${state.activeSlideId === slide.id ? 'border-emerald-500 ring-4 ring-emerald-500/10 scale-105 shadow-2xl z-10' : 'border-slate-800 grayscale hover:grayscale-0 hover:border-slate-600'}`}>
                <div className="absolute inset-0 opacity-40 scale-[0.125] origin-top-right w-[800px] h-[1000px] pointer-events-none group-hover:opacity-60 transition-opacity"><SlideCanvas content={slide} /></div>
                <div className="absolute bottom-2 right-2 bg-emerald-600 px-2 py-0.5 rounded-lg text-[10px] font-black text-white shadow-lg">{index + 1}</div>
             </div>
           ))}
           <button onClick={handleAddSlide} className="min-w-[100px] h-[110px] border-2 border-dashed border-slate-800 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-slate-800/50 hover:border-slate-600 transition-all flex-shrink-0 text-slate-700 group"><span className="text-3xl group-hover:text-emerald-500 transition-colors">+</span><span className="text-[9px] font-black uppercase tracking-widest group-hover:text-emerald-500 transition-colors">إضافة شريحة</span></button>
        </div>
      </div>
    </div>
  );
};

export default App;
