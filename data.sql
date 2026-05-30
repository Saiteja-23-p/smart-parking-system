USE smart_parking_db;

-- Insert Admin User
INSERT INTO users (name, email, password, phone, role) 
VALUES ('Super Admin', 'admin@smartparking.com', '$2a$10$c1Aok0W5EPtaBB9uiUs/YuZIzmu789Z3LCLiZ2nybcauEhnC8xxQe', '1234567890', 'ROLE_ADMIN');
-- Note: Password is 'password123' bcrypt encoded

-- Insert User
INSERT INTO users (name, email, password, phone, role) 
VALUES ('John Doe', 'user@smartparking.com', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HCGzGzBOq4uG5h2.c5r7y', '9876543210', 'ROLE_USER');

-- Insert Floors
INSERT INTO floors (floor_name, level) VALUES ('Ground Floor', 0);
INSERT INTO floors (floor_name, level) VALUES ('Floor 1', 1);
INSERT INTO floors (floor_name, level) VALUES ('Floor 2', 2);

-- Insert Parking Slots (Ground Floor)
INSERT INTO parking_slots (floor_id, slot_number, type, status, price_per_hour) VALUES (1, 'G-01', 'VIP', 'AVAILABLE', 100.0);
INSERT INTO parking_slots (floor_id, slot_number, type, status, price_per_hour) VALUES (1, 'G-02', 'VIP', 'AVAILABLE', 100.0);
INSERT INTO parking_slots (floor_id, slot_number, type, status, price_per_hour) VALUES (1, 'G-03', 'EMERGENCY', 'AVAILABLE', 0.0);
INSERT INTO parking_slots (floor_id, slot_number, type, status, price_per_hour) VALUES (1, 'G-04', 'REGULAR', 'AVAILABLE', 50.0);
INSERT INTO parking_slots (floor_id, slot_number, type, status, price_per_hour) VALUES (1, 'G-05', 'REGULAR', 'OCCUPIED', 50.0);
INSERT INTO parking_slots (floor_id, slot_number, type, status, price_per_hour) VALUES (1, 'G-06', 'REGULAR', 'AVAILABLE', 50.0);

-- Insert Parking Slots (Floor 1)
INSERT INTO parking_slots (floor_id, slot_number, type, status, price_per_hour) VALUES (2, 'F1-01', 'REGULAR', 'AVAILABLE', 40.0);
INSERT INTO parking_slots (floor_id, slot_number, type, status, price_per_hour) VALUES (2, 'F1-02', 'REGULAR', 'RESERVED', 40.0);
INSERT INTO parking_slots (floor_id, slot_number, type, status, price_per_hour) VALUES (2, 'F1-03', 'REGULAR', 'AVAILABLE', 40.0);
INSERT INTO parking_slots (floor_id, slot_number, type, status, price_per_hour) VALUES (2, 'F1-04', 'REGULAR', 'AVAILABLE', 40.0);

-- Insert Parking Slots (Floor 2)
INSERT INTO parking_slots (floor_id, slot_number, type, status, price_per_hour) VALUES (3, 'F2-01', 'REGULAR', 'AVAILABLE', 30.0);
INSERT INTO parking_slots (floor_id, slot_number, type, status, price_per_hour) VALUES (3, 'F2-02', 'REGULAR', 'AVAILABLE', 30.0);
