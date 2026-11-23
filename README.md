# Al'Horno Empanadas — Menu digital

Site/menu digital do Al'Horno (Aldeia da Praia). React + Vite + Tailwind, publicado na Vercel.

## Correr localmente
```
npm install
npm run dev     # http://localhost:3000
npm run build   # gera a pasta dist/
```

## Onde mudar conteúdos
- `src/data.ts` → empanadas, bebidas, menus, alergénios, textos (PT/EN/ES) e `CONTACT`
  (Google Maps, Instagram, e-mail, Uber Eats, localidade).
- `public/` → logótipo, favicon e imagem de partilha (`og-image.jpg`).

## Firebase
O site já não usa o Firebase. `firestore.rules` bloqueia todo o acesso — publicar na consola do Firebase.
