-- Create the application user and database
CREATE USER hermasstaff WITH PASSWORD 'hermas1234';
CREATE DATABASE subzam_db OWNER hermasstaff;

\c subzam_db

-- Table for recording production logs
CREATE TABLE production_logs (
  id SERIAL PRIMARY KEY,
  entry_date DATE NOT NULL,
  batch_number VARCHAR(50) NOT NULL,
  stage VARCHAR(100) NOT NULL,
  quantity INTEGER NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
