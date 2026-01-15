# ABS Motor Group - MySQL

A full-stack Laravel application with React/Inertia.js frontend for ABS Motor Group.

## Features

- Laravel 12 backend
- React 19 with Inertia.js
- MySQL database
- Docker support with phpMyAdmin
- Authentication with Laravel Fortify
- Two-factor authentication
- Modern UI with Tailwind CSS and Radix UI

## Prerequisites

- PHP 8.4 or higher
- Composer
- Node.js 20 or higher
- npm
- MySQL 8.0 (or use Docker)

## Installation

### Local Development (without Docker)

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd ABS-Motor-Group-MySQL
   ```

2. **Install PHP dependencies**:
   ```bash
   composer install
   ```

3. **Install Node dependencies**:
   ```bash
   npm install
   ```

4. **Create environment file**:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Configure database** in `.env` file:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=abs_motor
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   ```

6. **Run migrations**:
   ```bash
   php artisan migrate
   ```

7. **Build frontend assets**:
   ```bash
   npm run build
   ```

8. **Start the development server**:
   ```bash
   composer run dev
   ```

### Docker Installation (Recommended)

The easiest way to get started is using Docker. This will set up the entire stack including PHP, MySQL, and phpMyAdmin.

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd ABS-Motor-Group-MySQL
   ```

2. **Build frontend assets** (Option 1 - Faster):
   ```bash
   npm install
   npm run build
   ```

   Or skip this step and use `Dockerfile.multistage` (Option 2 - Slower but self-contained)

3. **Create environment file**:
   ```bash
   cp .env.example .env
   ```

4. **Start Docker containers**:
   ```bash
   docker compose up -d --build
   ```

5. **Access the application**:
   - **Application**: http://localhost:8000
   - **phpMyAdmin**: http://localhost:8080
     - Server: `mysql`
     - Username: `root` or `abs_user`
     - Password: `root_password` or `abs_password`

For detailed Docker instructions, see [DOCKER.md](DOCKER.md).

## Development

### Available Scripts

- `composer run dev` - Start development server with hot reload
- `composer run dev:ssr` - Start with SSR support
- `composer run test` - Run tests
- `composer run lint` - Run PHP linter
- `npm run dev` - Start Vite dev server
- `npm run build` - Build production assets
- `npm run format` - Format code with Prettier
- `npm run lint` - Lint JavaScript/TypeScript

### Database Management

With Docker, you can access phpMyAdmin at http://localhost:8080 to manage your database with a graphical interface.

Alternatively, you can use command line:

```bash
# Access MySQL in Docker
docker exec -it abs-motor-mysql mysql -u root -proot_password abs_motor

# Run migrations
docker exec abs-motor-app php artisan migrate

# Run seeders
docker exec abs-motor-app php artisan db:seed
```

## Project Structure

```
.
├── app/                    # Laravel application code
├── bootstrap/             # Laravel bootstrap files
├── config/                # Configuration files
├── database/              # Database migrations and seeders
├── public/                # Public assets
├── resources/             # Views and frontend code
│   ├── css/              # Stylesheets
│   ├── js/               # React components
│   └── views/            # Blade templates
├── routes/                # Route definitions
├── storage/               # Application storage
├── tests/                 # Tests
├── docker-compose.yml     # Docker Compose configuration
├── Dockerfile            # Docker image definition
└── DOCKER.md             # Docker documentation
```

## Technologies Used

### Backend
- Laravel 12
- PHP 8.4
- MySQL 8.0
- Laravel Fortify (Authentication)

### Frontend
- React 19
- Inertia.js
- TypeScript
- Tailwind CSS 4
- Vite
- Radix UI Components

### DevOps
- Docker
- Docker Compose
- phpMyAdmin

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please open an issue on GitHub.
