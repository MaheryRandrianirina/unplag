FROM node:lts-alpine3.22
WORKDIR /app
COPY package.json package-lock.json ./
ENV NODE_ENV=development \
    PORT=3000
RUN if [ "$NODE_ENV" = "production" ]; then \
        npm install --only=production; \
    else \
        npm install; \
    fi
COPY . .
RUN echo "packages installed"
EXPOSE $PORT
CMD if [ "$NODE_ENV" = "production" ]; then \
        npm run start; \
    else \
        npm run dev; \
    fi


