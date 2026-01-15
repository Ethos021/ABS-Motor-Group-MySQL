# Base PHP-FPM image for Laravel
FROM php:8.4-fpm

# Install required dependencies and extensions for Laravel
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Install Composer globally
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Install Node.js (react/frontend dependencies)
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g npm@11.7.0

# Set working directory in Laravel
WORKDIR /var/www

# Copy all files to container
COPY . .

# Install Laravel dependencies
RUN composer install
RUN npm install

# Set correct permissions for Laravel
RUN chmod -R 775 /var/www/storage /var/www/bootstrap/cache \
    && chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# Expose Port for Nginx (and PHP-FPM, but not the Laravel development server)
EXPOSE 9000

# Launch PHP-FPM (default for FPM container) and ensure it runs
CMD ["php-fpm"]