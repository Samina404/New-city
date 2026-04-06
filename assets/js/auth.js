const AUTH_STORAGE_KEY = 'pk_luxury_wear_auth';
const LOGGED_IN_USER_KEY = 'pk_luxury_wear_logged_in';

function getAuthUsers() {
    return JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY)) || [];
}

function getLoggedInUser() {
    return JSON.parse(localStorage.getItem(LOGGED_IN_USER_KEY)) || null;
}

function isLoggedIn() {
    return getLoggedInUser() !== null;
}

function registerUser(userData) {
    const users = getAuthUsers();
    if (users.find(u => u.email === userData.email)) {
        return { success: false, message: 'Email already exists' };
    }
    users.push(userData);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(users));
    return { success: true };
}

function loginUser(email, password) {
    const users = getAuthUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(user));
        return { success: true };
    }
    return { success: false, message: 'Invalid email or password' };
}

function logoutUser() {
    localStorage.removeItem(LOGGED_IN_USER_KEY);
    location.href = 'home.html';
}

function handleProfileClick(event) {
    if (event) event.preventDefault();
    if (isLoggedIn()) {
        location.href = 'my-orders.html';
    } else {
        location.href = 'login.html';
    }
}

