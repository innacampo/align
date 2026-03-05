# ---- Build stage ----
FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies first (layer caching)
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source and build the frontend
COPY . .
RUN npm run build

# ---- Production stage ----
FROM node:20-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

# Install production dependencies only
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

# Copy built frontend assets and server code
COPY --from=build /app/dist ./dist
COPY server.js ./

# Cloud Run injects PORT env var (default 8080)
EXPOSE 8080

CMD ["node", "server.js"]
