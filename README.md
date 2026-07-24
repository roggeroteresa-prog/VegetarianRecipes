# 🌱 VegetarianRecipes — Ciclo DevOps

> README di pianificazione per il progetto "Ciclo DevOps completo" — Master DevOps

## 1. Analisi dell'applicazione

**VegetarianRecipes** è una single-page application realizzata con **React** (Create React App), che permette di cercare ricette vegetariane tramite l'**API pubblica di Spoonacular**.

**Funzionalità principali:**
- ricerca di ricette vegetariane tramite barra di ricerca (`SearchBar`)
- visualizzazione dei risultati in card (`RecipeCard`) con titolo e immagine
- pagina di dettaglio ricetta (`RecipeDetails`) con chiamata a `/recipes/{id}/information`
- gestione dei **preferiti** tramite React Context (`FavoritesContext`) e persistenza in `localStorage`
- navigazione tra le pagine con **React Router DOM** (`Home`, `Results`, `RecipeDetails`, `Favorites`)

**Architettura:**
- **Solo front end** — non esiste un back end proprietario. L'app comunica direttamente, via `axios`, con l'API esterna di Spoonacular (`api.spoonacular.com`).
- Questo significa che, dal punto di vista del deploy, basta un hosting per contenuti statici: non serve un server applicativo, un database, o container multipli in produzione.
- **Nota di sicurezza rilevata**: nel codice attuale (`src/api/spoonacular.js`) la API key di Spoonacular è hardcoded in chiaro nel sorgente, anche se è già presente un commento che indica l'intento di usare `process.env.REACT_APP_SPOONACULAR_KEY`. Questo verrà corretto nello step "Sicurezza e gestione secrets" (vedi sotto), con conseguente **rigenerazione della key**, dato che è stata esposta nella cronologia Git.

## 2. I tre ambienti

| Ambiente | Scopo | Come viene eseguito |
|---|---|---|
| **Development** | Sviluppo locale, iterazione rapida | `docker compose up` in locale, con hot-reload (`npm start` dentro il container), variabili da `.env` locale (mai committato) |
| **Staging** | Verifica pre-produzione, test manuale dell'ultima build prima del rilascio | Build di produzione (`npm run build`) servita da un container Nginx, avviata localmente o su un branch/ambiente dedicato prima del merge su `main` |
| **Production** | Versione pubblica, raggiungibile dagli utenti reali | Deploy automatico su **GitHub Pages** ad ogni push su `main` che supera la pipeline CI |

La differenza chiave tra gli ambienti non è il codice (che è lo stesso), ma **come viene costruito ed esposto**: in development si privilegia la velocità di iterazione, in staging si valida la build di produzione reale, in production si serve la build finale ottimizzata con monitoring attivo.

## 3. Strumenti scelti

- **GitHub Actions** per CI/CD, perché il repository è già su GitHub: nessuna integrazione aggiuntiva da configurare, secrets nativi (`GitHub Secrets`), e deploy diretto su GitHub Pages tramite l'azione ufficiale `actions/deploy-pages`.
- **GitHub Pages** per l'hosting pubblico, perché l'app è puramente statica (nessun back end da servire), gratuito, e con URL pubblico stabile.
- **Docker** per containerizzare il front end, garantendo che l'ambiente di build/preview sia riproducibile indipendentemente dalla macchina locale.
- **UptimeRobot** per l'uptime monitoring dell'URL pubblico.
- **Sentry** (piano gratuito) per l'error tracking lato client.

## 4. Pianificazione del progetto

- [ ] Containerizzazione: Dockerfile front end + docker-compose per ambiente locale
- [ ] Sicurezza: rimozione della API key hardcoded, `.env` + `.gitignore`, GitHub Secrets, rotazione della key esposta
- [ ] Pipeline CI: lint + build ad ogni push su `main`
- [ ] Pipeline CD: deploy automatico su GitHub Pages
- [ ] Monitoraggio: UptimeRobot + Sentry, con simulazione di un errore
- [ ] Presentazione finale in PDF con screenshot e link
