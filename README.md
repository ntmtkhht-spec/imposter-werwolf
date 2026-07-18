# Party Games 🎉

Mobile-first Party-Spiele im Browser. PWA — installierbar aufs Handy, offline
spielbar. Erstes Spiel: **Finde den Imposter** (Pass-and-Play, ein Handy).

## Stack

React + TypeScript + Vite + Tailwind CSS + vite-plugin-pwa. Kein Backend.

## Entwicklung

```bash
npm install
npm run dev       # lokaler Dev-Server
npm run build     # Produktions-Build nach dist/
npm run preview   # Build lokal testen
npm test          # Unit-Tests (Logik)
```

## Avatare

Deine 12 Tierbilder gehören in `src/assets/avatars/` — werden automatisch
geladen. Siehe `src/assets/avatars/README.md`. Ohne Bilder: Emoji-Platzhalter.

## Neues Spiel hinzufügen

1. Ordner `src/games/<id>/` mit Komponente anlegen
2. Route in `src/App.tsx` ergänzen
3. Eintrag in `src/games/registry.ts` (`status: 'live'`)

Der Hub rendert automatisch aus der Registry.

## Struktur

```
src/
  i18n/              DE/EN Wörterbücher + Provider
  components/        Button, Avatar, Stepper, Toggle, TopBar, LangToggle
  hooks/             useLocalStorage, useTimer
  assets/avatars/    Tierbilder (auto-geladen)
  pages/             HubPage, NotFound
  games/
    registry.ts      Spiele-Liste (Hub-Quelle)
    imposter/        Setup → Reveal → Timer → Result
```

## Deploy

Statisch. Vercel / Netlify / Cloudflare Pages: Build `npm run build`,
Output-Verzeichnis `dist`.
