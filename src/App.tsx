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
  History,
  Star,
  ArrowRight,
  MapPin,
  ExternalLink,
  Instagram,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Ticket,
  ChevronRight,
  Sparkles,
  ShoppingBag,
  Tag,
  X,
  LayoutList
} from 'lucide-react';
import { 
  Language, 
  EMPANADAS, 
  DRINKS, 
  MENUS, 
  TASTING_MENUS, 
  UI_TEXT,
  Empanada,
  Drink,
  MenuOption
} from './data';
import { cn } from './lib/utils';

type View = 'language' | 'home' | 'empanadas' | 'drinks' | 'menus' | 'history' | 'order' | 'ticket' | 'customize-menu';

interface CartItem {
  id: string;
  type: 'empanada' | 'drink' | 'menu' | 'tasting';
  name: { [key in Language]: string };
  price: number;
  quantity: number;
  flavors?: Record<string, number>;
  drinks?: Record<string, number>;
}

interface CustomizingMenu {
  menu: MenuOption;
  flavors: Record<string, number>;
  drinks: Record<string, number>;
  step: 'flavors' | 'drinks' | 'summary';
  isEditing?: boolean;
  cartId?: string;
}

export default function App() {
  const [lang, setLang] = useState<Language | null>(null);
  const [view, setView] = useState<View>('language');
  const [cart, setCart] = useState<Record<string, CartItem>>({});
  const [customizingMenu, setCustomizingMenu] = useState<CustomizingMenu | null>(null);

  // Sync with localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('alhorno_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Error loading cart", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('alhorno_cart', JSON.stringify(cart));
  }, [cart]);

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
    } else if (view === 'ticket') {
      setView('order');
    } else {
      setView('home');
    }
    window.scrollTo(0, 0);
  };

  const addToCart = (item: Empanada | Drink | MenuOption, type: CartItem['type']) => {
    const id = 'code' in item ? item.code : item.id;
    const price = (item as any).price && typeof (item as any).price === 'number' ? (item as any).price : 
                 ((item as any).numericPrice ? (item as any).numericPrice : 0);
    
    setCart(prev => {
      const existing = prev[id];
      if (existing) {
        return {
          ...prev,
          [id]: { ...existing, quantity: existing.quantity + 1 }
        };
      }
      return {
        ...prev,
        [id]: {
          id,
          type,
          name: 'name' in item ? item.name : (item as MenuOption).title,
          price,
          quantity: 1
        }
      };
    });

    // Simple haptic feedback if available
    if (window.navigator.vibrate) {
      window.navigator.vibrate(10);
    }
  };

  const removeFromCart = (id: string) => {
    setCart(prev => {
      const existing = prev[id];
      if (!existing) return prev;
      if (existing.quantity <= 1) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [id]: { ...existing, quantity: existing.quantity - 1 }
      };
    });
    
    if (window.navigator.vibrate) {
      window.navigator.vibrate(5);
    }
  };

  const clearCart = () => {
    if (confirm(UI_TEXT.cart.clear[lang as Language] + '?')) {
      setCart({});
    }
  };

  // Menu Customization
  const openCustomization = (menu: MenuOption, isEditing = false, cartId?: string) => {
    setCustomizingMenu({
      menu,
      flavors: isEditing && cartId ? { ...cart[cartId].flavors } : {},
      drinks: isEditing && cartId ? { ...cart[cartId].drinks } : {},
      step: 'flavors',
      isEditing,
      cartId
    });
    navigateTo('customize-menu' as View);
  };

  const addFlavor = (code: string) => {
    if (!customizingMenu) return;
    const currentCount = Object.values(customizingMenu.flavors).reduce((a, b) => (a as number) + (b as number), 0);
    if (currentCount >= customizingMenu.menu.capacity) return;

    setCustomizingMenu(prev => {
      if (!prev) return null;
      return {
        ...prev,
        flavors: {
          ...prev.flavors,
          [code]: (prev.flavors[code] || 0) + 1
        }
      };
    });
  };

  const removeFlavor = (code: string) => {
    setCustomizingMenu(prev => {
      if (!prev || !prev.flavors[code]) return prev;
      const newFlavors = { ...prev.flavors };
      if (newFlavors[code] <= 1) {
        delete newFlavors[code];
      } else {
        newFlavors[code]--;
      }
      return { ...prev, flavors: newFlavors };
    });
  };

  const addDrinkToMenu = (drinkId: string) => {
    if (!customizingMenu) return;
    
    setCustomizingMenu(prev => {
      if (!prev) return null;
      return {
        ...prev,
        drinks: {
          ...prev.drinks,
          [drinkId]: (prev.drinks[drinkId] || 0) + 1
        }
      };
    });
  };

  const removeDrinkFromMenu = (drinkId: string) => {
    setCustomizingMenu(prev => {
      if (!prev || !prev.drinks[drinkId]) return prev;
      const newDrinks = { ...prev.drinks };
      if (newDrinks[drinkId] <= 1) {
        delete newDrinks[drinkId];
      } else {
        newDrinks[drinkId]--;
      }
      return { ...prev, drinks: newDrinks };
    });
  };

  const autoFillFlavors = () => {
    if (!customizingMenu) return;
    const popularCodes = EMPANADAS.filter(e => e.popular).map(e => e.code);
    const result: Record<string, number> = {};
    let filled = 0;
    
    // Fill with popular flavors cyclically
    while (filled < customizingMenu.menu.capacity) {
      const code = popularCodes[filled % popularCodes.length];
      result[code] = (result[code] || 0) + 1;
      filled++;
    }

    setCustomizingMenu(prev => prev ? { ...prev, flavors: result } : null);
  };

  const confirmSelection = () => {
    if (!customizingMenu || !lang) return;
    const { menu, flavors, drinks, step, isEditing, cartId } = customizingMenu;
    
    if (step === 'flavors') {
      const currentCount = Object.values(flavors).reduce((a, b) => (a as number) + (b as number), 0);
      if (currentCount === menu.capacity) {
        if (menu.drinkCapacity > 0) {
          setCustomizingMenu(prev => prev ? { ...prev, step: 'drinks' } : null);
          window.scrollTo(0, 0);
          return;
        }
        setCustomizingMenu(prev => prev ? { ...prev, step: 'summary' } : null);
        window.scrollTo(0, 0);
        return;
      } else {
        return;
      }
    }

    if (step === 'drinks') {
      const currentDrinkCount = Object.values(drinks).reduce((a, b) => (a as number) + (b as number), 0);
      if (currentDrinkCount >= menu.drinkCapacity) {
        setCustomizingMenu(prev => prev ? { ...prev, step: 'summary' } : null);
        window.scrollTo(0, 0);
        return;
      } else {
        return;
      }
    }

    // Step is 'summary'
    const currentDrinkCountSummary = Object.values(drinks).reduce((a, b) => (a as number) + (b as number), 0);

    // Calculate price: Base Menu + [Premium Upcharges for Included] + [Full Price for Extras]
    // To give the best deal, we assign "included" slots to the most expensive drinks first
    let extraCost = 0;
    const allSelectedDrinks: Drink[] = [];
    Object.entries(drinks).forEach(([drinkId, count]) => {
      const drink = DRINKS.flatMap(c => c.items).find(d => d.id === drinkId);
      if (drink) {
        for (let i = 0; i < (count as number); i++) {
          allSelectedDrinks.push(drink);
        }
      }
    });

    // Sort by price descending to use slots for most expensive items
    allSelectedDrinks.sort((a, b) => b.numericPrice - a.numericPrice);

    allSelectedDrinks.forEach((drink, index) => {
      if (index < menu.drinkCapacity) {
        // Included Drink Slot
        if (drink.premium) {
          // Add difference from base drink price (2.5€)
          extraCost += (drink.numericPrice - 2.5);
        }
      } else {
        // Extra Drink (Beyond Capacity) - Full Price
        extraCost += drink.numericPrice;
      }
    });

    const type = menu.id.startsWith('m') ? 'menu' : 'tasting';
    const id = isEditing && cartId ? cartId : `${menu.id}_${Date.now()}`;

    setCart(prev => ({
      ...prev,
      [id]: {
        id,
        type,
        name: menu.title,
        price: menu.numericPrice + extraCost,
        quantity: isEditing && cartId ? prev[cartId].quantity : 1,
        flavors,
        drinks
      }
    }));

    setCustomizingMenu(null);
    navigateTo('order');
  };

  const currentSelectionCount = useMemo(() => {
    if (!customizingMenu) return 0;
    return Object.values(customizingMenu.flavors).reduce((a, b) => (a as number) + (b as number), 0);
  }, [customizingMenu]);

  const currentDrinkCount = useMemo(() => {
    if (!customizingMenu) return 0;
    return Object.values(customizingMenu.drinks).reduce((a, b) => (a as number) + (b as number), 0);
  }, [customizingMenu]);

  const customizingMenuPrice = useMemo(() => {
    if (!customizingMenu) return 0;
    const { menu, drinks } = customizingMenu;
    
    let extraCost = 0;
    const allSelectedDrinks: Drink[] = [];
    Object.entries(drinks).forEach(([drinkId, count]) => {
      const drink = DRINKS.flatMap(c => c.items).find(d => d.id === drinkId);
      if (drink) {
        for (let i = 0; i < (count as number); i++) {
          allSelectedDrinks.push(drink);
        }
      }
    });

    allSelectedDrinks.sort((a, b) => b.numericPrice - a.numericPrice);

    allSelectedDrinks.forEach((drink, index) => {
      if (index < menu.drinkCapacity) {
        if (drink.premium) {
          extraCost += (drink.numericPrice - 2.5);
        }
      } else {
        extraCost += drink.numericPrice;
      }
    });

    return menu.numericPrice + extraCost;
  }, [customizingMenu]);

  const cartTotal = useMemo(() => {
    return (Object.values(cart) as CartItem[]).reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }, [cart]);

  const totalItems = useMemo(() => {
    return (Object.values(cart) as CartItem[]).reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  // Suggestions logic
  const suggestions = useMemo(() => {
    const items = Object.values(cart) as CartItem[];
    const empanadaCount = items
      .filter(i => i.type === 'empanada')
      .reduce((acc, i) => acc + i.quantity, 0);
    const hasDrink = items.some(i => i.type === 'drink');
    const hasMenu = items.some(i => i.type === 'menu' || i.type === 'tasting');

    const result = [];
    if (empanadaCount >= 3 && !hasMenu) {
      result.push({
        id: 'suggest-menu',
        text: UI_TEXT.suggestions.menu,
        action: () => navigateTo('menus'),
        icon: <Utensils size={16} />
      });
    }
    if (empanadaCount > 0 && !hasDrink) {
      result.push({
        id: 'suggest-drink',
        text: UI_TEXT.suggestions.drink,
        action: () => navigateTo('drinks'),
        icon: <Beer size={16} />
      });
    }
    return result;
  }, [cart, lang]);

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
    <div className={cn("min-h-screen bg-brand-bg", view !== 'ticket' && "pb-32")}>
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

      <main className="px-5 pt-8 max-w-2xl mx-auto flex flex-col min-h-full">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3 flex-grow flex flex-col justify-center py-4"
            >
               <MenuButton 
                  icon={<ShoppingBag size={18} strokeWidth={1.5} />} 
                  label={UI_TEXT.sections.order[lang]} 
                  onClick={() => navigateTo('order')} 
                  primary
                />
              <div className="grid grid-cols-1 gap-3">
                <MenuButton 
                  icon={<Flame size={18} strokeWidth={1.5} />} 
                  label={UI_TEXT.sections.empanadas[lang]} 
                  onClick={() => navigateTo('empanadas')} 
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
                
                <a 
                  href="https://www.instagram.com/al.horno_pt/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full p-3.5 rounded-2xl flex items-center justify-between transition-all active:scale-[0.98] group shadow-sm bg-gradient-to-r from-purple-600 to-pink-500 text-white mt-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-white/20">
                      <Instagram size={18} strokeWidth={1.5} />
                    </div>
                    <span className="text-lg font-bold">{UI_TEXT.takeaway[lang as Language]}</span>
                  </div>
                  <ExternalLink size={16} className="text-white/60 transition-transform group-hover:translate-x-1" />
                </a>
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
                    className="glass-card p-3 relative overflow-hidden group transition-all"
                  >
                    {item.popular && (
                      <div className="absolute top-0 right-12 bg-brand-primary text-white text-[8px] font-bold px-1.5 py-0.5 rounded-b-lg flex items-center gap-0.5 z-10">
                        <Star size={8} fill="currentColor" />
                        {UI_TEXT.mostPopular[lang]}
                      </div>
                    )}
                    <div className="flex gap-3 items-center">
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
                        <p className="text-[11px] text-brand-text/70 leading-snug mt-1 truncate">
                          {item.description[lang]}
                        </p>
                      </div>
                      <div className="flex-shrink-0 flex items-center gap-2 bg-brand-accent/5 p-1 rounded-xl border border-brand-accent/10">
                        <button 
                          onClick={() => removeFromCart(item.code)}
                          className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
                            cart[item.code] ? "bg-white text-brand-primary shadow-sm active:scale-90" : "text-brand-text/20"
                          )}
                          disabled={!cart[item.code]}
                        >
                          <Minus size={16} />
                        </button>
                        <span className={cn(
                          "w-4 text-center font-bold text-sm tabular-nums",
                          cart[item.code] ? "text-brand-primary" : "text-brand-text/20"
                        )}>
                          {cart[item.code]?.quantity || 0}
                        </span>
                        <button 
                          onClick={() => addToCart(item, 'empanada')}
                          className="w-8 h-8 rounded-lg bg-brand-primary text-white flex items-center justify-center shadow-sm active:scale-90 transition-all"
                        >
                          <Plus size={16} />
                        </button>
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
              className="space-y-6 pb-12"
            >
              <SectionHeader title={UI_TEXT.sections.drinks[lang]} />
              
              {DRINKS.map((category, idx) => (
                <div key={idx} className="space-y-3">
                  <h3 className="text-brand-primary font-bold text-sm border-b border-brand-accent/30 pb-1 flex items-center gap-2 uppercase tracking-wider">
                    {category.title[lang]}
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {category.items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center p-2 rounded-xl bg-white border border-brand-accent/10">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-brand-text leading-tight">{item.name[lang]}</span>
                          <span className="text-[10px] font-bold text-brand-primary/60">{item.price}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-brand-accent/5 p-1 rounded-lg border border-brand-accent/5">
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className={cn(
                              "w-7 h-7 rounded-md flex items-center justify-center transition-all",
                              cart[item.id] ? "bg-white text-brand-primary shadow-sm pointer-events-auto" : "text-brand-text/10 pointer-events-none"
                            )}
                          >
                            <Minus size={14} />
                          </button>
                          <span className={cn(
                            "min-w-[14px] text-center font-bold text-xs tabular-nums",
                            cart[item.id] ? "text-brand-primary" : "text-brand-text/10"
                          )}>
                            {cart[item.id]?.quantity || 0}
                          </span>
                          <button 
                            onClick={() => addToCart(item, 'drink')}
                            className="w-7 h-7 rounded-md bg-brand-primary text-white flex items-center justify-center shadow-sm active:scale-90 transition-all"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
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
              className="space-y-6 pb-12"
            >
              <SectionHeader title={UI_TEXT.sections.menus[lang]} />
              
              <div className="space-y-3">
                {MENUS.map((menu) => (
                  <div key={menu.id} className="glass-card p-4 border-l-4 border-brand-primary flex gap-4 items-center cursor-pointer active:scale-[0.99] transition-all" onClick={() => openCustomization(menu)}>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-lg text-brand-text leading-tight">{menu.title[lang]}</h3>
                        <span className="text-lg font-bold text-brand-primary">{menu.price}</span>
                      </div>
                      <p className="text-xs text-brand-text/70">{menu.details?.[lang]}</p>
                    </div>
                    <div className="flex-shrink-0 flex flex-col items-center gap-2 bg-brand-accent/5 p-1 rounded-xl">
                      <div className="w-10 h-10 rounded-lg bg-brand-primary text-white flex items-center justify-center shadow-sm">
                        <Plus size={20} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <h3 className="text-brand-primary font-bold text-sm mb-3 flex items-center gap-2">
                  <Star size={14} /> {UI_TEXT.tastingMenus[lang]}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {TASTING_MENUS.map((menu) => (
                    <div key={menu.id} className="glass-card p-4 bg-brand-accent/10 border-dashed border-2 border-brand-primary/30 flex flex-col cursor-pointer active:scale-[0.98] transition-all" onClick={() => openCustomization(menu)}>
                      <div className="flex-grow">
                        <h4 className="font-bold text-sm text-brand-text mb-1">{menu.title[lang]}</h4>
                        <p className="text-[10px] text-brand-text/60 mb-2">{menu.details?.[lang]}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-brand-primary/10">
                        <div className="text-lg font-bold text-brand-primary">{menu.price}</div>
                        <div className="w-8 h-8 rounded-lg bg-brand-primary text-white flex items-center justify-center shadow-sm">
                          <Plus size={16} />
                        </div>
                      </div>
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

          {view === 'customize-menu' && customizingMenu && (
            <motion.div
              key="customize-menu"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="flex flex-col min-h-[calc(100vh-120px)] relative"
            >
              {/* Step Indicator */}
              <div className="flex items-center justify-between mb-8 px-2">
                {[
                  { id: 'flavors', icon: <Flame size={14} />, label: UI_TEXT.sections.empanadas[lang] },
                  { id: 'drinks', icon: <Beer size={14} />, label: UI_TEXT.sections.drinks[lang] },
                  { id: 'summary', icon: <LayoutList size={14} />, label: UI_TEXT.customization.summary[lang] }
                ].map((s, idx) => (
                  <React.Fragment key={s.id}>
                    <div className="flex flex-col items-center gap-1.5 flex-1 group">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500",
                        customizingMenu.step === s.id ? "bg-brand-primary text-white shadow-lg scale-110" : "bg-white text-brand-text/30 border border-brand-accent/20"
                      )}>
                        {s.icon}
                      </div>
                      <span className={cn(
                        "text-[9px] font-black uppercase tracking-tighter transition-all duration-300",
                        customizingMenu.step === s.id ? "text-brand-primary opacity-100" : "text-brand-text/30 opacity-60"
                      )}>
                        {s.label}
                      </span>
                    </div>
                    {idx < 2 && (
                      <div className={cn(
                        "h-[1px] flex-grow mx-2 mb-4 transition-colors duration-500",
                        idx === 0 && (customizingMenu.step === 'drinks' || customizingMenu.step === 'summary') ? "bg-brand-primary" : "bg-brand-accent/20"
                      )}></div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Dynamic Step Header */}
              <div className="glass-card p-5 mb-6 bg-gradient-to-br from-white to-brand-accent/5 border-brand-primary/10">
                <div className="flex items-center justify-between">
                  <div className="flex-grow">
                    <h2 className="text-2xl font-black text-brand-text italic uppercase leading-none mb-1">
                      {customizingMenu.step === 'flavors' 
                        ? UI_TEXT.customization.choose[lang].replace('{count}', customizingMenu.menu.capacity.toString())
                        : customizingMenu.step === 'drinks'
                        ? UI_TEXT.customization.chooseDrinks[lang].replace('{count}', customizingMenu.menu.drinkCapacity.toString())
                        : UI_TEXT.customization.summary[lang]
                      }
                    </h2>
                    <p className={cn(
                      "text-xs font-black uppercase tracking-widest flex items-center gap-1.5",
                      (customizingMenu.step === 'flavors' ? currentSelectionCount === customizingMenu.menu.capacity : customizingMenu.step === 'drinks' ? currentDrinkCount >= customizingMenu.menu.drinkCapacity : true) 
                        ? "text-green-600" 
                        : "text-brand-primary"
                    )}>
                      {customizingMenu.step === 'flavors' ? (
                        currentSelectionCount === customizingMenu.menu.capacity ? (
                          <><Sparkles size={14} /> {UI_TEXT.customization.completed[lang]}</>
                        ) : (
                          UI_TEXT.customization.remaining[lang].replace('{count}', (customizingMenu.menu.capacity - currentSelectionCount).toString())
                        )
                      ) : customizingMenu.step === 'drinks' ? (
                        currentDrinkCount >= customizingMenu.menu.drinkCapacity ? (
                          <><Sparkles size={14} /> {currentDrinkCount > customizingMenu.menu.drinkCapacity ? UI_TEXT.customization.drinksExtra[lang] : UI_TEXT.customization.completed[lang]}</>
                        ) : (
                          UI_TEXT.customization.drinksRemaining[lang]
                            .replace('{current}', currentDrinkCount.toString())
                            .replace('{total}', customizingMenu.menu.drinkCapacity.toString())
                        )
                      ) : (
                        <span className="opacity-50">{customizingMenu.menu.title[lang]}</span>
                      )}
                    </p>
                  </div>
                  
                  {customizingMenu.step !== 'summary' && (
                    <div className="w-14 h-14 rounded-full border-4 border-brand-accent/10 flex items-center justify-center relative shadow-inner shrink-0 bg-white">
                      <svg className="absolute -rotate-90 w-full h-full">
                        <circle
                          cx="28" cy="28" r="24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                          className="text-brand-primary/10"
                        />
                        <circle
                          cx="28" cy="28" r="24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                          className="text-brand-primary"
                          strokeDasharray={150.8}
                          strokeDashoffset={150.8 - (150.8 * Math.min(1, (customizingMenu.step === 'flavors' ? currentSelectionCount : currentDrinkCount) / (customizingMenu.step === 'flavors' ? customizingMenu.menu.capacity : customizingMenu.menu.drinkCapacity)))}
                          strokeLinecap="round"
                          style={{ transition: 'stroke-dashoffset 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}
                        />
                      </svg>
                      <span className="text-sm font-black text-brand-text">
                        {customizingMenu.step === 'flavors' ? `${currentSelectionCount}/${customizingMenu.menu.capacity}` : `${currentDrinkCount}/${customizingMenu.menu.drinkCapacity}`}
                      </span>
                    </div>
                  )}
                </div>

                {customizingMenu.step === 'flavors' && (
                  <button 
                    onClick={autoFillFlavors}
                    className="mt-4 w-full bg-white text-brand-primary border-2 border-brand-primary/20 px-4 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 shadow-sm transition-all"
                  >
                    <Sparkles size={14} className="text-orange-500" />
                    {UI_TEXT.customization.autoFill[lang]}
                  </button>
                )}
                
                {customizingMenu.step === 'drinks' && (
                  <div className="mt-4 px-3 py-2 bg-orange-50 border border-orange-200 rounded-xl text-[10px] text-orange-800 font-medium leading-tight">
                    <p className="flex items-center gap-2">
                       <Sparkles size={12} className="text-orange-500 shrink-0" />
                       {UI_TEXT.customization.premiumNotice[lang]}
                    </p>
                  </div>
                )}
              </div>

              {/* Step Content */}
              <div className="pb-40">
                {customizingMenu.step === 'flavors' && (
                  <div className="grid grid-cols-1 gap-3">
                    {EMPANADAS.map((emp) => (
                      <div key={emp.code} className="glass-card p-3 flex items-center gap-3 relative overflow-hidden group">
                        {emp.popular && (
                          <div className="absolute top-0 right-0 bg-brand-primary text-white text-[7px] font-black px-2 py-0.5 rounded-bl-lg uppercase tracking-tighter">
                            {UI_TEXT.mostPopular[lang]}
                          </div>
                        )}
                        <div className="w-10 h-10 rounded-full bg-brand-primary/10 text-brand-primary flex flex-shrink-0 items-center justify-center font-black shadow-inner border border-brand-primary/5">
                          {emp.code}
                        </div>
                        <div className="flex-grow min-w-0">
                           <div className="flex items-center gap-1.5 flex-wrap">
                              <h4 className="font-bold text-sm text-brand-text truncate leading-tight">{emp.name[lang]}</h4>
                              <div className="flex gap-0.5">
                                {emp.spicy && <span className="text-[10px]">🌶️</span>}
                                {emp.vegetarian && <span className="text-[10px]">🥬</span>}
                              </div>
                           </div>
                           <p className="text-[10px] text-brand-text/50 truncate italic mt-0.5">{emp.description[lang]}</p>
                        </div>
                        <div className="flex items-center gap-2 bg-brand-accent/5 p-1 rounded-xl border border-brand-accent/10">
                          <button 
                            onClick={() => removeFlavor(emp.code)}
                            className={cn(
                              "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
                              customizingMenu.flavors[emp.code] ? "bg-white text-brand-primary shadow-sm active:scale-90" : "text-brand-text/10"
                            )}
                            disabled={!customizingMenu.flavors[emp.code]}
                          >
                            <Minus size={16} />
                          </button>
                          <span className={cn(
                            "w-4 text-center font-black text-sm tabular-nums",
                            customizingMenu.flavors[emp.code] ? "text-brand-primary" : "text-brand-text/10"
                          )}>
                            {customizingMenu.flavors[emp.code] || 0}
                          </span>
                          <button 
                            onClick={() => addFlavor(emp.code)}
                            className={cn(
                              "w-8 h-8 rounded-lg flex items-center justify-center shadow-sm active:scale-90 transition-all",
                              currentSelectionCount >= customizingMenu.menu.capacity ? "bg-brand-accent/20 text-brand-text/20" : "bg-brand-primary text-white"
                            )}
                            disabled={currentSelectionCount >= customizingMenu.menu.capacity}
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {customizingMenu.step === 'drinks' && (
                  <div className="space-y-6">
                    {DRINKS.map((category, idx) => (
                      <div key={idx} className="space-y-3">
                        <h3 className="text-brand-primary font-bold text-[10px] uppercase tracking-widest px-1">
                          {category.title[lang]}
                        </h3>
                        <div className="grid grid-cols-1 gap-2">
                          {category.items.map((drink) => (
                            <div key={drink.id} className="glass-card p-3 flex flex-col gap-2 relative">
                              <div className="flex justify-between items-center">
                                <div className="flex flex-col">
                                  <span className="text-sm font-bold text-brand-text leading-tight">{drink.name[lang]}</span>
                                  {drink.premium && (
                                    <span className="text-[9px] font-black text-brand-primary uppercase tracking-tighter mt-0.5">
                                      + {(drink.numericPrice - 2.5).toFixed(2)} € {UI_TEXT.customization.extra[lang]}
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 bg-brand-accent/5 p-1 rounded-lg border border-brand-accent/5">
                                  <button 
                                    onClick={() => removeDrinkFromMenu(drink.id)}
                                    className={cn(
                                      "w-7 h-7 rounded-md flex items-center justify-center transition-all",
                                      customizingMenu.drinks[drink.id] ? "bg-white text-brand-primary shadow-sm pointer-events-auto" : "text-brand-text/10"
                                    )}
                                  >
                                    <Minus size={14} />
                                  </button>
                                  <span className={cn(
                                    "min-w-[14px] text-center font-bold text-xs tabular-nums",
                                    customizingMenu.drinks[drink.id] ? "text-brand-primary" : "text-brand-text/10"
                                  )}>
                                    {customizingMenu.drinks[drink.id] || 0}
                                  </span>
                                  <button 
                                    onClick={() => addDrinkToMenu(drink.id)}
                                    className="w-7 h-7 rounded-md bg-brand-primary text-white flex items-center justify-center shadow-sm active:scale-90 transition-all"
                                  >
                                    <Plus size={14} />
                                  </button>
                                </div>
                              </div>
                              {drink.premium && customizingMenu.drinks[drink.id] && (
                                <p className="text-[9px] text-orange-600 font-bold bg-orange-50 p-2 rounded-lg border border-orange-100 italic">
                                  {UI_TEXT.customization.premiumWarning[lang]}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {customizingMenu.step === 'summary' && (
                  <div className="space-y-4">
                    <div className="glass-card p-5 space-y-4">
                      <div>
                        <h4 className="text-[10px] font-black uppercase text-brand-primary tracking-widest mb-3 border-b border-brand-accent/10 pb-1">
                          {UI_TEXT.sections.empanadas[lang]}
                        </h4>
                        <div className="space-y-2">
                           {Object.entries(customizingMenu.flavors).map(([code, count]) => {
                             const emp = EMPANADAS.find(e => e.code === code);
                             return (
                               <div key={code} className="flex justify-between items-center text-sm">
                                 <span className="font-bold text-brand-text">{emp?.name[lang]}</span>
                                 <span className="font-black text-brand-primary">x{count}</span>
                               </div>
                             );
                           })}
                        </div>
                      </div>

                      {customizingMenu.menu.drinkCapacity > 0 && (
                        <div>
                          <h4 className="text-[10px] font-black uppercase text-brand-primary tracking-widest mb-3 border-b border-brand-accent/10 pb-1">
                            {UI_TEXT.sections.drinks[lang]}
                          </h4>
                          <div className="space-y-2">
                             {Object.entries(customizingMenu.drinks).map(([id, count]) => {
                               const drink = DRINKS.flatMap(c => c.items).find(d => d.id === id);
                               return (
                                 <div key={id} className="flex justify-between items-center text-sm">
                                   <div className="flex flex-col">
                                     <span className="font-bold text-brand-text">{drink?.name[lang]}</span>
                                     {drink?.premium && (
                                       <span className="text-[9px] text-brand-primary uppercase font-black tracking-tighter italic">
                                         + Premium Extra
                                       </span>
                                     )}
                                   </div>
                                   <span className="font-black text-brand-primary">x{count}</span>
                                 </div>
                               );
                             })}
                          </div>
                        </div>
                      )}

                      <div className="pt-4 border-t-2 border-dashed border-brand-accent/20 flex justify-between items-end">
                        <span className="text-xs font-black uppercase text-brand-text/40">{UI_TEXT.cart.total[lang]}</span>
                        <div className="text-right">
                          <span className="block text-[10px] text-brand-primary font-bold line-through opacity-40">{customizingMenu.menu.price}</span>
                          <span className="text-3xl font-black text-brand-text">
                            {customizingMenuPrice.toFixed(2)} €
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-[10px] text-brand-text/50 italic text-center px-4">
                      {UI_TEXT.cart.ticketMessage[lang]}
                    </p>
                  </div>
                )}
              </div>

              {/* Fixed Bottom Navigation Area */}
              <div className="fixed bottom-4 left-4 right-4 z-[60] flex flex-col gap-2 max-w-xl mx-auto">
                <div className="flex gap-2 w-full">
                  {customizingMenu.step !== 'flavors' ? (
                    <button 
                      onClick={() => setCustomizingMenu(prev => {
                        if (!prev) return null;
                        if (prev.step === 'drinks') return { ...prev, step: 'flavors' };
                        if (prev.step === 'summary') return { ...prev, step: prev.menu.drinkCapacity > 0 ? 'drinks' : 'flavors' };
                        return prev;
                      })}
                      className="flex-shrink-0 w-16 h-16 rounded-2xl bg-white border-2 border-brand-accent/30 text-brand-text shadow-xl flex items-center justify-center active:scale-95 transition-all"
                    >
                      <ArrowLeft size={24} strokeWidth={2.5} />
                    </button>
                  ) : (
                    <button 
                      onClick={() => setCustomizingMenu(null)}
                      className="flex-shrink-0 w-16 h-16 rounded-2xl bg-white border-2 border-brand-accent/30 text-brand-text shadow-xl flex items-center justify-center active:scale-95 transition-all"
                    >
                      <X size={24} strokeWidth={2.5} />
                    </button>
                  )}
                  
                  <button 
                    onClick={confirmSelection}
                    disabled={
                      customizingMenu.step === 'flavors' ? currentSelectionCount !== customizingMenu.menu.capacity :
                      customizingMenu.step === 'drinks' ? currentDrinkCount < customizingMenu.menu.drinkCapacity :
                      false
                    }
                    className={cn(
                      "flex-grow h-16 rounded-2xl font-black text-lg shadow-xl transition-all flex items-center justify-center gap-3 uppercase italic tracking-wider px-6",
                      (customizingMenu.step === 'flavors' ? currentSelectionCount === customizingMenu.menu.capacity :
                       customizingMenu.step === 'drinks' ? currentDrinkCount >= customizingMenu.menu.drinkCapacity :
                       true) 
                        ? "bg-brand-primary text-white active:scale-95" 
                        : "bg-brand-accent/10 text-brand-text/20 cursor-not-allowed"
                    )}
                  >
                    {customizingMenu.step === 'flavors' ? (
                      <>
                        {UI_TEXT.customization.continueToDrinks[lang]}
                        <ArrowRight size={22} strokeWidth={3} />
                      </>
                    ) : customizingMenu.step === 'drinks' ? (
                      <>
                        {UI_TEXT.customization.continueToSummary[lang]}
                        <ArrowRight size={22} strokeWidth={3} />
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={22} strokeWidth={3} />
                        {customizingMenu.isEditing ? UI_TEXT.customization.saveChanges[lang] : UI_TEXT.customization.addToOrder[lang]}
                      </>
                    )}
                  </button>
                </div>
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
                <div className="w-24 h-24 mx-auto rounded-full bg-brand-accent/20 flex items-center justify-center text-brand-primary">
                  <History size={40} />
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

          {view === 'order' && (
             <motion.div
              key="order"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6 pb-24"
            >
              <div className="flex items-center justify-between">
                <SectionHeader title={UI_TEXT.sections.order[lang]} />
                {totalItems > 0 && (
                  <button 
                    onClick={clearCart}
                    className="text-red-500 font-bold text-xs flex items-center gap-1.5 active:scale-95 transition-all p-2 rounded-lg bg-red-50"
                  >
                    <Trash2 size={14} />
                    {UI_TEXT.cart.clear[lang]}
                  </button>
                )}
              </div>

              {totalItems === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                  <div className="w-20 h-20 bg-brand-accent/5 rounded-full flex items-center justify-center text-brand-accent/30 lowercase">
                    <ShoppingCart size={40} strokeWidth={1} />
                  </div>
                  <p className="text-brand-text/50 font-medium">{UI_TEXT.cart.empty[lang]}</p>
                  <button 
                    onClick={() => navigateTo('empanadas')}
                    className="text-brand-primary font-bold underline"
                  >
                    {UI_TEXT.cart.add[lang]} {UI_TEXT.cart.items[lang]}
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-brand-primary mb-3">
                      {UI_TEXT.cart.title[lang]}
                    </h3>
                    {Object.values(cart).map((item: CartItem) => (
                      <div key={item.id} className="glass-card p-4 flex flex-col border-brand-accent/10">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold text-sm">
                              {item.quantity}x
                            </div>
                            <div>
                              <h4 className="font-bold text-brand-text text-sm">{item.name[lang!]}</h4>
                              <p className="text-[10px] font-bold text-brand-primary">{(item.price * item.quantity).toFixed(2)} €</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="p-2 text-brand-text/40 hover:text-red-500 active:scale-90 transition-all"
                            >
                              <Minus size={16} />
                            </button>
                            <button 
                              onClick={() => {
                                if (item.flavors) {
                                  // For menus, we just clone the entry with a new ID if we want more, 
                                  // or increase quantity if it's identical.
                                  // But for speed, let's just increase quantity.
                                  setCart(prev => ({
                                    ...prev,
                                    [item.id]: { ...prev[item.id], quantity: prev[item.id].quantity + 1 }
                                  }));
                                } else {
                                  const baseItem = [...EMPANADAS, ...DRINKS.flatMap(c => c.items), ...MENUS, ...TASTING_MENUS].find(i => ('code' in i ? (i as any).code : (i as any).id) === item.id);
                                  if (baseItem) addToCart(baseItem as any, item.type);
                                }
                              }}
                              className="p-2 text-brand-primary active:scale-90 transition-all font-bold"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>

                        {item.flavors && (
                          <div className="bg-brand-accent/5 rounded-xl p-3 border border-brand-accent/5">
                             <div className="grid grid-cols-1 gap-1 mb-2">
                                {Object.entries(item.flavors).map(([code, count]) => {
                                  const emp = EMPANADAS.find(e => e.code === code);
                                  return (
                                    <div key={code} className="flex justify-between text-[11px]">
                                      <span className="text-brand-text/70">{count}x {emp?.name[lang!]}</span>
                                      <span className="font-black text-brand-primary/40">{code}</span>
                                    </div>
                                  );
                                })}
                                {item.drinks && Object.entries(item.drinks).length > 0 && (
                                  <div className="mt-2 pt-2 border-t border-brand-accent/10 space-y-1">
                                    {Object.entries(item.drinks).map(([drinkId, count]) => {
                                      const drink = DRINKS.flatMap(c => c.items).find(d => d.id === drinkId);
                                      return (
                                        <div key={drinkId} className="flex justify-between text-[11px]">
                                          <span className="text-brand-primary font-bold">{count}x {drink?.name[lang!]}</span>
                                          {drink?.premium && <span className="text-[9px] bg-brand-primary/10 text-brand-primary px-1 rounded font-black italic">EXTRA</span>}
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                             </div>
                             <button 
                                onClick={() => {
                                   const menu = [...MENUS, ...TASTING_MENUS].find(m => m.id === item.id.split('_')[0]);
                                   if (menu) openCustomization(menu as MenuOption, true, item.id);
                                }}
                                className="w-full py-1.5 rounded-lg bg-white border border-brand-accent/20 text-[10px] font-black text-brand-primary uppercase tracking-widest flex items-center justify-center gap-2"
                             >
                                <Utensils size={10} />
                                {UI_TEXT.cart.editSelection[lang!]}
                             </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Suggestions */}
                  {suggestions.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-primary/50 px-1">
                        Dicas Al'Horno
                      </h4>
                      {suggestions.map((suggestion) => (
                        <motion.div 
                          key={suggestion.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="p-4 rounded-xl bg-orange-50 border border-orange-100 flex items-center gap-4 cursor-pointer active:scale-[0.98] transition-all"
                          onClick={suggestion.action}
                        >
                          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-orange-500 shadow-sm shrink-0">
                            {suggestion.icon}
                          </div>
                          <div className="flex-grow">
                            <p className="text-xs font-bold text-orange-900 leading-snug">
                              {suggestion.text[lang]}
                            </p>
                          </div>
                          <ChevronRight size={18} className="text-orange-400" />
                        </motion.div>
                      ))}
                    </div>
                  )}

                  <div className="p-6 bg-brand-primary rounded-2xl text-white shadow-xl shadow-brand-primary/20 flex justify-between items-center transition-all hover:-translate-y-1">
                    <div>
                      <p className="text-xs uppercase font-bold text-white/60 tracking-widest">{UI_TEXT.cart.total[lang]}</p>
                      <p className="text-3xl font-black">{cartTotal.toFixed(2)} €</p>
                    </div>
                    <div className="p-3 bg-white/20 rounded-full">
                      <ShoppingCart size={24} />
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {view === 'ticket' && (
            <motion.div
              key="ticket"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="space-y-6 pt-4 pb-12"
            >
              <div className="flex flex-col items-center gap-4 text-center mb-6">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <Ticket size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-brand-text uppercase italic">{UI_TEXT.cart.title[lang]}</h2>
                  <p className="text-sm text-brand-text/50 font-medium">{UI_TEXT.cart.ticketMessage[lang]}</p>
                </div>
              </div>

              <div className="bg-white border-2 border-brand-accent/10 rounded-3xl p-6 shadow-sm relative overflow-hidden">
                {/* Visual perforations */}
                <div className="absolute top-0 left-0 right-0 flex justify-between px-6 -mt-2">
                   {[...Array(12)].map((_, i) => <div key={i} className="w-3 h-3 bg-brand-bg rounded-full border border-brand-accent/10"></div>)}
                </div>

                <div className="py-2 space-y-4 border-b-2 border-dashed border-brand-accent/20 mb-6 font-mono">
                  {(Object.values(cart) as CartItem[]).map((item) => (
                    <div key={item.id} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-brand-primary text-xl">{item.quantity}x</span>
                          <span className="font-bold text-brand-text text-base">{item.name[lang!]}</span>
                        </div>
                        <span className="font-bold text-brand-text/60">{(item.price * item.quantity).toFixed(2)} €</span>
                      </div>
                      {item.flavors && (
                        <div className="pl-8 pb-2 space-y-1">
                          <div className="space-y-0.5">
                            {Object.entries(item.flavors).map(([code, count]) => {
                              const emp = EMPANADAS.find(e => e.code === code);
                              return (
                                <p key={code} className="text-[12px] text-brand-text/60">
                                  {count}x {emp?.name[lang!]} ({code})
                                </p>
                              );
                            })}
                          </div>
                          {item.drinks && Object.entries(item.drinks).length > 0 && (
                            <div className="mt-1 pt-1 border-t border-brand-accent/5 space-y-0.5">
                               {Object.entries(item.drinks).map(([drinkId, count]) => {
                                 const drink = DRINKS.flatMap(c => c.items).find(d => d.id === drinkId);
                                 return (
                                   <p key={drinkId} className="text-[12px] font-bold text-brand-primary italic">
                                     {count}x {drink?.name[lang!]} {drink?.premium ? '(+ EXTRA)' : ''}
                                   </p>
                                 );
                               })}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-bold uppercase tracking-widest text-brand-text/40">{UI_TEXT.cart.total[lang]}</span>
                  <span className="text-4xl font-black text-brand-text">{cartTotal.toFixed(2)} €</span>
                </div>

                <div className="mt-10 flex justify-center opacity-10">
                   <div className="grid grid-cols-10 gap-0.5 opacity-20 transform scale-150">
                      {[...Array(100)].map((_, i) => (
                        <div key={i} className={cn("w-1 h-1", Math.random() > 0.5 ? "bg-black" : "bg-transparent")}></div>
                      ))}
                   </div>
                </div>
              </div>

              <button 
                onClick={() => setView('order')}
                className="w-full p-4 rounded-2xl bg-brand-accent/10 text-brand-text font-bold flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <ArrowLeft size={18} />
                {UI_TEXT.backToLanguage[lang].split(' ')[0]} {/* Reuse back text */}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Integrated Bottom Navigation Bar */}
      {view !== 'language' && view !== 'ticket' && view !== 'customize-menu' && (
        <AnimatePresence>
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4 pt-0"
          >
            <nav className="max-w-xl mx-auto bg-white/95 backdrop-blur-xl border border-brand-accent/20 rounded-3xl px-2 py-2 flex justify-around items-end shadow-2xl">
              <NavIcon 
                icon={<Flame size={20} strokeWidth={2} />} 
                active={view === 'empanadas'} 
                label={UI_TEXT.sections.empanadas[lang!]}
                onClick={() => navigateTo('empanadas')} 
              />
              <NavIcon 
                icon={<Beer size={20} strokeWidth={2} />} 
                active={view === 'drinks'} 
                label={UI_TEXT.sections.drinks[lang!]}
                onClick={() => navigateTo('drinks')} 
              />
              <NavIcon 
                icon={<Tag size={20} strokeWidth={2} />} 
                active={view === 'menus'} 
                label={UI_TEXT.sections.menus[lang!]}
                onClick={() => navigateTo('menus')} 
              />
              <NavIcon 
                icon={<ShoppingBag size={20} strokeWidth={2} />} 
                active={view === 'order'} 
                label={UI_TEXT.sections.cart[lang!]}
                badge={totalItems}
                onClick={() => navigateTo('order')} 
              />
            </nav>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Ticket Action Button (Bottom Fixed in Order View) */}
      {view === 'order' && totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-brand-bg via-brand-bg/80 to-transparent z-50">
           <button 
              onClick={() => setView('ticket')}
              className="w-full max-w-xl mx-auto p-4 rounded-2xl bg-brand-primary text-white font-black text-lg flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all animate-pulse"
            >
              <Ticket size={24} />
              {UI_TEXT.cart.showAtCounter[lang]}
            </button>
        </div>
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
          "p-2 rounded-xl text-center flex items-center justify-center",
          primary ? "bg-white/20" : "bg-brand-primary/10 text-brand-primary"
        )}>
          {icon}
        </div>
        <span className="text-lg font-bold">{label}</span>
      </div>
      <div className="flex items-center gap-1">
        {primary && <Sparkles size={14} className="text-orange-400 animate-pulse" />}
        <ArrowRight size={16} className={cn(
          "transition-transform group-hover:translate-x-1",
          primary ? "text-white/60" : "text-brand-primary/60"
        )} />
      </div>
    </button>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-2">
      <h1 className="text-xl font-black text-brand-text tracking-tight uppercase italic">{title}</h1>
      <div className="h-1.5 w-10 bg-brand-primary mt-1 rounded-full"></div>
    </div>
  );
}

function NavIcon({ icon, active, onClick, label, badge }: { icon: React.ReactNode, active: boolean, onClick: () => void, label?: string, badge?: number }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1 min-w-[64px] transition-all relative py-1",
        active ? "text-brand-primary" : "text-brand-text/40"
      )}
    >
      <div className={cn(
        "p-2 rounded-xl flex items-center justify-center transition-all relative",
        active ? "bg-brand-primary text-white shadow-md -translate-y-1" : "hover:bg-brand-primary/5"
      )}>
        {icon}
        {badge !== undefined && badge > 0 && (
          <motion.span 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            key={badge}
            className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-orange-500 text-white rounded-full flex items-center justify-center text-[10px] font-black border-2 border-white"
          >
            {badge}
          </motion.span>
        )}
      </div>
      {label && (
        <span className={cn(
          "text-[10px] font-bold uppercase tracking-tighter transition-all",
          active ? "opacity-100" : "opacity-60"
        )}>
          {label}
        </span>
      )}
    </button>
  );
}

