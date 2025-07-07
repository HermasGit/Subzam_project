# Subzam_project

This project exposes simple authentication and production log APIs using Node.js
and PostgreSQL. It previously served a custom HTML interface from the `public`
folder, but that interface has been removed in favor of using **NocoDB** for a
web-based spreadsheet UI. The server now solely provides the API endpoints
under `/api` which can be consumed directly or integrated with NocoDB.

Copy `.env.example` to `.env` and fill in your own database credentials before
starting the server.

To start the server:

```bash
npm install
npm start
```

## Database Setup

Create the PostgreSQL user and database before launching the API or NocoDB.
Below are example commands you can run as the `postgres` superuser (you can
enter them in DBeaver's SQL editor or in `psql`):

```sql
CREATE USER hermasstaff WITH PASSWORD 'hermas1234';
CREATE DATABASE subzam_db OWNER hermasstaff;
```

Once the database is created, run the `create_subzam_db.sql` script to set up
the `production_logs` table:

```bash
psql -U hermasstaff -d subzam_db -f create_subzam_db.sql
```

## Launching NocoDB

The project now relies on [NocoDB](https://github.com/nocodb/nocodb) for its web UI.
You can launch it using Docker **or** directly with Node. The `start_nocodb.sh`
script automatically detects whether Docker is available and falls back to
running `npx nocodb` if it isn't.

### Option 1: Docker

Run the helper script with Docker installed:

```bash
./start_nocodb.sh
```

This script reads the database details from your `.env` file and starts NocoDB
on port `8080`. Visit `http://localhost:8080` in your browser to complete the
setup and connect it to your database tables.

### Option 2: Node (no Docker)

If you prefer not to use Docker, you can start NocoDB directly with `npx`:

```bash
npx nocodb --db "pg://<user>:<password>@<host>:<port>/<db>" -p 8080
```

Substitute the placeholders with your own PostgreSQL credentials. This is the
same command the helper script will run when Docker isn't found.
