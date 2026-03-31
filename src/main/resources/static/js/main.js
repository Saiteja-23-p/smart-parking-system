// Session Management
function checkSession() {
    const user = JSON.parse(localStorage.getItem('user'));
    const admin = JSON.parse(localStorage.getItem('admin'));
    const navItems = document.getElementById('nav-items');

    if (!navItems) return;

    if (user) {
        navItems.innerHTML = `
            <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
            <li class="nav-item"><a class="nav-link" href="view-slots.html">Book Slot</a></li>
            <li class="nav-item"><a class="nav-link" href="history.html">My Bookings</a></li>
            <li class="nav-item"><a class="nav-link text-warning" href="#" onclick="logout()">Logout (${user.name})</a></li>
        `;
    } else if (admin) {
        navItems.innerHTML = `
            <li class="nav-item"><a class="nav-link" href="admin-dashboard.html">Dashboard</a></li>
            <li class="nav-item"><a class="nav-link text-warning" href="#" onclick="logout()">Logout (Admin)</a></li>
        `;
    }
}

function logout() {
    localStorage.clear();
    alert('Logged out successfully');
    window.location.href = 'index.html';
}

// Format Time
function formatTime(timeArray) {
    if (!timeArray) return '';
    const [h, m] = timeArray;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

// Run on load
document.addEventListener('DOMContentLoaded', checkSession);
