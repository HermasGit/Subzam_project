-- Run this as a superuser (e.g., postgres) to create the database
CREATE DATABASE subzam_db;

-- Connect to subzam_db, then run the following to create the table
CREATE TABLE production_logs (
  id SERIAL PRIMARY KEY,
  entry_date DATE NOT NULL,
  batch_number VARCHAR(50) NOT NULL,
  stage VARCHAR(100) NOT NULL,
  quantity INTEGER NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
