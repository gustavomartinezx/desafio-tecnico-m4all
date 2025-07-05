# Dockerfile para o frontend Next.js (App Router)
FROM node:20 AS builder
WORKDIR /app

# Copia os arquivos do projeto
COPY . .

# Instala dependências e builda o projeto
RUN npm install && npm run build

# --- Production image ---
FROM node:20-slim AS runner
WORKDIR /app

# Copia apenas o necessário do build
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# Exponha a porta padrão do Next.js
EXPOSE 3000

# Comando para rodar o Next.js em produção
CMD ["npm", "run", "start"]
