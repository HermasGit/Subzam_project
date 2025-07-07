# Subzam_project

This project exposes simple authentication and production log APIs using Node.js
and PostgreSQL. It previously served a custom HTML interface from the `public`
folder, but that interface has been removed in favor of using **NocoDB** for a
web-based spreadsheet UI. The server now solely provides the API endpoints
under `/api` which can be consumed directly or integrated with NocoDB.

To start the server:

```bash
npm install
npm start
```
