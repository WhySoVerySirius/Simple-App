
-----------------back-end-------------------------
1. navigate to back-end
2. ./vendor/bin/sail/up -d; (kill apache if container doesnt start);
3. ./vendor/bin/sail shell;
4. composer install;
5. run migrations (php artisan migrate);
6. run seeders (php artisan db:seed)

------------------front-end---------------------
1. navigate to front-end
2. npm install
3. npm run start