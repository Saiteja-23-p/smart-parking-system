CREATE DATABASE IF NOT EXISTS smart_parking_db;
USE smart_parking_db;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    role VARCHAR(20) DEFAULT 'USER'
);

-- Admin Table (Separate as requested, though role in users is also common)
CREATE TABLE IF NOT EXISTS admin (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Parking Location Table
CREATE TABLE IF NOT EXISTS parking_location (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    location_name VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude DOUBLE NOT NULL,
    longitude DOUBLE NOT NULL
);

-- Parking Slot Table
CREATE TABLE IF NOT EXISTS parking_slot (
    slot_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    location_id BIGINT NOT NULL,
    slot_number VARCHAR(20) NOT NULL,
    status VARCHAR(20) DEFAULT 'Available',
    vehicle_type VARCHAR(50) DEFAULT 'Four-Wheeler',
    price_per_hour DOUBLE DEFAULT 50.0,
    FOREIGN KEY (location_id) REFERENCES parking_location(id) ON DELETE CASCADE
);

-- Booking Table
CREATE TABLE IF NOT EXISTS booking (
    booking_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    slot_id BIGINT NOT NULL,
    booking_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    status VARCHAR(20) DEFAULT 'Confirmed',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (slot_id) REFERENCES parking_slot(slot_id) ON DELETE CASCADE
);
