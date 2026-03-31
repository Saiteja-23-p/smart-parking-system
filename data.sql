USE smart_parking_db;

-- Sample Admin
INSERT INTO admin (username, password) VALUES ('admin', 'admin123');

-- Sample Users
INSERT INTO users (name, email, password, phone, role) VALUES ('John Doe', 'john@example.com', 'password123', '1234567890', 'USER');
INSERT INTO users (name, email, password, phone, role) VALUES ('Jane Smith', 'jane@example.com', 'password456', '0987654321', 'USER');

-- Sample Locations
INSERT INTO parking_location (location_name, address, latitude, longitude) VALUES ('Downtown Metro', '123 Main St, Central District', 37.7749, -122.4194);
INSERT INTO parking_location (location_name, address, latitude, longitude) VALUES ('City Mall', '456 Retail Ave, Uptown', 34.0522, -118.2437);
INSERT INTO parking_location (location_name, address, latitude, longitude) VALUES ('Tech Park', '789 innovation Dr, Silicon Valley', 37.3861, -122.0839);

-- Sample Slots for Downtown Metro (id=1)
INSERT INTO parking_slot (location_id, slot_number, status, vehicle_type, price_per_hour) VALUES (1, 'A1', 'Available', 'Two-Wheeler', 20.0);
INSERT INTO parking_slot (location_id, slot_number, status, vehicle_type, price_per_hour) VALUES (1, 'A2', 'Available', 'Four-Wheeler', 50.0);
INSERT INTO parking_slot (location_id, slot_number, status, vehicle_type, price_per_hour) VALUES (1, 'A3', 'Booked', 'Four-Wheeler', 50.0);

-- Sample Slots for City Mall (id=2)
INSERT INTO parking_slot (location_id, slot_number, status, vehicle_type, price_per_hour) VALUES (2, 'B1', 'Available', 'Three-Wheeler', 30.0);
INSERT INTO parking_slot (location_id, slot_number, status, vehicle_type, price_per_hour) VALUES (2, 'B2', 'Available', 'Four-Wheeler', 60.0);

-- Sample Slots for Tech Park (id=3)
INSERT INTO parking_slot (location_id, slot_number, status, vehicle_type, price_per_hour) VALUES (3, 'C1', 'Available', 'Two-Wheeler', 15.0);
INSERT INTO parking_slot (location_id, slot_number, status, vehicle_type, price_per_hour) VALUES (3, 'C2', 'Available', 'Three-Wheeler', 25.0);
INSERT INTO parking_slot (location_id, slot_number, status, vehicle_type, price_per_hour) VALUES (3, 'C3', 'Available', 'Four-Wheeler', 40.0);
