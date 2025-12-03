# Etapa 1: Build del frontend
FROM node:20 AS build-frontend

WORKDIR /app

# Instalar deps del front
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install

# Copiar código del front y buildear
COPY frontend ./frontend
RUN cd frontend && npm run build

# Etapa 2: Backend + servir el build del frontend
FROM node:20 AS backend

WORKDIR /app

# Copiar package.json del backend e instalar deps
COPY backend/package*.json ./backend/
RUN cd backend && npm install --production

# Copiar código del backend (SIN node_modules gracias al .dockerignore)
COPY backend ./backend

# Copiar el build del frontend dentro de backend/public
COPY --from=build-frontend /app/frontend/dist ./backend/public

WORKDIR /app/backend

ENV NODE_ENV=production
EXPOSE 4000

CMD ["node", "server.js"]
