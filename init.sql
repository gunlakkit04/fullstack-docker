CREATE DATABASE IF NOT EXISTS chicken_db;
USE chicken_db;

CREATE TABLE IF NOT EXISTS chickens (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  breed VARCHAR(255),
  weight FLOAT,
  age INT,
  image TEXT
);

INSERT INTO chickens (name, breed, weight, age, image) VALUES
('Chicken A', 'Thai Chicken', 2.5, 6, 'https://images.unsplash.com/photo-1'),
('Chicken B', 'Farm Chicken', 3.0, 8, 'https://images.unsplash.com/photo-2'),
('Chicken C', 'Free Range', 2.2, 5, 'https://images.unsplash.com/photo-3');