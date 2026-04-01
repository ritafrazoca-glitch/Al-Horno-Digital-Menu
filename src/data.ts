export type Language = 'pt' | 'en' | 'es';

export interface Empanada {
  code: string;
  name: { [key in Language]: string };
  description: { [key in Language]: string };
  popular?: boolean;
  spicy?: boolean;
  vegetarian?: boolean;
}

export interface Drink {
  name: { [key in Language]: string };
  price: string;
}

export interface DrinkCategory {
  title: { [key in Language]: string };
  items: Drink[];
}

export interface MenuOption {
  title: { [key in Language]: string };
  price: string;
  details?: { [key in Language]: string };
}

export const EMPANADAS: Empanada[] = [
  {
    code: 'T',
    name: { pt: 'Ternera (Vitela)', en: 'Ternera (Veal)', es: 'Ternera (Ternera)' },
    description: {
      pt: 'Carne de vaca, cebola, pimento, ovo cozido e azeitona verde',
      en: 'Beef, onion, bell pepper, hard-boiled egg, and green olives',
      es: 'Carne de res, cebolla, pimiento, huevo cocido y aceituna verde'
    },
    popular: true
  },
  {
    code: 'TX',
    name: { pt: 'Ternera Picante (Vitela Picante)', en: 'Ternera Picante (Spicy Veal)', es: 'Ternera Picante' },
    description: {
      pt: 'Carne de vaca, cebola, pimentos e pimentas variadas',
      en: 'Beef, onions, bell peppers, and assorted chili peppers',
      es: 'Carne de res, cebolla, pimientos y chiles variados'
    },
    spicy: true
  },
  {
    code: 'P',
    name: { pt: 'Pollo (Frango)', en: 'Pollo (Chicken)', es: 'Pollo' },
    description: {
      pt: 'Carne de frango, tomate, cebola e cebola japonesa',
      en: 'Chicken, tomatoes, onions, and japanese onions',
      es: 'Pollo, tomate, cebolla y cebolla japonesa'
    }
  },
  {
    code: 'PX',
    name: { pt: 'Pollo Picante (Frango Picante)', en: 'Pollo Picante (Spicy Chicken)', es: 'Pollo Picante' },
    description: {
      pt: 'Carne de frango, cebola, aipo, lima kaffir e mistura de pimentas',
      en: 'Chicken, onion, celery, kaffir lime, and a blend of peppers',
      es: 'Pollo, cebolla, apio, lima kaffir y mezcla de pimientas'
    },
    popular: true,
    spicy: true
  },
  {
    code: 'CL',
    name: { pt: 'Colares (Cachaço de Porco)', en: 'Colares (Pork)', es: 'Colares (Cerdo)' },
    description: {
      pt: 'Cachaço de porco a baixa temperatura com cerveja preta, cebola, natas, pimenta, mostarda e mel',
      en: 'Slow-cooked pork with dark beer, onions, cream, pepper, mustard, and honey',
      es: 'Cerdo a baja temperatura con cerveza negra, cebolla, nata, pimienta, mostaza y miel'
    }
  },
  {
    code: 'A',
    name: { pt: 'Atún (Atum)', en: 'Atún (Tuna)', es: 'Atún' },
    description: {
      pt: 'Atum, cebola, pimentos, ovo cozido, azeitonas verdes, tomate fresco e curgete',
      en: 'Tuna, onion, bell peppers, hard-boiled egg, green olives, fresh tomatoes, and zucchini',
      es: 'Atún, cebolla, pimientos, huevo cocido, aceitunas verdes, tomate fresco y calabacín'
    }
  },
  {
    code: 'CP',
    name: { pt: 'Criollo y Provolone (Chouriço Criollo e Provolone)', en: 'Criollo y Provolone (Criollo Chorizo and Provolone)', es: 'Criollo y Provolone' },
    description: {
      pt: 'Chouriço criollo, cebola laminada, queijo provolone, tomate seco e vinho branco',
      en: 'Criollo chorizo, sliced onions, provolone cheese, sun-dried tomatoes, and white wine',
      es: 'Chorizo criollo, cebolla laminada, queso provolone, tomate seco y vino blanco'
    }
  },
  {
    code: 'JQ',
    name: { pt: 'Jamón y Queso (Fiambre e Queijo)', en: 'Jamón y Queso (Ham and Cheese)', es: 'Jamón y Queso' },
    description: {
      pt: 'Fiambre e mistura de queijos',
      en: 'Ham and assorted cheeses',
      es: 'Jamón y mezcla de quesos'
    }
  },
  {
    code: 'Q',
    name: { pt: 'Queso (4 Queijos)', en: 'Queso (Four Cheese)', es: 'Queso (4 Quesos)' },
    description: {
      pt: 'Provolone picante, queijos variados e chimichurri',
      en: 'Spicy provolone, assorted cheeses, and chimichurri',
      es: 'Provolone picante, quesos variados y chimichurri'
    },
    popular: true,
    spicy: true,
    vegetarian: true
  },
  {
    code: 'CQ',
    name: { pt: 'Cebolla y Queso (Cebola e Queijo)', en: 'Cebolla y Queso (Onions and Cheese)', es: 'Cebolla y Queso' },
    description: {
      pt: 'Cebola na chapa e queijos variados',
      en: 'Grilled onions and assorted cheeses',
      es: 'Cebolla a la plancha y quesos variados'
    },
    vegetarian: true
  },
  {
    code: 'ST',
    name: { pt: 'Setas y Trufa (Cogumelos e Trufa)', en: 'Setas y Trufa (Mushrooms and Truffles)', es: 'Setas y Trufa' },
    description: {
      pt: 'Cogumelos, tartufata (pasta de trufa), cebola, tomilho fresco e queijos variados',
      en: 'Mushrooms, tartufata (truffle paste), onion, fresh thyme, and assorted cheeses',
      es: 'Setas, tartufata (pasta de trufa), cebolla, tomillo fresco y quesos variados'
    },
    popular: true,
    vegetarian: true
  },
  {
    code: 'TA',
    name: { pt: 'Tomate y Albahaca (Tomate e Manjericão)', en: 'Tomate y Albahaca (Tomatoes and Basil)', es: 'Tomate y Albahaca' },
    description: {
      pt: 'Tomate fresco, tomate seco, manjericão fresco e queijos variados',
      en: 'Fresh tomatoes, sun-dried tomatoes, fresh basil, and assorted cheeses',
      es: 'Tomate fresco, tomate seco, albahaca fresca y quesos variados'
    },
    vegetarian: true
  },
  {
    code: 'ER',
    name: { pt: 'Espinaca y Ricotta (Espinafres, Noz e Ricotta)', en: 'Espinaca y Ricotta (Spinach, Walnuts and Ricotta)', es: 'Espinaca y Ricotta' },
    description: {
      pt: 'Espinafres, ricotta, cebola, nozes e queijos variados',
      en: 'Spinach, ricotta, onion, walnuts, and assorted cheeses',
      es: 'Espinacas, ricotta, cebolla, nueces y quesos variados'
    },
    vegetarian: true
  }
];

export const DRINKS: DrinkCategory[] = [
  {
    title: { pt: 'Sumos', en: 'Soft Drinks', es: 'Refrescos' },
    items: [
      { name: { pt: 'Sumol', en: 'Sumol', es: 'Sumol' }, price: '2,6 €' },
      { name: { pt: 'Iced Tea', en: 'Iced Tea', es: 'Iced Tea' }, price: '2,6 €' },
      { name: { pt: 'Compal', en: 'Compal', es: 'Compal' }, price: '2,6 €' },
      { name: { pt: '7Up', en: '7Up', es: '7Up' }, price: '2,6 €' },
      { name: { pt: 'Pepsi', en: 'Pepsi', es: 'Pepsi' }, price: '2,6 €' },
      { name: { pt: 'Pepsi 0', en: 'Pepsi 0', es: 'Pepsi 0' }, price: '2,6 €' }
    ]
  },
  {
    title: { pt: 'Águas', en: 'Water', es: 'Aguas' },
    items: [
      { name: { pt: 'Serra da Estrela 0.5', en: 'Serra da Estrela 0.5', es: 'Serra da Estrela 0.5' }, price: '2 €' },
      { name: { pt: 'Frize', en: 'Frize', es: 'Frize' }, price: '2,3 €' }
    ]
  },
  {
    title: { pt: 'Cervejas', en: 'Beers', es: 'Cervezas' },
    items: [
      { name: { pt: 'Corona', en: 'Corona', es: 'Corona' }, price: '3,5 €' },
      { name: { pt: 'Estrella Damm 0.25', en: 'Estrella Damm 0.25', es: 'Estrella Damm 0.25' }, price: '2 €' },
      { name: { pt: 'Estrella Damm 0.33', en: 'Estrella Damm 0.33', es: 'Estrella Damm 0.33' }, price: '3 €' },
      { name: { pt: 'Damm Free 0.25', en: 'Damm Free 0.25', es: 'Damm Free 0.25' }, price: '2,1 €' }
    ]
  },
  {
    title: { pt: 'Cafetaria', en: 'Café', es: 'Cafetería' },
    items: [
      { name: { pt: 'Café Expresso', en: 'Espresso', es: 'Café Expreso' }, price: '1 €' },
      { name: { pt: 'Abatanado', en: 'Black Coffee', es: 'Café Largo' }, price: '1,5 €' },
      { name: { pt: 'Meia de Leite', en: 'Latte', es: 'Café con Leche' }, price: '1,6 €' }
    ]
  },
  {
    title: { pt: 'Vinho a Copo', en: 'Glass of Wine', es: 'Copa de Vino' },
    items: [
      { name: { pt: 'Vinho a Copo', en: 'Glass of Wine', es: 'Copa de Vino' }, price: '4 €' }
    ]
  }
];

export const MENUS: MenuOption[] = [
  {
    title: { pt: 'Menu 3 Empanadas', en: 'Menu 3 Empanadas', es: 'Menú 3 Empanadas' },
    price: '12,7 €',
    details: { pt: '3 Empanadas + 1 Bebida', en: '3 Empanadas + 1 Drink', es: '3 Empanadas + 1 Bebida' }
  },
  {
    title: { pt: 'Menu 6 Empanadas', en: 'Menu 6 Empanadas', es: 'Menú 6 Empanadas' },
    price: '25,4 €',
    details: { pt: '6 Empanadas + 2 Bebidas', en: '6 Empanadas + 2 Drinks', es: '6 Empanadas + 2 Bebidas' }
  },
  {
    title: { pt: 'Menu 12 Empanadas', en: 'Menu 12 Empanadas', es: 'Menú 12 Empanadas' },
    price: '46,4 €',
    details: { pt: '12 Empanadas + 2 Bebidas', en: '12 Empanadas + 2 Drinks', es: '12 Empanadas + 2 Bebidas' }
  }
];

export const TASTING_MENUS: MenuOption[] = [
  {
    title: { pt: 'Degustação 6', en: 'Tasting 6', es: 'Degustación 6' },
    price: '21 €',
    details: { pt: '6 Empanadas', en: '6 Empanadas', es: '6 Empanadas' }
  },
  {
    title: { pt: 'Degustação 12', en: 'Tasting 12', es: 'Degustación 12' },
    price: '41 €',
    details: { pt: '12 Empanadas', en: '12 Empanadas', es: '12 Empanadas' }
  }
];

export const UI_TEXT = {
  chooseLanguage: { pt: 'Escolher idioma', en: 'Choose language', es: 'Elegir idioma' },
  tagline: { pt: 'Empanadas feitas no forno a lenha', en: 'Empanadas made in a wood-fired oven', es: 'Empanadas hechas en horno de leña' },
  sections: {
    empanadas: { pt: 'Empanadas', en: 'Empanadas', es: 'Empanadas' },
    drinks: { pt: 'Bebidas', en: 'Drinks', es: 'Bebidas' },
    menus: { pt: 'Menus', en: 'Menus', es: 'Menús' },
    history: { pt: 'A nossa história', en: 'Our history', es: 'Nuestra historia' }
  },
  backToLanguage: { pt: 'Voltar ao idioma', en: 'Back to language', es: 'Volver al idioma' },
  mostPopular: { pt: 'Mais Pedida', en: 'Most Popular', es: 'Más Pedida' },
  menuNote: {
    pt: 'A cerveja Corona, a Estrella 0,33, o vinho, e a agua com gás 0,75 não estão incluidas no menu, pelo que acresce o valor da diferença',
    en: 'Corona beer, Estrella (0.33 L), wine, and sparkling water (0.75 L) are not included in the menu, so the difference in price will be added',
    es: 'La cerveza Corona, la Estrella 0,33, el vino y el agua con gas 0,75 no están incluidos en el menú, por lo que se añadirá la diferencia de precio'
  },
  tastingMenus: { pt: 'Menus de Degustação', en: 'Tasting Menus', es: 'Menús de Degustación' },
  historyText: {
    pt: 'Chamo-me Tomás Gouveia e este projeto ganhou vida no momento em que eu e a minha mãe decidimos criar algo verdadeiramente nosso. Nascemos e crescemos nas Azenhas do Mar, e foi no coração da nossa aldeia que abrimos o primeiro Al’ Horno. O nosso conceito é simples: empanadas preparadas no calor do forno a lenha, feitas com dedicação e com os sabores que todos adoramos. Mais do que um espaço, é a nossa casa que partilhamos convosco.',
    en: 'My name is Tomás Gouveia and this project came to life when my mother and I decided to create something truly ours. We were born and raised in Azenhas do Mar, and it was in the heart of our village that we opened the first Al’ Horno. Our concept is simple: empanadas prepared in the heat of a wood-fired oven, made with dedication and with the flavors we all love. More than a space, it is our home that we share with you.',
    es: 'Mi nombre es Tomás Gouveia y este proyecto cobró vida cuando mi madre y yo decidimos crear algo verdaderamente nuestro. Nacimos y crecimos en Azenhas do Mar, y fue en el corazón de nuestra aldea donde abrimos el primer Al’ Horno. Nuestro concepto es sencillo: empanadas preparadas al calor de un horno de leña, hechas con dedicación y con los sabores que a todos nos encantan. Más que un espacio, es nuestro hogar el que compartimos con vosotros.'
  }
};
