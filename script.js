/* ========================================
   ENRO Romblon - Professional Website Script
   Environment & Natural Resources Office
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initMobileMenu();
    initScrollEffects();
    initSmoothScroll();
    checkImageFallbacks();
});

/* ========================================
   Mobile Menu Toggle
   ======================================== */
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            // Toggle mobile menu
            mainNav.classList.toggle('active');
            
            // Change icon between bars and times
            const icon = menuToggle.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
                mainNav.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when pressing Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
}

/* ========================================
   Scroll Effects
   ======================================== */
function initScrollEffects() {
    const header = document.querySelector('.site-header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

/* ========================================
   Smooth Scroll for Anchor Links
   ======================================== */
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    const headerHeight = document.querySelector('.site-header')?.offsetHeight || 70;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/* ========================================
   Image Fallback Handler
   ======================================== */
function checkImageFallbacks() {
    const forestImage = document.querySelector('.forest-image');
    const imageCard = document.querySelector('.image-card');
    
    if (forestImage) {
        forestImage.addEventListener('error', function() {
            // Hide the broken image
            this.style.display = 'none';
            
            // Add fallback class to parent
            if (imageCard) {
                imageCard.classList.add('no-image');
                imageCard.innerHTML = '<div><i class="fas fa-tree" style="font-size: 4rem; margin-bottom: 1rem;"></i><p>Protecting Romblon\'s Natural Heritage</p></div>';
            }
        });
    }
    
    // Check logo
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('error', function() {
            this.style.display = 'none';
            const logoArea = document.querySelector('.logo-area');
            if (logoArea) {
                logoArea.querySelector('.logo-text').style.marginLeft = '0';
            }
        });
    }
}

/* ========================================
   Intersection Observer for Animations
   ======================================== */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe cards and sections for animation
    const animatedElements = document.querySelectorAll('.card, .image-card');
    animatedElements.forEach(el => observer.observe(el));
}

/* ========================================
   Active Navigation Link Highlighter
   ======================================== */
function initActiveNavHighlighter() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (sections.length && navLinks.length) {
        window.addEventListener('scroll', function() {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });
    }
}

// Add CSS for scroll animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-in.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', initScrollAnimations);
document.addEventListener('DOMContentLoaded', initActiveNavHighlighter);
