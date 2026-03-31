# Smart Parking Slot Booking System

A complete Java Full Stack application to find, book, and manage parking slots in real time.

## Tech Stack
- **Backend**: Java, Spring Boot, Spring Data JPA, MySQL, Spring Security
- **Frontend**: HTML5, CSS3 (Premium Design), JavaScript, Bootstrap 5
- **Database**: MySQL 8.0+
- **Build Tool**: Maven

## Features
- **User Module**: Registration, Login, Real-time Slot Viewing, Booking, History, Cancellation.
- **Admin Module**: Dashboard, Add Locations, Add Slots, View All Bookings.
- **Visual Cues**: Green slots for available, Red for booked.

## Prerequisites
- Java 17+
- MySQL Server
- Maven

## Getting Started

### 1. Database Setup
1. Create a database named `smart_parking_db` in MySQL.
2. The application is configured to use:
   - **URL**: `jdbc:mysql://localhost:3306/smart_parking_db`
   - **Username**: `root`
   - **Password**: `password` (Update in `src/main/resources/application.properties` if different)
3. You can use the provided `schema.sql` and `data.sql` to initialize the database manually, or let Hibernate create it automatically on first run.

### 2. Run the Backend
1. Open a terminal in the project root.
2. Run: `mvn spring-boot:run`
3. The server will start on `http://localhost:8080`.

### 3. Access the Frontend
- Open `src/main/resources/static/index.html` in your browser.
- Or visit `http://localhost:8080` (Static files are served automatically).

## Sample Credentials
- **User**: `john@example.com` / `password123`
- **Admin**: `admin` / `admin123`

## Project Structure
- `src/main/java/com/smartparking`: Backend logic (Entities, Repositories, Services, Controllers).
- `src/main/resources/static`: Frontend assets (HTML, CSS, JS).
- `schema.sql`: Database schema definition.
- `data.sql`: Seed data.
