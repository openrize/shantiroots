export const categories = [
    {
        id: 'wellness',
        name: 'Daily Wellness & Supplements',
        description: 'Herbal supplements for balance and vitality.',
        image: 'https://images.unsplash.com/photo-1611073113567-2821ac3316ca?q=80&w=1000'
    },
    {
        id: 'skincare',
        name: 'Skincare & Beauty',
        description: 'Natural remedies for radiant skin and hair.',
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000'
    },
    {
        id: 'relaxation',
        name: 'Relaxation & Stress Relief',
        description: 'Calming oils and salts for peace of mind.',
        image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1000'
    },
    {
        id: 'detox',
        name: 'Detox & Cleansing',
        description: 'Gentle cleansing for a renewed body.',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000'
    }
];

export const products = [
    {
        id: 1,
        name: 'Ashwagandha Capsules',
        category: 'wellness',
        price: 24.99,
        description: 'Premium organic Ashwagandha for stress management and energy.',
        benefits: ['Reduces stress', 'Improves sleep', 'Boosts energy'],
        ingredients: ['Organic Ashwagandha Root Extract', 'Vegetable Cellulose'],
        image: '/assets/products/ashwagandha.png'
    },
    {
        id: 2,
        name: 'Turmeric Glow Cream',
        category: 'skincare',
        price: 32.00,
        description: 'Brightening cream for a natural, healthy glow and even skin tone.',
        benefits: ['Brightens skin', 'Even tone', 'Moisturizes'],
        ingredients: ['Turmeric', 'Saffron', 'Sandalwood Oil', 'Vitamin E'],
        image: '/assets/products/face_cream.png'
    },
    {
        id: 3,
        name: 'Calming Herbal Tea',
        category: 'wellness',
        price: 15.00,
        description: 'A soothing caffeine-free blend for evening relaxation.',
        benefits: ['Sleep aid', 'Stress relief', 'Calming'],
        ingredients: ['Tulsi', 'Chamomile', 'Lemon Balm'],
        image: 'https://images.unsplash.com/photo-1594631252845-29fc458695d7?q=80&w=1000'
    },
    {
        id: 4,
        name: 'Stress Relief Oil',
        category: 'relaxation',
        price: 28.00,
        description: 'Grounding essential oil blend for meditation and focus.',
        benefits: ['Grounding', 'Mental clarity', 'Calming'],
        ingredients: ['Sandalwood Essential Oil', 'Jojoba Carrier Oil'],
        image: 'https://images.unsplash.com/photo-1605641151676-e9185e3a388f?q=80&w=1000'
    },
    {
        id: 5,
        name: 'Herbal Relaxation Tea',
        category: 'wellness',
        price: 15.00,
        description: 'A calming caffeine-free blend for evening relaxation.',
        benefits: ['Sleep aid', 'Stress relief', 'Calming'],
        ingredients: ['Tulsi', 'Chamomile', 'Lemon Balm'],
        image: 'https://images.unsplash.com/photo-1594631252845-29fc458695d7?q=80&w=1000'
    },
    {
        id: 6,
        name: 'Aloe & Neem Face Pack',
        category: 'skincare',
        price: 21.00,
        description: 'Deep cleansing and purifying mask for acne-prone skin.',
        benefits: ['Clears acne', 'Soothes skin', 'Purifies pores'],
        ingredients: ['Aloe Vera Extract', 'Neem Leaf Powder', 'Multani Mitti'],
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000'
    },
    {
        id: 7,
        name: 'Turmeric & Saffron Face Cream',
        category: 'skincare',
        price: 32.00,
        description: 'Brightening cream for a natural, healthy glow and even skin tone.',
        benefits: ['Brightens skin', 'Even tone', 'Moisturizes'],
        ingredients: ['Turmeric', 'Saffron', 'Sandalwood Oil', 'Vitamin E'],
        image: '/assets/products/face_cream.png'
    },
    {
        id: 8,
        name: 'Bhringraj Hair Oil',
        category: 'skincare',
        price: 26.50,
        description: 'Traditional hair oil for hair growth and scalp nourishment.',
        benefits: ['Hair growth', 'Scalp health', 'Prevents hair fall'],
        ingredients: ['Bhringraj Extract', 'Sesame Oil', 'Coconut Oil'],
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000'
    },
    {
        id: 9,
        name: 'Neem & Turmeric Soap',
        category: 'skincare',
        price: 9.99,
        description: 'Anti-bacterial soap for deep cleansing and skin protection.',
        benefits: ['Antibacterial', 'Deep cleaning', 'Skin health'],
        ingredients: ['Neem oil', 'Turmeric', 'Shea Butter'],
        image: 'https://images.unsplash.com/photo-1600857062241-98e5dba7f214?q=80&w=1000'
    },
    {
        id: 10,
        name: 'Meditation Oil - Sandalwood',
        category: 'relaxation',
        price: 28.00,
        description: 'Grounding essential oil blend for meditation and focus.',
        benefits: ['Grounding', 'Mental clarity', 'Calming'],
        ingredients: ['Sandalwood Essential Oil', 'Jojoba Carrier Oil'],
        image: 'https://images.unsplash.com/photo-1605641151676-e9185e3a388f?q=80&w=1000'
    },
    {
        id: 11,
        name: 'Himalayan Bath Salts',
        category: 'relaxation',
        price: 16.99,
        description: 'Mineral-rich salts infused with lavender for a detoxifying bath.',
        benefits: ['Muscle relaxation', 'Detoxifies', 'Skin softening'],
        ingredients: ['Pink Himalayan Salt', 'Lavender Essential Oil'],
        image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1000'
    },
    {
        id: 12,
        name: 'Herbal Eye Compress',
        category: 'relaxation',
        price: 14.50,
        description: 'Soothing eye pillow filled with flaxseeds and dried herbs.',
        benefits: ['Relieves eye strain', 'Promotes sleep', 'Cooling effect'],
        ingredients: ['Flaxseed', 'Dried Lavender', 'Dried Mint'],
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1000'
    },
    {
        id: 13,
        name: 'Digestive Churna',
        category: 'detox',
        price: 12.00,
        description: 'Traditional spice blend for effective post-meal digestion.',
        benefits: ['Improves digestion', 'Reduces bloating', 'Metabolism boost'],
        ingredients: ['Cumin', 'Fennel', 'Ginger', 'Black Salt'],
        image: 'https://images.unsplash.com/photo-1596515107367-7cb57c09f3ed?q=80&w=1000'
    },
    {
        id: 14,
        name: 'Herbal Detox Tea',
        category: 'detox',
        price: 15.00,
        description: 'Cleansing tea blend for internal purification and glow.',
        benefits: ['Liver detox', 'Blood purifier', 'Refreshing'],
        ingredients: ['Dandelion Root', 'Nettle Leaf', 'Peppermint'],
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000'
    },
    {
        id: 15,
        name: 'Panchakarma Support',
        category: 'detox',
        price: 35.00,
        description: 'Comprehensive supplement support for Ayurvedic detox protocols.',
        benefits: ['Deep cleanse', 'Systemic support', 'Vitality'],
        ingredients: ['Guggulu', 'Triphala', 'Turmeric'],
        image: 'https://images.unsplash.com/photo-1611073113567-2821ac3316ca?q=80&w=1000'
    }
];
