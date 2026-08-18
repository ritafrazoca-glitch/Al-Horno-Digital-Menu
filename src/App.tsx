/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Globe, 
  Flame, 
  Utensils, 
  Beer, 
  ArrowRight,
  MapPin,
  ExternalLink,
  Instagram,
  X,
  Copy,
  CheckCircle2,
  Gift,
  Mail,
  Download,
  Key,
  Wine,
  Leaf,
  PartyPopper,
  Info,
  Check,
  Clock
} from 'lucide-react';
import { db } from './lib/firebase';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { 
  Language, 
  EMPANADAS, 
  EXTRAS,
  DRINKS, 
  MENUS, 
  UI_TEXT, 
  ALLERGENS 
} from './data';
import { cn } from './lib/utils';

type View = 'language' | 'home' | 'empanadas' | 'drinks' | 'menus';

const UBER_EATS_URL = "https://www.ubereats.com/pt/store/al-horno/9JfmUE8GWs2ds3R9k3foiA?ps=1";

interface SubscriberLead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
  code: string;
}

export default function App() {
  const [lang, setLang] = useState<Language | null>(null);
  const [view, setView] = useState<View>('language');
  const [empanadaFilter, setEmpanadaFilter] = useState<'all' | 'classicas' | 'premium' | 'veg'>('all');
  const [showCopiedToast, setShowCopiedToast] = useState(false);
  const [showEmailCopied, setShowEmailCopied] = useState(false);

  // 10% Discount Pop-up State
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [discountClaimedCode, setDiscountClaimedCode] = useState<string | null>(null);
  const [discountForm, setDiscountForm] = useState({ name: '', email: '', phone: '' });
  const [formError, setFormError] = useState('');
  const [isSubmittingDiscount, setIsSubmittingDiscount] = useState(false);
  const [subscribers, setSubscribers] = useState<SubscriberLead[]>([]);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminPin, setAdminPin] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [pinError, setPinError] = useState('');
  const [logoClickCount, setLogoClickCount] = useState(0);

  // Check for ?admin in URL on load
  useEffect(() => {
    if (window.location.search.includes('admin=true') || window.location.search.includes('admin')) {
      setShowAdminModal(true);
    }
  }, []);

  const handleLogoSecretClick = () => {
    setLogoClickCount(prev => {
      const next = prev + 1;
      if (next >= 5) {
        setShowAdminModal(true);
        return 0;
      }
      return next;
    });
  };

  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPin.toLowerCase().trim() === 'alhorno' || adminPin.trim() === 'alhorno2026' || adminPin.trim() === '1234') {
      setIsAdminAuthenticated(true);
      setPinError('');
    } else {
      setPinError('PIN incorreto');
    }
  };

  // Sync subscribers and discount state with localStorage and Firebase Firestore
  useEffect(() => {
    const savedSubscribers = localStorage.getItem('alhorno_subscribers');
    if (savedSubscribers) {
      try {
        setSubscribers(JSON.parse(savedSubscribers));
      } catch (e) {
        console.error("Error loading subscribers", e);
      }
    }

    const savedClaimedCode = localStorage.getItem('alhorno_claimed_code');
    if (savedClaimedCode) {
      setDiscountClaimedCode(savedClaimedCode);
    }

    try {
      const q = query(collection(db, 'subscribers'), orderBy('createdAt', 'desc'));
      const unsubscribeSubscribers = onSnapshot(q, (snapshot) => {
        const firestoreSubscribers: SubscriberLead[] = snapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name || '',
          email: doc.data().email || '',
          phone: doc.data().phone || undefined,
          createdAt: doc.data().createdAt || new Date().toISOString(),
          code: doc.data().code || 'ALHORNO10'
        }));
        setSubscribers(firestoreSubscribers);
        localStorage.setItem('alhorno_subscribers', JSON.stringify(firestoreSubscribers));
      }, (err) => {
        console.warn('Firestore subscription cached:', err);
      });

      return () => {
        unsubscribeSubscribers();
      };
    } catch (err) {
      console.error('Error connecting to Firestore:', err);
    }
  }, []);

  const triggerDiscountPopupIfNeeded = () => {
    const dismissed = localStorage.getItem('alhorno_popup_dismissed');
    const claimed = localStorage.getItem('alhorno_claimed_code');
    if (!dismissed && !claimed) {
      setTimeout(() => {
        setShowDiscountModal(true);
      }, 700);
    }
  };

  const selectLanguage = (l: Language) => {
    setLang(l);
    setView('home');
    window.scrollTo(0, 0);
    triggerDiscountPopupIfNeeded();
  };

  const handleDismissPopup = () => {
    setShowDiscountModal(false);
    localStorage.setItem('alhorno_popup_dismissed', 'true');
  };

  const handleClaimDiscount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!discountForm.name.trim()) {
      setFormError('Por favor, indique o seu nome.');
      return;
    }
    if (!discountForm.email.trim() || !discountForm.email.includes('@')) {
      setFormError('Por favor, insira um e-mail válido.');
      return;
    }

    setFormError('');
    setIsSubmittingDiscount(true);
    const code = 'ALHORNO10';
    const createdAtIso = new Date().toISOString();
    const leadData = {
      name: discountForm.name.trim(),
      email: discountForm.email.trim(),
      phone: discountForm.phone.trim() || '',
      createdAt: createdAtIso,
      code
    };

    try {
      const docRef = await addDoc(collection(db, 'subscribers'), leadData);
      const newLead: SubscriberLead = {
        id: docRef.id,
        ...leadData,
        phone: leadData.phone || undefined
      };
      setSubscribers(prev => [newLead, ...prev.filter(s => s.id !== docRef.id)]);
      localStorage.setItem('alhorno_subscribers', JSON.stringify([newLead, ...subscribers]));
    } catch (err) {
      console.error('Error saving subscriber:', err);
      const newLead: SubscriberLead = {
        id: `lead_${Date.now()}`,
        ...leadData,
        phone: leadData.phone || undefined
      };
      setSubscribers(prev => [newLead, ...prev]);
      localStorage.setItem('alhorno_subscribers', JSON.stringify([newLead, ...subscribers]));
    } finally {
      setIsSubmittingDiscount(false);
    }

    setDiscountClaimedCode(code);
    localStorage.setItem('alhorno_claimed_code', code);
  };

  const handleExportCSV = () => {
    if (subscribers.length === 0) {
      alert('Não existem registos de subscrição.');
      return;
    }

    const headers = ['ID', 'Nome', 'Email', 'Telefone', 'Data/Hora', 'Codigo'];
    const rows = subscribers.map(s => [
      s.id,
      `"${s.name.replace(/"/g, '""')}"`,
      `"${s.email.replace(/"/g, '""')}"`,
      `"${s.phone || ''}"`,
      s.createdAt,
      s.code
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `alhorno_subscritores_10desconto_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyEventsEmail = () => {
    navigator.clipboard.writeText(UI_TEXT.events.email);
    setShowEmailCopied(true);
    setTimeout(() => setShowEmailCopied(false), 2000);
  };

  const navigateTo = (newView: View) => {
    setView(newView);
    window.scrollTo(0, 0);
  };

  const goBack = () => {
    if (view === 'home') {
      setView('language');
    } else {
      setView('home');
    }
  };

  const displayedEmpanadas = useMemo(() => {
    if (empanadaFilter === 'classicas') return EMPANADAS.filter(e => !e.premium);
    if (empanadaFilter === 'premium') return EMPANADAS.filter(e => e.premium);
    if (empanadaFilter === 'veg') return EMPANADAS.filter(e => e.vegetarian);
    return EMPANADAS;
  }, [empanadaFilter]);

  // View: Seleção de Idioma
  if (!lang || view === 'language') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#FAF7F2] text-[#2D1F1B] relative">
        <motion.div 
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-7"
        >
          {/* Authentic Logo Header Frame with Decorative Lines */}
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="h-px w-10 bg-[#542216]/30"></div>
            <div className="w-28 h-20 flex items-center justify-center">
              <img 
                src="/logo.png" 
                alt="Al'Horno" 
                className="max-w-full max-h-full object-contain drop-shadow-xs"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (!target.src.includes('logo.png.png')) {
                    target.src = "/logo.png.png";
                  }
                }}
              />
            </div>
            <div className="h-px w-10 bg-[#542216]/30"></div>
          </div>
        </motion.div>

        <div className="w-full max-w-xs space-y-2.5 z-10">
          <p className="text-center text-[#6B5B53] text-[10px] font-medium uppercase tracking-wider mb-2">
            {UI_TEXT.chooseLanguage.pt} / {UI_TEXT.chooseLanguage.en} / {UI_TEXT.chooseLanguage.es}
          </p>
          
          <LanguageButton onClick={() => selectLanguage('pt')} flag="🇵🇹" label="Português" />
          <LanguageButton onClick={() => selectLanguage('en')} flag="🇬🇧" label="English" />
          <LanguageButton onClick={() => selectLanguage('es')} flag="🇪🇸" label="Español" />
        </div>

        {/* Checkered Bottom Bar */}
        <div className="fixed bottom-0 left-0 right-0 h-4 checkered-pattern border-t border-[#542216]/20"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] pb-24 text-[#2D1F1B] font-sans antialiased selection:bg-[#542216]/15">
      {/* Authentic Header com Branding dos Menus Físicos */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DFD3] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {view !== 'home' ? (
            <button 
              onClick={goBack}
              className="p-2 -ml-2 rounded-lg hover:bg-[#EFE7DC] text-[#542216] transition-colors"
              aria-label="Voltar"
            >
              <ArrowLeft size={19} strokeWidth={2} />
            </button>
          ) : (
            <div className="w-7 h-7 rounded-full bg-[#542216] text-[#FAF7F2] flex items-center justify-center font-display font-bold text-[10px]">
              AH
            </div>
          )}
          
          <button 
            onClick={() => {
              navigateTo('home');
              handleLogoSecretClick();
            }} 
            className="flex items-center gap-2 text-left"
          >
            <span className="font-display font-semibold text-[#542216] tracking-tight text-base uppercase">
              Al'Horno
            </span>
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <button 
            onClick={() => setView('language')}
            className="px-2.5 py-1 rounded-full border border-[#D9CBB9] hover:bg-[#EFE7DC] transition-colors text-[#542216] flex items-center gap-1.5 text-xs font-medium"
            title="Mudar Idioma"
          >
            <Globe size={13} />
            <span className="uppercase text-[11px] font-semibold">{lang}</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="px-4 sm:px-6 pt-3.5 max-w-xl mx-auto">
        <AnimatePresence mode="wait">
          {/* 1. HOME VIEW */}
          {view === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="space-y-3.5 py-1"
            >
              {/* BRAND BANNER / IDENTITY HEADER */}
              <div className="text-center py-2 relative">
                <div className="flex items-center justify-center gap-2.5">
                  <div className="h-px w-8 bg-[#542216]/25"></div>
                  <div className="w-16 h-10 flex items-center justify-center">
                    <img 
                      src="/logo.png" 
                      alt="Al'Horno" 
                      className="max-h-full object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (!target.src.includes('logo.png.png')) {
                          target.src = "/logo.png.png";
                        }
                      }}
                    />
                  </div>
                  <div className="h-px w-8 bg-[#542216]/25"></div>
                </div>
              </div>

              {/* COMPACT & SLEEK 10% DISCOUNT CARD ("Pequena e Maneirinha") */}
              <div 
                onClick={() => setShowDiscountModal(true)}
                className="p-3 px-3.5 rounded-xl bg-white border-2 border-[#542216] text-[#2D1F1B] flex items-center justify-between gap-3 cursor-pointer shadow-xs hover:bg-[#FDFBF7] transition-all group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-[#542216] text-white flex items-center justify-center shrink-0">
                    <Gift size={14} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[12px] font-semibold tracking-tight text-[#542216] truncate">
                        {UI_TEXT.discount.bannerTitle[lang]}
                      </span>
                      <span className="text-[9px] font-bold bg-[#E85D04] text-white px-1.5 py-0.2 rounded-full shrink-0 uppercase tracking-wide">
                        -10%
                      </span>
                    </div>
                    <p className="text-[11px] text-[#6B5B53] font-normal truncate">
                      {UI_TEXT.discount.bannerSubtitle[lang]}
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-medium text-[#542216] bg-[#F5ECD7] px-2.5 py-1 rounded-md shrink-0 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  {discountClaimedCode ? 'Ver Código' : 'Obter'}
                  <ArrowRight size={12} />
                </span>
              </div>

              {/* UBER EATS CARD (Official Branded Colors & Clear Contrast) */}
              <a 
                href={UBER_EATS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-[#06C167] text-[#000000] flex items-center justify-between gap-3 shadow-xs hover:opacity-95 transition-opacity group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center shrink-0 font-display font-bold text-[11px]">
                    Uber
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-bold uppercase tracking-wider bg-black text-[#06C167] px-1.5 py-0.2 rounded">
                        {UI_TEXT.ubereats.badge[lang]}
                      </span>
                      <span className="text-xs font-bold text-black">
                        {UI_TEXT.ubereats.title[lang]}
                      </span>
                    </div>
                    <p className="text-[11px] font-normal text-black/85">
                      {UI_TEXT.ubereats.subtitle[lang]}
                    </p>
                  </div>
                </div>
                <div className="p-1.5 rounded-lg bg-black text-[#06C167] group-hover:translate-x-0.5 transition-transform shrink-0">
                  <ExternalLink size={13} />
                </div>
              </a>

              {/* Menu Navigation Cards - Aligned with Physical Menu Design */}
              <div className="space-y-2 pt-1">
                <MenuNavigationCard 
                  title={UI_TEXT.sections.empanadas[lang]} 
                  description="19 variedades autênticas: 10 Clássicas e 9 Premium, com opções de carne, queijo e vegetarianas."
                  icon={<Flame size={17} className="text-[#542216]" />}
                  badge="19 Variedades"
                  onClick={() => navigateTo('empanadas')} 
                />
                <MenuNavigationCard 
                  title={UI_TEXT.sections.drinks[lang]} 
                  description="Águas, sumos frescos, refrigerantes, cervejas e seleção da carta de vinhos."
                  icon={<Beer size={17} className="text-[#542216]" />}
                  onClick={() => navigateTo('drinks')} 
                />
                <MenuNavigationCard 
                  title={UI_TEXT.sections.menus[lang]} 
                  description="Combos de 3, 6 e 12 empanadas com bebidas para partilhar."
                  icon={<Utensils size={17} className="text-[#542216]" />}
                  onClick={() => navigateTo('menus')} 
                />
              </div>

              {/* CARD: FESTAS & EVENTOS (Refined, Natural & Elegant Portuguese Copy) */}
              <div className="p-4 rounded-xl bg-white border border-[#E8DFD3] space-y-2.5 shadow-2xs relative overflow-hidden">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded-md bg-[#542216]/10 text-[#542216]">
                    <PartyPopper size={15} />
                  </span>
                  <h3 className="font-display font-semibold text-sm text-[#542216]">
                    {UI_TEXT.events.title[lang]}
                  </h3>
                </div>

                <p className="text-xs text-[#542216]/85 leading-relaxed font-normal">
                  {UI_TEXT.events.text[lang]}
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <a
                    href={`mailto:${UI_TEXT.events.email}?subject=Empanadas%20Al'Horno%20para%20Festa/Evento`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#542216] text-[#FAF7F2] text-xs font-medium hover:bg-[#431A11] transition-colors"
                  >
                    <Mail size={13} />
                    <span>{UI_TEXT.events.email}</span>
                  </a>
                  <button
                    onClick={handleCopyEventsEmail}
                    className="px-2.5 py-1.5 rounded-lg bg-[#F5ECD7] text-[#542216] hover:bg-[#EFE2C5] text-xs font-medium flex items-center gap-1 transition-colors"
                    title="Copiar E-mail"
                  >
                    {showEmailCopied ? <Check size={13} className="text-emerald-700" /> : <Copy size={13} />}
                    <span>{showEmailCopied ? 'Copiado!' : 'Copiar'}</span>
                  </button>
                </div>
              </div>

              {/* Compact Quick Icons at Bottom of Main Menu (Instagram & Google Maps) */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <a
                  href="https://www.instagram.com/al.horno_pt/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram @al.horno_pt"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-[#E8DFD3] text-[#2D1F1B] hover:border-[#542216] hover:bg-[#FAF7F2] transition-all text-xs shadow-2xs group"
                >
                  <Instagram size={16} className="text-[#E1306C] group-hover:scale-110 transition-transform" />
                  <span className="font-medium text-[11px]">Instagram</span>
                </a>

                <a
                  href="https://maps.app.goo.gl/6ubZDrxZgMDRBUGL7"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Google Maps Aldeia da Praia"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-[#E8DFD3] text-[#2D1F1B] hover:border-[#542216] hover:bg-[#FAF7F2] transition-all text-xs shadow-2xs group"
                >
                  <MapPin size={16} className="text-[#E85D04] group-hover:scale-110 transition-transform" />
                  <span className="font-medium text-[11px]">Aldeia da Praia</span>
                </a>
              </div>
            </motion.div>
          )}

          {/* 2. EMPANADAS VIEW */}
          {view === 'empanadas' && (
            <motion.div
              key="empanadas"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-4"
            >
              {/* Header com Estilo da Ementa Física */}
              <div className="text-center py-1">
                <div className="inline-block px-5 py-1 rounded-full bg-[#542216] text-[#FAF7F2] font-display font-semibold text-xs tracking-wider uppercase">
                  {UI_TEXT.sections.empanadas[lang]}
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs justify-center sm:justify-start">
                <button
                  onClick={() => setEmpanadaFilter('all')}
                  className={cn(
                    "px-3 py-1 rounded-full font-medium transition-all whitespace-nowrap text-xs",
                    empanadaFilter === 'all' 
                      ? "bg-[#542216] text-white" 
                      : "bg-white border border-[#D9CBB9] text-[#6B5B53] hover:border-[#542216]"
                  )}
                >
                  Todas ({EMPANADAS.length})
                </button>
                <button
                  onClick={() => setEmpanadaFilter('classicas')}
                  className={cn(
                    "px-3 py-1 rounded-full font-medium transition-all whitespace-nowrap text-xs",
                    empanadaFilter === 'classicas' 
                      ? "bg-[#542216] text-white" 
                      : "bg-white border border-[#D9CBB9] text-[#6B5B53] hover:border-[#542216]"
                  )}
                >
                  Clássicas
                </button>
                <button
                  onClick={() => setEmpanadaFilter('premium')}
                  className={cn(
                    "px-3 py-1 rounded-full font-medium transition-all whitespace-nowrap text-xs",
                    empanadaFilter === 'premium' 
                      ? "bg-[#542216] text-white" 
                      : "bg-white border border-[#D9CBB9] text-[#6B5B53] hover:border-[#542216]"
                  )}
                >
                  Premium
                </button>
                <button
                  onClick={() => setEmpanadaFilter('veg')}
                  className={cn(
                    "px-3 py-1 rounded-full font-medium transition-all whitespace-nowrap text-xs",
                    empanadaFilter === 'veg' 
                      ? "bg-[#542216] text-white" 
                      : "bg-white border border-[#D9CBB9] text-[#6B5B53] hover:border-[#542216]"
                  )}
                >
                  Vegetarianas 🥬
                </button>
              </div>

              {/* Empanadas List - Crisp Light Font & Clean Framing */}
              <div className="space-y-2.5">
                {displayedEmpanadas.map((emp) => (
                  <div
                    key={emp.code}
                    className="p-3.5 rounded-xl bg-white border border-[#E8DFD3] hover:border-[#542216]/40 transition-colors space-y-1.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-6 rounded-full bg-[#F5ECD7] text-[#542216] flex items-center justify-center font-bold text-[11px] font-mono shrink-0">
                          {emp.code}
                        </span>
                        <h3 className="font-display font-semibold text-sm text-[#2D1F1B]">
                          {emp.name[lang]}
                        </h3>
                        {emp.spicy && <span title="Picante" className="text-xs">🌶️</span>}
                        {emp.vegetarian && <span title="Vegetariana" className="text-xs">🥬</span>}
                      </div>

                      {emp.premium && (
                        <div className="flex items-center shrink-0">
                          <span className="text-[10px] font-semibold text-[#542216] bg-[#F5ECD7] px-2 py-0.5 rounded-full">
                            Premium
                          </span>
                        </div>
                      )}
                    </div>

                    <p className="text-xs text-[#5C4D46] leading-relaxed pl-9 font-normal">
                      {emp.description[lang]}
                    </p>

                    <div className="pl-9 flex items-center gap-1.5 pt-0.5 text-[10px] text-[#8C7B71]">
                      <span className="font-medium">Alergénios:</span>
                      {emp.allergens.map(a => (
                        <span key={a} className="bg-[#FAF7F2] border border-[#E8DFD3] px-1.5 py-0.2 rounded font-mono font-semibold text-[#542216]">
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* EXTRA: Molho Chimichurri Artesanal */}
              <div className="pt-1">
                <div className="p-4 rounded-xl bg-[#FBF9F5] border-2 border-[#542216] space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#542216] uppercase tracking-wider">
                    <Leaf size={14} />
                    <span>{UI_TEXT.extrasTitle[lang]}</span>
                  </div>

                  {EXTRAS.map((extra) => (
                    <div key={extra.id} className="space-y-0.5">
                      <h4 className="font-display font-semibold text-sm text-[#2D1F1B]">
                        {extra.name[lang]}
                      </h4>
                      <p className="text-xs text-[#5C4D46] leading-relaxed font-normal">
                        {extra.description[lang]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Alergénios Legenda */}
              <div className="p-3.5 rounded-xl bg-white border border-[#E8DFD3] space-y-2 text-xs">
                <div className="flex items-center gap-1.5 font-semibold text-[#542216] uppercase text-[11px]">
                  <Info size={13} />
                  <span>Legenda de Alergénios</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[11px] text-[#6B5B53] font-normal">
                  {ALLERGENS.map(a => (
                    <div key={a.code} className="flex items-center gap-1.5">
                      <span className="font-semibold font-mono text-[#542216] bg-[#F5ECD7] px-1 rounded text-[10px]">
                        {a.code}
                      </span>
                      <span>{a.name[lang]}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-[#8C7B71] pt-1 border-t border-[#E8DFD3] leading-relaxed">
                  {UI_TEXT.allergenWarning[lang]}
                </p>
              </div>
            </motion.div>
          )}

          {/* 3. DRINKS VIEW (Exact match to physical menus) */}
          {view === 'drinks' && (
            <motion.div
              key="drinks"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-4"
            >
              <div className="text-center space-y-1 py-1">
                <div className="inline-block px-5 py-1 rounded-full bg-[#542216] text-[#FAF7F2] font-display font-semibold text-xs tracking-wider uppercase">
                  {UI_TEXT.sections.drinks[lang]}
                </div>
              </div>

              <div className="space-y-4">
                {DRINKS.map((category, idx) => (
                  <div key={idx} className="space-y-2">
                    <h3 className="font-display font-semibold text-xs uppercase tracking-wider text-[#542216] px-1">
                      {category.title[lang]}
                    </h3>

                    <div className="grid grid-cols-1 gap-1.5">
                      {category.items.map((drink) => (
                        <div 
                          key={drink.id}
                          className="p-3 rounded-xl bg-white border border-[#E8DFD3] flex items-center justify-between text-xs font-medium text-[#2D1F1B]"
                        >
                          <span>{drink.name[lang]}</span>
                          {drink.premium && (
                            <span className="text-[10px] text-[#542216] bg-[#F5ECD7] px-2 py-0.5 rounded-full font-normal">
                              Especial
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* NOTA DE CARTA DE VINHOS */}
                <div className="p-4 rounded-xl bg-[#FBF9F5] border border-[#D9CBB9] space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#542216] uppercase tracking-wide">
                    <Wine size={15} />
                    <span>{UI_TEXT.wineNote.title[lang]}</span>
                  </div>
                  <p className="text-xs text-[#5C4D46] leading-relaxed font-normal">
                    {UI_TEXT.wineNote.description[lang]}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* 4. MENUS VIEW */}
          {view === 'menus' && (
            <motion.div
              key="menus"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-4"
            >
              <div className="text-center space-y-1 py-1">
                <div className="inline-block px-5 py-1 rounded-full bg-[#542216] text-[#FAF7F2] font-display font-semibold text-xs tracking-wider uppercase">
                  {UI_TEXT.sections.menus[lang]}
                </div>
                <p className="text-xs text-[#6B5B53] font-normal pt-1">
                  Combinações ideais para refeições individuais ou partilha.
                </p>
              </div>

              <div className="space-y-2.5">
                {MENUS.map((menu) => (
                  <div 
                    key={menu.id}
                    className="p-4 rounded-xl bg-white border border-[#E8DFD3] space-y-1"
                  >
                    <h3 className="font-display font-semibold text-sm text-[#2D1F1B]">
                      {menu.title[lang]}
                    </h3>
                    <p className="text-xs text-[#5C4D46] font-normal">
                      {menu.details[lang]}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Minimalist Bottom Navigation Bar */}
      {view !== 'language' && (
        <nav className="fixed bottom-0 left-0 right-0 z-30 bg-[#FAF7F2]/95 backdrop-blur-md border-t border-[#E8DFD3] px-4 py-2">
          <div className="max-w-md mx-auto flex items-center justify-around">
            <MinimalNavIcon 
              icon={<Flame size={17} />} 
              active={view === 'empanadas'} 
              label="Empanadas" 
              onClick={() => navigateTo('empanadas')} 
            />
            <MinimalNavIcon 
              icon={<Beer size={17} />} 
              active={view === 'drinks'} 
              label="Bebidas" 
              onClick={() => navigateTo('drinks')} 
            />
            <MinimalNavIcon 
              icon={<Utensils size={17} />} 
              active={view === 'menus'} 
              label="Menus" 
              onClick={() => navigateTo('menus')} 
            />
          </div>
        </nav>
      )}

      {/* 10% Discount Pop-up Modal (Compact & Sleek / "Maneirinha") */}
      <AnimatePresence>
        {showDiscountModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-4 sm:p-5 max-w-xs sm:max-w-sm w-full shadow-lg relative border-2 border-[#542216]"
            >
              <button 
                onClick={handleDismissPopup}
                className="absolute top-3.5 right-3.5 p-1 rounded-md hover:bg-[#FAF7F2] text-[#8C7B71] transition-colors"
                aria-label="Fechar"
              >
                <X size={16} />
              </button>

              {!discountClaimedCode ? (
                <div className="space-y-3 pt-0.5">
                  <div className="text-center space-y-0.5">
                    <span className="text-[9.5px] font-semibold uppercase tracking-wider text-[#542216] block">
                      Oferta ao Balcão
                    </span>
                    <h3 className="font-display font-semibold text-sm text-[#2D1F1B]">
                      {UI_TEXT.discount.modalTitle[lang || 'pt']}
                    </h3>
                    <p className="text-[11px] text-[#6B5B53] leading-snug font-normal">
                      {UI_TEXT.discount.modalDescription[lang || 'pt']}
                    </p>
                  </div>

                  <form onSubmit={handleClaimDiscount} className="space-y-2">
                    <div>
                      <label className="block text-[9.5px] font-semibold uppercase tracking-wider text-[#542216] mb-0.5">
                        Nome *
                      </label>
                      <input
                        type="text"
                        required
                        value={discountForm.name}
                        onChange={(e) => setDiscountForm({ ...discountForm, name: e.target.value })}
                        placeholder="O seu nome"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-[#D9CBB9] text-xs focus:outline-none focus:border-[#542216] bg-[#FAF7F2] text-[#2D1F1B]"
                      />
                    </div>

                    <div>
                      <label className="block text-[9.5px] font-semibold uppercase tracking-wider text-[#542216] mb-0.5">
                        E-mail *
                      </label>
                      <input
                        type="email"
                        required
                        value={discountForm.email}
                        onChange={(e) => setDiscountForm({ ...discountForm, email: e.target.value })}
                        placeholder="email@exemplo.pt"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-[#D9CBB9] text-xs focus:outline-none focus:border-[#542216] bg-[#FAF7F2] text-[#2D1F1B]"
                      />
                    </div>

                    <div>
                      <label className="block text-[9.5px] font-semibold uppercase tracking-wider text-[#542216] mb-0.5">
                        Telemóvel (Opcional)
                      </label>
                      <input
                        type="tel"
                        value={discountForm.phone}
                        onChange={(e) => setDiscountForm({ ...discountForm, phone: e.target.value })}
                        placeholder="912 345 678"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-[#D9CBB9] text-xs focus:outline-none focus:border-[#542216] bg-[#FAF7F2] text-[#2D1F1B]"
                      />
                    </div>

                    {formError && (
                      <p className="text-red-600 text-[11px] text-center font-medium">{formError}</p>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmittingDiscount}
                      className="w-full mt-1.5 py-2 rounded-lg bg-[#542216] text-[#FAF7F2] font-semibold text-xs uppercase tracking-wider hover:bg-[#431A11] transition-colors"
                    >
                      {isSubmittingDiscount ? 'A gerar...' : 'Obter Código (10%)'}
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center space-y-3 py-1">
                  <div className="w-8 h-8 mx-auto rounded-full bg-[#EBF7EE] text-[#1E7E34] flex items-center justify-center">
                    <CheckCircle2 size={18} />
                  </div>

                  <div>
                    <span className="text-[9.5px] font-semibold uppercase tracking-wider text-[#1E7E34] block">
                      Código Ativo
                    </span>
                    <h3 className="font-display font-semibold text-sm text-[#2D1F1B] mt-0.5">
                      10% de Desconto Presencial
                    </h3>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#FAF7F2] border border-[#D9CBB9] font-mono text-center">
                    <p className="text-[9px] text-[#542216] font-medium uppercase tracking-wider">Apresente no balcão:</p>
                    <p className="text-lg font-bold text-[#2D1F1B] tracking-widest mt-0.5">{discountClaimedCode}</p>
                  </div>

                  <p className="text-[10.5px] text-[#6B5B53] leading-tight font-normal">
                    Válido exclusivamente para compras presenciais ao balcão durante 1 semana.
                  </p>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(discountClaimedCode);
                      setShowCopiedToast(true);
                      setTimeout(() => setShowCopiedToast(false), 2000);
                    }}
                    className="w-full py-2 rounded-lg bg-[#542216] text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-[#431A11] transition-colors"
                  >
                    <Copy size={13} />
                    {showCopiedToast ? 'Copiado!' : 'Copiar Código'}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Admin Subscritores Modal (PIN Protected & Hidden from Visitors) */}
      <AnimatePresence>
        {showAdminModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-5 max-w-md w-full max-h-[85vh] flex flex-col shadow-xl border border-[#E8DFD3]"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#E8DFD3]">
                <div className="flex items-center gap-2">
                  <Key size={16} className="text-[#542216]" />
                  <h3 className="font-display font-semibold text-sm text-[#2D1F1B]">Área de Gestão Interna</h3>
                </div>
                <button 
                  onClick={() => {
                    setShowAdminModal(false);
                    setIsAdminAuthenticated(false);
                    setAdminPin('');
                    setPinError('');
                  }}
                  className="p-1 rounded-md hover:bg-[#FAF7F2] text-[#8C7B71]"
                >
                  <X size={18} />
                </button>
              </div>

              {!isAdminAuthenticated ? (
                <form onSubmit={handleAdminAuth} className="py-6 space-y-4">
                  <div className="text-center space-y-1">
                    <p className="text-xs text-[#6B5B53] font-normal">
                      Introduza a palavra-passe ou PIN para aceder à lista de subscritores:
                    </p>
                  </div>

                  <div className="space-y-1.5 max-w-xs mx-auto">
                    <input
                      type="password"
                      placeholder="PIN / Palavra-passe"
                      value={adminPin}
                      onChange={(e) => {
                        setAdminPin(e.target.value);
                        setPinError('');
                      }}
                      className="w-full px-3 py-2 text-center text-sm rounded-lg border border-[#D9CBB9] focus:outline-none focus:border-[#542216]"
                      autoFocus
                    />
                    {pinError && (
                      <p className="text-xs text-red-600 text-center font-medium">{pinError}</p>
                    )}
                  </div>

                  <div className="flex justify-center pt-1">
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-lg bg-[#542216] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#431A11] transition-colors"
                    >
                      Aceder
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="py-2 border-b border-[#E8DFD3] flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#2D1F1B]">Subscritores 10% Desconto</span>
                    <span className="text-[11px] text-[#542216] bg-[#F5ECD7] px-2 py-0.5 rounded-full font-medium">
                      {subscribers.length} contactos
                    </span>
                  </div>

                  <div className="py-3 flex-grow overflow-y-auto space-y-2 max-h-[50vh]">
                    {subscribers.length === 0 ? (
                      <p className="text-xs text-center text-[#8C7B71] py-6 font-normal">Sem subscritores registados.</p>
                    ) : (
                      subscribers.map((s, idx) => (
                        <div key={s.id || idx} className="p-2.5 rounded-lg bg-[#FAF7F2] border border-[#E8DFD3] text-xs flex justify-between items-center">
                          <div>
                            <p className="font-semibold text-[#2D1F1B]">{s.name}</p>
                            <p className="text-[10px] text-[#6B5B53] font-mono">{s.email}</p>
                            {s.phone && <p className="text-[10px] text-[#542216] font-mono">{s.phone}</p>}
                          </div>
                          <span className="text-[10px] font-mono text-[#8C7B71]">
                            {new Date(s.createdAt).toLocaleDateString('pt-PT')}
                          </span>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="pt-3 border-t border-[#E8DFD3] flex gap-2">
                    <button
                      onClick={handleExportCSV}
                      disabled={subscribers.length === 0}
                      className="flex-1 py-2 rounded-lg bg-[#542216] text-white font-medium text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 disabled:opacity-50 hover:bg-[#431A11] transition-colors"
                    >
                      <Download size={13} />
                      Exportar CSV
                    </button>
                    <button
                      onClick={() => {
                        localStorage.removeItem('alhorno_popup_dismissed');
                        localStorage.removeItem('alhorno_claimed_code');
                        setDiscountClaimedCode(null);
                        setShowDiscountModal(true);
                        setShowAdminModal(false);
                        setIsAdminAuthenticated(false);
                      }}
                      className="py-2 px-3 rounded-lg bg-[#F5ECD7] text-[#542216] font-semibold text-xs uppercase hover:bg-[#EFE2C5] transition-colors"
                    >
                      Testar Pop-Up
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function LanguageButton({ onClick, flag, label }: { onClick: () => void, flag: string, label: string }) {
  return (
    <button 
      onClick={onClick} 
      className="w-full bg-white text-[#2D1F1B] border border-[#D9CBB9] p-3 rounded-xl font-medium text-sm flex items-center justify-between hover:border-[#542216] transition-colors"
    >
      <div className="flex items-center gap-2.5">
        <span>{flag}</span>
        <span>{label}</span>
      </div>
      <ArrowRight size={14} className="text-[#8C7B71]" />
    </button>
  );
}

function MenuNavigationCard({ 
  title, 
  description,
  icon,
  badge,
  onClick
}: { 
  title: string, 
  description?: string,
  icon?: React.ReactNode,
  badge?: string,
  onClick: () => void
}) {
  return (
    <button 
      onClick={onClick}
      className="w-full p-3.5 rounded-xl bg-white border border-[#E8DFD3] hover:border-[#542216] flex items-center justify-between text-left transition-all group shadow-2xs"
    >
      <div className="space-y-0.5 pr-2">
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-display font-semibold text-sm text-[#2D1F1B] block">{title}</span>
          {badge && (
            <span className="text-[9px] font-semibold text-[#542216] bg-[#F5ECD7] px-1.5 py-0.2 rounded-full uppercase tracking-wider">
              {badge}
            </span>
          )}
        </div>
        {description && (
          <p className="text-[11px] text-[#6B5B53] font-normal leading-relaxed line-clamp-1 pl-6">
            {description}
          </p>
        )}
      </div>
      <ArrowRight size={14} className="text-[#8C7B71] group-hover:text-[#542216] group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
    </button>
  );
}

function MinimalNavIcon({ 
  icon, 
  active, 
  onClick, 
  label 
}: { 
  icon: React.ReactNode, 
  active: boolean, 
  onClick: () => void, 
  label: string 
}) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-0.5 py-1 px-4 rounded-lg transition-colors",
        active ? "text-[#542216] font-semibold" : "text-[#8C7B71] hover:text-[#542216]"
      )}
    >
      {icon}
      <span className="text-[10px] tracking-tight">{label}</span>
    </button>
  );
}
