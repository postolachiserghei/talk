apt update && apt install -y \
    wget \
    git \
    curl \
    zip \
    default-mysql-client \
    && docker-php-ext-install mysqli pdo pdo_mysql \
    && docker-php-ext-enable pdo_mysql \
    unzip
cd ~
curl -sS https://getcomposer.org/installer | php

mv composer.phar /usr/local/bin/composer
composer --version

cd /var/www/html
composer install
composer dump-autoload -o
