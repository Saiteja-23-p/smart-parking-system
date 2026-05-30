-- Seed data for Smart Parking System
-- Hyderabad Hubs
INSERT IGNORE INTO users (id, name, email, password, phone, role) VALUES 
(1, 'Admin', 'admin@smartparking.com', '$2a$10$QjY8B3n0Z1hJ2gTq5yA4K.Z4U5Z1hJ2gTq5yA4K.Z4U5Z1hJ2gTq5', '1234567890', 'ROLE_ADMIN');

INSERT IGNORE INTO parking_hubs (id, hub_name, address, city, latitude, longitude, hub_type, total_capacity, total_floors, ev_enabled, dynamic_pricing_enabled, image_url, owner_id, is_active) VALUES
(1, 'Inorbit Mall Smart Hub', 'Mindspace, Madhapur, Hyderabad', 'Hyderabad', 17.4346, 78.3866, 'MALL', 200, 3, true, true, 'https://images.unsplash.com/photo-1590674899484-13da0d1b58f5', 1, true),
(2, 'GVK One Premium Parking', 'Banjara Hills, Hyderabad', 'Hyderabad', 17.4184, 78.4485, 'COMMERCIAL', 150, 2, true, true, 'https://images.unsplash.com/photo-1573348722427-f1d6819fdf98', 1, true),
(3, 'T-Hub Innovation Parking', 'Raidurg, Hyderabad', 'Hyderabad', 17.4384, 78.3756, 'COMMERCIAL', 100, 1, true, false, 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81', 1, true),
(4, 'Airport Smart Park', 'Shamshabad, Hyderabad', 'Hyderabad', 17.2315, 78.4294, 'AIRPORT', 500, 5, true, true, 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a', 1, true),
(5, 'Charminar Tourist Parking', 'Charminar, Hyderabad', 'Hyderabad', 17.3616, 78.4747, 'STREET', 50, 1, false, true, 'https://images.unsplash.com/photo-1596484552834-6a58f850d0a1', 1, true),
(6, 'UB City Mall Parking', 'Vittal Mallya Rd, Bengaluru', 'Bengaluru', 12.9724, 77.5951, 'MALL', 250, 4, true, true, 'https://images.unsplash.com/photo-1590674899484-13da0d1b58f5', 1, true),
(7, 'Connaught Place Smart CP', 'New Delhi, India', 'New Delhi', 28.6304, 77.2177, 'STREET', 80, 1, false, true, 'https://images.unsplash.com/photo-1596484552834-6a58f850d0a1', 1, true),
(8, 'Piccadilly Circus Terminal', 'West End, London, UK', 'London', 51.5101, -0.1342, 'COMMERCIAL', 150, 2, true, true, 'https://images.unsplash.com/photo-1573348722427-f1d6819fdf98', 1, true),
(9, 'Times Square Smart Hub', 'Manhattan, New York, USA', 'New York', 40.7580, -73.9855, 'COMMERCIAL', 300, 3, true, true, 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a', 1, true),
(10, 'SF Wharf Station Parking', 'Fisherman\'s Wharf, San Francisco, USA', 'San Francisco', 37.8080, -122.4177, 'COMMERCIAL', 100, 1, true, false, 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81', 1, true),
(11, 'Korutla Bus Stand Parking', 'Bus Stand Rd, Korutla, Telangana, India', 'Korutla', 18.8242, 78.7128, 'COMMERCIAL', 100, 1, true, false, 'https://images.unsplash.com/photo-1590674899484-13da0d1b58f5', 1, true),
(12, 'Korutla Shopping Complex', 'Main Road, Korutla, Telangana, India', 'Korutla', 18.8214, 78.7145, 'MALL', 120, 2, true, true, 'https://images.unsplash.com/photo-1573348722427-f1d6819fdf98', 1, true),
(13, 'Korutla Metro-Mart Terminal', 'Metpally Rd, Korutla, Telangana, India', 'Korutla', 18.8270, 78.7080, 'MALL', 150, 2, true, true, 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a', 1, true),
(14, 'Korutla Smart Market Hub', 'Ganesh Temple Road, Korutla, Telangana, India', 'Korutla', 18.8185, 78.7160, 'STREET', 50, 1, false, true, 'https://images.unsplash.com/photo-1596484552834-6a58f850d0a1', 1, true);

-- Seed some slots for Inorbit Mall
INSERT IGNORE INTO parking_slots (id, hub_id, floor_level, slot_number, type, status, vehicle_type, is_ev_charging, base_price, current_dynamic_price) VALUES
(1, 1, 1, 'IN-F1-01', 'REGULAR', 'AVAILABLE', 'CAR', false, 50.0, 50.0),
(2, 1, 1, 'IN-F1-02', 'REGULAR', 'AVAILABLE', 'CAR', false, 50.0, 50.0),
(3, 1, 1, 'IN-F1-03', 'REGULAR', 'OCCUPIED', 'CAR', false, 50.0, 60.0),
(4, 1, 1, 'IN-F1-EV1', 'REGULAR', 'AVAILABLE', 'EV', true, 80.0, 80.0),
(5, 1, 1, 'IN-F1-EV2', 'REGULAR', 'AVAILABLE', 'EV', true, 80.0, 80.0),
(6, 1, 1, 'IN-F1-BIKE1', 'REGULAR', 'AVAILABLE', 'BIKE', false, 20.0, 20.0),
(7, 1, 1, 'IN-F1-BIKE2', 'REGULAR', 'AVAILABLE', 'BIKE', false, 20.0, 20.0);

-- Seed some slots for T-Hub
INSERT IGNORE INTO parking_slots (id, hub_id, floor_level, slot_number, type, status, vehicle_type, is_ev_charging, base_price, current_dynamic_price) VALUES
(8, 3, 1, 'TH-01', 'REGULAR', 'AVAILABLE', 'CAR', false, 40.0, 40.0),
(9, 3, 1, 'TH-02', 'REGULAR', 'AVAILABLE', 'CAR', false, 40.0, 40.0),
(10, 3, 1, 'TH-EV1', 'REGULAR', 'AVAILABLE', 'EV', true, 60.0, 60.0);

-- Seed some slots for GVK One Premium Parking
INSERT IGNORE INTO parking_slots (id, hub_id, floor_level, slot_number, type, status, vehicle_type, is_ev_charging, base_price, current_dynamic_price) VALUES
(11, 2, 1, 'GV-F1-01', 'REGULAR', 'AVAILABLE', 'CAR', false, 70.0, 70.0),
(12, 2, 1, 'GV-F1-02', 'REGULAR', 'AVAILABLE', 'CAR', false, 70.0, 70.0),
(13, 2, 1, 'GV-F1-EV1', 'REGULAR', 'AVAILABLE', 'EV', true, 100.0, 100.0);

-- Seed some slots for Airport Smart Park
INSERT IGNORE INTO parking_slots (id, hub_id, floor_level, slot_number, type, status, vehicle_type, is_ev_charging, base_price, current_dynamic_price) VALUES
(14, 4, 1, 'AP-F1-01', 'REGULAR', 'AVAILABLE', 'CAR', false, 60.0, 60.0),
(15, 4, 1, 'AP-F1-02', 'REGULAR', 'AVAILABLE', 'CAR', false, 60.0, 60.0),
(16, 4, 1, 'AP-F1-EV1', 'REGULAR', 'AVAILABLE', 'EV', true, 90.0, 90.0);

-- Seed some slots for Charminar Tourist Parking
INSERT IGNORE INTO parking_slots (id, hub_id, floor_level, slot_number, type, status, vehicle_type, is_ev_charging, base_price, current_dynamic_price) VALUES
(17, 5, 1, 'CH-01', 'REGULAR', 'AVAILABLE', 'CAR', false, 30.0, 30.0),
(18, 5, 1, 'CH-02', 'REGULAR', 'AVAILABLE', 'CAR', false, 30.0, 30.0),
(19, 5, 1, 'CH-BIKE1', 'REGULAR', 'AVAILABLE', 'BIKE', false, 15.0, 15.0);

-- Seed slots for UB City Mall Bengaluru
INSERT IGNORE INTO parking_slots (id, hub_id, floor_level, slot_number, type, status, vehicle_type, is_ev_charging, base_price, current_dynamic_price) VALUES
(20, 6, 1, 'UB-F1-01', 'REGULAR', 'AVAILABLE', 'CAR', false, 60.0, 60.0),
(21, 6, 1, 'UB-F1-02', 'REGULAR', 'AVAILABLE', 'CAR', false, 60.0, 60.0),
(22, 6, 1, 'UB-F1-EV1', 'REGULAR', 'AVAILABLE', 'EV', true, 90.0, 90.0);

-- Seed slots for Connaught Place New Delhi
INSERT IGNORE INTO parking_slots (id, hub_id, floor_level, slot_number, type, status, vehicle_type, is_ev_charging, base_price, current_dynamic_price) VALUES
(23, 7, 1, 'ND-CP-01', 'REGULAR', 'AVAILABLE', 'CAR', false, 40.0, 40.0),
(24, 7, 1, 'ND-CP-BIKE1', 'REGULAR', 'AVAILABLE', 'BIKE', false, 20.0, 20.0);

-- Seed slots for Piccadilly Circus London
INSERT IGNORE INTO parking_slots (id, hub_id, floor_level, slot_number, type, status, vehicle_type, is_ev_charging, base_price, current_dynamic_price) VALUES
(25, 8, 1, 'PC-F1-01', 'REGULAR', 'AVAILABLE', 'CAR', false, 120.0, 120.0),
(26, 8, 1, 'PC-F1-EV1', 'REGULAR', 'AVAILABLE', 'EV', true, 180.0, 180.0);

-- Seed slots for Times Square New York
INSERT IGNORE INTO parking_slots (id, hub_id, floor_level, slot_number, type, status, vehicle_type, is_ev_charging, base_price, current_dynamic_price) VALUES
(27, 9, 1, 'TS-F1-01', 'REGULAR', 'AVAILABLE', 'CAR', false, 150.0, 150.0),
(28, 9, 1, 'TS-F1-EV1', 'REGULAR', 'AVAILABLE', 'EV', true, 220.0, 220.0);

-- Seed slots for SF Wharf Station San Francisco
INSERT IGNORE INTO parking_slots (id, hub_id, floor_level, slot_number, type, status, vehicle_type, is_ev_charging, base_price, current_dynamic_price) VALUES
(29, 10, 1, 'SF-01', 'REGULAR', 'AVAILABLE', 'CAR', false, 100.0, 100.0),
(30, 10, 1, 'SF-BIKE1', 'REGULAR', 'AVAILABLE', 'BIKE', false, 40.0, 40.0);

-- Seed slots for Korutla Bus Stand
INSERT IGNORE INTO parking_slots (id, hub_id, floor_level, slot_number, type, status, vehicle_type, is_ev_charging, base_price, current_dynamic_price) VALUES
(31, 11, 1, 'KB-F1-01', 'REGULAR', 'AVAILABLE', 'CAR', false, 30.0, 30.0),
(32, 11, 1, 'KB-F1-02', 'REGULAR', 'AVAILABLE', 'CAR', false, 30.0, 30.0),
(33, 11, 1, 'KB-F1-EV1', 'REGULAR', 'AVAILABLE', 'EV', true, 50.0, 50.0),
(34, 11, 1, 'KB-F1-BIKE1', 'REGULAR', 'AVAILABLE', 'BIKE', false, 10.0, 10.0);

-- Seed slots for Korutla Shopping Complex
INSERT IGNORE INTO parking_slots (id, hub_id, floor_level, slot_number, type, status, vehicle_type, is_ev_charging, base_price, current_dynamic_price) VALUES
(35, 12, 1, 'KC-F1-01', 'REGULAR', 'AVAILABLE', 'CAR', false, 40.0, 40.0),
(36, 12, 1, 'KC-F1-02', 'REGULAR', 'AVAILABLE', 'CAR', false, 40.0, 40.0),
(37, 12, 1, 'KC-F1-EV1', 'REGULAR', 'AVAILABLE', 'EV', true, 60.0, 60.0),
(38, 12, 1, 'KC-F1-BIKE1', 'REGULAR', 'AVAILABLE', 'BIKE', false, 15.0, 15.0);

-- Seed slots for Korutla Metro Mart
INSERT IGNORE INTO parking_slots (id, hub_id, floor_level, slot_number, type, status, vehicle_type, is_ev_charging, base_price, current_dynamic_price) VALUES
(39, 13, 1, 'KM-F1-01', 'REGULAR', 'AVAILABLE', 'CAR', false, 40.0, 40.0),
(40, 13, 1, 'KM-F1-02', 'REGULAR', 'AVAILABLE', 'CAR', false, 40.0, 40.0),
(41, 13, 1, 'KM-F1-EV1', 'REGULAR', 'AVAILABLE', 'EV', true, 60.0, 60.0);

-- Seed slots for Korutla Smart Market Hub
INSERT IGNORE INTO parking_slots (id, hub_id, floor_level, slot_number, type, status, vehicle_type, is_ev_charging, base_price, current_dynamic_price) VALUES
(42, 14, 1, 'KS-01', 'REGULAR', 'AVAILABLE', 'CAR', false, 20.0, 20.0),
(43, 14, 1, 'KS-02', 'REGULAR', 'AVAILABLE', 'CAR', false, 20.0, 20.0),
(44, 14, 1, 'KS-BIKE1', 'REGULAR', 'AVAILABLE', 'BIKE', false, 10.0, 10.0);

