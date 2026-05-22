# 📊 Portafoglio

Portfolio tracker personale — single-page app, zero server, zero abbonamenti.

**[→ Apri l'app](https://TUO-USERNAME.github.io/portafoglio/)**

---

## Funzionalità

- **Tutti i tipi di asset** — ETF, azioni, crypto, conto deposito, pensione, immobili, liquidità, debiti
- **Prezzi in tempo reale** — ETF/azioni via Yahoo Finance, crypto via CoinGecko
- **Import automatico** — PDF estratto conto Revolut, CSV Degiro
- **Grafico storico** — valore, guadagno, rendimento% nel tempo
- **Proiezione** — per classe di asset con tassi modificabili, PAC mensile, formula compounding corretta
- **Allocazione target** — semaforo verde/giallo/rosso per categoria
- **Export CSV** — storico completo operazioni
- **PWA installabile** — funziona offline, si aggiunge alla home come app nativa

---

## Installazione su GitHub Pages

1. Fork o crea un nuovo repository
2. Carica tutti i file nella root del repo
3. Vai su **Settings → Pages → Branch: main → / (root)** → Save
4. L'app sarà disponibile su `https://TUO-USERNAME.github.io/NOME-REPO/`

### File richiesti
```
index.html      ← app principale
manifest.json   ← PWA manifest
sw.js           ← service worker (offline + installazione)
icon-192.png    ← icona app
icon-512.png    ← icona app HD
README.md       ← questo file
```

---

## Dati e privacy

**I dati non escono mai dal tuo dispositivo.** Tutto è salvato in `localStorage` del browser. Nessun backend, nessun account, nessuna telemetria.

I prezzi vengono scaricati in tempo reale da:
- [CoinGecko API](https://www.coingecko.com/en/api) (crypto, gratuita)
- [Yahoo Finance](https://finance.yahoo.com) (ETF/azioni, via proxy CORS)

---

## Backup

Usa **Export CSV** (schermata Storico) per salvare tutte le operazioni. Per ripristinare, usa **Importa** con il CSV esportato.

---

## Tecnologie

HTML + CSS + JavaScript vanilla · Chart.js 4.4 · Nessun framework · Nessun build step
