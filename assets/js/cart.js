// Global cart state management
const CART_STORAGE_KEY = 'pk_luxury_wear_cart';

function getCart() {
    return JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
}

function saveCart(cart) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartBadge();
}

function addToCart(productId, quantity = 1, size = 'M') {
    const cart = getCart();
    const product = products.find(p => p.id === productId);
    
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId && item.size === size);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ ...product, quantity, size });
    }

    saveCart(cart);
}

function removeFromCart(productId, size) {
    const cart = getCart().filter(item => !(item.id === productId && item.size === size));
    saveCart(cart);
}

function updateQuantity(productId, size, quantity) {
    const cart = getCart();
    const item = cart.find(item => item.id === productId && item.size === size);
    if (item) {
        item.quantity = Math.max(1, quantity);
        saveCart(cart);
    }
}

function getCartCount() {
    return getCart().reduce((total, item) => total + item.quantity, 0);
}

function getCartSubtotal() {
    return getCart().reduce((total, item) => total + (item.price * item.quantity), 0);
}

function updateCartBadge() {
    const count = getCartCount();
    document.querySelectorAll('.badge.bg-gold').forEach(el => {
        el.textContent = count;
        el.style.display = count > 0 ? 'inline-block' : 'none';
    });
}

const ORDERS_STORAGE_KEY = 'pk_luxury_wear_orders';

function getOrders() {
    return JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY)) || [];
}

function placeOrder(formData) {
    const cart = getCart();
    const orderId = 'ORD' + Date.now();
    const order = {
        id: orderId,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        items: [...cart],
        total: getCartSubtotal(),
        customer: formData
    };

    const orders = getOrders();
    orders.unshift(order); // Newest first
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    
    // Clear cart
    localStorage.removeItem(CART_STORAGE_KEY);
    updateCartBadge();
    
    return order;
}

// Ensure the badge is correct on page load
document.addEventListener('DOMContentLoaded', updateCartBadge);
