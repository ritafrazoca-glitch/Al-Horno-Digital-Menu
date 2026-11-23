import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Beer,
  Check,
  Clock,
  Copy,
  ExternalLink,
  Flame,
  Home,
  Info,
  Instagram,
  Leaf,
  Mail,
  MapPin,
  PartyPopper,
  Search,
  ShoppingBag,
  Utensils,
  Wine,
  X,
} from 'lucide-react';
import { ALLERGENS, CONTACT, DRINKS, EMPANADAS, EXTRAS, Language, MENUS, UI_TEXT } from './data';
import { cn } from './lib/utils';

type View = 'home' | 'empanadas' | 'drinks' | 'menus';
type Filter = 'all' | 'classicas' | 'premium' | 'veg';

const VIEWS: View[] = ['home', 'empanadas', 'drinks', 'menus'];
const LANGS: { code: Language; label: string; name: string }[] = [
  { code: 'pt', label: 'PT', name: 'Português' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'es', label: 'ES', name: 'Español' },
];
const LANG_KEY = 'alhorno_lang';

const CLASSIC_COUNT = EMPANADAS.filter((e) => !e.premium).length;
const PREMIUM_COUNT = EMPANADAS.length - CLASSIC_COUNT;

function readView(): View {
  const hash = window.location.hash.replace('#', '') as View;
  return VIEWS.includes(hash) ? hash : 'home';
}

function readLang(): Language {
  const fromUrl = new URLSearchParams(window.location.search).get('lang');
  if (fromUrl === 'pt' || fromUrl === 'en' || fromUrl === 'es') return fromUrl;
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === 'pt' || saved === 'en' || saved === 'es') return saved;
  } catch {
    /* localStorage indisponível */
  }
  return 'pt';
}

const normalize = (text: string) =>
  text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export default function App() {
  const [lang, setLang] = useState<Language>(readLang);
  const [view, setView] = useState<View>(readView);

  // Navegação por #hash: o botão "voltar" do telemóvel funciona e cada secção tem link próprio.
  useEffect(() => {
    const onHash = () => {
      setView(readView());
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-PT' : lang;
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch {
      /* ignorar */
    }
  }, [lang]);

  // Limpa a cópia local de dados de subscritores que a versão antiga guardava no browser dos visitantes.
  useEffect(() => {
    try {
      localStorage.removeItem('alhorno_subscribers');
    } catch {
      /* ignorar */
    }
  }, []);

  useEffect(() => {
    const titles: Record<View, string> = {
      home: "Al'Horno Empanadas — Aldeia da Praia",
      empanadas: `${UI_TEXT.sections.empanadas[lang]} · Al'Horno`,
      drinks: `${UI_TEXT.sections.drinks[lang]} · Al'Horno`,
      menus: `${UI_TEXT.sections.menus[lang]} · Al'Horno`,
    };
    document.title = titles[view];
  }, [view, lang]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header lang={lang} setLang={setLang} view={view} />

      <main id="conteudo" tabIndex={-1} className="outline-none flex-1 w-full max-w-xl mx-auto px-4 sm:px-6 pt-5 pb-8">
        <div key={view} className="fade-in">
          {view === 'home' && <HomeView lang={lang} />}
          {view === 'empanadas' && <EmpanadasView lang={lang} />}
          {view === 'drinks' && <DrinksView lang={lang} />}
          {view === 'menus' && <MenusView lang={lang} />}
        </div>
      </main>

      <Footer lang={lang} />
      <BottomNav lang={lang} view={view} />
    </div>
  );
}

/* ---------------------------------- Header --------------------------------- */

function Header({ lang, setLang, view }: { lang: Language; setLang: (l: Language) => void; view: View }) {
  return (
    <header className="on-dark sticky top-0 z-40 bg-bordeaux text-creme shadow-md">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:bg-mostarda focus:text-preto focus:px-3 focus:py-2 focus:rounded-lg"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('conteudo')?.focus();
          document.getElementById('conteudo')?.scrollIntoView();
        }}
      >
        {UI_TEXT.nav.skip[lang]}
      </a>
      <div className="max-w-xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 min-w-0">
          {view !== 'home' && (
            <a
              href="#"
              className="w-11 h-11 -ml-1 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
              aria-label={UI_TEXT.nav.back[lang]}
            >
              <ArrowLeft size={22} aria-hidden="true" />
            </a>
          )}
          <a href="#" className="flex flex-col leading-none px-1 py-1 rounded-lg">
            <span className="font-display font-bold text-xl tracking-tight text-creme">Al'Horno</span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mostarda mt-0.5">
              Empanadas
            </span>
          </a>
        </div>

        <div role="group" aria-label={UI_TEXT.languageLabel[lang]} className="flex items-center rounded-full bg-bordeaux-dark p-1">
          {LANGS.map((l) => (
            <button
              key={l.code}
              type="button"
              lang={l.code}
              onClick={() => setLang(l.code)}
              aria-pressed={lang === l.code}
              aria-label={l.name}
              className={cn(
                'press min-w-11 h-9 px-2 rounded-full text-sm font-semibold',
                lang === l.code ? 'bg-mostarda text-preto' : 'text-creme hover:bg-white/10',
              )}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}

/* ----------------------------------- Home ---------------------------------- */

function HomeView({ lang }: { lang: Language }) {
  return (
    <div className="space-y-5 stagger">
      <section className="text-center space-y-3 pt-1">
        <h1 className="sr-only">Al'Horno Empanadas — {CONTACT.locality}</h1>
        <picture>
          <source srcSet="/logo.webp" type="image/webp" />
          <img
            src="/logo.png"
            alt="Al'Horno Empanadas"
            width={240}
            height={136}
            className="mx-auto w-32 sm:w-36 h-auto"
            fetchPriority="high"
          />
        </picture>
        <p className="font-display text-lg font-medium text-bordeaux">
          {UI_TEXT.tagline[lang]} · {CONTACT.locality}
        </p>
        <ClosedBadge lang={lang} />
      </section>

      {/* Uber Eats */}
      <a
        href={CONTACT.uberEatsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="press on-dark flex items-center gap-4 p-4 rounded-2xl bg-preto text-creme shadow-md hover:bg-black transition-colors group"
      >
        <span className="w-12 h-12 rounded-xl bg-mostarda text-preto flex items-center justify-center shrink-0">
          <ShoppingBag size={24} aria-hidden="true" />
        </span>
        <span className="flex-1 min-w-0">
          <span className="block font-display font-semibold text-lg text-mostarda">{UI_TEXT.ubereats.title[lang]}</span>
          <span className="block text-sm text-creme/90">{UI_TEXT.ubereats.subtitle[lang]}</span>
        </span>
        <ExternalLink size={20} className="shrink-0 text-mostarda" aria-hidden="true" />
        <span className="sr-only">{UI_TEXT.nav.newWindow[lang]}</span>
      </a>

      {/* Secções do menu */}
      <nav aria-label={UI_TEXT.nav.main[lang]} className="space-y-3 stagger">
        <SectionCard
          href="#empanadas"
          icon={<Flame size={22} aria-hidden="true" />}
          title={UI_TEXT.sections.empanadas[lang]}
          badge={UI_TEXT.home.varieties(EMPANADAS.length)[lang]}
          description={UI_TEXT.home.empanadasDesc(CLASSIC_COUNT, PREMIUM_COUNT)[lang]}
        />
        <SectionCard
          href="#drinks"
          icon={<Beer size={22} aria-hidden="true" />}
          title={UI_TEXT.sections.drinks[lang]}
          description={UI_TEXT.home.drinksDesc[lang]}
        />
        <SectionCard
          href="#menus"
          icon={<Utensils size={22} aria-hidden="true" />}
          title={UI_TEXT.sections.menus[lang]}
          description={UI_TEXT.home.menusDesc[lang]}
        />
      </nav>

      <EventsCard lang={lang} />
    </div>
  );
}

function ClosedBadge({ lang }: { lang: Language }) {
  return (
    <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bordeaux text-creme text-sm font-semibold">
      <Clock size={16} className="text-mostarda" aria-hidden="true" />
      {UI_TEXT.closed.short[lang]}
    </p>
  );
}

function SectionCard({
  href,
  icon,
  title,
  description,
  badge,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
}) {
  return (
    <a
      href={href}
      className="press flex items-center gap-4 p-4 rounded-2xl bg-cartao border border-areia hover:border-bordeaux group"
    >
      <span className="w-11 h-11 rounded-xl bg-areia text-bordeaux flex items-center justify-center shrink-0">{icon}</span>
      <span className="flex-1 min-w-0">
        <span className="flex flex-wrap items-center gap-2">
          <span className="font-display font-semibold text-lg text-bordeaux">{title}</span>
          {badge && (
            <span className="text-xs font-semibold text-preto bg-areia px-2 py-0.5 rounded-full">{badge}</span>
          )}
        </span>
        <span className="block text-sm text-azeitona leading-snug mt-0.5">{description}</span>
      </span>
      <ArrowRight
        size={20}
        className="shrink-0 text-bordeaux group-hover:translate-x-0.5 transition-transform"
        aria-hidden="true"
      />
    </a>
  );
}

function EventsCard({ lang }: { lang: Language }) {
  const [copied, setCopied] = useState(false);
  const mailto = `mailto:${CONTACT.email}?subject=${encodeURIComponent(UI_TEXT.events.subject[lang])}&body=${encodeURIComponent(UI_TEXT.events.body[lang])}`;

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt('E-mail:', CONTACT.email);
    }
  };

  return (
    <section aria-labelledby="eventos-titulo" className="on-dark relative overflow-hidden rounded-2xl bg-bordeaux text-creme">
      <div className="p-5 space-y-3">
        <div className="flex items-center gap-2.5">
          <PartyPopper size={22} className="text-mostarda" aria-hidden="true" />
          <h2 id="eventos-titulo" className="font-display font-semibold text-xl">
            {UI_TEXT.events.title[lang]}
          </h2>
        </div>
        <p className="text-base leading-relaxed text-creme/95">{UI_TEXT.events.text[lang]}</p>
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <a
            href={mailto}
            className="press inline-flex items-center gap-2 min-h-12 px-5 rounded-xl bg-mostarda text-preto font-semibold hover:bg-areia transition-colors"
          >
            <Mail size={18} aria-hidden="true" />
            {UI_TEXT.events.cta[lang]}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="press inline-flex items-center gap-2 min-h-12 px-4 rounded-xl border border-creme/40 text-creme text-sm font-medium hover:bg-white/10 transition-colors"
          >
            {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
            <span>{copied ? UI_TEXT.events.copied[lang] : CONTACT.email}</span>
          </button>
          <span className="sr-only" aria-live="polite">
            {copied ? UI_TEXT.events.copied[lang] : ''}
          </span>
        </div>
      </div>
      <div className="h-3 checkered" aria-hidden="true" />
    </section>
  );
}

/* --------------------------------- Empanadas -------------------------------- */

function EmpanadasView({ lang }: { lang: Language }) {
  const [filter, setFilter] = useState<Filter>('all');
  const [search, setSearch] = useState('');

  const list = useMemo(() => {
    const term = normalize(search.trim());
    return EMPANADAS.filter((e) => {
      if (filter === 'classicas' && e.premium) return false;
      if (filter === 'premium' && !e.premium) return false;
      if (filter === 'veg' && !e.vegetarian) return false;
      if (term && !normalize(e.name[lang]).includes(term)) return false;
      return true;
    });
  }, [filter, search, lang]);

  const filters: { id: Filter; label: string }[] = [
    { id: 'all', label: `${UI_TEXT.filters.all[lang]} (${EMPANADAS.length})` },
    { id: 'classicas', label: UI_TEXT.filters.classicas[lang] },
    { id: 'premium', label: UI_TEXT.filters.premium[lang] },
    { id: 'veg', label: `🥬 ${UI_TEXT.filters.veg[lang]}` },
  ];

  return (
    <div className="space-y-4">
      <PageTitle title={UI_TEXT.sections.empanadas[lang]} subtitle={UI_TEXT.prepNote[lang]} />

      <div className="relative">
        <label htmlFor="pesquisa" className="sr-only">
          {UI_TEXT.search.label[lang]}
        </label>
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-azeitona pointer-events-none" aria-hidden="true" />
        <input
          id="pesquisa"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={UI_TEXT.search.placeholder[lang]}
          className="w-full h-12 pl-11 pr-12 rounded-xl bg-cartao border border-areia text-base text-preto placeholder:text-azeitona focus:border-bordeaux [&::-webkit-search-cancel-button]:hidden"
        />
        {search && (
          <button
            type="button"
            onClick={() => setSearch('')}
            aria-label={UI_TEXT.search.clear[lang]}
            className="absolute right-1 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-lg text-azeitona hover:text-bordeaux"
          >
            <X size={18} aria-hidden="true" />
          </button>
        )}
      </div>

      <div role="group" aria-label={UI_TEXT.filters.label[lang]} className="flex gap-2 overflow-x-auto scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            aria-pressed={filter === f.id}
            className={cn(
              'press h-10 px-4 rounded-full text-sm font-semibold whitespace-nowrap border',
              filter === f.id
                ? 'bg-bordeaux border-bordeaux text-creme'
                : 'bg-cartao border-areia text-preto hover:border-bordeaux',
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        {UI_TEXT.results(list.length)[lang]}
      </p>

      {list.length === 0 ? (
        <div className="p-6 rounded-2xl bg-cartao border border-areia text-center space-y-3">
          <p className="text-base">
            {UI_TEXT.search.noResults[lang]} <strong>“{search.trim()}”</strong>.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearch('');
              setFilter('all');
            }}
            className="press min-h-11 px-4 rounded-xl bg-areia text-bordeaux font-semibold hover:bg-mostarda"
          >
            {UI_TEXT.search.resetFilters[lang]}
          </button>
        </div>
      ) : (
        <ul key={filter} className="space-y-3 stagger">
          {list.map((emp) => (
            <li key={emp.code} className="p-4 rounded-2xl bg-cartao border border-areia space-y-2">
              <div className="flex items-start gap-3">
                <span
                  className="min-w-10 h-8 px-1.5 rounded-lg bg-bordeaux text-mostarda flex items-center justify-center font-bold text-sm shrink-0"
                  aria-hidden="true"
                >
                  {emp.code}
                </span>
                <div className="flex-1 min-w-0 space-y-1.5">
                  <h3 className="font-display font-semibold text-lg leading-tight text-preto">{emp.name[lang]}</h3>
                  {(emp.premium || emp.spicy || emp.vegetarian) && (
                    <div className="flex flex-wrap gap-1.5">
                      {emp.premium && <Tag className="bg-mostarda text-preto">★ {UI_TEXT.tags.premium[lang]}</Tag>}
                      {emp.spicy && <Tag className="bg-bordeaux text-creme">🌶️ {UI_TEXT.tags.spicy[lang]}</Tag>}
                      {emp.vegetarian && <Tag className="bg-azeitona text-creme">🥬 {UI_TEXT.tags.veg[lang]}</Tag>}
                    </div>
                  )}
                  <p className="text-[15px] leading-relaxed text-preto/85">{emp.description[lang]}</p>
                  <p className="flex flex-wrap items-center gap-1.5 text-sm text-azeitona pt-0.5">
                    <span className="font-medium">{UI_TEXT.allergensLabel[lang]}:</span>
                    {emp.allergens.map((code) => {
                      const name = ALLERGENS.find((a) => a.code === code)?.name[lang] ?? code;
                      return (
                        <abbr
                          key={code}
                          title={name}
                          className="no-underline px-1.5 rounded bg-areia text-bordeaux font-semibold text-xs leading-5"
                        >
                          {code}
                          <span className="sr-only"> ({name})</span>
                        </abbr>
                      );
                    })}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Molhos & extras */}
      <section className="p-5 rounded-2xl bg-areia space-y-2" aria-labelledby="extras-titulo">
        <h2 id="extras-titulo" className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-bordeaux">
          <Leaf size={18} aria-hidden="true" />
          {UI_TEXT.extrasTitle[lang]}
        </h2>
        {EXTRAS.map((extra) => (
          <div key={extra.id} className="space-y-1">
            <h3 className="font-display font-semibold text-lg text-preto">{extra.name[lang]}</h3>
            <p className="text-[15px] leading-relaxed text-preto/85">{extra.description[lang]}</p>
          </div>
        ))}
      </section>

      {/* Legenda de alergénios */}
      <section className="p-5 rounded-2xl bg-cartao border border-areia space-y-3" aria-labelledby="alergenios-titulo">
        <h2 id="alergenios-titulo" className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-bordeaux">
          <Info size={18} aria-hidden="true" />
          {UI_TEXT.allergensLegend[lang]}
        </h2>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          {ALLERGENS.map((a) => (
            <div key={a.code} className="flex items-center gap-2">
              <dt className="min-w-7 text-center px-1.5 rounded bg-areia text-bordeaux font-semibold text-xs leading-5">
                {a.code}
              </dt>
              <dd>{a.name[lang]}</dd>
            </div>
          ))}
        </dl>
        <p className="text-sm text-azeitona leading-relaxed pt-3 border-t border-areia">{UI_TEXT.allergenWarning[lang]}</p>
      </section>
    </div>
  );
}

function Tag({ children, className }: { children: React.ReactNode; className: string }) {
  return <span className={cn('inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold', className)}>{children}</span>;
}

function PageTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="text-center space-y-1.5">
      <h1 className="font-display font-bold text-3xl text-bordeaux">{title}</h1>
      {subtitle && <p className="text-base text-azeitona">{subtitle}</p>}
    </div>
  );
}

/* ---------------------------------- Bebidas -------------------------------- */

function DrinksView({ lang }: { lang: Language }) {
  return (
    <div className="space-y-5 stagger">
      <PageTitle title={UI_TEXT.sections.drinks[lang]} />
      {DRINKS.map((category) => (
        <section key={category.title.pt} className="space-y-2">
          <h2 className="text-sm font-bold uppercase tracking-wider text-bordeaux px-1">{category.title[lang]}</h2>
          <ul className="rounded-2xl bg-cartao border border-areia divide-y divide-areia">
            {category.items.map((drink) => (
              <li key={drink.id} className="px-4 py-3 flex items-center justify-between gap-3 text-base">
                <span>{drink.name[lang]}</span>
                {drink.premium && <Tag className="bg-mostarda text-preto shrink-0">{UI_TEXT.tags.special[lang]}</Tag>}
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section className="p-5 rounded-2xl bg-areia space-y-1.5" aria-labelledby="vinhos-titulo">
        <h2 id="vinhos-titulo" className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-bordeaux">
          <Wine size={18} aria-hidden="true" />
          {UI_TEXT.wineNote.title[lang]}
        </h2>
        <p className="text-[15px] leading-relaxed">{UI_TEXT.wineNote.description[lang]}</p>
      </section>
    </div>
  );
}

/* ----------------------------------- Menus --------------------------------- */

function MenusView({ lang }: { lang: Language }) {
  return (
    <div className="space-y-5">
      <PageTitle title={UI_TEXT.sections.menus[lang]} subtitle={UI_TEXT.menusIntro[lang]} />
      <ul className="space-y-3 stagger">
        {MENUS.map((menu) => (
          <li key={menu.id} className="flex items-center gap-4 p-4 rounded-2xl bg-cartao border border-areia">
            <span
              className="w-14 h-14 rounded-xl bg-bordeaux text-mostarda flex items-center justify-center font-display font-bold text-2xl shrink-0"
              aria-hidden="true"
            >
              {menu.capacity}
            </span>
            <div>
              <h2 className="font-display font-semibold text-lg text-preto">{menu.title[lang]}</h2>
              <p className="text-[15px] text-azeitona">{menu.details[lang]}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------------------------- Rodapé --------------------------------- */

function Footer({ lang }: { lang: Language }) {
  const linkClass =
    'flex items-center gap-3 min-h-11 py-1.5 rounded-lg text-creme hover:text-mostarda transition-colors break-all';
  return (
    <footer className="on-dark bg-preto text-creme pb-24">
      <div className="h-3 checkered" aria-hidden="true" />
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-7 space-y-4">
        <div>
          <p className="font-display font-bold text-xl">Al'Horno</p>
          <p className="text-sm text-areia">
            {UI_TEXT.footer.rights[lang]} · {CONTACT.locality}
          </p>
        </div>

        <p className="flex items-center gap-3 font-semibold text-mostarda">
          <Clock size={20} aria-hidden="true" />
          {UI_TEXT.closed.short[lang]}
        </p>

        <h2 className="sr-only">{UI_TEXT.home.findUs[lang]}</h2>
        <ul className="space-y-1">
          <li>
            <a href={CONTACT.mapsUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
              <MapPin size={20} className="text-mostarda shrink-0" aria-hidden="true" />
              <span>Google Maps — {CONTACT.locality}</span>
            </a>
          </li>
          <li>
            <a href={CONTACT.instagramUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
              <Instagram size={20} className="text-mostarda shrink-0" aria-hidden="true" />
              <span>Instagram {CONTACT.instagramHandle}</span>
            </a>
          </li>
          <li>
            <a href={`mailto:${CONTACT.email}`} className={linkClass}>
              <Mail size={20} className="text-mostarda shrink-0" aria-hidden="true" />
              <span>{CONTACT.email}</span>
            </a>
          </li>
          <li>
            <a href={CONTACT.uberEatsUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
              <ShoppingBag size={20} className="text-mostarda shrink-0" aria-hidden="true" />
              <span>Uber Eats — “{CONTACT.uberEatsStore}”</span>
            </a>
          </li>
        </ul>

      </div>
    </footer>
  );
}

/* ------------------------------ Barra inferior ----------------------------- */

function BottomNav({ lang, view }: { lang: Language; view: View }) {
  const items: { id: View; href: string; label: string; icon: React.ReactNode }[] = [
    { id: 'home', href: '#', label: UI_TEXT.nav.home[lang], icon: <Home size={22} aria-hidden="true" /> },
    { id: 'empanadas', href: '#empanadas', label: UI_TEXT.sections.empanadas[lang], icon: <Flame size={22} aria-hidden="true" /> },
    { id: 'drinks', href: '#drinks', label: UI_TEXT.sections.drinks[lang], icon: <Beer size={22} aria-hidden="true" /> },
    { id: 'menus', href: '#menus', label: UI_TEXT.sections.menus[lang], icon: <Utensils size={22} aria-hidden="true" /> },
  ];
  return (
    <nav
      aria-label={UI_TEXT.nav.main[lang]}
      className="fixed bottom-0 inset-x-0 z-30 bg-creme/95 backdrop-blur border-t border-areia pb-[env(safe-area-inset-bottom)]"
    >
      <ul className="max-w-xl mx-auto grid grid-cols-4">
        {items.map((item) => {
          const active = view === item.id;
          return (
            <li key={item.id}>
              <a
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'press flex flex-col items-center justify-center gap-0.5 h-16 text-xs',
                  active ? 'text-bordeaux font-bold' : 'text-azeitona hover:text-bordeaux font-medium',
                )}
              >
                <span className={cn('px-4 py-1 rounded-full transition-colors duration-200', active && 'bg-areia')}>{item.icon}</span>
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
