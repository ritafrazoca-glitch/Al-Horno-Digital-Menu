/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Globe, 
  Flame, 
  Utensils, 
  Beer, 
  BookOpen, 
  History,
  Star,
  ArrowRight,
  Menu
} from 'lucide-react';
import { 
  Language, 
  EMPANADAS, 
  DRINKS, 
  MENUS, 
  TASTING_MENUS, 
  UI_TEXT 
} from './data';
import { cn } from './lib/utils';

type View = 'language' | 'home' | 'empanadas' | 'drinks' | 'menus' | 'history';

export default function App() {
  const [lang, setLang] = useState<Language | null>(null);
  const [view, setView] = useState<View>('language');

  // Handle language selection
  const selectLanguage = (l: Language) => {
    setLang(l);
    setView('home');
    window.scrollTo(0, 0);
  };

  // Handle navigation
  const navigateTo = (v: View) => {
    setView(v);
    window.scrollTo(0, 0);
  };

  const goBack = () => {
    if (view === 'home') {
      setView('language');
      setLang(null);
    } else {
      setView('home');
    }
    window.scrollTo(0, 0);
  };

  if (!lang || view === 'language') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-brand-bg">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="text-center mb-6"
        >
          <div className="relative w-24 h-24 mx-auto mb-3 flex items-center justify-center">
            <img 
              src="/logo.png" 
              alt="Al' Horno Logo" 
              className="max-w-full max-h-full object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (target.src.includes('logo.png.png')) {
                   target.src = "https://cdn-icons-png.flaticon.com/512/1041/1041916.png";
                } else {
                   target.src = "/logo.png.png"; // Try the double extension as fallback
                }
              }}
            />
          </div>
          <h1 className="text-2xl font-bold text-brand-primary mb-0.5 tracking-tighter">MENU</h1>
          <p className="text-base font-medium text-brand-text/40 uppercase tracking-[0.2em]">Al' Horno</p>
        </motion.div>

        <div className="w-full max-w-xs space-y-2.5">
          <div className="flex flex-col items-center gap-1 mb-4">
            <Globe size={18} className="text-brand-primary/40" />
            <p className="text-center text-brand-text/60 text-[9px] font-semibold uppercase tracking-widest">
              {UI_TEXT.chooseLanguage.pt} / {UI_TEXT.chooseLanguage.en}
            </p>
          </div>
          
          <LanguageButton onClick={() => selectLanguage('pt')} flag="🇵🇹" label="Português" />
          <LanguageButton onClick={() => selectLanguage('en')} flag="🇬🇧" label="English" />
          <LanguageButton onClick={() => selectLanguage('es')} flag="🇪🇸" label="Español" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-brand-bg/90 backdrop-blur-xl border-b border-brand-accent/10 px-4 py-1.5 flex items-center justify-between">
        <button 
          onClick={goBack}
          className="p-1 rounded-full hover:bg-brand-accent/10 transition-colors text-brand-primary"
        >
          <ArrowLeft size={20} strokeWidth={1.5} />
        </button>
        
        <div className="flex items-center gap-2">
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="h-5 w-auto object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (target.src.includes('logo.png.png')) {
                 target.style.display = 'none';
              } else {
                 target.src = "/logo.png.png";
              }
            }}
          />
          <h2 className="font-bold text-brand-primary tracking-tight text-sm uppercase">Al' Horno</h2>
        </div>

        <button 
          onClick={() => setView('language')}
          className="p-2 rounded-full hover:bg-brand-accent/10 transition-colors text-brand-primary"
        >
          <Globe size={20} strokeWidth={1.5} />
        </button>
      </header>

      <main className="px-4 pt-3 max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3"
            >
              <div className="text-center">
                <motion.div 
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="mb-3"
                >
                  <img 
                    src="/logo.png" 
                    alt="Al' Horno Logo" 
                    className="w-20 h-auto mx-auto"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src.includes('logo.png.png')) {
                         target.src = "https://cdn-icons-png.flaticon.com/512/1041/1041916.png";
                      } else {
                         target.src = "/logo.png.png";
                      }
                    }}
                  />
                </motion.div>
                <h1 className="text-lg font-bold text-brand-text mb-0.5 tracking-tight">Al' Horno Empanadas</h1>
                <p className="text-brand-text/60 italic font-medium text-[10px]">{UI_TEXT.tagline[lang]}</p>
              </div>

              <div className="grid grid-cols-1 gap-2">
                <MenuButton 
                  icon={<Menu size={16} strokeWidth={1.5} />} 
                  label={UI_TEXT.sections.empanadas[lang]} 
                  onClick={() => navigateTo('empanadas')} 
                  primary
                />
                <MenuButton 
                  icon={<Beer size={16} strokeWidth={1.5} />} 
                  label={UI_TEXT.sections.drinks[lang]} 
                  onClick={() => navigateTo('drinks')} 
                />
                <MenuButton 
                  icon={<BookOpen size={16} strokeWidth={1.5} />} 
                  label={UI_TEXT.sections.menus[lang]} 
                  onClick={() => navigateTo('menus')} 
                />
                <MenuButton 
                  icon={<History size={16} strokeWidth={1.5} />} 
                  label={UI_TEXT.sections.history[lang]} 
                  onClick={() => navigateTo('history')} 
                />
              </div>
            </motion.div>
          )}

          {view === 'empanadas' && (
            <motion.div
              key="empanadas"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-2.5"
            >
              <SectionHeader title={UI_TEXT.sections.empanadas[lang]} />
              
              <div className="grid grid-cols-1 gap-2">
                {EMPANADAS.map((item) => (
                  <div key={item.code} className="glass-card p-2 relative overflow-hidden group">
                    {item.popular && (
                      <div className="absolute top-0 right-0 bg-brand-primary text-white text-[6px] font-bold px-1 py-0.5 rounded-bl-md flex items-center gap-0.5">
                        <Star size={6} fill="currentColor" />
                        {UI_TEXT.mostPopular[lang]}
                      </div>
                    )}
                    <div className="flex gap-2 items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold text-xs shadow-inner">
                        {item.code}
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className="flex items-center gap-1 flex-wrap">
                          <h3 className="font-bold text-[13px] text-brand-text leading-tight">{item.name[lang]}</h3>
                          <div className="flex gap-0.5 text-[10px]">
                            {item.spicy && <span title="Picante">🌶️</span>}
                            {item.vegetarian && <span title="Vegetariano">🥬</span>}
                          </div>
                        </div>
                        <p className="text-[10px] text-brand-text/70 leading-snug mt-0.5">
                          {item.description[lang]}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {view === 'drinks' && (
            <motion.div
              key="drinks"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-3"
            >
              <SectionHeader title={UI_TEXT.sections.drinks[lang]} />
              
              {DRINKS.map((category, idx) => (
                <div key={idx} className="space-y-1">
                  <h3 className="text-brand-primary font-bold text-[13px] border-b border-brand-accent/30 pb-0.5 flex items-center gap-2">
                    {category.title[lang]}
                  </h3>
                  <div className="space-y-0.5">
                    {category.items.map((item, i) => (
                      <div key={i} className="flex justify-between items-center py-0.5 border-b border-brand-accent/10 last:border-0">
                        <span className="text-[11px] font-medium text-brand-text">{item.name[lang]}</span>
                        <span className="text-[11px] font-bold text-brand-primary">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {view === 'menus' && (
            <motion.div
              key="menus"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-3"
            >
              <SectionHeader title={UI_TEXT.sections.menus[lang]} />
              
              <div className="space-y-2">
                {MENUS.map((menu, idx) => (
                  <div key={idx} className="glass-card p-2.5 border-l-4 border-brand-primary">
                    <div className="flex justify-between items-start mb-0.5">
                      <h3 className="font-bold text-[15px] text-brand-text">{menu.title[lang]}</h3>
                      <span className="text-[15px] font-bold text-brand-primary">{menu.price}</span>
                    </div>
                    <p className="text-[11px] text-brand-text/70">{menu.details?.[lang]}</p>
                  </div>
                ))}
              </div>

              <div className="pt-1">
                <h3 className="text-brand-primary font-bold text-[13px] mb-1.5 flex items-center gap-2">
                  <Star size={12} /> {UI_TEXT.tastingMenus[lang]}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {TASTING_MENUS.map((menu, idx) => (
                    <div key={idx} className="glass-card p-2.5 bg-brand-accent/10 border-dashed border-2 border-brand-primary/30">
                      <h4 className="font-bold text-[13px] text-brand-text mb-0.5">{menu.title[lang]}</h4>
                      <p className="text-[9px] text-brand-text/60 mb-1">{menu.details?.[lang]}</p>
                      <div className="text-base font-bold text-brand-primary">{menu.price}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-2 bg-brand-accent/5 rounded-xl border border-brand-accent/20">
                <p className="text-[8px] text-brand-text/60 italic leading-relaxed text-center">
                  {UI_TEXT.menuNote[lang]}
                </p>
              </div>
            </motion.div>
          )}

          {view === 'history' && (
            <motion.div
              key="history"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <SectionHeader title={UI_TEXT.sections.history[lang]} />
              
              <div className="glass-card p-8 space-y-6">
                <div className="w-24 h-24 mx-auto rounded-full bg-brand-accent/20 flex items-center justify-center">
                  <History size={40} className="text-brand-primary" />
                </div>
                
                <div className="space-y-4 text-center">
                  <p className="text-lg leading-relaxed text-brand-text italic">
                    "{UI_TEXT.historyText[lang]}"
                  </p>
                  <div className="pt-4">
                    <p className="font-bold text-brand-primary">Tomás Gouveia</p>
                    <p className="text-sm text-brand-text/50">Azenhas do Mar</p>
                  </div>
                </div>
              </div>

              <div className="text-center pt-8">
                <img 
                  src="https://picsum.photos/seed/azenhas/800/400" 
                  alt="Azenhas do Mar" 
                  className="rounded-2xl shadow-lg w-full object-cover h-48 grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation (Quick access) */}
      {view !== 'home' && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-brand-accent/20 px-6 py-2 flex justify-around items-center z-50">
          <NavIcon icon={<Menu size={18} strokeWidth={1.5} />} active={view === 'empanadas'} onClick={() => navigateTo('empanadas')} />
          <NavIcon icon={<Beer size={18} strokeWidth={1.5} />} active={view === 'drinks'} onClick={() => navigateTo('drinks')} />
          <NavIcon icon={<BookOpen size={18} strokeWidth={1.5} />} active={view === 'menus'} onClick={() => navigateTo('menus')} />
          <NavIcon icon={<History size={18} strokeWidth={1.5} />} active={view === 'history'} onClick={() => navigateTo('history')} />
        </nav>
      )}
    </div>
  );
}

function LanguageButton({ onClick, flag, label }: { onClick: () => void, flag: string, label: string }) {
  return (
    <button 
      onClick={onClick} 
      className="w-full bg-white text-brand-text border border-brand-accent/30 p-3 rounded-2xl font-bold flex items-center justify-between shadow-sm active:scale-95 transition-all group hover:border-brand-primary"
    >
      <div className="flex items-center gap-2.5">
        <Globe size={16} strokeWidth={1.5} className="text-brand-primary/40" />
        <span className="text-[15px]">{label}</span>
      </div>
      <ArrowRight size={14} className="text-brand-accent group-hover:text-brand-primary transition-colors" />
    </button>
  );
}

function MenuButton({ icon, label, onClick, primary = false }: { icon: React.ReactNode, label: string, onClick: () => void, primary?: boolean }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full p-2.5 rounded-2xl flex items-center justify-between transition-all active:scale-[0.98] group shadow-sm",
        primary ? "bg-brand-primary text-white" : "bg-white text-brand-text border border-brand-accent/30"
      )}
    >
      <div className="flex items-center gap-2">
        <div className={cn(
          "p-2 rounded-xl",
          primary ? "bg-white/20" : "bg-brand-primary/10 text-brand-primary"
        )}>
          {icon}
        </div>
        <span className="text-[15px] font-bold">{label}</span>
      </div>
      <ArrowRight size={14} className={cn(
        "transition-transform group-hover:translate-x-1",
        primary ? "text-white/60" : "text-brand-primary/60"
      )} />
    </button>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-3">
      <h1 className="text-lg font-bold text-brand-text tracking-tight">{title}</h1>
      <div className="h-1 w-6 bg-brand-primary mt-0.5 rounded-full"></div>
    </div>
  );
}

function NavIcon({ icon, active, onClick }: { icon: React.ReactNode, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "p-3 rounded-xl transition-all",
        active ? "bg-brand-primary text-white shadow-md scale-110" : "text-brand-text/40 hover:text-brand-primary hover:bg-brand-primary/5"
      )}
    >
      {icon}
    </button>
  );
}
