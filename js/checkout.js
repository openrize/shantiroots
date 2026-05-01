import { SITE } from './config.js';

const { contact } = SITE;

document.addEventListener('DOMContentLoaded', () => {
    renderCheckout();
    updateCartBadge();
});

function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('shantiroots-cart') || '[]');
    const cartBtn = document.querySelector('button[aria-label="Cart"]');
    if (!cartBtn) return;
    cartBtn.innerHTML = `<i class="fa-solid fa-cart-shopping"></i>${cart.length > 0 ? ` <span class="cart-badge">${cart.length}</span>` : ''}`;
    cartBtn.style.cursor = 'pointer';
    cartBtn.onclick = () => { window.location.href = '/checkout.html'; };
}

function renderCheckout() {
    const container = document.getElementById('checkout-content');
    let cart = JSON.parse(localStorage.getItem('shantiroots-cart') || '[]');

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <i class="fa-solid fa-clipboard-list" aria-hidden="true"></i>
                <p>Your inquiry list is empty.</p>
                <p class="empty-cart-hint">Add products from the shop to request a quote.</p>
                <a href="/shop.html" class="btn btn-primary">Browse products</a>
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

    container.innerHTML = `
        <header class="checkout-page-header">
            <h1 class="section-title checkout-title">Order inquiry</h1>
            <p class="checkout-lead">Review your selections and share where to reach you. We’ll confirm pricing, shipping, and payment options before anything is finalized—no card details are collected on this form.</p>
            <div class="inquiry-callout" role="note">
                <p><strong>Questions?</strong> Call <a href="tel:${contact.phoneTel}">${contact.phoneDisplay}</a> or email <a href="mailto:${contact.email}">${contact.email}</a>.</p>
            </div>
        </header>
        <div class="checkout-wrapper">
            <div class="checkout-left">
                <!-- Cart Items -->
                <ul class="cart-items-list" id="cart-items-list">
                    ${cartItems.map(item => `
                        <li class="cart-item" data-id="${item.id}">
                            <img src="${item.image}" alt="${item.name}">
                            <div class="cart-item-details">
                                <p class="cart-item-name">${item.name}</p>
                                <p class="cart-item-meta">Qty ${item.qty} · Quote on request</p>
                            </div>
                            <button type="button" class="cart-item-remove" onclick="removeFromCart(${item.id})" title="Remove item" aria-label="Remove ${item.name} from list">
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
                    <h2>Contact &amp; shipping</h2>
                    <p class="form-section-hint">We use this information to prepare your quote and shipping estimate.</p>
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
                                <input type="tel" id="phone" name="phone" placeholder="${contact.phoneDisplay}">
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

                        <h2 style="margin-top:40px;">Notes</h2>
                        <div class="form-grid">
                            <div class="form-group full-width">
                                <label for="order-notes">Order notes <span class="label-optional">(optional)</span></label>
                                <textarea id="order-notes" name="order_notes" rows="4" placeholder="Timing, product questions, or special requests…"></textarea>
                            </div>
                        </div>

                        <button type="submit" class="btn btn-primary checkout-submit">
                            <i class="fa-solid fa-paper-plane" style="margin-right:8px;" aria-hidden="true"></i>Submit order inquiry
                        </button>
                        <p class="checkout-footnote">
                            A team member will respond with pricing and payment options. This demo does not process or store payment data.
                        </p>
                    </form>
                </div>
            </div>

            <!-- Order Summary Sidebar -->
            <aside class="order-summary">
                <h3>Inquiry summary</h3>
                <p class="order-summary-intro">Line items for your quote. Totals are issued after we confirm details with you.</p>
                ${cartItems.map(item => `
                    <div class="summary-row">
                        <span>${item.name} × ${item.qty}</span>
                        <span class="summary-note">Quote</span>
                    </div>
                `).join('')}
                <div class="summary-row summary-divider">
                    <span>Estimates</span>
                    <span class="summary-note">On request</span>
                </div>
                <div class="summary-row">
                    <span>Phone</span>
                    <span><a href="tel:${contact.phoneTel}">${contact.phoneDisplay}</a></span>
                </div>
                <div class="summary-row total">
                    <span>Email</span>
                    <span><a href="mailto:${contact.email}">${contact.email}</a></span>
                </div>
            </aside>
        </div>
    `;

    // Form submit handler
    document.getElementById('checkout-form').addEventListener('submit', (e) => {
        e.preventDefault();
        localStorage.removeItem('shantiroots-cart');
        container.innerHTML = `
            <div class="empty-cart checkout-success">
                <i class="fa-solid fa-circle-check checkout-success-icon" aria-hidden="true"></i>
                <h2 class="checkout-success-title">Inquiry received</h2>
                <p class="checkout-success-copy">Thank you. We’ve captured your request and will follow up shortly with pricing and next steps.</p>
                <a href="/shop.html" class="btn btn-primary">Back to shop</a>
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
