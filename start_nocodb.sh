#!/bin/bash
# Helper script to launch NocoDB using the credentials in .env

set -e
if [ ! -f .env ]; then
  echo "Missing .env file with database credentials" >&2
  exit 1
fi

# Load .env into variables
set -a
. ./.env
set +a

NC_DB="pg://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME"

if command -v docker > /dev/null; then
  echo "Starting NocoDB using Docker..."
  docker run -p 8080:8080 -e NC_DB="$NC_DB" nocodb/nocodb:latest
else
  echo "Docker not found. Starting NocoDB using npx..."
  npx nocodb --db "$NC_DB" -p 8080
fi

