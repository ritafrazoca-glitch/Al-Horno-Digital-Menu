export type Language = 'pt' | 'en' | 'es';

export interface Empanada {
  code: string;
  name: { [key in Language]: string };
  description: { [key in Language]: string };
  popular?: boolean;
  spicy?: boolean;
  vegetarian?: boolean;
  price: number;
}

export interface Drink {
  id: string;
  name: { [key in Language]: string };
  price: string;
  numericPrice: number;
  premium?: boolean;
}

export interface DrinkCategory {
  title: { [key in Language]: string };
  items: Drink[];
}

export interface MenuOption {
  id: string;
  title: { [key in Language]: string };
  price: string;
  numericPrice: number;
  details?: { [key in Language]: string };
  capacity: number;
  drinkCapacity: number;
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
    popular: true,
    price: 3.5
  },
  {
    code: 'TX',
    name: { pt: 'Ternera Picante (Vitela Picante)', en: 'Ternera Picante (Spicy Veal)', es: 'Ternera Picante' },
    description: {
      pt: 'Carne de vaca, cebola, pimentos e pimentas variadas',
      en: 'Beef, onions, bell peppers, and assorted chili peppers',
      es: 'Carne de res, cebolla, pimientos y chiles variados'
    },
    spicy: true,
    price: 3.5
  },
  {
    code: 'P',
    name: { pt: 'Pollo (Frango)', en: 'Pollo (Chicken)', es: 'Pollo' },
    description: {
      pt: 'Carne de frango, tomate, cebola e cebola japonesa',
      en: 'Chicken, tomatoes, onions, and japanese onions',
      es: 'Pollo, tomate, cebolla y cebolla japonesa'
    },
    price: 3.5
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
    spicy: true,
    price: 3.5
  },
  {
    code: 'CL',
    name: { pt: 'Colares (Cachaço de Porco)', en: 'Colares (Pork)', es: 'Colares (Cerdo)' },
    description: {
      pt: 'Cachaço de porco a baixa temperatura com cerveja preta, cebola, natas, pimenta, mostarda e mel',
      en: 'Slow-cooked pork with dark beer, onions, cream, pepper, mustard, and honey',
      es: 'Cerdo a baja temperatura con cerveza negra, cebolla, nata, pimienta, mostaza y miel'
    },
    price: 3.5
  },
  {
    code: 'A',
    name: { pt: 'Atún (Atum)', en: 'Atún (Tuna)', es: 'Atún' },
    description: {
      pt: 'Atum, cebola, pimentos, ovo cozido, azeitonas verdes, tomate fresco e curgete',
      en: 'Tuna, onion, bell peppers, hard-boiled egg, green olives, fresh tomatoes, and zucchini',
      es: 'Atún, cebolla, pimientos, huevo cozido, aceitunas verdes, tomate fresco y calabacín'
    },
    price: 3.5
  },
  {
    code: 'CP',
    name: { pt: 'Criollo y Provolone (Chouriço Criollo e Provolone)', en: 'Criollo y Provolone (Criollo Chorizo and Provolone)', es: 'Criollo y Provolone' },
    description: {
      pt: 'Chouriço criollo, cebola laminada, queijo provolone, tomate seco e vinho branco',
      en: 'Criollo chorizo, sliced onions, provolone cheese, sun-dried tomatoes, and white wine',
      es: 'Chorizo criollo, cebolla laminada, queso provolone, tomate seco y vino blanco'
    },
    price: 3.5
  },
  {
    code: 'JQ',
    name: { pt: 'Jamón y Queso (Fiambre e Queijo)', en: 'Jamón y Queso (Ham and Cheese)', es: 'Jamón y Queso' },
    description: {
      pt: 'Fiambre e mistura de queijos',
      en: 'Ham and assorted cheeses',
      es: 'Jamón y mezcla de quesos'
    },
    price: 3.5
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
    vegetarian: true,
    price: 3.5
  },
  {
    code: 'CQ',
    name: { pt: 'Cebolla y Queso (Cebola e Queijo)', en: 'Cebolla y Queso (Onions and Cheese)', es: 'Cebolla y Queso' },
    description: {
      pt: 'Cebola na chapa e queijos variados',
      en: 'Grilled onions and assorted cheeses',
      es: 'Cebolla a la plancha y quesos variados'
    },
    vegetarian: true,
    price: 3.5
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
    vegetarian: true,
    price: 3.5
  },
  {
    code: 'TA',
    name: { pt: 'Tomate y Albahaca (Tomate e Manjericão)', en: 'Tomate y Albahaca (Tomatoes and Basil)', es: 'Tomate y Albahaca' },
    description: {
      pt: 'Tomate fresco, tomate seco, manjericão fresco e queijos variados',
      en: 'Fresh tomatoes, sun-dried tomatoes, fresh basil, and assorted cheeses',
      es: 'Tomate fresco, tomate seco, albahaca fresca y quesos variados'
    },
    vegetarian: true,
    price: 3.5
  },
  {
    code: 'ER',
    name: { pt: 'Espinaca y Ricotta (Espinafres, Noz e Ricotta)', en: 'Espinaca y Ricotta (Spinach, Walnuts and Ricotta)', es: 'Espinaca y Ricotta' },
    description: {
      pt: 'Espinafres, ricotta, cebola, nozes e queijos variados',
      en: 'Spinach, ricotta, onion, walnuts, and assorted cheeses',
      es: 'Espinacas, ricotta, cebolla, nueces y quesos variados'
    },
    vegetarian: true,
    price: 3.5
  }
];

export const DRINKS: DrinkCategory[] = [
  {
    title: { pt: 'Sumos', en: 'Soft Drinks', es: 'Refrescos' },
    items: [
      { id: 'd1', name: { pt: 'Sumol', en: 'Sumol', es: 'Sumol' }, price: '2,5 €', numericPrice: 2.5 },
      { id: 'd2', name: { pt: 'Iced Tea', en: 'Iced Tea', es: 'Iced Tea' }, price: '2,5 €', numericPrice: 2.5 },
      { id: 'd3', name: { pt: 'Compal', en: 'Compal', es: 'Compal' }, price: '2,5 €', numericPrice: 2.5 },
      { id: 'd4', name: { pt: '7Up', en: '7Up', es: '7Up' }, price: '2,5 €', numericPrice: 2.5 },
      { id: 'd5', name: { pt: 'Pepsi', en: 'Pepsi', es: 'Pepsi' }, price: '2,5 €', numericPrice: 2.5 },
      { id: 'd6', name: { pt: 'Pepsi 0', en: 'Pepsi 0', es: 'Pepsi 0' }, price: '2,5 €', numericPrice: 2.5 }
    ]
  },
  {
    title: { pt: 'Águas', en: 'Water', es: 'Aguas' },
    items: [
      { id: 'd7', name: { pt: 'Serra da Estrela 0.5', en: 'Serra da Estrela 0.5', es: 'Serra da Estrela 0.5' }, price: '2 €', numericPrice: 2 },
      { id: 'd8', name: { pt: 'Frize', en: 'Frize', es: 'Frize' }, price: '2,3 €', numericPrice: 2.3 },
      { id: 'd17', name: { pt: 'Água das Pedras 0.75', en: 'Pedras Water 0.75', es: 'Agua Pedras 0.75' }, price: '4,5 €', numericPrice: 4.5, premium: true }
    ]
  },
  {
    title: { pt: 'Cervejas', en: 'Beers', es: 'Cervezas' },
    items: [
      { id: 'd9', name: { pt: 'Corona', en: 'Corona', es: 'Corona' }, price: '3,5 €', numericPrice: 3.5, premium: true },
      { id: 'd10', name: { pt: 'Estrella Damm 0.25', en: 'Estrella Damm 0.25', es: 'Estrella Damm 0.25' }, price: '2 €', numericPrice: 2 },
      { id: 'd11', name: { pt: 'Estrella Damm 0.33', en: 'Estrella Damm 0.33', es: 'Estrella Damm 0.33' }, price: '3 €', numericPrice: 3, premium: true },
      { id: 'd12', name: { pt: 'Damm Free 0.25', en: 'Damm Free 0.25', es: 'Damm Free 0.25' }, price: '2,1 €', numericPrice: 2.1 }
    ]
  },
  {
    title: { pt: 'Cafetaria', en: 'Café', es: 'Cafetería' },
    items: [
      { id: 'd13', name: { pt: 'Café Expresso', en: 'Espresso', es: 'Café Expreso' }, price: '1 €', numericPrice: 1 },
      { id: 'd14', name: { pt: 'Abatanado', en: 'Black Coffee', es: 'Café Largo' }, price: '1,5 €', numericPrice: 1.5 },
      { id: 'd15', name: { pt: 'Meia de Leite', en: 'Latte', es: 'Café con Leche' }, price: '1,6 €', numericPrice: 1.6 }
    ]
  },
  {
    title: { pt: 'Vinho', en: 'Wine', es: 'Vino' },
    items: [
      { id: 'd16', name: { pt: 'Vinho a Copo', en: 'Glass of Wine', es: 'Copa de Vino' }, price: '4 €', numericPrice: 4, premium: true }
    ]
  }
];

export const MENUS: MenuOption[] = [
  {
    id: 'm3',
    title: { pt: 'Menu 3 Empanadas', en: 'Menu 3 Empanadas', es: 'Menú 3 Empanadas' },
    price: '12,7 €',
    numericPrice: 12.7,
    details: { pt: '3 Empanadas + 1 Bebida', en: '3 Empanadas + 1 Drink', es: '3 Empanadas + 1 Bebida' },
    capacity: 3,
    drinkCapacity: 1
  },
  {
    id: 'm6',
    title: { pt: 'Menu 6 Empanadas', en: 'Menu 6 Empanadas', es: 'Menú 6 Empanadas' },
    price: '25,4 €',
    numericPrice: 25.4,
    details: { pt: '6 Empanadas + 2 Bebidas', en: '6 Empanadas + 2 Drinks', es: '6 Empanadas + 2 Bebidas' },
    capacity: 6,
    drinkCapacity: 2
  },
  {
    id: 'm12',
    title: { pt: 'Menu 12 Empanadas', en: 'Menu 12 Empanadas', es: 'Menú 12 Empanadas' },
    price: '46,4 €',
    numericPrice: 46.4,
    details: { pt: '12 Empanadas + 4 Bebidas', en: '12 Empanadas + 4 Drinks', es: '12 Empanadas + 4 Bebidas' },
    capacity: 12,
    drinkCapacity: 4
  }
];

export const TASTING_MENUS: MenuOption[] = [
  {
    id: 't6',
    title: { pt: 'Degustação 6', en: 'Tasting 6', es: 'Degustación 6' },
    price: '21 €',
    numericPrice: 21,
    details: { pt: '6 Empanadas', en: '6 Empanadas', es: '6 Empanadas' },
    capacity: 6,
    drinkCapacity: 0
  },
  {
    id: 't12',
    title: { pt: 'Degustação 12', en: 'Tasting 12', es: 'Degustación 12' },
    price: '41 €',
    numericPrice: 41,
    details: { pt: '12 Empanadas', en: '12 Empanadas', es: '12 Empanadas' },
    capacity: 12,
    drinkCapacity: 0
  }
];

export const UI_TEXT = {
  chooseLanguage: { pt: 'Escolher idioma', en: 'Choose language', es: 'Elegir idioma' },
  tagline: { pt: 'Empanadas feitas no forno a lenha', en: 'Empanadas made in a wood-fired oven', es: 'Empanadas hechas en horno de leña' },
  sections: {
    empanadas: { pt: 'Empanadas', en: 'Empanadas', es: 'Empanadas' },
    drinks: { pt: 'Bebidas', en: 'Drinks', es: 'Bebidas' },
    menus: { pt: 'Menus', en: 'Menus', es: 'Menús' },
    history: { pt: 'A nossa história', en: 'Our history', es: 'Nuestra historia' },
    order: { pt: 'Prepara o teu pedido', en: 'Prepare your order', es: 'Prepara tu pedido' },
    cart: { pt: 'Pedido', en: 'Order', es: 'Pedido' }
  },
  cart: {
    title: { pt: 'O teu pedido', en: 'Your order', es: 'Tu pedido' },
    add: { pt: 'Adicionar', en: 'Add', es: 'Añadir' },
    empty: { pt: 'O teu carrinho está vazio', en: 'Your cart is empty', es: 'Tu carrito está vacío' },
    total: { pt: 'Total', en: 'Total', es: 'Total' },
    items: { pt: 'itens', en: 'items', es: 'ítems' },
    showAtCounter: { pt: 'Mostrar pedido no balcão', en: 'Show order at counter', es: 'Mostrar pedido en el mostrador' },
    ticketMessage: { pt: 'Mostre este pedido no balcão para pagamento', en: 'Show this order at the counter for payment', es: 'Muestre este pedido en el mostrador para el pago' },
    clear: { pt: 'Limpar', en: 'Clear', es: 'Limpiar' },
    editSelection: { pt: 'Editar sabores', en: 'Edit flavors', es: 'Editar sabores' }
  },
  customization: {
    choose: { pt: 'Escolhe {count} empanadas', en: 'Choose {count} empanadas', es: 'Elige {count} empanadas' },
    remaining: { pt: 'Faltam {count}', en: '{count} remaining', es: 'Faltan {count}' },
    completed: { pt: 'Seleção completa!', en: 'Selection complete!', es: '¡Selección completa!' },
    addToOrder: { pt: 'Adicionar menu ao pedido', en: 'Add menu to order', es: 'Añadir menú al pedido' },
    saveChanges: { pt: 'Guardar alterações', en: 'Save changes', es: 'Guardar cambios' },
    popularCombo: { pt: 'Combinação popular', en: 'Popular combo', es: 'Combinación popular' },
    autoFill: { pt: 'Preencher automaticamente', en: 'Fill automatically', es: 'Rellenar automáticamente' },
    houseChoice: { pt: 'Escolha da casa', en: 'House choice', es: 'Elección de la casa' },
    chooseDrinks: { pt: 'Escolhe {count} bebidas incluídas', en: 'Choose {count} included drinks', es: 'Elige {count} bebidas incluidas' },
    drinksRemaining: { pt: '{current} de {total} bebidas selecionadas', en: '{current} of {total} drinks selected', es: '{current} de {total} bebidas selecionadas' },
    drinksExtra: { pt: 'Bebidas incluídas selecionadas (+ extras)', en: 'Included drinks selected (+ extras)', es: 'Bebidas incluidas seleccionadas (+ extras)' },
    premiumNotice: { pt: 'Algumas bebidas não estão incluídas no menu base', en: 'Some drinks are not included in the base menu', es: 'Algunas bebidas no estão incluídas en el menú base' },
    premiumWarning: { pt: 'Esta bebida não está incluída no menu — será adicionada a diferença de preço', en: 'This drink is not included in the menu — price difference will be added', es: 'Esta bebida no está incluida en el menú — se añadirá la diferencia de precio' },
    extra: { pt: 'Extra', en: 'Extra', es: 'Extra' },
    next: { pt: 'Próximo: Bebidas', en: 'Next: Drinks', es: 'Siguiente: Bebidas' },
    summary: { pt: 'Resumo do Menu', en: 'Menu Summary', es: 'Resumen del Menú' },
    continueToDrinks: { pt: 'Continuar para bebidas', en: 'Continue to drinks', es: 'Continuar a bebidas' },
    continueToSummary: { pt: 'Continuar para resumo', en: 'Continue to summary', es: 'Continuar al resumen' },
    back: { pt: 'Voltar', en: 'Back', es: 'Volver' }
  },
  suggestions: {
    menu: { pt: 'Queres transformar isto num menu? Fica mais económico 🔥', en: 'Want to turn this into a menu? It\'s more economical 🔥', es: '¿Quieres convertir esto en un menú? Es más económico 🔥' },
    drink: { pt: 'Adiciona uma bebida para acompanhar 🍺', en: 'Add a drink to go with it 🍺', es: 'Añade una bebida para acompañar 🍺' }
  },
  backToLanguage: { pt: 'Voltar ao idioma', en: 'Back to language', es: 'Volver al idioma' },
  mostPopular: { pt: 'Mais Pedida', en: 'Most Popular', es: 'Más Pedida' },
  menuNote: {
    pt: 'A cerveja Corona, a Estrella 0,33, o vinho, e a agua com gás 0,75 não estão incluidas no menu, pelo que acresce o valor da diferença',
    en: 'Corona beer, Estrella (0.33 L), wine, and sparkling water (0.75 L) are not included in the menu, so the difference in price will be added',
    es: 'La cerveza Corona, la Estrella 0,33, el vino y el agua con gas 0,75 no están incluidos en el menú, por lo que se añadirá la diferencia de precio'
  },
  tastingMenus: { pt: 'Menus de Degustação', en: 'Tasting Menus', es: 'Menús de Degustación' },
  location: { pt: 'Onde estamos', en: 'Where we are', es: 'Dónde estamos' },
  openMaps: { pt: 'Abrir no Google Maps', en: 'Open in Google Maps', es: 'Abrir en Google Maps' },
  prepNote: { 
    pt: '⏱️ Feito no forno a lenha – pode demorar alguns minutos', 
    en: '⏱️ Baked in a wood-fired oven – may take a few minutes', 
    es: '⏱️ Hecho en horno de leña – puede tardar unos minutos' 
  },
  selectedCount: { pt: 'Selecionado: {count} empanadas', en: 'Selected: {count} empanadas', es: 'Seleccionado: {count} empanadas' },
  upsellTitle: {
    pt: 'Vimos que selecionaste várias empanadas!',
    en: 'We noticed you selected several empanadas!',
    es: '¡Vimos que seleccionaste varias empanadas!'
  },
  upsellMessage: {
    pt: 'Que tal aproveitar um menu completo para partilhar e ter melhor valor?',
    en: 'How about a full menu to share and get better value?',
    es: '¿Qué tal aprovechar un menú completo para compartir y tener mejor valor?'
  },
  menuSuggestion6: {
    pt: '6 empanadas 🔥 recomendado',
    en: '6 empanadas 🔥 recommended',
    es: '6 empanadas 🔥 recomendado'
  },
  menuSuggestion12: {
    pt: '12 empanadas 💰 melhor valor',
    en: '12 empanadas 💰 best value',
    es: '12 empanadas 💰 mejor valor'
  },
  takeaway: {
    pt: 'Takeaway / Reservas',
    en: 'Takeaway / Reservations',
    es: 'Takeaway / Reservas'
  },
  historyText: {
    pt: 'Chamo-me Tomás Gouveia e este projeto ganhou vida no momento em que eu e a minha mãe decidimos criar algo verdadeiramente nosso. Nascemos e crescemos nas Azenhas do Mar, e foi no coração da nossa aldeia que abrimos o primeiro Al\'Horno. O nosso conceito é simples: empanadas preparadas no calor do forno a lenha, feitas com dedicação e com os sabores que todos adoramos. Mais do que um espaço, é a nossa casa que partilhamos convosco.',
    en: 'My name is Tomás Gouveia e this project came to life when my mother and I decided to create something truly ours. We were born and raised in Azenhas do Mar, and it was in the heart of our village that we opened the first Al\'Horno. Our concept is simple: empanadas prepared in the heat of a wood-fired oven, made with dedication and with the flavors we all love. More than a space, it is our home that we share with you.',
    es: 'Mi nombre es Tomás Gouveia y este projeto cobró vida cuando mi madre y yo decidimos crear algo verdadeiramente nosso. Nascemos e crescemos nas Azenhas do Mar, e fue en el coração de nuestra aldea donde abrimos el primeiro Al\'Horno. Nuestro concepto é sencillo: empanadas preparadas al calor de un horno de leña, hechas con dedicación y con os sabores que a todos nos encantan. Mais que um espaço, é o nosso hogar el que compartimos con vosotros.'
  }
};
