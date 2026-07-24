# ---- Stage 1: build ----
FROM node:18-alpine AS build

WORKDIR /app

# Copiamo solo i file dei manifest per sfruttare la cache dei layer:
# npm install viene ri-eseguito solo se package.json / package-lock.json cambiano
COPY package.json package-lock.json ./
RUN npm ci

# Ora copiamo il resto del codice sorgente
COPY . .

# Build di produzione (variabili REACT_APP_* devono essere presenti a build-time)
ARG REACT_APP_SPOONACULAR_KEY
ENV REACT_APP_SPOONACULAR_KEY=$REACT_APP_SPOONACULAR_KEY
RUN npm run build

# ---- Stage 2: serve ----
FROM nginx:alpine AS production

# Config nginx per SPA: redirige tutte le route sconosciute su index.html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiamo solo la build statica dallo stage precedente (immagine finale leggera)
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
