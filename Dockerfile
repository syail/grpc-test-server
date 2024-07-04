FROM node:lts-alpine

WORKDIR /app

# Use package manager pnpm
RUN npm i -g pnpm

COPY package.json pnpm-lock.yaml /app/
RUN pnpm i

COPY . /app/
RUN npm run build

ENV TZ=Asia/Seoul
ENV NODE_ENV=production

ENTRYPOINT ["npm", "run", "start"]