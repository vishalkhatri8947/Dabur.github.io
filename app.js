// Global variables
let currentSlide = 0;
let autoSlideInterval;
let assistantOpen = false;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Dabur Nutri Mix website initializing...');
    initializeWebsite();
});

function initializeWebsite() {
    // Initialize all components
    setupNavigation();
    initializeCarousel();
    setupScrollEffects();
    initializeBenefits();
    initializeRecipeFilters();
    setupAssistant();
    initializeFloatingActions();
    initializeProductButtons();
    initializeNutritionCalculator();
    console.log('Dabur Nutri Mix website ready!');
}

// Navigation Functions
function setupNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Close mobile menu
            if (navMenu) navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
        });
    });

    // Update nav on scroll
    window.addEventListener('scroll', debounce(updateActiveNav, 100));
}

function scrollToSection(sectionId) {
    console.log('Scrolling to section:', sectionId);
    const section = document.getElementById(sectionId);
    if (section) {
        const navHeight = 80;
        const targetPosition = section.offsetTop - navHeight;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        console.log('Scrolled to:', sectionId);
    } else {
        console.warn('Section not found:', sectionId);
    }
}

function updateActiveNav() {
    const scrollPosition = window.pageYOffset + 120;
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Hero Carousel Functions
function initializeCarousel() {
    const carouselTrack = document.getElementById('carouselTrack');
    const dots = document.querySelectorAll('.dot');
    const slides = document.querySelectorAll('.carousel-slide');

    if (!carouselTrack || !dots.length) return;

    // Handle missing product images gracefully
    const productImages = document.querySelectorAll('.product-image-main, .product-image-card');
    productImages.forEach(img => {
        img.addEventListener('error', function() {
            // Create fallback placeholder if image fails to load
            this.style.display = 'none';
            const placeholder = createProductPlaceholder(this.alt);
            this.parentNode.appendChild(placeholder);
        });
    });

    // Set up dot click handlers
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });

    // Start auto-rotation
    startAutoSlide();

    // Pause on hover
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoSlide);
        carouselContainer.addEventListener('mouseleave', startAutoSlide);
    }

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    carouselContainer.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    carouselContainer.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left - next slide
            const nextSlide = (currentSlide + 1) % 3;
            goToSlide(nextSlide);
        }
        if (touchEndX > touchStartX + 50) {
            // Swipe right - previous slide
            const prevSlide = (currentSlide - 1 + 3) % 3;
            goToSlide(prevSlide);
        }
    }
}

// Create placeholder for missing product images
function createProductPlaceholder(altText) {
    const placeholder = document.createElement('div');
    placeholder.className = 'product-placeholder';
    placeholder.style.cssText = `
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, var(--dabur-bright-green), var(--dabur-light-green));
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        text-align: center;
        padding: 20px;
        box-sizing: border-box;
    `;
    
    // Extract product type from alt text
    let productIcon = '📦';
    let productText = 'Dabur Nutri Mix';
    
    if (altText.includes('Jar')) {
        productIcon = '🏺';
        productText = 'Traditional Recipe\nJar 300g';
    } else if (altText.includes('Box')) {
        productIcon = '📦';
        productText = 'Premium Dry Fruits\n& Seeds 200g';
    } else if (altText.includes('Pouch')) {
        productIcon = '📦';
        productText = 'Natural Wellness\nBlend 150g';
    }
    
    placeholder.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 10px;">${productIcon}</div>
        <div style="font-size: 12px; line-height: 1.3; white-space: pre-line;">${productText}</div>
    `;
    
    return placeholder;
}

function goToSlide(slideIndex) {
    const carouselTrack = document.getElementById('carouselTrack');
    const dots = document.querySelectorAll('.dot');
    const slides = document.querySelectorAll('.carousel-slide');

    if (!carouselTrack || !slides.length) return;

    currentSlide = slideIndex;

    // Move carousel
    const slideWidth = 100;
    carouselTrack.style.transform = `translateX(-${slideIndex * slideWidth}%)`;

    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === slideIndex);
    });

    // Update slides
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === slideIndex);
    });
}

function startAutoSlide() {
    stopAutoSlide();
    autoSlideInterval = setInterval(() => {
        const nextSlide = (currentSlide + 1) % 3;
        goToSlide(nextSlide);
    }, 4000);
}

function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
    }
}

// Global scroll functions for buttons
function scrollToProducts() {
    console.log('Scrolling to products section');
    scrollToSection('products');
}

function scrollToBuy() {
    console.log('Scrolling to buy section');
    scrollToSection('buy');
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Initialize Product Buttons
function initializeProductButtons() {
    // Setup Learn More buttons for product cards
    const productBtns = document.querySelectorAll('.btn-product');
    productBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productId = productCard?.getAttribute('data-product');
            if (productId) {
                showProductDetails(productId);
            }
        });
    });
    console.log('Product buttons initialized');
}

// Product Details Function
function showProductDetails(productId) {
    console.log('Showing product details for:', productId);
    
    const productInfo = {
        jar: {
            title: 'Dabur Nutri Mix Traditional Recipe Jar',
            description: 'Premium Ayurvedic dry fruits powder made with time-tested traditional recipes. Perfect for families who value authentic Ayurvedic nutrition with the convenience of modern packaging.',
            features: [
                '300g family pack for longer lasting nutrition',
                'Traditional Ayurvedic recipe passed down through generations', 
                'Rich source of natural protein and healthy fats',
                'Perfect spreading consistency for breads and rotis',
                '100% natural with no artificial preservatives',
                'Glass jar ensures freshness and purity'
            ],
            usage: [
                'Spread on bread, roti, or parathas for nutritious meals',
                'Mix 2-3 spoons in warm milk for a protein-rich drink',
                'Add to traditional Indian desserts and sweets',
                'Use in Ayurvedic recipes and wellness preparations'
            ]
        },
        box: {
            title: 'Dabur Nutri Mix Premium Dry Fruits & Seeds',
            description: 'Advanced formulation designed for mixing with milk and smoothies. High protein content and instant mixing formula make it perfect for active lifestyles and health-conscious families.',
            features: [
                'Instant mixing formula - no lumps or residue',
                '12g high-quality protein per serving',
                '200g convenient box packaging',
                'Rich in essential vitamins and minerals',
                'Perfect for protein shakes and smoothies',
                'Natural & Pure certification'
            ],
            usage: [
                'Mix 2-3 tablespoons with 200ml milk for protein drink',
                'Add to smoothies and health shakes',
                'Blend with yogurt for nutritious snacks', 
                'Perfect for post-workout nutrition'
            ]
        },
        pouch: {
            title: 'Dabur Nutri Mix 100% Natural Wellness Blend',
            description: 'Convenient pouch format with 100% natural dry fruits blend. Specially formulated using Ayurvedic principles for daily wellness and maintaining optimal health naturally.',
            features: [
                '100% natural dry fruits blend with no additives',
                'Ayurvedic wellness formulation',
                'Convenient 150g travel-friendly pouch',
                'Special introductory price of ₹199',
                'Easy to store and maintain freshness',
                'Perfect portion size for individual use'
            ],
            usage: [
                'Daily wellness supplement with milk or water',
                'Travel-friendly nutrition on the go',
                'Mix with warm milk before bedtime for better sleep',
                'Add to morning routine for sustained energy'
            ]
        }
    };

    const product = productInfo[productId];
    if (product) {
        showProductModal(product);
    }
}

function showProductModal(product) {
    // Create modal HTML
    const modalHTML = `
        <div class="product-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${product.title}</h3>
                    <button class="modal-close" onclick="closeProductModal()">×</button>
                </div>
                <div class="modal-body">
                    <p class="product-description">${product.description}</p>
                    
                    <div class="product-section">
                        <h4>Key Benefits & Features</h4>
                        <ul class="product-list">
                            ${product.features.map(feature => `<li>✓ ${feature}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="product-section">
                        <h4>How to Use</h4>
                        <ul class="product-list">
                            ${product.usage.map(usage => `<li>• ${usage}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="modal-actions">
                        <button class="btn-primary" onclick="scrollToBuy(); closeProductModal();">Buy Now</button>
                        <button class="btn-secondary" onclick="closeProductModal();">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Close modal when clicking outside
    const modal = document.querySelector('.product-modal');
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeProductModal();
        }
    });
}

function closeProductModal() {
    const modal = document.querySelector('.product-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}

// Nutrition Calculator
function initializeNutritionCalculator() {
    console.log('Nutrition calculator initialized');
}

function calculateNutrition() {
    const age = document.getElementById('age').value;
    const activity = document.getElementById('activity').value;
    const goal = document.getElementById('goal').value;
    
    if (!age || !activity || !goal) {
        alert('Please fill in all fields to get your personalized recommendation.');
        return;
    }
    
    const calculatorResult = document.getElementById('calculatorResult');
    const recommendations = document.getElementById('nutritionRecommendations');
    
    // Calculate recommendations based on inputs
    let dailyServing = '2-3 tablespoons';
    let frequency = 'Once daily';
    let bestTime = 'Morning';
    let productRecommendation = 'Traditional Recipe Jar';
    
    // Adjust based on age
    if (age === 'child') {
        dailyServing = '1-2 tablespoons';
        frequency = 'Once daily';
        bestTime = 'After school';
        productRecommendation = 'Premium Box (easier to mix)';
    } else if (age === 'teen') {
        dailyServing = '2-3 tablespoons';
        frequency = 'Twice daily';
        bestTime = 'Morning & Evening';
        productRecommendation = 'Premium Box (high protein)';
    } else if (age === 'senior') {
        dailyServing = '1-2 tablespoons';
        frequency = 'Once daily';
        bestTime = 'Morning with warm milk';
        productRecommendation = 'Wellness Blend (easy digestion)';
    }
    
    // Adjust based on activity level
    if (activity === 'high') {
        dailyServing = '3-4 tablespoons';
        frequency = 'Twice daily';
    } else if (activity === 'low') {
        dailyServing = '1-2 tablespoons';
    }
    
    // Adjust based on goal
    if (goal === 'energy') {
        bestTime = 'Morning';
        frequency = 'Daily';
    } else if (goal === 'weight') {
        frequency = 'Twice daily';
        bestTime = 'Morning & Evening';
    } else if (goal === 'immunity') {
        bestTime = 'Before meals';
        productRecommendation = 'Traditional Recipe Jar (Ayurvedic formula)';
    }
    
    recommendations.innerHTML = `
        <div class="recommendation-item">
            <h5>Daily Serving</h5>
            <div class="recommendation-value">${dailyServing}</div>
        </div>
        <div class="recommendation-item">
            <h5>Frequency</h5>
            <div class="recommendation-value">${frequency}</div>
        </div>
        <div class="recommendation-item">
            <h5>Best Time</h5>
            <div class="recommendation-value">${bestTime}</div>
        </div>
        <div class="recommendation-item">
            <h5>Recommended Product</h5>
            <div class="recommendation-value">${productRecommendation}</div>
        </div>
    `;
    
    calculatorResult.classList.remove('hidden');
    calculatorResult.scrollIntoView({ behavior: 'smooth' });
}

// Benefits Toggle Function
function toggleBenefit(card) {
    const detail = card.querySelector('.benefit-detail');
    const toggle = card.querySelector('.benefit-toggle');
    
    if (detail.classList.contains('hidden')) {
        detail.classList.remove('hidden');
        toggle.textContent = 'Show Less';
    } else {
        detail.classList.add('hidden');
        toggle.textContent = 'Learn More';
    }
}

function initializeBenefits() {
    console.log('Benefits section initialized');
}

// Recipe Filters
function initializeRecipeFilters() {
    console.log('Recipe filters initialized');
}

function filterRecipes(category) {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const recipeCategories = document.querySelectorAll('.recipe-category');
    
    // Update active filter button
    filterBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Show/hide recipe categories
    recipeCategories.forEach(categoryDiv => {
        const categoryType = categoryDiv.getAttribute('data-category');
        if (category === 'all' || categoryType === category) {
            categoryDiv.style.display = 'block';
        } else {
            categoryDiv.style.display = 'none';
        }
    });
}

// Availability Checker
function checkAvailability() {
    const pincodeInput = document.getElementById('pincodeInput');
    const pincode = pincodeInput.value.trim();
    
    if (!pincode) {
        alert('Please enter your pincode');
        return;
    }
    
    if (pincode.length !== 6 || isNaN(pincode)) {
        alert('Please enter a valid 6-digit pincode');
        return;
    }
    
    const availabilityResult = document.getElementById('availabilityResult');
    const resultHTML = `
        <h4>Great news! 🎉</h4>
        <p>Dabur Nutri Mix is available in your area (${pincode}). You can order from:</p>
        <ul style="text-align: left; margin: 16px 0;">
            <li>⚡ <strong>Quick Delivery:</strong> Blinkit, Zepto, Swiggy Instamart</li>
            <li>🛍️ <strong>E-commerce:</strong> BigBasket, Amazon, Flipkart</li>
            <li>🏥 <strong>Pharmacies:</strong> Apollo, MedPlus, 1mg</li>
        </ul>
        <p><strong>Special Offer:</strong> Get 15% off on your first order! 🎊</p>
    `;
    
    availabilityResult.innerHTML = resultHTML;
    availabilityResult.classList.remove('hidden');
    availabilityResult.scrollIntoView({ behavior: 'smooth' });
}

// Platform fallback functions
function fallbackToBlinkit() {
    window.open('https://blinkit.com/search?q=dabur%20nutri%20mix', '_blank');
}

function fallbackToZepto() {
    window.open('https://www.zepto.co.in/search?query=dabur%20nutri%20mix', '_blank');
}

function fallbackToInstamart() {
    window.open('https://www.swiggy.com/instamart/search?query=dabur%20nutri%20mix', '_blank');
}

function fallbackToBigBasket() {
    window.open('https://www.bigbasket.com/ps/?q=dabur%20nutri%20mix', '_blank');
}

// Nutrition Assistant / Chatbot
function setupAssistant() {
    console.log('Nutrition assistant initialized');
}

function toggleAssistant() {
    assistantOpen = !assistantOpen;
    const assistantChat = document.querySelector('.assistant-chat');
    
    if (assistantOpen) {
        assistantChat.classList.remove('hidden');
    } else {
        assistantChat.classList.add('hidden');
    }
}

function sendChatMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();
    
    if (!message) return;
    
    // Add user message
    addChatMessage(message, 'user');
    chatInput.value = '';
    
    // Generate and add bot response
    setTimeout(() => {
        const response = generateBotResponse(message);
        addChatMessage(response, 'bot');
    }, 1000);
}

// Handle Enter key in chat input
document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });
    }
});

function addChatMessage(message, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.innerHTML = `<p>${message}</p>`;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateBotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Greeting responses
    if (message.includes('hello') || message.includes('hi') || message.includes('hey') || message.includes('namaste')) {
        return "Namaste! I'm your Dabur Nutri Mix nutrition expert. I can help you with product information, Ayurvedic benefits, recipes, and wellness advice. What would you like to know? 🌿";
    }
    
    // Product questions
    if (message.includes('jar') || message.includes('traditional')) {
        return "The Traditional Recipe Jar is our family favorite! Made with time-tested Ayurvedic recipes, it's perfect for spreading on rotis and bread. The 300g family pack ensures long-lasting nutrition for the whole family. Would you like to know about its specific benefits?";
    }
    
    if (message.includes('box') || message.includes('premium')) {
        return "Our Premium Dry Fruits & Seeds blend is perfect for protein drinks! It mixes instantly with milk (12g protein per serving) and is ideal for active lifestyles. Great for smoothies, shakes, and post-workout nutrition.";
    }
    
    if (message.includes('pouch') || message.includes('wellness')) {
        return "The Wellness Blend in pouch format is 100% natural and perfect for daily wellness. It's travel-friendly, convenient to store, and specially priced at ₹199. Great for maintaining optimal health naturally!";
    }
    
    // Ayurvedic & health questions
    if (message.includes('ayurvedic') || message.includes('ayurveda')) {
        return "Dabur Nutri Mix follows traditional Ayurvedic principles with 135+ years of heritage! Our formulations balance the three doshas and use time-tested recipes. Ayurveda emphasizes natural nutrition for holistic wellness - exactly what our products deliver! 🕉️";
    }
    
    if (message.includes('protein')) {
        return "Each serving provides 12g of high-quality protein from premium dry fruits and nuts! This covers about 20-25% of daily protein needs and includes all essential amino acids for muscle health, growth, and repair.";
    }
    
    if (message.includes('benefits') || message.includes('nutrition')) {
        return "Dabur Nutri Mix offers complete nutrition: 12g protein, brain-healthy omega-3, natural antioxidants for immunity, digestive fiber, and essential minerals. Plus it's 100% natural with zero preservatives - pure Ayurvedic goodness!";
    }
    
    if (message.includes('omega')) {
        return "Yes! Nutri Mix is rich in Omega-3 from walnuts and almonds. These support brain health, improve cognitive function, and are great for heart health too.";
    }
    
    // Usage & preparation questions
    if (message.includes('how to use') || message.includes('serving')) {
        return "Easy to use! Traditional Jar: Spread 2-3 tbsp on bread/roti. Premium Box: Mix 2-3 tbsp with 200ml milk. Wellness Pouch: Mix with warm milk/water. Start with smaller servings for children. Best consumed daily for optimal benefits!";
    }
    
    if (message.includes('children') || message.includes('kids')) {
        return "Perfect for growing children! Start with 1-2 tbsp servings. The Traditional Recipe Jar is great for picky eaters (spreading on rotis/bread), while the Premium Box makes milk more appealing. All support healthy growth naturally! 👶";
    }
    
    // Recipe questions
    if (message.includes('recipe') || message.includes('cook')) {
        return "I have amazing Ayurvedic recipes! Try: Golden Milk with Nutri Mix, traditional energy ladoos, protein-rich pancakes, or nutritious halwa. Check our recipes section for detailed video tutorials. Which type interests you most?";
    }
    
    if (message.includes('breakfast')) {
        return "For healthy breakfast: Mix in warm milk, spread on parathas, blend into smoothie bowls, or make protein pancakes. The Traditional Jar works great for spreading, while Premium Box is perfect for drinks!";
    }
    
    // Buying questions
    if (message.includes('buy') || message.includes('where') || message.includes('price')) {
        return "Available everywhere! Quick delivery: Blinkit, Zepto, Swiggy Instamart (10-30 mins). E-commerce: BigBasket, Amazon, Flipkart. Pharmacies: Apollo, MedPlus, 1mg. Special launch price ₹199 for Wellness Pouch! 🛒";
    }
    
    // Health-specific questions
    if (message.includes('immunity') || message.includes('immune')) {
        return "Excellent for immunity! Rich in antioxidants from dates, nuts, vitamin C, E, zinc, and selenium. The Traditional Recipe follows Ayurvedic principles for natural immune support. Best taken daily with warm milk for maximum benefits! 🛡️";
    }
    
    if (message.includes('weight gain') || message.includes('weight')) {
        return "Great for healthy weight gain! High-quality protein (12g), healthy fats from nuts, and natural calories from dates provide nutritious weight gain support. Use Premium Box for protein shakes, or Traditional Jar with meals. Consult nutritionist for specific plans.";
    }
    
    if (message.includes('diabetes') || message.includes('sugar')) {
        return "Our products use natural sweetness from dates with no added sugars. However, for diabetes management, please consult your doctor about portion sizes and how it fits your meal plan. Natural doesn't always mean suitable for diabetic diets.";
    }
    
    // Age-specific questions
    if (message.includes('elderly') || message.includes('senior')) {
        return "Perfect for seniors! Easy to digest, provides essential nutrients for bone health (calcium, magnesium), and supports overall vitality. The Traditional Jar is gentle, while Wellness Pouch offers convenient portions. Great for maintaining strength and energy! 👴👵";
    }
    
    // Storage and safety
    if (message.includes('storage') || message.includes('expire') || message.includes('fresh')) {
        return "Store in cool, dry place. After opening: Jar - refrigerate, use within 2-3 months. Box/Pouch - seal tightly, use within 1 month. Always use clean, dry spoon. Check packaging for exact expiry dates. Proper storage maintains freshness and nutrition!";
    }
    
    // Comparison questions
    if (message.includes('difference') || message.includes('which') || message.includes('compare')) {
        return "Choose based on lifestyle: Traditional Jar (families, spreading, authentic Ayurvedic), Premium Box (active people, protein drinks, instant mixing), Wellness Pouch (individuals, travel, convenience). All have same core nutrition - just different formats! 🤔";
    }
    
    // Authenticity & quality
    if (message.includes('genuine') || message.includes('authentic') || message.includes('quality')) {
        return "100% authentic Dabur product with 135+ years of trust! Rigorous quality testing, premium ingredient sourcing, traditional Ayurvedic processing, and zero preservatives. Look for official Dabur logo and buy from authorized retailers only! ✅";
    }
    
    // Side effects & safety
    if (message.includes('side effect') || message.includes('safe') || message.includes('allergy')) {
        return "Generally safe for all ages as it's 100% natural. However, those with nut allergies should check ingredients carefully. Start with small quantities. Excessive consumption may cause digestive discomfort. Consult doctor if you have specific health conditions.";
    }
    
    // Default helpful response
    return "That's a wonderful question about Dabur Nutri Mix! Our products combine 135+ years of Ayurvedic wisdom with modern nutrition science. For specific health advice, please consult an Ayurvedic practitioner or nutritionist. Would you like to know about our products, traditional recipes, or health benefits? 🌿";
}

// Floating Actions
function initializeFloatingActions() {
    // Show/hide floating actions based on scroll
    window.addEventListener('scroll', debounce(() => {
        const floatingActions = document.querySelector('.floating-actions');
        if (floatingActions) {
            if (window.pageYOffset > 300) {
                floatingActions.style.opacity = '1';
                floatingActions.style.transform = 'translateY(0)';
            } else {
                floatingActions.style.opacity = '0';
                floatingActions.style.transform = 'translateY(20px)';
            }
        }
    }, 100));
}

function openLiveChat() {
    console.log('Opening live chat...');
    // Open nutrition assistant if not already open
    if (!assistantOpen) {
        toggleAssistant();
    }
    
    // Add a welcome message for live chat
    setTimeout(() => {
        addChatMessage("Namaste! I'm here to help you with any questions about Dabur Nutri Mix. Ask me about our Ayurvedic products, nutrition benefits, traditional recipes, or anything else! 🌿", 'bot');
    }, 500);
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Scroll effects
function setupScrollEffects() {
    // Add scroll-based animations or effects here
    console.log('Scroll effects initialized');
}

// Additional interactive features
function createRippleEffect(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    button.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple effect to buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-product');
    buttons.forEach(button => {
        button.addEventListener('click', createRippleEffect);
    });
});

// Performance optimization
function optimizeImages() {
    // Lazy load images when they come into view
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', optimizeImages);

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close modals with Escape key
    if (e.key === 'Escape') {
        if (assistantOpen) {
            toggleAssistant();
        }
        const productModal = document.querySelector('.product-modal');
        if (productModal) {
            closeProductModal();
        }
    }
    
    // Navigation with arrow keys
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const isCarouselFocused = document.querySelector('.carousel-container:hover');
        if (isCarouselFocused) {
            e.preventDefault();
            const direction = e.key === 'ArrowLeft' ? -1 : 1;
            const newSlide = (currentSlide + direction + 3) % 3;
            goToSlide(newSlide);
        }
    }
});

// Social sharing functionality
function shareProduct(platform, productName) {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out ${productName} - Premium Ayurvedic nutrition from Dabur with 135+ years of trust! #DaburNutriMix #AyurvedicNutrition`);
    
    let shareUrl = '';
    switch (platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${text}%20${url}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

// Product visual interactions
function initializeProductVisuals() {
    const productVisuals = document.querySelectorAll('.product-visual-container');
    productVisuals.forEach(visual => {
        visual.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            const glow = this.querySelector('.product-glow, .product-highlight');
            if (glow) glow.style.opacity = '0.3';
        });
        
        visual.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            const glow = this.querySelector('.product-glow, .product-highlight');
            if (glow) glow.style.opacity = '0';
        });
    });
}

// Initialize product visuals
document.addEventListener('DOMContentLoaded', initializeProductVisuals);

console.log('🌿 Dabur Nutri Mix - Premium Ayurvedic Nutrition Website Ready!');
console.log('✅ All features loaded: Carousel, Navigation, Calculator, Recipes, Assistant, and more!');
console.log('🚀 135+ years of Ayurvedic wisdom meets modern web technology!');

// Make functions globally available
window.scrollToProducts = scrollToProducts;
window.scrollToBuy = scrollToBuy;
window.scrollToTop = scrollToTop;
window.showProductDetails = showProductDetails;
window.closeProductModal = closeProductModal;
window.calculateNutrition = calculateNutrition;
window.checkAvailability = checkAvailability;
window.toggleAssistant = toggleAssistant;
window.sendChatMessage = sendChatMessage;
window.openLiveChat = openLiveChat;
window.fallbackToBlinkit = fallbackToBlinkit;
window.fallbackToZepto = fallbackToZepto;
window.fallbackToInstamart = fallbackToInstamart;
window.fallbackToBigBasket = fallbackToBigBasket;
window.toggleBenefit = toggleBenefit;
window.filterRecipes = filterRecipes;
window.goToSlide = goToSlide;