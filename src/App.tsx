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
  Menu,
  MapPin,
  Plus,
  Minus,
  ExternalLink
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
  const [selectedEmpanadas, setSelectedEmpanadas] = useState<Record<string, number>>({});

  const toggleEmpanada = (code: string, delta: number) => {
    setSelectedEmpanadas(prev => {
      const current = prev[code] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const { [code]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [code]: next };
    });
  };

  const totalSelected = Object.values(selectedEmpanadas).reduce((a: number, b: number) => a + b, 0) as number;

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
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-brand-bg">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="text-center mb-6"
        >
          <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
            <img 
              src="/logo.png" 
              alt="Al'Horno Logo" 
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
        </motion.div>

        <div className="w-full max-w-xs space-y-3.5">
          <div className="flex flex-col items-center mb-6">
            <p className="text-center text-brand-text/60 text-[10px] font-semibold uppercase tracking-widest">
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
      <header className="sticky top-0 z-50 bg-brand-bg/90 backdrop-blur-xl border-b border-brand-accent/10 px-4 py-3 flex items-center justify-between">
        <button 
          onClick={goBack}
          className="p-1.5 rounded-full hover:bg-brand-accent/10 transition-colors text-brand-primary"
        >
          <ArrowLeft size={22} strokeWidth={1.5} />
        </button>
        
        <div className="flex items-center gap-2">
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="h-6 w-auto object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (target.src.includes('logo.png.png')) {
                 target.style.display = 'none';
              } else {
                 target.src = "/logo.png.png";
              }
            }}
          />
          <h2 className="font-bold text-brand-primary tracking-tight text-base uppercase">Al'Horno</h2>
        </div>

        <button 
          onClick={() => setView('language')}
          className="p-2 rounded-full hover:bg-brand-accent/10 transition-colors text-brand-primary"
        >
          <Globe size={20} strokeWidth={1.5} />
        </button>
      </header>

      <main className="px-5 pt-8 max-w-2xl mx-auto min-h-[calc(100vh-120px)] flex flex-col">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-10 flex-grow flex flex-col justify-center py-4"
            >
              <div className="text-center">
                <motion.div 
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="mb-6"
                >
                  <img 
                    src="/logo.png" 
                    alt="Al'Horno Logo" 
                    className="w-28 h-auto mx-auto"
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
              </div>

              <div className="grid grid-cols-1 gap-3">
                <MenuButton 
                  icon={<Flame size={18} strokeWidth={1.5} />} 
                  label={UI_TEXT.sections.empanadas[lang]} 
                  onClick={() => navigateTo('empanadas')} 
                  primary
                />
                <MenuButton 
                  icon={<Beer size={18} strokeWidth={1.5} />} 
                  label={UI_TEXT.sections.drinks[lang]} 
                  onClick={() => navigateTo('drinks')} 
                />
                <MenuButton 
                  icon={<Utensils size={18} strokeWidth={1.5} />} 
                  label={UI_TEXT.sections.menus[lang]} 
                  onClick={() => navigateTo('menus')} 
                />
                <MenuButton 
                  icon={<History size={18} strokeWidth={1.5} />} 
                  label={UI_TEXT.sections.history[lang]} 
                  onClick={() => navigateTo('history')} 
                />
              </div>

              <div className="pt-4">
                <div className="glass-card p-5 border-t-4 border-brand-primary">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-brand-primary/10 rounded-xl text-brand-primary">
                      <MapPin size={20} />
                    </div>
                    <h3 className="font-bold text-brand-text">{UI_TEXT.location[lang]}</h3>
                  </div>
                  <a 
                    href="https://maps.app.goo.gl/1MmxxcokJV7iRKn17" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full bg-brand-primary text-white p-3 rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md"
                  >
                    <ExternalLink size={16} />
                    {UI_TEXT.openMaps[lang]}
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'empanadas' && (
            <motion.div
              key="empanadas"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4 pb-12"
            >
              <SectionHeader title={UI_TEXT.sections.empanadas[lang]} />
              
              <div className="p-3 bg-brand-primary/5 rounded-xl border border-brand-primary/20 mb-4">
                <p className="text-[10px] text-brand-primary font-medium text-center">
                  {UI_TEXT.prepNote[lang]}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {EMPANADAS.map((item) => (
                  <div 
                    key={item.code} 
                    onClick={() => toggleEmpanada(item.code, 1)}
                    className={cn(
                      "glass-card p-3 relative overflow-hidden group transition-all active:scale-[0.98] cursor-pointer",
                      selectedEmpanadas[item.code] ? "ring-2 ring-brand-primary bg-brand-primary/5" : ""
                    )}
                  >
                    {item.popular && (
                      <div className="absolute top-0 right-0 bg-brand-primary text-white text-[8px] font-bold px-1.5 py-0.5 rounded-bl-lg flex items-center gap-0.5">
                        <Star size={8} fill="currentColor" />
                        {UI_TEXT.mostPopular[lang]}
                      </div>
                    )}
                    <div className="flex gap-3 items-start">
                      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold text-sm shadow-inner">
                        {item.code}
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h3 className="font-bold text-sm text-brand-text leading-tight">{item.name[lang]}</h3>
                          <div className="flex gap-0.5 text-[10px]">
                            {item.spicy && <span title="Picante">🌶️</span>}
                            {item.vegetarian && <span title="Vegetariano">🥬</span>}
                          </div>
                        </div>
                        <p className="text-[11px] text-brand-text/70 leading-snug mt-1">
                          {item.description[lang]}
                        </p>
                      </div>
                      
                      {selectedEmpanadas[item.code] && (
                        <div className="flex flex-col items-center gap-1">
                          <div className="bg-brand-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                            {selectedEmpanadas[item.code]}
                          </div>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleEmpanada(item.code, -1);
                            }}
                            className="p-1 rounded-md bg-brand-accent/10 text-brand-primary hover:bg-brand-accent/20"
                          >
                            <Minus size={12} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {totalSelected > 0 && (
                <motion.div 
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  className="fixed bottom-20 left-4 right-4 z-40 flex flex-col gap-2"
                >
                  {totalSelected > 3 && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-brand-primary/20"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="p-2 bg-brand-primary/10 rounded-xl text-brand-primary">
                          <Star size={18} fill="currentColor" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-brand-text leading-tight">
                            {UI_TEXT.upsellTitle[lang as Language]}
                          </p>
                          <p className="text-[10px] text-brand-text/70 mt-0.5">
                            {UI_TEXT.upsellMessage[lang as Language]}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        <button 
                          onClick={() => navigateTo('menus')}
                          className="flex items-center justify-between p-2 bg-brand-primary/5 border border-brand-primary/10 rounded-xl text-[10px] font-bold text-brand-text hover:bg-brand-primary/10 transition-colors"
                        >
                          <span>{UI_TEXT.menuSuggestion6[lang as Language]}</span>
                          <ArrowRight size={12} className="text-brand-primary" />
                        </button>
                        <button 
                          onClick={() => navigateTo('menus')}
                          className="flex items-center justify-between p-2 bg-brand-primary/5 border border-brand-primary/10 rounded-xl text-[10px] font-bold text-brand-text hover:bg-brand-primary/10 transition-colors"
                        >
                          <span>{UI_TEXT.menuSuggestion12[lang as Language]}</span>
                          <ArrowRight size={12} className="text-brand-primary" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  <div className="bg-brand-primary text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center justify-between border border-white/20 backdrop-blur-md">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">
                        👉 {UI_TEXT.selectedCount[lang as Language].replace('{count}', totalSelected.toString())}
                      </span>
                    </div>
                    <button 
                      onClick={() => setSelectedEmpanadas({})}
                      className="text-[10px] uppercase tracking-widest font-bold bg-white/20 px-2 py-1 rounded-lg"
                    >
                      Limpar
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {view === 'drinks' && (
            <motion.div
              key="drinks"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <SectionHeader title={UI_TEXT.sections.drinks[lang]} />
              
              {DRINKS.map((category, idx) => (
                <div key={idx} className="space-y-2">
                  <h3 className="text-brand-primary font-bold text-sm border-b border-brand-accent/30 pb-1 flex items-center gap-2">
                    {category.title[lang]}
                  </h3>
                  <div className="space-y-1">
                    {category.items.map((item, i) => (
                      <div key={i} className="flex justify-between items-center py-1 border-b border-brand-accent/10 last:border-0">
                        <span className="text-xs font-medium text-brand-text">{item.name[lang]}</span>
                        <span className="text-xs font-bold text-brand-primary">{item.price}</span>
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
              className="space-y-6"
            >
              <SectionHeader title={UI_TEXT.sections.menus[lang]} />
              
              <div className="space-y-3">
                {MENUS.map((menu, idx) => (
                  <div key={idx} className="glass-card p-4 border-l-4 border-brand-primary">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-lg text-brand-text">{menu.title[lang]}</h3>
                      <span className="text-lg font-bold text-brand-primary">{menu.price}</span>
                    </div>
                    <p className="text-xs text-brand-text/70">{menu.details?.[lang]}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <h3 className="text-brand-primary font-bold text-sm mb-3 flex items-center gap-2">
                  <Star size={14} /> {UI_TEXT.tastingMenus[lang]}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {TASTING_MENUS.map((menu, idx) => (
                    <div key={idx} className="glass-card p-4 bg-brand-accent/10 border-dashed border-2 border-brand-primary/30">
                      <h4 className="font-bold text-sm text-brand-text mb-1">{menu.title[lang]}</h4>
                      <p className="text-[10px] text-brand-text/60 mb-2">{menu.details?.[lang]}</p>
                      <div className="text-lg font-bold text-brand-primary">{menu.price}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-brand-accent/5 rounded-xl border border-brand-accent/20">
                <p className="text-[9px] text-brand-text/60 italic leading-relaxed text-center">
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
        <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-brand-accent/20 px-6 py-3 flex justify-around items-center z-50">
          <NavIcon icon={<Flame size={20} strokeWidth={1.5} />} active={view === 'empanadas'} onClick={() => navigateTo('empanadas')} />
          <NavIcon icon={<Beer size={20} strokeWidth={1.5} />} active={view === 'drinks'} onClick={() => navigateTo('drinks')} />
          <NavIcon icon={<Utensils size={20} strokeWidth={1.5} />} active={view === 'menus'} onClick={() => navigateTo('menus')} />
          <NavIcon icon={<History size={20} strokeWidth={1.5} />} active={view === 'history'} onClick={() => navigateTo('history')} />
        </nav>
      )}
    </div>
  );
}

function LanguageButton({ onClick, flag, label }: { onClick: () => void, flag: string, label: string }) {
  return (
    <button 
      onClick={onClick} 
      className="w-full bg-white text-brand-text border border-brand-accent/30 p-4 rounded-2xl font-bold flex items-center justify-between shadow-sm active:scale-95 transition-all group hover:border-brand-primary"
    >
      <div className="flex items-center gap-3">
        <span className="text-base">{label}</span>
      </div>
      <ArrowRight size={16} className="text-brand-accent group-hover:text-brand-primary transition-colors" />
    </button>
  );
}

function MenuButton({ icon, label, onClick, primary = false }: { icon: React.ReactNode, label: string, onClick: () => void, primary?: boolean }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full p-3.5 rounded-2xl flex items-center justify-between transition-all active:scale-[0.98] group shadow-sm",
        primary ? "bg-brand-primary text-white" : "bg-white text-brand-text border border-brand-accent/30"
      )}
    >
      <div className="flex items-center gap-3">
        <div className={cn(
          "p-2 rounded-xl",
          primary ? "bg-white/20" : "bg-brand-primary/10 text-brand-primary"
        )}>
          {icon}
        </div>
        <span className="text-lg font-bold">{label}</span>
      </div>
      <ArrowRight size={16} className={cn(
        "transition-transform group-hover:translate-x-1",
        primary ? "text-white/60" : "text-brand-primary/60"
      )} />
    </button>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-5">
      <h1 className="text-xl font-bold text-brand-text tracking-tight">{title}</h1>
      <div className="h-1 w-8 bg-brand-primary mt-1 rounded-full"></div>
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
