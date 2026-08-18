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
      pt: 'Chouriço, cebola caremelizada e mistura de queijos',
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

export const UI_TEXT = {
  chooseLanguage: { pt: 'Selecione o idioma', en: 'Choose language', es: 'Seleccione el idioma' },
  tagline: { pt: 'Forno a lenha', en: 'Wood-fired oven', es: 'Horno de leña' },
  sections: {
    empanadas: { pt: 'Empanadas', en: 'Empanadas', es: 'Empanadas' },
    classicas: { pt: 'Clássicas', en: 'Classics', es: 'Clásicas' },
    premium: { pt: 'Premium', en: 'Premium', es: 'Premium' },
    drinks: { pt: 'Bebidas', en: 'Drinks', es: 'Bebidas' },
    menus: { pt: 'Menus', en: 'Combos', es: 'Menús' },
    ubereats: { pt: 'Uber Eats', en: 'Uber Eats', es: 'Uber Eats' },
    events: { pt: 'Festas & Eventos', en: 'Parties & Events', es: 'Fiestas y Eventos' }
  },
  ubereats: {
    title: { pt: 'Pedir no Uber Eats', en: 'Order on Uber Eats', es: 'Pedir en Uber Eats' },
    subtitle: { pt: 'Entrega direta em sua casa', en: 'Direct delivery to your home', es: 'Entrega directa a su domicilio' },
    badge: { pt: 'Entregas', en: 'Delivery', es: 'A domicilio' },
    banner: { 
      pt: 'Prefere receber em casa? Peça comodamente através do Uber Eats.', 
      en: 'Prefer home delivery? Order comfortably via Uber Eats.', 
      es: '¿Prefiere recibir en casa? Pida cómodamente a través de Uber Eats.' 
    }
  },
  discount: {
    bannerTitle: { 
      pt: '10% de Desconto no Balcão', 
      en: '10% Counter Discount', 
      es: '10% de Descuento en Mostrador' 
    },
    bannerSubtitle: { 
      pt: 'Válido ao balcão presencial • 1 semana', 
      en: 'Valid in-person at the counter • 1 week', 
      es: 'Válido en mostrador presencial • 1 semana' 
    },
    modalTitle: { 
      pt: '10% de Desconto no Balcão', 
      en: '10% Counter Discount', 
      es: '10% de Descuento en Mostrador' 
    },
    modalDescription: { 
      pt: 'Registe o seu contacto para receber um código de 10% de desconto, válido apenas para compras presenciais ao balcão durante 1 semana.', 
      en: 'Register to receive a 10% discount code, valid only for in-person counter purchases for 1 week.', 
      es: 'Regístrese para recibir un código del 10% de descuento, válido únicamente para compras presenciales en mostrador durante 1 semana.' 
    },
    conditionTitle: {
      pt: 'Termos e Condições',
      en: 'Terms & Conditions',
      es: 'Términos y Condiciones'
    },
    conditionText: {
      pt: 'Válido exclusivamente para compras presenciais ao balcão no Al\'Horno. Validade de 1 semana a contar da data de registo.',
      en: 'Valid exclusively for in-person counter purchases at Al\'Horno. Valid for 1 week from registration date.',
      es: 'Válido exclusivamente para compras presenciales en el mostrador de Al\'Horno. Válido durante 1 semana a partir de la fecha de registro.'
    }
  },
  events: {
    title: { 
      pt: "Al'Horno no teu Evento", 
      en: "Al'Horno for Your Event", 
      es: "Al'Horno en tu Evento" 
    },
    text: { 
      pt: "Queres contar com as empanadas do Al'Horno na tua próxima festa, aniversário ou convívio? Preparamos fornadas especiais à medida da tua celebração.", 
      en: "Want to have Al'Horno empanadas at your next party, birthday, or gathering? We prepare custom freshly-baked batches tailored to your celebration.", 
      es: "¿Quieres contar con las empanadas de Al'Horno en tu próxima fiesta, cumpleaños o reunión? Preparamos horneadas especiales a la medida de tu celebración." 
    },
    contactCta: { 
      pt: 'Contacta-nos por e-mail', 
      en: 'Contact us via email', 
      es: 'Contáctanos por email' 
    },
    email: 'alhempanadas@gmail.com'
  },
  wineNote: {
    title: { pt: 'Carta de Vinhos', en: 'Wine List', es: 'Carta de Vinos' },
    description: { 
      pt: 'Dispomos também de carta de vinhos. Consulte a nossa equipa ao balcão para mais informações.', 
      en: 'We also have a wine list. Please ask our team at the counter for details.', 
      es: 'Disponemos también de carta de vinos. Consulte a nuestro equipo en el mostrador para más información.' 
    }
  },
  extrasTitle: {
    pt: 'Molhos & Extras',
    en: 'Sauces & Extras',
    es: 'Salsas y Extras'
  },
  location: { 
    pt: 'Localização', 
    en: 'Location', 
    es: 'Ubicación' 
  },
  openMaps: { 
    pt: 'Abrir no Google Maps', 
    en: 'Open in Google Maps', 
    es: 'Abrir en Google Maps' 
  },
  prepNote: { 
    pt: 'Cozidas diariamente no nosso forno a lenha tradicional', 
    en: 'Baked daily in our traditional wood-fired oven', 
    es: 'Horneadas diariamente en nuestro tradicional horno de leña' 
  },
  allergenWarning: {
    pt: 'Todos os produtos podem conter vestígios de glúten, leite, ovo, soja, frutos de casca rija e outros alergénios devido aos métodos de confeção e manipulação.',
    en: 'All products may contain traces of gluten, milk, egg, soy, nuts and other allergens due to cooking and handling methods.',
    es: 'Todos los productos pueden contener trazas de gluten, leche, huevo, soja, frutos de cáscara y otros alérgenos debido a los métodos de confección y manipulación.'
  },
  vatNote: {
    pt: 'Os valores apresentados já incluem IVA à taxa legal em vigor.',
    en: 'Prices include VAT at the legal rate in force.',
    es: 'Los precios incluyen IVA al tipo legal vigente.'
  }
};
