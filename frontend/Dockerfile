# ============================
# 3️⃣ Development stage (for docker compose)
# ============================
FROM node:24-bookworm AS dev

WORKDIR /app

COPY package*.json ./

# Install deps
RUN npm install

# Rebuild native modules for Linux environment
RUN npm rebuild

# Copy source
COPY . .

# ✅ Ensure Next.js can write its build files
RUN mkdir -p /app/.next && chmod -R 777 /app

EXPOSE 3000
ENV NODE_ENV=development

CMD ["npm", "run", "dev"]
