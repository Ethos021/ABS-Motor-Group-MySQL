# Docker Setup for ABS Motor Group

This project includes a full-stack Docker setup with Laravel, MySQL, and phpMyAdmin.

## Prerequisites

- Docker (version 20.10 or higher)
- Docker Compose (version 2.0 or higher)

## Quick Start

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <repository-url>
   cd ABS-Motor-Group-MySQL
   ```

2. **Create your `.env` file**:
   ```bash
   cp .env.example .env
   ```

3. **Build and start the containers**:
   ```bash
   docker-compose up -d --build
   ```

4. **Access the application**:
   - **Laravel App**: http://localhost:8000
   - **phpMyAdmin**: http://localhost:8080

## Services

### Laravel Application (`app`)
- **Port**: 8000
- **Container Name**: abs-motor-app
- **Description**: Laravel application with PHP 8.2 and Apache

### MySQL Database (`mysql`)
- **Port**: 3306
- **Container Name**: abs-motor-mysql
- **Database Name**: abs_motor
- **Username**: abs_user
- **Password**: abs_password
- **Root Password**: root_password

### phpMyAdmin (`phpmyadmin`)
- **Port**: 8080
- **Container Name**: abs-motor-phpmyadmin
- **Description**: Web-based MySQL administration tool
- **Login**: Use root/root_password or abs_user/abs_password

## Common Commands

### Start the containers
```bash
docker-compose up -d
```

### Stop the containers
```bash
docker-compose down
```

### View logs
```bash
# All containers
docker-compose logs -f

# Specific container
docker-compose logs -f app
docker-compose logs -f mysql
docker-compose logs -f phpmyadmin
```

### Rebuild containers
```bash
docker-compose up -d --build
```

### Access the application container
```bash
docker exec -it abs-motor-app bash
```

### Run Laravel commands
```bash
# Run migrations
docker exec abs-motor-app php artisan migrate

# Clear cache
docker exec abs-motor-app php artisan cache:clear

# Run seeders
docker exec abs-motor-app php artisan db:seed
```

### Access MySQL directly
```bash
docker exec -it abs-motor-mysql mysql -u root -proot_password abs_motor
```

## Environment Variables

Key environment variables in `.env`:

- `DB_CONNECTION=mysql` - Use MySQL database
- `DB_HOST=mysql` - MySQL service name in Docker network
- `DB_PORT=3306` - MySQL port
- `DB_DATABASE=abs_motor` - Database name
- `DB_USERNAME=abs_user` - Database username
- `DB_PASSWORD=abs_password` - Database password

## Data Persistence

- MySQL data is stored in a Docker volume named `mysql-data`
- Storage files are mounted from `./storage` directory

## Troubleshooting

### Port conflicts
If ports 8000, 8080, or 3306 are already in use, you can change them in `docker-compose.yml`:
```yaml
ports:
  - "8001:80"  # Change 8000 to 8001 for the app
```

### Permission issues
If you encounter permission errors:
```bash
sudo chown -R $USER:$USER storage bootstrap/cache
chmod -R 755 storage bootstrap/cache
```

### Reset everything
To start fresh (⚠️ This will delete all data):
```bash
docker-compose down -v
docker-compose up -d --build
```

## Production Deployment

For production deployment:

1. Update environment variables in `.env`:
   - Set `APP_ENV=production`
   - Set `APP_DEBUG=false`
   - Use strong passwords for database
   - Generate a new `APP_KEY`

2. Use proper SSL/TLS certificates

3. Consider using a reverse proxy (nginx/traefik)

4. Enable proper backup strategies for the database
