export type Language = 'pt' | 'en' | 'es';

export interface Empanada {
  code: string;
  name: { [key in Language]: string };
  description: { [key in Language]: string };
  popular?: boolean;
  spicy?: boolean;
  vegetarian?: boolean;
  premium?: boolean;
  allergens: string[];
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
  // Classicas
  {
    code: 'T',
    name: { pt: 'Vitela', en: 'Veal', es: 'Vitela' },
    description: {
      pt: 'Carne de vaca, cebola, pimento, ovo cozido e azeitona verde',
      en: 'Beef, onion, bell pepper, hard-boiled egg, and green olives',
      es: 'Carne de res, cebolla, pimiento, huevo cocido y aceituna verde'
    },
    allergens: ['G', 'O'],
    price: 3.5
  },
  {
    code: 'TX',
    name: { pt: 'Vitela Picante', en: 'Spicy Veal', es: 'Vitela Picante' },
    description: {
      pt: 'Carne de vaca, cebola, pimentos e pimentas variadas',
      en: 'Beef, onions, bell peppers, and assorted chili peppers',
      es: 'Carne de res, cebolla, pimientos y chiles variados'
    },
    spicy: true,
    allergens: ['G'],
    price: 3.5
  },
  {
    code: 'P',
    name: { pt: 'Frango', en: 'Chicken', es: 'Pollo' },
    description: {
      pt: 'Carne de frango, tomate, cebola e cebola japonesa',
      en: 'Chicken, tomatoes, onions, and japanese onions',
      es: 'Pollo, tomate, cebolla y cebolla japonesa'
    },
    allergens: ['G'],
    price: 3.5
  },
  {
    code: 'PX',
    name: { pt: 'Frango Picante', en: 'Spicy Chicken', es: 'Pollo Picante' },
    description: {
      pt: 'Carne de frango, cebola, aipo, lima kaffir e mistura de pimentas',
      en: 'Chicken, onion, celery, kaffir lime, and a blend of peppers',
      es: 'Pollo, cebolla, apio, lima kaffir y mezcla de pimientas'
    },
    spicy: true,
    allergens: ['G', 'A'],
    price: 3.5
  },
  {
    code: 'CL',
    name: { pt: 'Colares (Cachaço de Porco)', en: 'Colares (Slow-cooked Pork)', es: 'Colares (Cerdo)' },
    description: {
      pt: 'Cachaço de porco a baixa temperatura com cerveja preta, cebola, natas, pimenta, mostarda e mel',
      en: 'Slow-cooked pork with dark beer, onions, cream, pepper, mustard, and honey',
      es: 'Cerdo a baja temperatura con cerveza negra, cebolla, nata, pimienta, mostaza y miel'
    },
    allergens: ['G', 'M', 'L'],
    price: 3.5
  },
  {
    code: 'A',
    name: { pt: 'Atum', en: 'Tuna', es: 'Atún' },
    description: {
      pt: 'Atum, cebola, pimentos, ovo cozido, azeitonas verdes, tomate fresco e curgete',
      en: 'Tuna, onion, bell peppers, hard-boiled egg, green olives, fresh tomatoes, and zucchini',
      es: 'Atún, cebolla, pimientos, huevo cozido, aceitunas verdes, tomate fresco y calabacín'
    },
    allergens: ['G', 'P', 'O'],
    price: 3.5
  },
  {
    code: 'CP',
    name: { pt: 'Chouriço Criollo e Provolone', en: 'Criollo Chorizo and Provolone', es: 'Chorizo Criollo y Provolone' },
    description: {
      pt: 'Chouriço criollo, cebola laminada, queijo provolone, tomate seco e vinho branco',
      en: 'Criollo chorizo, sliced onions, provolone cheese, sun-dried tomatoes, and white wine',
      es: 'Chorizo criollo, cebolla laminada, queso provolone, tomate seco y vino blanco'
    },
    allergens: ['G', 'L'],
    price: 3.5
  },
  {
    code: 'JQ',
    name: { pt: 'Mista', en: 'Ham and Cheese', es: 'Jamón y Queso' },
    description: {
      pt: 'Fiambre e mistura de queijos',
      en: 'Ham and assorted cheeses',
      es: 'Jamón y mezcla de quesos'
    },
    allergens: ['G', 'L'],
    price: 3.5
  },
  {
    code: 'ST',
    name: { pt: 'Cogumelos e Trufa', en: 'Mushrooms and Truffle', es: 'Setas y Trufa' },
    description: {
      pt: 'Cogumelos, tartufata (pasta de trufa), cebola, tomilho fresco e queijos variados',
      en: 'Mushrooms, tartufata (truffle paste), onion, fresh thyme, and assorted cheeses',
      es: 'Setas, tartufata (pasta de trufa), cebolla, tomillo fresco y quesos variados'
    },
    vegetarian: true,
    allergens: ['G', 'L', 'FC'],
    price: 3.5
  },
  {
    code: 'ER',
    name: { pt: 'Espinafres, Noz e Ricotta', en: 'Spinach, Walnuts and Ricotta', es: 'Espinacas, Nuez y Ricotta' },
    description: {
      pt: 'Espinafres, ricotta, cebola, nozes e queijos variados',
      en: 'Spinach, ricotta, onion, walnuts, and assorted cheeses',
      es: 'Espinacas, ricotta, cebolla, nueces y quesos variados'
    },
    vegetarian: true,
    allergens: ['G', 'L', 'FC'],
    price: 3.5
  },
  
  // Premium
  {
    code: 'MP',
    name: { pt: 'Matambre', en: 'Matambre', es: 'Matambre' },
    description: {
      pt: 'Matambre (corte de vaca argentino), manjericão fresco, tomate natural e mistura de queijos',
      en: 'Matambre (Argentine beef cut), fresh basil, natural tomato, and cheese mix',
      es: 'Matambre (corte de res argentino), albahaca fresca, tomate natural y mezcla de quesos'
    },
    premium: true,
    allergens: ['G', 'L'],
    price: 3.7
  },
  {
    code: 'CA',
    name: { pt: 'Porco, Ananás e Lima', en: 'Pork, Pineapple and Lime', es: 'Cerdo, Piña y Lima' },
    description: {
      pt: 'Pá de porco, cebola roxa, pimentos, ananás caramelizado, coentros, sumo e raspa de lima',
      en: 'Pork shoulder, red onion, bell peppers, caramelized pineapple, cilantro, lime juice and zest',
      es: 'Paleta de cerdo, cebolla roja, pimientos, piña caramelizada, cilantro, zumo y ralladura de lima'
    },
    premium: true,
    allergens: ['G'],
    price: 3.7
  },
  {
    code: 'CH',
    name: { pt: 'Chouriço e Queijo', en: 'Chorizo and Cheese', es: 'Chorizo y Queso' },
    description: {
      pt: 'Chouriço, cebola caramelizada e mistura de queijos',
      en: 'Chorizo, caramelized onions, and cheese mix',
      es: 'Chorizo, cebolla caramelizada y mezcla de quesos'
    },
    premium: true,
    allergens: ['G', 'L'],
    price: 3.7
  },
  {
    code: 'ON',
    name: { pt: 'Osso Buco com Laranja', en: 'Osso Buco with Orange', es: 'Osso Buco con Naranja' },
    description: {
      pt: 'Ossobuco de vaca estufado com legumes, sumo e raspa de laranja, vinho tinto Malbec e mistura de malaguetas',
      en: 'Beef ossobuco stewed with vegetables, orange juice and zest, Malbec red wine and chili mix',
      es: 'Ossobuco de res estofado con verduras, zumo y ralladura de naranja, vino tinto Malbec y mezcla de chiles'
    },
    premium: true,
    spicy: true,
    allergens: ['G'],
    price: 3.7
  },
  {
    code: 'R',
    name: { pt: 'Rabo de Boi', en: 'Oxtail', es: 'Rabo de Toro' },
    description: {
      pt: 'Rabo de boi, cenoura, cebola, vinho tinto Malbec e especiarias',
      en: 'Oxtail, carrot, onion, Malbec red wine, and spices',
      es: 'Rabo de toro, zanahoria, cebolla, vino tinto Malbec y especias'
    },
    premium: true,
    allergens: ['G'],
    price: 3.7
  },
  {
    code: 'CS',
    name: { pt: 'Queijo Cabra e Salva', en: 'Goat Cheese and Sage', es: 'Queso de Cabra y Salvia' },
    description: {
      pt: 'Queijo de cabra, pesto de salva e avelãs, mistura de queijos',
      en: 'Goat cheese, sage and hazelnut pesto, cheese mix',
      es: 'Queso de cabra, pesto de salvia y avellanas, mezcla de quesos'
    },
    premium: true,
    vegetarian: true,
    allergens: ['G', 'L', 'FC'],
    price: 3.7
  }
];

export const DRINKS: DrinkCategory[] = [
  {
    title: { pt: 'Águas e Sumos', en: 'Water and Juices', es: 'Aguas y Zumos' },
    items: [
      { id: 'd7', name: { pt: 'Água 0.33cl', en: 'Water 0.33cl', es: 'Agua 0.33cl' }, price: '2,00 €', numericPrice: 2 },
      { id: 'd8', name: { pt: 'Frize 0.25cl', en: 'Frize 0.25cl', es: 'Frize 0.25cl' }, price: '2,50 €', numericPrice: 2.5 },
      { id: 'd1', name: { pt: 'Sumol (Maracujá, Ananás, Laranja)', en: 'Sumol (Passion Fruit, Pineapple, Orange)', es: 'Sumol (Maracuyá, Piña, Naranja)' }, price: '2,50 €', numericPrice: 2.5 },
      { id: 'd4', name: { pt: '7Up', en: '7Up', es: '7Up' }, price: '2,50 €', numericPrice: 2.5 },
      { id: 'd2', name: { pt: 'Iced Tea (Pêssego, Limão, Manga)', en: 'Iced Tea (Peach, Lemon, Mango)', es: 'Iced Tea (Melocotón, Limón, Mango)' }, price: '2,50 €', numericPrice: 2.5 },
      { id: 'd5', name: { pt: 'Pepsi', en: 'Pepsi', es: 'Pepsi' }, price: '2,50 €', numericPrice: 2.5 },
      { id: 'd6', name: { pt: 'Pepsi 0', en: 'Pepsi 0', es: 'Pepsi 0' }, price: '2,50 €', numericPrice: 2.5 },
      { id: 'd3', name: { pt: 'Compal (Pessêgo, Maçã, Pêra Rocha, Laranja, Manga)', en: 'Compal (Peach, Apple, Pear, Orange, Mango)', es: 'Compal (Melocotón, Manzana, Pera, Naranja, Mango)' }, price: '2,50 €', numericPrice: 2.5 }
    ]
  },
  {
    title: { pt: 'Outras Bebidas', en: 'Other Drinks', es: 'Otras Bebidas' },
    items: [
      { id: 'd18', name: { pt: 'Heineken 0.25cl', en: 'Heineken 0.25cl', es: 'Heineken 0.25cl' }, price: '2,20 €', numericPrice: 2.2 },
      { id: 'd10', name: { pt: 'Estrella Damm 0.25cl', en: 'Estrella Damm 0.25cl', es: 'Estrella Damm 0.25cl' }, price: '2,00 €', numericPrice: 2 },
      { id: 'd11', name: { pt: 'Estrella Damm 0.33cl', en: 'Estrella Damm 0.33cl', es: 'Estrella Damm 0.33cl' }, price: '3,00 €', numericPrice: 3, premium: true },
      { id: 'd12', name: { pt: 'Free Damm', en: 'Free Damm', es: 'Free Damm' }, price: '2,80 €', numericPrice: 2.8, premium: true },
      { id: 'd19', name: { pt: 'Somersby 0.33cl', en: 'Somersby 0.33cl', es: 'Somersby 0.33cl' }, price: '3,20 €', numericPrice: 3.2, premium: true },
      { id: 'd9', name: { pt: 'Corona', en: 'Corona', es: 'Corona' }, price: '3,50 €', numericPrice: 3.5, premium: true }
    ]
  },
  {
    title: { pt: 'Extras', en: 'Extras', es: 'Extras' },
    items: [
      { id: 'ext1', name: { pt: 'Molho Chimichurri', en: 'Chimichurri Sauce', es: 'Salsa Chimichurri' }, price: '1,00 €', numericPrice: 1 }
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

export const ALLERGENS: { code: string; name: { [key in Language]: string } }[] = [
  { code: 'G', name: { pt: 'Glúten', en: 'Gluten', es: 'Gluten' } },
  { code: 'L', name: { pt: 'Leite', en: 'Milk', es: 'Leche' } },
  { code: 'O', name: { pt: 'Ovo', en: 'Egg', es: 'Huevo' } },
  { code: 'P', name: { pt: 'Peixe', en: 'Fish', es: 'Pescado' } },
  { code: 'FC', name: { pt: 'Frutos de casca rija', en: 'Nuts', es: 'Frutos de cáscara' } },
  { code: 'M', name: { pt: 'Mostarda', en: 'Mustard', es: 'Mostaza' } },
  { code: 'A', name: { pt: 'Aipo', en: 'Celery', es: 'Apio' } }
];

export const UI_TEXT = {
  chooseLanguage: { pt: 'Escolher idioma', en: 'Choose language', es: 'Elegir idioma' },
  tagline: { pt: 'Empanadas feitas no forno a lenha', en: 'Empanadas made in a wood-fired oven', es: 'Empanadas hechas en horno de leña' },
  sections: {
    empanadas: { pt: 'Empanadas', en: 'Empanadas', es: 'Empanadas' },
    classicas: { pt: 'Clássicas', en: 'Classics', es: 'Clásicas' },
    premium: { pt: 'Premium', en: 'Premium', es: 'Premium' },
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
    editSelection: { pt: 'Editar sabores', en: 'Edit flavors', es: 'Editar sabores' },
    share: { pt: 'Partilhar pedido', en: 'Share order', es: 'Compartir pedido' },
    saveNotes: { pt: 'Guardar nas notas', en: 'Save to notes', es: 'Guardar en notas' },
    instagramDM: { pt: 'Enviar p/ Instagram', en: 'Send to Instagram', es: 'Enviar a Instagram' },
    copied: { pt: 'Copiado para a área de transferência!', en: 'Copied to clipboard!', es: '¡Copiado al portapapeles!' }
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
    pt: 'A cerveja Corona, a Estrella 0,33, a Free Damm e a Somersby não estão incluidas no menu, pelo que acresce o valor da diferença',
    en: 'Corona beer, Estrella (0.33 L), Free Damm, and Somersby are not included in the menu, so the difference in price will be added',
    es: 'La cerveza Corona, la Estrella 0,33, la Free Damm y la Somersby no están incluidos en el menú, por lo que se añadirá la diferencia de precio'
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
