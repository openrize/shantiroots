import { categories, products } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    // Determine which page we are on
    const isShopPage = window.location.pathname.includes('shop.html');
    
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
                <div class="category-content">
                    <h3>${category.name}</h3>
                    <p>${category.description}</p>
                    <a href="/shop.html?category=${category.id}" class="btn btn-secondary" style="border-color: white; color: white; margin-top: 15px;">View Products</a>
                </div>
            `;
            categoryGrid.appendChild(card);
        });
    }

    if (featuredProductsGrid) {
        const featured = products.slice(0, 4);
        renderProducts(featured, featuredProductsGrid);
    }
}

function initShop() {
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
            window.history.pushState({path: newUrl}, '', newUrl);
        }
    });

    sortSelect.addEventListener('change', filterAndRenderProducts);

    function filterAndRenderProducts() {
        let filtered = currentCategory === 'all' 
            ? [...products] 
            : products.filter(p => p.category === currentCategory);

        // Sorting
        const sortBy = sortSelect.value;
        if (sortBy === 'price-low') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
            filtered.sort((a, b) => b.price - a.price);
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
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="btn btn-primary" style="margin-top: 15px; width: 100%;" onclick="addToCart(${product.id})">Add to Cart</button>
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

    document.querySelectorAll('.section-title, .category-card, .product-card').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

function initNewsletter() {
    const form = document.querySelector('.newsletter-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('input').value;
            alert(`Thank you for subscribing! A 10% discount code has been sent to ${email}.`);
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
    alert(`Added ${product.name} to cart!`);
};

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('shantiroots-cart') || '[]');
    const cartBtn = document.querySelector('button[aria-label="Cart"]');
    if (cartBtn) {
        cartBtn.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> ${cart.length > 0 ? `<span class="cart-badge">${cart.length}</span>` : ''}`;
    }
}
