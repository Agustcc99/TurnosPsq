# Etapa 1: Build del frontend
FROM node:22-alpine AS build-frontend

WORKDIR /app

# Copiamos solo lo necesario para instalar y buildear el front
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install

COPY frontend ./frontend
RUN cd frontend && npm run build

# Etapa 2: Backend + servir el build del frontend
FROM node:22-alpine AS backend

WORKDIR /app

# Copiar package.json del backend e instalar deps
COPY backend/package*.json ./backend/
RUN cd backend && npm install --production

# Copiar código del backend
COPY backend ./backend

# Copiar el build del frontend dentro de backend/public
COPY --from=build-frontend /app/frontend/dist ./backend/public

WORKDIR /app/backend

ENV NODE_ENV=production

# Fly te pasa un PORT, pero tu server usa process.env.PORT || 4000
EXPOSE 4000

CMD ["node", "server.js"]
