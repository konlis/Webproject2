

// Header scroll effect
function updateHeader() {
    const header = document.getElementById('header');
    const scrolled = window.scrollY > 100;
    header.classList.toggle('header-scrolled', scrolled);
}

// Intersection Observer for animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
        observer.observe(el);
    });
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form handling
function initForm() {
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.name || !data.phone) {
                alert('Proszę wypełnić wymagane pola: Imię i nazwisko oraz Numer telefonu');
                return;
            }
            
            // Here you would normally send the data to your server
            console.log('Form data:', data);
            
            // Show success message
            alert('Dziękujemy za zapytanie! Skontaktujemy się w ciągu 2 godzin.');
            
            // Reset form
            form.reset();
        });
    }
}

// Mobile menu handling (if needed for future expansion)
function initMobileMenu() {
    // This would be for a hamburger menu if added later
}

// Parallax effect for hero section
function initParallax() {
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initAnimations();
    initSmoothScroll();
    initForm();
    initMobileMenu();
    // initParallax(); // Commented out as it might affect performance on mobile
    
    // Add scroll event listeners
    window.addEventListener('scroll', () => {
        updateHeader();
    });
    
    // Initial calls
    updateHeader();
});

// Performance optimization: throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    updateHeader();
}, 16)); // ~60fps 