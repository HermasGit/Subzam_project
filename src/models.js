// This file will contain user and production data models (table creation SQL or ORM setup)
// You can use SQL scripts or an ORM like Sequelize/Prisma for migrations

// Example: SQL for users and production_logs tables

/*
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'staff',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE production_logs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  entry_date DATE NOT NULL,
  batch_number VARCHAR(50) NOT NULL,
  stage VARCHAR(100) NOT NULL,
  quantity INTEGER NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
*/
