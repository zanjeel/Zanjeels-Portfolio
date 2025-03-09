# Building docker image using multistage build
# STAGE 01
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./ 

RUN npm ci --frozen-lockfile 

COPY . .

RUN npm run build

RUN npm prune --production

# STAGE 02
FROM gcr.io/distroless/nodejs18 AS runner

WORKDIR /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["node_modules/.bin/next", "start"]

