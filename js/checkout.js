import { products } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    renderCheckout();
    updateCartBadge();
});

function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('shantiroots-cart') || '[]');
    const cartBtn = document.querySelector('button[aria-label="Cart"]');
    if (cartBtn && cart.length > 0) {
        cartBtn.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> <span class="cart-badge">${cart.length}</span>`;
    }
}

function renderCheckout() {
    const container = document.getElementById('checkout-content');
    let cart = JSON.parse(localStorage.getItem('shantiroots-cart') || '[]');

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <i class="fa-solid fa-cart-shopping"></i>
                <p>Your cart is empty.</p>
                <a href="/shop.html" class="btn btn-primary">Continue Shopping</a>
            </div>
        `;
        return;
    }

    // Aggregate quantities
    const itemMap = {};
    cart.forEach(item => {
        if (itemMap[item.id]) {
            itemMap[item.id].qty++;
        } else {
            itemMap[item.id] = { ...item, qty: 1 };
        }
    });
    const cartItems = Object.values(itemMap);

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
    const shipping = subtotal > 75 ? 0 : 9.99;
    const total = subtotal + shipping;

    container.innerHTML = `
        <h1 class="section-title" style="text-align:left; margin-bottom:10px;">Your Cart</h1>
        <div class="checkout-wrapper">
            <div class="checkout-left">
                <!-- Cart Items -->
                <ul class="cart-items-list" id="cart-items-list">
                    ${cartItems.map(item => `
                        <li class="cart-item" data-id="${item.id}">
                            <img src="${item.image}" alt="${item.name}">
                            <div class="cart-item-details">
                                <p class="cart-item-name">${item.name}</p>
                                <p class="cart-item-price">$${item.price.toFixed(2)} × ${item.qty}</p>
                            </div>
                            <span style="font-weight:700; margin-right:10px;">$${(item.price * item.qty).toFixed(2)}</span>
                            <button class="cart-item-remove" onclick="removeFromCart(${item.id})" title="Remove item">
                                <i class="fa-solid fa-xmark"></i>
                            </button>
                        </li>
                    `).join('')}
                </ul>

                <div style="margin-top:40px;">
                    <a href="/shop.html" style="color:var(--color-primary); font-weight:600;">
                        <i class="fa-solid fa-arrow-left" style="margin-right:6px;"></i> Continue Shopping
                    </a>
                </div>

                <!-- Shipping Form -->
                <div class="checkout-form" style="margin-top:50px;">
                    <h2>Shipping Information</h2>
                    <form id="checkout-form">
                        <div class="form-grid">
                            <div class="form-group">
                                <label for="first-name">First Name</label>
                                <input type="text" id="first-name" name="first_name" placeholder="Jane" required>
                            </div>
                            <div class="form-group">
                                <label for="last-name">Last Name</label>
                                <input type="text" id="last-name" name="last_name" placeholder="Doe" required>
                            </div>
                            <div class="form-group full-width">
                                <label for="email">Email Address</label>
                                <input type="email" id="email" name="email" placeholder="jane@example.com" required>
                            </div>
                            <div class="form-group full-width">
                                <label for="phone">Phone Number</label>
                                <input type="tel" id="phone" name="phone" placeholder="224-377-9043">
                            </div>
                            <div class="form-group full-width">
                                <label for="address">Street Address</label>
                                <input type="text" id="address" name="address" placeholder="123 Main St" required>
                            </div>
                            <div class="form-group">
                                <label for="city">City</label>
                                <input type="text" id="city" name="city" placeholder="Chicago" required>
                            </div>
                            <div class="form-group">
                                <label for="state">State</label>
                                <input type="text" id="state" name="state" placeholder="IL" required>
                            </div>
                            <div class="form-group">
                                <label for="zip">ZIP Code</label>
                                <input type="text" id="zip" name="zip" placeholder="60601" required>
                            </div>
                            <div class="form-group">
                                <label for="country">Country</label>
                                <select id="country" name="country">
                                    <option value="US" selected>United States</option>
                                    <option value="CA">Canada</option>
                                    <option value="IN">India</option>
                                    <option value="GB">United Kingdom</option>
                                    <option value="AU">Australia</option>
                                </select>
                            </div>
                        </div>

                        <h2 style="margin-top:40px;">Payment Details</h2>
                        <div class="form-grid">
                            <div class="form-group full-width">
                                <label for="card-name">Name on Card</label>
                                <input type="text" id="card-name" name="card_name" placeholder="Jane Doe" required>
                            </div>
                            <div class="form-group full-width">
                                <label for="card-number">Card Number</label>
                                <input type="text" id="card-number" name="card_number" placeholder="•••• •••• •••• ••••" maxlength="19" required>
                            </div>
                            <div class="form-group">
                                <label for="expiry">Expiry Date</label>
                                <input type="text" id="expiry" name="expiry" placeholder="MM / YY" maxlength="7" required>
                            </div>
                            <div class="form-group">
                                <label for="cvv">CVV</label>
                                <input type="password" id="cvv" name="cvv" placeholder="•••" maxlength="4" required>
                            </div>
                        </div>

                        <button type="submit" class="btn btn-primary" style="width:100%; margin-top:30px; padding:18px; font-size:1rem; letter-spacing:0.05em;">
                            <i class="fa-solid fa-lock" style="margin-right:8px;"></i>Place Order — $${total.toFixed(2)}
                        </button>
                        <p style="text-align:center; font-size:0.8rem; color:var(--color-text-muted); margin-top:12px;">
                            <i class="fa-solid fa-shield-halved" style="margin-right:4px;"></i>Your payment info is secure &amp; encrypted.
                        </p>
                    </form>
                </div>
            </div>

            <!-- Order Summary Sidebar -->
            <aside class="order-summary">
                <h3>Order Summary</h3>
                ${cartItems.map(item => `
                    <div class="summary-row">
                        <span>${item.name} × ${item.qty}</span>
                        <span>$${(item.price * item.qty).toFixed(2)}</span>
                    </div>
                `).join('')}
                <div class="summary-row" style="border-top:1px solid #ddd; padding-top:15px; margin-top:10px;">
                    <span>Subtotal</span>
                    <span>$${subtotal.toFixed(2)}</span>
                </div>
                <div class="summary-row">
                    <span>Shipping</span>
                    <span>${shipping === 0 ? '<span style="color:green;">FREE</span>' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div class="summary-row total">
                    <span>Total</span>
                    <span>$${total.toFixed(2)}</span>
                </div>
                ${subtotal < 75 ? `<p style="font-size:0.8rem; color:var(--color-text-muted); margin-top:15px; text-align:center;">Add $${(75 - subtotal).toFixed(2)} more for FREE shipping!</p>` : ''}
            </aside>
        </div>
    `;

    // Form submit handler
    document.getElementById('checkout-form').addEventListener('submit', (e) => {
        e.preventDefault();
        localStorage.removeItem('shantiroots-cart');
        container.innerHTML = `
            <div class="empty-cart" style="padding:100px 20px;">
                <i class="fa-solid fa-circle-check" style="color:var(--color-primary); font-size:5rem; margin-bottom:20px; display:block;"></i>
                <h2 style="font-family:var(--font-heading); color:var(--color-primary); margin-bottom:15px;">Thank You for Your Order!</h2>
                <p style="color:var(--color-text-muted); margin-bottom:30px; font-size:1.1rem;">Your Ayurvedic wellness package is on its way. We'll send a confirmation to your email shortly.</p>
                <a href="/shop.html" class="btn btn-primary">Continue Shopping</a>
            </div>
        `;
    });
}

// Global remove from cart
window.removeFromCart = (id) => {
    let cart = JSON.parse(localStorage.getItem('shantiroots-cart') || '[]');
    const idx = cart.findIndex(item => item.id === id);
    if (idx !== -1) cart.splice(idx, 1);
    localStorage.setItem('shantiroots-cart', JSON.stringify(cart));
    renderCheckout();
    updateCartBadge();
};
