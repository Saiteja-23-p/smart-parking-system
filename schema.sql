CREATE DATABASE IF NOT EXISTS smart_parking_db;
USE smart_parking_db;

-- ============================================
-- SMART URBAN MOBILITY & PARKING ECOSYSTEM
-- Database Schema v2.0
-- ============================================

-- Drop tables in reverse dependency order
DROP TABLE IF EXISTS analytics_logs;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS smart_notifications;
DROP TABLE IF EXISTS traffic_predictions;
DROP TABLE IF EXISTS ev_charging_sessions;
DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS wallets;
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS vehicles;
DROP TABLE IF EXISTS parking_slots;
DROP TABLE IF EXISTS parking_hubs;
DROP TABLE IF EXISTS users;

-- Legacy table cleanup
DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS vehicle_logs;
DROP TABLE IF EXISTS booking;
DROP TABLE IF EXISTS parking_slot;
DROP TABLE IF EXISTS floors;
DROP TABLE IF EXISTS parking_location;
DROP TABLE IF EXISTS admin;

-- ============================================
-- 1. USERS
-- ============================================
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    role VARCHAR(20) DEFAULT 'ROLE_USER',  -- ROLE_USER, ROLE_OWNER, ROLE_ADMIN
    avatar_url VARCHAR(500),
    eco_score INT DEFAULT 0,
    preferred_vehicle_type VARCHAR(30) DEFAULT 'CAR',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_users_email (email),
    INDEX idx_users_role (role)
) ENGINE=InnoDB;

-- ============================================
-- 2. WALLETS
-- ============================================
CREATE TABLE wallets (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    balance DOUBLE DEFAULT 0.0,
    currency VARCHAR(10) DEFAULT 'INR',
    last_topped_up TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================
-- 3. PARKING HUBS (replaces floors)
-- ============================================
CREATE TABLE parking_hubs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    hub_name VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL DEFAULT 'Hyderabad',
    latitude DOUBLE NOT NULL,
    longitude DOUBLE NOT NULL,
    owner_id BIGINT,
    hub_type VARCHAR(30) DEFAULT 'COMMERCIAL',  -- MALL, AIRPORT, STREET, COMMERCIAL, HOSPITAL, STADIUM
    total_capacity INT DEFAULT 50,
    total_floors INT DEFAULT 1,
    rating DOUBLE DEFAULT 4.0,
    image_url VARCHAR(500),
    ev_enabled BOOLEAN DEFAULT FALSE,
    dynamic_pricing_enabled BOOLEAN DEFAULT TRUE,
    operating_hours VARCHAR(50) DEFAULT '06:00-23:00',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_hubs_city (city),
    INDEX idx_hubs_location (latitude, longitude),
    INDEX idx_hubs_owner (owner_id),
    INDEX idx_hubs_type (hub_type)
) ENGINE=InnoDB;

-- ============================================
-- 4. PARKING SLOTS
-- ============================================
CREATE TABLE parking_slots (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    hub_id BIGINT NOT NULL,
    floor_level INT DEFAULT 0,
    slot_number VARCHAR(20) NOT NULL,
    type VARCHAR(20) DEFAULT 'REGULAR',        -- REGULAR, VIP, EMERGENCY, HANDICAPPED
    status VARCHAR(20) DEFAULT 'AVAILABLE',    -- AVAILABLE, OCCUPIED, RESERVED, MAINTENANCE
    vehicle_type VARCHAR(30) DEFAULT 'CAR',    -- CAR, BIKE, SUV, EV
    is_ev_charging BOOLEAN DEFAULT FALSE,
    charger_type VARCHAR(30),                  -- LEVEL1, LEVEL2, DC_FAST
    base_price DOUBLE DEFAULT 50.0,
    current_dynamic_price DOUBLE DEFAULT 50.0,
    sensor_status VARCHAR(20) DEFAULT 'ONLINE', -- ONLINE, OFFLINE, ERROR
    FOREIGN KEY (hub_id) REFERENCES parking_hubs(id) ON DELETE CASCADE,
    INDEX idx_slots_hub (hub_id),
    INDEX idx_slots_status (status),
    INDEX idx_slots_ev (is_ev_charging)
) ENGINE=InnoDB;

-- ============================================
-- 5. VEHICLES
-- ============================================
CREATE TABLE vehicles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    plate_number VARCHAR(20) NOT NULL,
    vehicle_type VARCHAR(30) DEFAULT 'CAR',     -- CAR, BIKE, SUV, EV
    brand VARCHAR(50),
    model VARCHAR(50),
    color VARCHAR(30),
    nickname VARCHAR(50),
    is_ev BOOLEAN DEFAULT FALSE,
    battery_capacity_kwh DOUBLE,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_vehicles_user (user_id)
) ENGINE=InnoDB;

-- ============================================
-- 6. BOOKINGS (enhanced)
-- ============================================
CREATE TABLE bookings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    hub_id BIGINT NOT NULL,
    slot_id BIGINT NOT NULL,
    vehicle_id BIGINT,
    booking_token VARCHAR(255) UNIQUE NOT NULL,
    vehicle_number VARCHAR(20) NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    total_amount DOUBLE,
    dynamic_price_applied DOUBLE,
    estimated_walking_minutes INT DEFAULT 5,
    status VARCHAR(20) DEFAULT 'ACTIVE',        -- ACTIVE, COMPLETED, CANCELLED, EXPIRED, CHECKED_IN
    qr_scanned_at DATETIME,
    check_in_time DATETIME,
    check_out_time DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (hub_id) REFERENCES parking_hubs(id) ON DELETE CASCADE,
    FOREIGN KEY (slot_id) REFERENCES parking_slots(id) ON DELETE CASCADE,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE SET NULL,
    INDEX idx_bookings_user (user_id),
    INDEX idx_bookings_hub (hub_id),
    INDEX idx_bookings_status (status),
    INDEX idx_bookings_token (booking_token)
) ENGINE=InnoDB;

-- ============================================
-- 7. TRANSACTIONS (replaces payments)
-- ============================================
CREATE TABLE transactions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    booking_id BIGINT,
    amount DOUBLE NOT NULL,
    transaction_type VARCHAR(30) NOT NULL,       -- BOOKING, TOPUP, REFUND, CHARGING, PENALTY
    payment_method VARCHAR(30) DEFAULT 'WALLET', -- WALLET, UPI, CARD, NETBANKING
    status VARCHAR(20) DEFAULT 'COMPLETED',      -- PENDING, COMPLETED, FAILED, REFUNDED
    reference_id VARCHAR(100),
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE SET NULL,
    INDEX idx_tx_user (user_id),
    INDEX idx_tx_type (transaction_type)
) ENGINE=InnoDB;

-- ============================================
-- 8. EV CHARGING SESSIONS
-- ============================================
CREATE TABLE ev_charging_sessions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    slot_id BIGINT NOT NULL,
    vehicle_id BIGINT,
    start_time DATETIME NOT NULL,
    end_time DATETIME,
    energy_delivered_kwh DOUBLE DEFAULT 0.0,
    cost_per_kwh DOUBLE DEFAULT 12.0,
    total_cost DOUBLE DEFAULT 0.0,
    battery_start_pct INT,
    battery_end_pct INT,
    charger_type VARCHAR(30),
    status VARCHAR(20) DEFAULT 'CHARGING',       -- CHARGING, COMPLETED, INTERRUPTED
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (slot_id) REFERENCES parking_slots(id) ON DELETE CASCADE,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE SET NULL,
    INDEX idx_ev_user (user_id),
    INDEX idx_ev_slot (slot_id)
) ENGINE=InnoDB;

-- ============================================
-- 9. TRAFFIC PREDICTIONS (simulated AI)
-- ============================================
CREATE TABLE traffic_predictions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    hub_id BIGINT NOT NULL,
    prediction_hour INT NOT NULL,               -- 0-23
    day_of_week INT NOT NULL,                   -- 1=MON, 7=SUN
    predicted_occupancy_pct DOUBLE NOT NULL,
    confidence_score DOUBLE DEFAULT 0.85,
    predicted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (hub_id) REFERENCES parking_hubs(id) ON DELETE CASCADE,
    INDEX idx_pred_hub_day (hub_id, day_of_week)
) ENGINE=InnoDB;

-- ============================================
-- 10. SMART NOTIFICATIONS
-- ============================================
CREATE TABLE smart_notifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    title VARCHAR(100) NOT NULL,
    message VARCHAR(500) NOT NULL,
    type VARCHAR(30) DEFAULT 'SYSTEM',           -- BOOKING, EV, TRAFFIC, PRICE, SYSTEM, RECOMMENDATION
    priority VARCHAR(15) DEFAULT 'MEDIUM',       -- LOW, MEDIUM, HIGH, URGENT
    icon_type VARCHAR(30) DEFAULT 'INFO',        -- INFO, SUCCESS, WARNING, ERROR, EV, PRICE, TRAFFIC
    action_url VARCHAR(255),
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_notif_user (user_id),
    INDEX idx_notif_read (is_read)
) ENGINE=InnoDB;

-- ============================================
-- 11. REVIEWS
-- ============================================
CREATE TABLE reviews (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    hub_id BIGINT NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (hub_id) REFERENCES parking_hubs(id) ON DELETE CASCADE,
    INDEX idx_reviews_hub (hub_id),
    UNIQUE KEY uk_user_hub_review (user_id, hub_id)
) ENGINE=InnoDB;

-- ============================================
-- 12. FAVORITES
-- ============================================
CREATE TABLE favorites (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    hub_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (hub_id) REFERENCES parking_hubs(id) ON DELETE CASCADE,
    UNIQUE KEY uk_user_hub_fav (user_id, hub_id)
) ENGINE=InnoDB;

-- ============================================
-- 13. ANALYTICS LOGS
-- ============================================
CREATE TABLE analytics_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    event_type VARCHAR(50) NOT NULL,             -- BOOKING_CREATED, CHECKIN, CHECKOUT, SEARCH, EV_START, PRICE_SURGE
    hub_id BIGINT,
    user_id BIGINT,
    metadata JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (hub_id) REFERENCES parking_hubs(id) ON DELETE SET NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_analytics_type (event_type),
    INDEX idx_analytics_hub (hub_id),
    INDEX idx_analytics_time (created_at)
) ENGINE=InnoDB;
