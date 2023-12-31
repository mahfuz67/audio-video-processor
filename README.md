## Cogart Studio Full-Stack Interview

## Image and Video Processing API

## This is a simple REST API built with Express, TypeScript, and Prisma to upload, process, and manage images and videos.

Tooling:

- Nodejs
- Typescript
- Prisma
- Express

## Installation

```bash
$ npm install
```

## Running the app

Clone the project

```bash
$ git clone https://github.com/mahfuz67/audio-video-processor
```

Copy the .env.example file to .env and fill in the values.
You must have progresSQL installed and running on your machine.
Replace user, password, host, and database_name in the DATABASE_URL and POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD environment variable with your actual PostgreSQL connection details.

Run prisma migrations

```bash
$ npm run migrate:dev
```

Run app locally

```bash
$ npm run dev:migrate:dev
```

Running test

```bash
$ npm run test:migrate:dev
```

Running with docker

```bash
# Run in Dev (Detached mode)
$ docker compose -f docker-compose.dev.yml up --build -d

# Run Prod
$ docker compose -f docker-compose.yml up --build -d

# Kill dev (Remove volumes)
$ docker compose -f docker-compose.dev.yml down -v

# Kill prod (Remove volumes)
$ docker compose -f docker-compose.yml down -v
```

## Endpoints

Postman documentation:

[docs](https://documenter.getpostman.com/view/21867518/2s9XxzvYzt)
