FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

# ✔ ใช้ install แทน ci (สำคัญมาก)
RUN npm install

COPY . .

EXPOSE 3001

CMD ["node", "index.js"]