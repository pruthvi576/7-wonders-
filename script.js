// Professional JavaScript for 7 Wonders Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initLoadingScreen();
    initNavbar();
    initSearch();
    initScrollAnimations();
    initWonderCards();
    initSmoothScrolling();
    initParallaxEffect();
});

// Loading Screen
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1500);
    });
}

// Navbar Scroll Effect
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Search Functionality
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const wonderCards = document.querySelectorAll('.wonder-card');
    
    // Define wonder page mappings
    const wonderPages = {
        'great wall': 'Wall.html',
        'great wall of china': 'Wall.html',
        'wall': 'Wall.html',
        'china': 'Wall.html',
        'christ': 'Redeemer.html',
        'christ the redeemer': 'Redeemer.html',
        'redeemer': 'Redeemer.html',
        'brazil': 'Redeemer.html',
        'rio': 'Redeemer.html',
        'machu': 'Machu.html',
        'machu picchu': 'Machu.html',
        'peru': 'Machu.html',
        'chichen': 'Itza.html',
        'chichen itza': 'Itza.html',
        'itza': 'Itza.html',
        'mexico': 'Itza.html',
        'colosseum': 'Colosseum.html',
        'roman colosseum': 'Colosseum.html',
        'rome': 'Colosseum.html',
        'italy': 'Colosseum.html',
        'taj': 'Taj.html',
        'taj mahal': 'Taj.html',
        'india': 'Taj.html',
        'agra': 'Taj.html',
        'petra': 'Petra.html',
        'jordan': 'Petra.html'
    };
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const searchTerm = this.value.toLowerCase().trim();
            
            // Check if search matches any wonder
            for (const [key, page] of Object.entries(wonderPages)) {
                if (searchTerm.includes(key) || key.includes(searchTerm)) {
                    window.location.href = page;
                    return;
                }
            }
        }
    });
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        wonderCards.forEach(card => {
            const wonderName = card.querySelector('h3').textContent.toLowerCase();
            const wonderDescription = card.querySelector('.wonder-description').textContent.toLowerCase();
            const wonderLocation = card.querySelector('.wonder-location').textContent.toLowerCase();
            
            if (wonderName.includes(searchTerm) || 
                wonderDescription.includes(searchTerm) || 
                wonderLocation.includes(searchTerm)) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease-out';
            } else {
                card.style.display = searchTerm === '' ? 'block' : 'none';
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Stagger animation for cards
                if (entry.target.classList.contains('wonder-card')) {
                    const cards = document.querySelectorAll('.wonder-card');
                    const index = Array.from(cards).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                    entry.target.classList.add('animate-in');
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.wonder-card, .feature-card, .section-header');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });
}

// Wonder Cards Interactive Features
function initWonderCards() {
    const wonderCards = document.querySelectorAll('.wonder-card');
    
    wonderCards.forEach(card => {
        // Add hover sound effect (optional)
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.03)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add click effect
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('wonder-link')) {
                const link = this.querySelector('.wonder-link');
                if (link) {
                    // Add click animation
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = 'translateY(-15px) scale(1.03)';
                        window.location.href = link.href;
                    }, 150);
                }
            }
        });
        
        // Parallax effect for wonder images
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            const img = this.querySelector('.wonder-image img');
            img.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`;
        });
        
        card.addEventListener('mouseleave', function() {
            const img = this.querySelector('.wonder-image img');
            img.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Parallax Effect for Hero Section
function initParallaxEffect() {
    const heroSection = document.querySelector('.hero-section');
    const heroContent = document.querySelector('.hero-content');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (heroSection) {
            heroSection.style.transform = `translateY(${rate}px)`;
        }
        
        // Fade out hero content on scroll
        if (heroContent) {
            const opacity = 1 - scrolled / window.innerHeight;
            heroContent.style.opacity = Math.max(opacity, 0);
        }
    });
}

// Dynamic Stats Counter
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalNumber = target.textContent;
                const numericValue = parseInt(finalNumber.replace(/\D/g, ''));
                
                if (!isNaN(numericValue)) {
                    animateValue(target, 0, numericValue, 2000, finalNumber.includes('+'));
                }
                
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observer.observe(stat));
}

function animateValue(element, start, end, duration, hasPlus = false) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);
        
        let displayValue = currentValue.toLocaleString();
        if (hasPlus && progress === 1) displayValue += '+';
        
        element.textContent = displayValue;
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Initialize stats counter
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initStatsCounter, 2000); // Start after loading screen
});

// Add some CSS classes via JavaScript for enhanced animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: wonderCardSlide 0.8s ease-out forwards;
    }
    
    @keyframes wonderCardSlide {
        from {
            opacity: 0;
            transform: translateY(50px) scale(0.9);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
    
    .wonder-card {
        transform-style: preserve-3d;
        transition: all 0.3s ease;
    }
    
    .wonder-image img {
        transition: transform 0.3s ease;
    }
    
    /* Enhanced loading animation */
    .spinner::before {
        content: '';
        position: absolute;
        top: -4px;
        left: -4px;
        right: -4px;
        bottom: -4px;
        border: 4px solid transparent;
        border-top-color: rgba(255,255,255,0.5);
        border-radius: 50%;
        animation: spin 2s linear infinite reverse;
    }
`;

document.head.appendChild(style);

// Add intersection observer for fade-in effects
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe elements that should fade in
document.querySelectorAll('.feature-card, .section-header').forEach(el => {
    fadeInObserver.observe(el);
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close any open modals or reset search
        const searchInput = document.getElementById('searchInput');
        if (searchInput.value) {
            searchInput.value = '';
            searchInput.dispatchEvent(new Event('input'));
        }
    }
});

// Performance optimization: debounce scroll events
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

// Apply debounce to scroll-heavy functions
const debouncedParallax = debounce(initParallaxEffect, 10);
window.addEventListener('scroll', debouncedParallax);