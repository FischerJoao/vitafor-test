FROM php:8.2-cli

WORKDIR /app

RUN apt-get update && apt-get install -y libsqlite3-dev && rm -rf /var/lib/apt/lists/* \
    && docker-php-ext-install pdo pdo_sqlite

COPY . .

EXPOSE 8000

CMD ["php", "-S", "0.0.0.0:8000", "-t", "public"]
