export type Language = 'pt' | 'en' | 'es';

export interface Empanada {
  code: string;
  name: { [key in Language]: string };
  description: { [key in Language]: string };
  price: number;
  popular?: boolean;
  spicy?: boolean;
  vegetarian?: boolean;
  premium?: boolean;
  allergens: string[];
}

export interface Drink {
  id: string;
  name: { [key in Language]: string };
  premium?: boolean;
}

export interface DrinkCategory {
  title: { [key in Language]: string };
  items: Drink[];
}

export interface MenuOption {
  id: string;
  title: { [key in Language]: string };
  details: { [key in Language]: string };
  capacity: number;
  drinkCapacity: number;
}

export interface ExtraItem {
  id: string;
  name: { [key in Language]: string };
  description: { [key in Language]: string };
  price: number;
}

export const EMPANADAS: Empanada[] = [
  // --- CLÁSSICAS (3.50 €) ---
  {
    code: 'T',
    name: { pt: 'Vitela', en: 'Veal', es: 'Vitela' },
    description: {
      pt: 'Carne de vaca, cebola, pimento, ovo cozido e azeitona verde',
      en: 'Beef, onion, bell pepper, hard-boiled egg, and green olive',
      es: 'Carne de res, cebolla, pimiento, huevo cocido y aceituna verde'
    },
    price: 3.50,
    allergens: ['G', 'O']
  },
  {
    code: 'TX',
    name: { pt: 'Vitela Picante', en: 'Spicy Veal', es: 'Vitela Picante' },
    description: {
      pt: 'Carne de vaca, cebola, pimentos e pimentas variadas',
      en: 'Beef, onion, bell peppers, and assorted chili peppers',
      es: 'Carne de res, cebolla, pimientos y chiles variados'
    },
    price: 3.50,
    spicy: true,
    allergens: ['G']
  },
  {
    code: 'P',
    name: { pt: 'Frango', en: 'Chicken', es: 'Pollo' },
    description: {
      pt: 'Carne de frango, tomate, cebola e cebola japonesa',
      en: 'Chicken, tomato, onion, and japanese spring onion',
      es: 'Pollo, tomate, cebolla y cebolla japonesa'
    },
    price: 3.50,
    allergens: ['G']
  },
  {
    code: 'PX',
    name: { pt: 'Frango Picante', en: 'Spicy Chicken', es: 'Pollo Picante' },
    description: {
      pt: 'Carne de frango, cebola, aipo, lima kaffir e mistura de pimentas',
      en: 'Chicken, onion, celery, kaffir lime, and pepper blend',
      es: 'Pollo, cebolla, apio, lima kaffir y mezcla de pimientas'
    },
    price: 3.50,
    spicy: true,
    allergens: ['G', 'A']
  },
  {
    code: 'CL',
    name: { pt: 'Colares (Cachaço de Porco)', en: 'Colares (Slow-cooked Pork)', es: 'Colares (Cerdo)' },
    description: {
      pt: 'Cachaço de porco a baixa temperatura com cerveja preta, cebola, natas, pimenta, mostarda e mel',
      en: 'Slow-cooked pork with dark beer, onion, cream, pepper, mustard, and honey',
      es: 'Cerdo a baja temperatura con cerveza negra, cebolla, nata, pimienta, mostaza y miel'
    },
    price: 3.50,
    allergens: ['G', 'M', 'L']
  },
  {
    code: 'CA',
    name: { pt: 'Porco, Ananás e Lima', en: 'Pork, Pineapple and Lime', es: 'Cerdo, Piña y Lima' },
    description: {
      pt: 'Pá de porco, cebola roxa, pimentos, ananás caramelizado, coentros, sumo e raspa de lima.',
      en: 'Pork shoulder, red onion, bell peppers, caramelized pineapple, coriander, lime juice and zest.',
      es: 'Paleta de cerdo, cebolla roja, pimientos, piña caramelizada, cilantro, zumo y ralladura de lima.'
    },
    price: 3.50,
    allergens: ['G']
  },
  {
    code: 'CP',
    name: { pt: 'Chouriço Criollo e Provolone', en: 'Criollo Chorizo and Provolone', es: 'Chorizo Criollo y Provolone' },
    description: {
      pt: 'Chouriço criollo, cebola laminada, queijo provolone, tomate seco e vinho branco',
      en: 'Criollo chorizo, sliced onion, provolone cheese, sun-dried tomato, and white wine',
      es: 'Chorizo criollo, cebolla laminada, queso provolone, tomate seco y vino blanco'
    },
    price: 3.50,
    allergens: ['G', 'L']
  },
  {
    code: 'A',
    name: { pt: 'Atum', en: 'Tuna', es: 'Atún' },
    description: {
      pt: 'Atum, cebola, pimentos, ovo cozido, azeitonas verdes, tomate fresco e curgete',
      en: 'Tuna, onion, bell peppers, hard-boiled egg, green olives, fresh tomato, and zucchini',
      es: 'Atún, cebolla, pimientos, huevo cocido, aceitunas verdes, tomate fresco y calabacín'
    },
    price: 3.50,
    allergens: ['G', 'P', 'O']
  },
  {
    code: 'ER',
    name: { pt: 'Espinafres, Noz e Ricotta', en: 'Spinach, Walnuts and Ricotta', es: 'Espinacas, Nuez y Ricotta' },
    description: {
      pt: 'Espinafres, ricotta, cebola, nozes e queijos variados',
      en: 'Spinach, ricotta, onion, walnuts, and assorted cheeses',
      es: 'Espinacas, ricotta, cebolla, nueces y quesos variados'
    },
    price: 3.50,
    vegetarian: true,
    allergens: ['G', 'L', 'FC']
  },
  {
    code: 'CQ',
    name: { pt: 'Cebola e Queijo', en: 'Onion and Cheese', es: 'Cebolla y Queso' },
    description: {
      pt: 'Cebola na chapa e queijos variados',
      en: 'Grilled onion and assorted cheeses',
      es: 'Cebolla a la plancha y quesos variados'
    },
    price: 3.50,
    vegetarian: true,
    allergens: ['G', 'L']
  },

  // --- PREMIUM (4.00 €) ---
  {
    code: 'MP',
    name: { pt: 'Matambre', en: 'Matambre', es: 'Matambre' },
    description: {
      pt: 'Matambre (corte de vaca argentino), manjericão fresco, tomate natural e mistura de queijos.',
      en: 'Matambre (Argentine flank steak cut), fresh basil, natural tomato, and cheese blend.',
      es: 'Matambre (corte de ternera argentino), albahaca fresca, tomate natural y mezcla de quesos.'
    },
    price: 4.00,
    premium: true,
    allergens: ['G', 'L']
  },
  {
    code: 'ON',
    name: { pt: 'Osso Buco com Laranja', en: 'Osso Buco with Orange', es: 'Osso Buco con Naranja' },
    description: {
      pt: 'Ossobuco de vaca estufado com legumes, sumo e raspa de laranja, vinho tinto Malbec e mistura de malaguetas',
      en: 'Braised beef osso buco with vegetables, orange juice and zest, Malbec red wine, and chili blend',
      es: 'Ossobuco de ternera estofado con verduras, zumo y ralladura de naranja, vino tinto Malbec y mezcla de chiles'
    },
    price: 4.00,
    premium: true,
    allergens: ['G']
  },
  {
    code: 'R',
    name: { pt: 'Rabo de Boi', en: 'Oxtail', es: 'Rabo de Toro' },
    description: {
      pt: 'Rabo de boi, cenoura, cebola, vinho tinto Malbec e especiarias.',
      en: 'Oxtail, carrot, onion, Malbec red wine, and spices.',
      es: 'Rabo de toro, zanahoria, cebolla, vino tinto Malbec y especias.'
    },
    price: 4.00,
    premium: true,
    allergens: ['G']
  },
  {
    code: 'JQ',
    name: { pt: 'Mista', en: 'Ham and Cheese (Mista)', es: 'Mixta' },
    description: {
      pt: 'Fiambre e mistura de queijos',
      en: 'Ham and cheese blend',
      es: 'Jamón cocido y mezcla de quesos'
    },
    price: 4.00,
    premium: true,
    allergens: ['G', 'L']
  },
  {
    code: 'CH',
    name: { pt: 'Chouriço e Queijo', en: 'Chorizo and Cheese', es: 'Chorizo y Queso' },
    description: {
      pt: 'Chouriço, cebola caramelizada e mistura de queijos',
      en: 'Chorizo, caramelized onion, and cheese blend',
      es: 'Chorizo, cebolla caramelizada y mezcla de quesos'
    },
    price: 4.00,
    premium: true,
    allergens: ['G', 'L']
  },
  {
    code: 'CS',
    name: { pt: 'Queijo Cabra e Salva', en: 'Goat Cheese and Sage', es: 'Queso de Cabra y Salvia' },
    description: {
      pt: 'Queijo de cabra, pesto de salva e avelãs, mistura de queijos.',
      en: 'Goat cheese, sage and hazelnut pesto, cheese blend.',
      es: 'Queso de cabra, pesto de salvia y avellanas, mezcla de quesos.'
    },
    price: 4.00,
    premium: true,
    vegetarian: true,
    allergens: ['L', 'FC']
  },
  {
    code: 'Q',
    name: { pt: '4 Queijos', en: '4 Cheeses', es: '4 Quesos' },
    description: {
      pt: 'Provolone picante, queijos variados e chimichurri',
      en: 'Spicy provolone, assorted cheeses, and chimichurri',
      es: 'Provolone picante, quesos variados y chimichurri'
    },
    price: 4.00,
    premium: true,
    spicy: true,
    vegetarian: true,
    allergens: ['G', 'L']
  },
  {
    code: 'ST',
    name: { pt: 'Cogumelos e Trufa', en: 'Mushrooms and Truffle', es: 'Setas y Trufa' },
    description: {
      pt: 'Cogumelos, tartufata (pasta de trufa), cebola, tomilho fresco e queijos variados',
      en: 'Mushrooms, tartufata (truffle paste), onion, fresh thyme, and assorted cheeses',
      es: 'Setas, tartufata (pasta de trufa), cebolla, tomillo fresco y quesos variados'
    },
    price: 4.00,
    premium: true,
    vegetarian: true,
    allergens: ['L', 'FC']
  },
  {
    code: 'TA',
    name: { pt: 'Tomate e Manjericão', en: 'Tomato and Basil', es: 'Tomate y Albahaca' },
    description: {
      pt: 'Tomate fresco, tomate seco, manjericão fresco e queijos variados',
      en: 'Fresh tomato, sun-dried tomato, fresh basil, and assorted cheeses',
      es: 'Tomate fresco, tomate seco, albahaca fresca y quesos variados'
    },
    price: 4.00,
    premium: true,
    vegetarian: true,
    allergens: ['G', 'L']
  }
];

export const EXTRAS: ExtraItem[] = [
  {
    id: 'chimi',
    name: {
      pt: 'Molho Chimichurri',
      en: 'Chimichurri Sauce',
      es: 'Salsa Chimichurri'
    },
    description: {
      pt: 'Receita tradicional da casa com salsa fresca, orégãos, alho, azeite virgem extra e especiarias.',
      en: 'Traditional house recipe with fresh parsley, oregano, garlic, extra virgin olive oil, and spices.',
      es: 'Receta tradicional de la casa con perejil fresco, orégano, ajo, aceite de oliva virgen extra y especias.'
    },
    price: 1.00
  }
];

export const DRINKS: DrinkCategory[] = [
  {
    title: { pt: 'Águas e Sumos', en: 'Water and Juices', es: 'Aguas y Zumos' },
    items: [
      { id: 'd1', name: { pt: 'Água 0,33cl', en: 'Mineral Water 0.33cl', es: 'Agua 0,33cl' } },
      { id: 'd2', name: { pt: 'Frize 0,25cl', en: 'Frize Sparkling Water 0.25cl', es: 'Frize con gas 0,25cl' } },
      { id: 'd3', name: { pt: 'Sumol (Maracujá, Ananás e Laranja)', en: 'Sumol (Passion Fruit, Pineapple, Orange)', es: 'Sumol (Maracuyá, Piña y Naranja)' } },
      { id: 'd4', name: { pt: '7Up', en: '7Up', es: '7Up' } },
      { id: 'd5', name: { pt: 'Iced Tea (Pêssego, Limão e Manga)', en: 'Iced Tea (Peach, Lemon, Mango)', es: 'Iced Tea (Melocotón, Limón y Mango)' } },
      { id: 'd6', name: { pt: 'Pepsi', en: 'Pepsi', es: 'Pepsi' } },
      { id: 'd7', name: { pt: 'Pepsi 0', en: 'Pepsi Zero', es: 'Pepsi 0' } },
      { id: 'd8', name: { pt: 'Compal (Pêssego, Maçã, Pêra Rocha, Laranja do Algarve, Manga)', en: 'Compal (Peach, Apple, Pear, Orange, Mango)', es: 'Compal (Melocotón, Manzana, Pera, Naranja, Mango)' } }
    ]
  },
  {
    title: { pt: 'Outras Bebidas & Cervejas', en: 'Other Drinks & Beers', es: 'Otras Bebidas y Cervezas' },
    items: [
      { id: 'd9', name: { pt: 'Heineken 0,25cl', en: 'Heineken 0.25cl', es: 'Heineken 0,25cl' } },
      { id: 'd10', name: { pt: 'Estrella Damm 0,25cl', en: 'Estrella Damm 0.25cl', es: 'Estrella Damm 0,25cl' } },
      { id: 'd11', name: { pt: 'Estrella Damm 0,33cl', en: 'Estrella Damm 0.33cl', es: 'Estrella Damm 0,33cl' } },
      { id: 'd12', name: { pt: 'Free Damm (Sem Álcool)', en: 'Free Damm (Non-Alcoholic)', es: 'Free Damm (Sin Alcohol)' } },
      { id: 'd13', name: { pt: 'Somersby 0,33cl', en: 'Somersby Cider 0.33cl', es: 'Sidra Somersby 0,33cl' }, premium: true },
      { id: 'd14', name: { pt: 'Corona', en: 'Corona', es: 'Corona' }, premium: true }
    ]
  }
];

export const MENUS: MenuOption[] = [
  {
    id: 'm3',
    title: { pt: 'Menu 3 Empanadas', en: 'Menu 3 Empanadas', es: 'Menú 3 Empanadas' },
    details: { pt: '3 Empanadas à escolha + 1 Bebida', en: '3 Empanadas of choice + 1 Drink', es: '3 Empanadas a elección + 1 Bebida' },
    capacity: 3,
    drinkCapacity: 1
  },
  {
    id: 'm6',
    title: { pt: 'Menu 6 Empanadas', en: 'Menu 6 Empanadas', es: 'Menú 6 Empanadas' },
    details: { pt: '6 Empanadas à escolha + 2 Bebidas', en: '6 Empanadas of choice + 2 Drinks', es: '6 Empanadas a elección + 2 Bebidas' },
    capacity: 6,
    drinkCapacity: 2
  },
  {
    id: 'm12',
    title: { pt: 'Menu 12 Empanadas', en: 'Menu 12 Empanadas', es: 'Menú 12 Empanadas' },
    details: { pt: '12 Empanadas à escolha + 4 Bebidas', en: '12 Empanadas of choice + 4 Drinks', es: '12 Empanadas a elección + 4 Bebidas' },
    capacity: 12,
    drinkCapacity: 4
  }
];

export const ALLERGENS: { code: string; name: { [key in Language]: string } }[] = [
  { code: 'G', name: { pt: 'Glúten', en: 'Gluten', es: 'Gluten' } },
  { code: 'L', name: { pt: 'Leite', en: 'Milk / Dairy', es: 'Leche' } },
  { code: 'O', name: { pt: 'Ovo', en: 'Egg', es: 'Huevo' } },
  { code: 'P', name: { pt: 'Peixe', en: 'Fish', es: 'Pescado' } },
  { code: 'FC', name: { pt: 'Frutos de casca rija', en: 'Nuts', es: 'Frutos de cáscara' } },
  { code: 'M', name: { pt: 'Mostarda', en: 'Mustard', es: 'Mostaza' } },
  { code: 'A', name: { pt: 'Aipo', en: 'Celery', es: 'Apio' } }
];

type T = { [key in Language]: string };

/** Informação oficial do Al'Horno — alterar aqui atualiza todo o site. */
export const CONTACT = {
  mapsUrl: 'https://share.google/9OhowbjjeGXKDgI0F',
  instagramHandle: '@al.horno_pt',
  instagramUrl: 'https://www.instagram.com/al.horno_pt/',
  email: 'alhempanadas@gmail.com',
  uberEatsUrl: 'https://www.ubereats.com/pt/store/al-horno/9JfmUE8GWs2ds3R9k3foiA?ps=1',
  uberEatsStore: 'Al Horno',
  locality: 'Aldeia da Praia',
};

export const UI_TEXT = {
  languageLabel: { pt: 'Idioma', en: 'Language', es: 'Idioma' } as T,
  tagline: { pt: 'Empanadas artesanais', en: 'Handmade empanadas', es: 'Empanadas artesanales' } as T,
  closed: {
    short: { pt: 'Encerra às quartas-feiras', en: 'Closed on Wednesdays', es: 'Cerrado los miércoles' } as T,
  },
  nav: {
    home: { pt: 'Início', en: 'Home', es: 'Inicio' } as T,
    main: { pt: 'Navegação principal', en: 'Main navigation', es: 'Navegación principal' } as T,
    back: { pt: 'Voltar ao início', en: 'Back to home', es: 'Volver al inicio' } as T,
    skip: { pt: 'Saltar para o conteúdo', en: 'Skip to content', es: 'Saltar al contenido' } as T,
    newWindow: { pt: '(abre noutra janela)', en: '(opens in a new window)', es: '(se abre en otra ventana)' } as T,
  },
  sections: {
    empanadas: { pt: 'Empanadas', en: 'Empanadas', es: 'Empanadas' } as T,
    drinks: { pt: 'Bebidas', en: 'Drinks', es: 'Bebidas' } as T,
    menus: { pt: 'Menus', en: 'Combos', es: 'Menús' } as T,
  },
  home: {
    empanadasDesc: (classic: number, premium: number): T => ({
      pt: `${classic} clássicas e ${premium} premium, com opções de carne, peixe e vegetarianas.`,
      en: `${classic} classics and ${premium} premium, with meat, fish and vegetarian options.`,
      es: `${classic} clásicas y ${premium} premium, con opciones de carne, pescado y vegetarianas.`,
    }),
    varieties: (n: number): T => ({ pt: `${n} variedades`, en: `${n} varieties`, es: `${n} variedades` }),
    drinksDesc: {
      pt: 'Águas, sumos, refrigerantes, cervejas e carta de vinhos.',
      en: 'Water, juices, soft drinks, beers and wine list.',
      es: 'Aguas, zumos, refrescos, cervezas y carta de vinos.',
    } as T,
    menusDesc: {
      pt: 'Menus de 3, 6 e 12 empanadas com bebidas, para partilhar.',
      en: 'Combos of 3, 6 and 12 empanadas with drinks, to share.',
      es: 'Menús de 3, 6 y 12 empanadas con bebidas, para compartir.',
    } as T,
    findUs: { pt: 'Onde estamos', en: 'Find us', es: 'Dónde estamos' } as T,
  },
  ubereats: {
    title: { pt: 'Encomendar no Uber Eats', en: 'Order on Uber Eats', es: 'Pedir en Uber Eats' } as T,
    subtitle: {
      pt: `Procure a loja "Al Horno" — entrega em casa`,
      en: `Look for the "Al Horno" store — home delivery`,
      es: `Busque la tienda "Al Horno" — entrega a domicilio`,
    } as T,
  },
  events: {
    title: { pt: 'Encomendas para eventos', en: 'Event orders', es: 'Pedidos para eventos' } as T,
    text: {
      pt: 'Festas, aniversários, empresas ou casamentos: preparamos fornadas à medida. Diga-nos a data, o número de pessoas e o local, e enviamos um orçamento sem compromisso.',
      en: 'Parties, birthdays, corporate events or weddings: we bake batches to measure. Tell us the date, number of guests and location, and we will send you a no-obligation quote.',
      es: 'Fiestas, cumpleaños, empresas o bodas: preparamos horneadas a medida. Indíquenos la fecha, el número de personas y el lugar, y le enviaremos un presupuesto sin compromiso.',
    } as T,
    cta: { pt: 'Pedir orçamento', en: 'Request a quote', es: 'Pedir presupuesto' } as T,
    copy: { pt: 'Copiar e-mail', en: 'Copy email', es: 'Copiar email' } as T,
    copied: { pt: 'E-mail copiado!', en: 'Email copied!', es: '¡Email copiado!' } as T,
    subject: {
      pt: "Pedido de orçamento — evento Al'Horno",
      en: "Quote request — Al'Horno event",
      es: "Solicitud de presupuesto — evento Al'Horno",
    } as T,
    body: {
      pt: 'Olá Al\'Horno,\n\nGostaria de pedir um orçamento para um evento.\n\nData:\nNúmero de pessoas:\nLocal:\nTipo de evento:\nNome e telefone:\n\nObrigado!',
      en: 'Hello Al\'Horno,\n\nI would like to request a quote for an event.\n\nDate:\nNumber of guests:\nLocation:\nType of event:\nName and phone:\n\nThank you!',
      es: 'Hola Al\'Horno,\n\nMe gustaría pedir un presupuesto para un evento.\n\nFecha:\nNúmero de personas:\nLugar:\nTipo de evento:\nNombre y teléfono:\n\n¡Gracias!',
    } as T,
  },
  filters: {
    label: { pt: 'Filtrar empanadas', en: 'Filter empanadas', es: 'Filtrar empanadas' } as T,
    all: { pt: 'Todas', en: 'All', es: 'Todas' } as T,
    classicas: { pt: 'Clássicas', en: 'Classics', es: 'Clásicas' } as T,
    premium: { pt: 'Premium', en: 'Premium', es: 'Premium' } as T,
    veg: { pt: 'Vegetarianas', en: 'Vegetarian', es: 'Vegetarianas' } as T,
  },
  tags: {
    premium: { pt: 'Premium', en: 'Premium', es: 'Premium' } as T,
    spicy: { pt: 'Picante', en: 'Spicy', es: 'Picante' } as T,
    veg: { pt: 'Vegetariana', en: 'Vegetarian', es: 'Vegetariana' } as T,
    special: { pt: 'Especial', en: 'Special', es: 'Especial' } as T,
  },
  allergensLabel: { pt: 'Alergénios', en: 'Allergens', es: 'Alérgenos' } as T,
  allergensLegend: { pt: 'Legenda de alergénios', en: 'Allergen key', es: 'Leyenda de alérgenos' } as T,
  results: (n: number): T => ({
    pt: n === 1 ? '1 empanada' : `${n} empanadas`,
    en: n === 1 ? '1 empanada' : `${n} empanadas`,
    es: n === 1 ? '1 empanada' : `${n} empanadas`,
  }),
  menusIntro: {
    pt: 'Combinações para uma refeição individual ou para partilhar.',
    en: 'Combos for a meal on your own or to share.',
    es: 'Combinaciones para una comida individual o para compartir.',
  } as T,
  wineNote: {
    title: { pt: 'Carta de Vinhos', en: 'Wine List', es: 'Carta de Vinos' } as T,
    description: {
      pt: 'Dispomos também de carta de vinhos. Pergunte à nossa equipa ao balcão.',
      en: 'We also have a wine list. Please ask our team at the counter.',
      es: 'Disponemos también de carta de vinos. Pregunte a nuestro equipo en el mostrador.',
    } as T,
  },
  extrasTitle: { pt: 'Molhos & Extras', en: 'Sauces & Extras', es: 'Salsas y Extras' } as T,
  prepNote: {
    pt: 'Feitas à mão e cozidas diariamente',
    en: 'Handmade and baked daily',
    es: 'Hechas a mano y horneadas a diario',
  } as T,
  allergenWarning: {
    pt: 'Todos os produtos podem conter vestígios de glúten, leite, ovo, soja, frutos de casca rija e outros alergénios devido aos métodos de confeção e manipulação.',
    en: 'All products may contain traces of gluten, milk, egg, soy, nuts and other allergens due to cooking and handling methods.',
    es: 'Todos los productos pueden contener trazas de gluten, leche, huevo, soja, frutos de cáscara y otros alérgenos debido a los métodos de elaboración y manipulación.',
  } as T,
  vatNote: {
    pt: 'Os valores apresentados já incluem IVA à taxa legal em vigor.',
    en: 'Prices include VAT at the legal rate in force.',
    es: 'Los precios incluyen IVA al tipo legal vigente.',
  } as T,
  search: {
    placeholder: { pt: 'Pesquisar pelo nome…', en: 'Search by name…', es: 'Buscar por nombre…' } as T,
    label: { pt: 'Pesquisar empanada pelo nome', en: 'Search empanada by name', es: 'Buscar empanada por nombre' } as T,
    clear: { pt: 'Limpar pesquisa', en: 'Clear search', es: 'Borrar búsqueda' } as T,
    noResults: { pt: 'Nenhuma empanada encontrada para', en: 'No empanadas found for', es: 'No se encontraron empanadas para' } as T,
    resetFilters: { pt: 'Mostrar todas', en: 'Show all', es: 'Mostrar todas' } as T,
  },
  footer: {
    rights: { pt: 'Empanadas artesanais', en: 'Handmade empanadas', es: 'Empanadas artesanales' } as T,
  },
};
