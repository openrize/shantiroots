import { categories, products } from './data.js';
import { SITE } from './config.js';

const { contact } = SITE;

document.addEventListener('DOMContentLoaded', () => {
    // Determine which page we are on
    const pathname = window.location.pathname.toLowerCase();
    const isShopPage = pathname.endsWith('/shop') || pathname.endsWith('/shop.html');
    
    if (isShopPage) {
        initShop();
    } else {
        initHome();
    }
    
    initScrollAnimations();
    initNewsletter();
    updateCartCount();
});

function initHome() {
    const categoryGrid = document.querySelector('.category-grid');
    const featuredProductsGrid = document.querySelector('#featured-products');

    if (categoryGrid) {
        categories.forEach(category => {
            const card = document.createElement('div');
            card.className = 'category-card';
            card.innerHTML = `
                <img src="${category.image}" alt="${category.name}">
                <h3>${category.name}</h3>
                <span class="category-card-cue">View collection</span>
                <a href="/shop.html?category=${category.id}" class="stretched-link" aria-label="View ${category.name}"></a>
            `;
            // Add custom style for stretched link if not in CSS
            card.style.position = 'relative';
            categoryGrid.appendChild(card);
        });
    }

    if (featuredProductsGrid) {
        const featured = products.slice(0, 4);
        renderProducts(featured, featuredProductsGrid);
    }
}

function initShop() {
    const introMount = document.getElementById('shop-intro-mount');
    if (introMount) {
        introMount.innerHTML = `
            <p class="shop-intro-lead">Browse our Ayurvedic formulas and wellness essentials. Product pricing is shared on request—we confirm details with you before any commitment.</p>
            <p class="shop-intro-contact">
                <span class="shop-intro-label">Sales &amp; support</span>
                <a href="tel:${contact.phoneTel}">${contact.phoneDisplay}</a>
                <span class="contact-sep" aria-hidden="true">·</span>
                <a href="mailto:${contact.email}">${contact.email}</a>
            </p>
        `;
    }

    const categoryFiltersList = document.querySelector('#category-filters');
    const shopGrid = document.querySelector('#shop-grid');
    const shopTitle = document.querySelector('#shop-title');
    const sortSelect = document.querySelector('#sort');

    // Inject categories into sidebar
    categories.forEach(category => {
        const li = document.createElement('li');
        li.innerHTML = `<button class="filter-btn" data-category="${category.id}">${category.name}</button>`;
        categoryFiltersList.appendChild(li);
    });

    // Check for category in URL
    const urlParams = new URLSearchParams(window.location.search);
    let currentCategory = urlParams.get('category') || 'all';

    // Set initial active filter
    setActiveFilter(currentCategory);

    // Initial render
    filterAndRenderProducts();

    // Event listeners
    categoryFiltersList.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-btn')) {
            currentCategory = e.target.dataset.category;
            setActiveFilter(currentCategory);
            filterAndRenderProducts();
            
            // Update URL without reload
            const newUrl = currentCategory === 'all' ? '/shop.html' : `/shop.html?category=${currentCategory}`;
            window.history.pushState({ path: newUrl }, '', newUrl);
        }
    });

    sortSelect.addEventListener('change', filterAndRenderProducts);

    function filterAndRenderProducts() {
        let filtered = currentCategory === 'all' 
            ? [...products] 
            : products.filter(p => p.category === currentCategory);

        // Sorting
        const sortBy = sortSelect.value;
        if (sortBy === 'name-az') {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === 'name-za') {
            filtered.sort((a, b) => b.name.localeCompare(a.name));
        }

        renderProducts(filtered, shopGrid);
        
        // Update Title
        if (currentCategory === 'all') {
            shopTitle.textContent = 'All Products';
        } else {
            const cat = categories.find(c => c.id === currentCategory);
            shopTitle.textContent = cat ? cat.name : 'Products';
        }
    }

    function setActiveFilter(catId) {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === catId);
        });
    }
}

function renderProducts(productList, container) {
    if (!container) return;
    container.innerHTML = '';
    
    if (productList.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 50px;">No products found in this category.</p>';
        return;
    }

    productList.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-img">
                <img src="${product.image}" alt="${product.name}" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-contact-block">
                    <p class="product-pricing-label">Pricing by inquiry</p>
                    <p class="product-pricing-copy">Request a quote—we’ll follow up with next steps.</p>
                    <div class="product-contact-links">
                        <a href="tel:${contact.phoneTel}" class="contact-link">${contact.phoneDisplay}</a>
                        <span class="contact-sep" aria-hidden="true">·</span>
                        <a href="mailto:${contact.email}" class="contact-link">${contact.email}</a>
                    </div>
                </div>
                <button type="button" class="btn btn-primary btn-block" onclick="addToCart(${product.id})" aria-label="Add ${product.name} to inquiry list">Add to inquiry list</button>
            </div>
        `;
        container.appendChild(card);
    });
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section-title, .category-card, .product-card, .blog-card').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

function initNewsletter() {
    const form = document.querySelector('.newsletter-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Thank you for subscribing. We’ll be in touch with wellness tips and offers.', 'success');
            form.reset();
        });
    }
}

// Global functions
window.addToCart = (id) => {
    let cart = JSON.parse(localStorage.getItem('shantiroots-cart') || '[]');
    const product = products.find(p => p.id === id);
    cart.push(product);
    localStorage.setItem('shantiroots-cart', JSON.stringify(cart));
    updateCartCount();
    showToast(`Added ${product.name} to your inquiry list.`);
};

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('shantiroots-cart') || '[]');
    const cartBtn = document.querySelector('button[aria-label="Cart"]');
    if (cartBtn) {
        cartBtn.innerHTML = `<i class="fa-solid fa-cart-shopping"></i>${cart.length > 0 ? ` <span class="cart-badge">${cart.length}</span>` : ''}`;
        cartBtn.style.cursor = 'pointer';
        cartBtn.onclick = () => { window.location.href = '/checkout.html'; };
    }
}
