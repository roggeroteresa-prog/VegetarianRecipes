# 🌱 Vegetarian Recipes — React App + Ciclo DevOps

Un sito web semplice e intuitivo per cercare **ricette vegetariane** utilizzando l'API di Spoonacular.

L'utente può:
- cercare ricette vegetariane tramite barra di ricerca
- visualizzare titolo, immagine e dettagli completi
- aggiungere/rimuovere ricette dai **preferiti**
- consultare la pagina dedicata ai preferiti
- navigare tra le pagine grazie a React Router

**App pubblica**: https://roggeroteresa-prog.github.io/VegetarianRecipes

---

## 🚀 Tecnologie utilizzate

- **React** (Create React App)
- **React Router DOM**
- **Axios** → chiamate all'API Spoonacular
- **Context API** → gestione dei preferiti
- **LocalStorage** → persistenza dei preferiti
- **Docker** → containerizzazione (multi-stage: build Node + serve Nginx)
- **GitHub Actions** → CI/CD
- **Sentry** → error tracking
- **UptimeRobot** → uptime monitoring

---

## 📦 Installazione e sviluppo locale

```bash
git clone https://github.com/roggeroteresa-prog/VegetarianRecipes.git
cd VegetarianRecipes
cp .env.example .env
# inserisci in .env la tua REACT_APP_SPOONACULAR_KEY e REACT_APP_SENTRY_DSN

npm install
npm start
```

### Con Docker

```bash
# dev con hot-reload → http://localhost:3000
docker compose up web

# build di produzione (staging locale) → http://localhost:8080
docker compose up web-preview
```

---

## 1. Analisi dell'applicazione

**VegetarianRecipes** è una single-page application **solo front end**: non esiste un back end proprietario, l'app comunica direttamente (via `axios`) con l'API esterna di Spoonacular. Dal punto di vista del deploy, questo significa che basta un hosting statico — niente server applicativo né database.

## 2. I tre ambienti

| Ambiente | Scopo | Come viene eseguito |
|---|---|---|
| **Development** | Sviluppo locale, iterazione rapida | `docker compose up web`, hot-reload, variabili da `.env` locale |
| **Staging** | Verifica pre-produzione della build reale | `docker compose up web-preview`, build di produzione servita da Nginx in locale |
| **Production** | Versione pubblica | Deploy automatico su **GitHub Pages** ad ogni push su `main` che supera la CI |

## 3. Strumenti scelti e motivazioni

- **GitHub Actions**: repo già su GitHub, secrets nativi, deploy diretto su Pages senza integrazioni esterne
- **GitHub Pages**: app puramente statica, gratuito, URL pubblico stabile
- **Docker**: build riproducibile indipendentemente dalla macchina locale
- **UptimeRobot**: monitoraggio esterno dell'URL pubblico, gratuito
- **Sentry**: error tracking lato client con piano gratuito, integrazione React ufficiale

## 4. Sicurezza e gestione secrets

- Le chiavi (`REACT_APP_SPOONACULAR_KEY`, `REACT_APP_SENTRY_DSN`) sono lette da variabili d'ambiente, mai hardcoded nel codice
- `.env` è escluso da Git (`.gitignore`) e mai stato committato
- I valori reali sono configurati come **GitHub Secrets** e iniettati a build-time dalla pipeline
- ⚠️ Nota tecnica: essendo un'app front-end pura, qualunque variabile `REACT_APP_*` finisce comunque incorporata nel bundle JS finale, visibile a chiunque apra il sorgente compilato. È una limitazione strutturale delle SPA, non un errore di configurazione — per questo la key Spoonacular non va trattata come un segreto "assoluto", ma va comunque tenuta fuori dal codice sorgente e dalla cronologia Git, e va rigenerata se esposta per errore (come successo durante lo sviluppo di questo progetto: la key iniziale era hardcoded nel repo ed è stata rigenerata).

## 5. Pipeline CI/CD

Il workflow `.github/workflows/ci.yml` gira ad ogni push su `main` (e sulle pull request, senza deploy) con tre job in sequenza:

1. **Lint** → `npm run lint` (ESLint, configurazione `react-app`)
2. **Build immagine Docker** → build dello stage `production` del Dockerfile, parte solo se il lint passa
3. **Deploy su GitHub Pages** → build di produzione + pubblicazione, parte solo se anche la build Docker passa, e solo su push a `main` (mai sulle PR)

Se un job fallisce, i successivi non partono: la pipeline si ferma in modo visibile (verificato praticamente più volte durante lo sviluppo, sia per errori di lint reali sia per lockfile non allineati).

## 6. Monitoraggio

### UptimeRobot
Monitor HTTP(s) attivo sull'URL pubblico, controllo ogni 5 minuti da location esterne. Un alert via email arriva quando il sito smette di rispondere (downtime) o torna disponibile.

### Sentry
SDK `@sentry/react` inizializzato in `src/index.js`, cattura automaticamente gli errori JavaScript non gestiti lato client (`window.onerror`) e li invia alla dashboard Sentry.

**Come interpretare gli alert Sentry:**
- **Titolo dell'issue** → tipo di errore e messaggio (es. "Error: Test Sentry via setTimeout")
- **Unhandled / Handled** → se l'errore ha interrotto l'esecuzione senza essere gestito da un try/catch (Unhandled = più urgente, spesso rompe una funzionalità visibile all'utente)
- **Events / Users** → quante volte è successo e a quanti utenti diversi — un numero alto su "Users" indica un problema diffuso, non un caso isolato
- **Age / Last Seen** → se è un errore nuovo o ricorrente da tempo
- **Stack trace** (dentro il dettaglio dell'issue) → punto esatto del codice dove l'errore è avvenuto, utile per il debug
- **Priority** → assegnata automaticamente da Sentry in base a frequenza e impatto; le issue a priorità alta vanno guardate per prime

Ogni volta che arriva un alert, la prassi è: aprire l'issue → leggere lo stack trace → riprodurre localmente se possibile → fixare → marcare come "Resolved" una volta rilasciato il fix.

## 7. Pianificazione del progetto

- [x] Containerizzazione: Dockerfile front end + docker-compose per ambiente locale
- [x] Sicurezza: rimozione della API key hardcoded, `.env` + `.gitignore`, GitHub Secrets, rotazione della key esposta
- [x] Pipeline CI: lint + build ad ogni push su `main`
- [x] Pipeline CD: deploy automatico su GitHub Pages
- [x] Monitoraggio: UptimeRobot + Sentry, con simulazione di un errore verificata
- [ ] Presentazione finale in PDF con screenshot e link
