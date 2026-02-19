

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Initialize all features
    initMobileMenu();
    initScrollEffects();
    initSmoothScroll();
    initImageFallbacks();
    initScrollAnimations();
    initActiveNavHighlighter();
});

/* ========================================
   Mobile Menu Toggle
   ======================================== */
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (!menuToggle || !mainNav) return;
    
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMobileMenu();
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Close menu when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mainNav.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Close menu when clicking a nav link
    const navLinks = mainNav.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });
    
    function toggleMobileMenu() {
        const isActive = mainNav.classList.contains('active');
        const icon = menuToggle.querySelector('i');
        
        mainNav.classList.toggle('active');
        
        if (!isActive) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            document.body.style.overflow = 'hidden';
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            document.body.style.overflow = '';
        }
    }
    
    function closeMobileMenu() {
        if (mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            document.body.style.overflow = '';
        }
    }
}

/* ========================================
   Scroll Effects
   ======================================== */
function initScrollEffects() {
    const header = document.querySelector('.site-header');
    
    if (!header) return;
    
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        lastScrollY = window.scrollY;
        
        if (!ticking) {
            window.requestAnimationFrame(function() {
                if (lastScrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                ticking = false;
            });
            
            ticking = true;
        }
    });
}

/* ========================================
   Smooth Scroll for Anchor Links
   ======================================== */
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const header = document.querySelector('.site-header');
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ========================================
   Image Fallback Handler
   ======================================== */
function initImageFallbacks() {
    // Handle forest image fallback
    const forestCard = document.querySelector('.forest-card');
    const forestImage = document.querySelector('.forest-image');
    
    if (forestImage) {
        forestImage.addEventListener('error', function() {
            if (forestCard) {
                forestCard.classList.add('no-image');
                // Create fallback content if not exists
                if (!forestCard.querySelector('.fallback-content')) {
                    const fallback = document.createElement('div');
                    fallback.className = 'fallback-content';
                    fallback.innerHTML = `
                        <i class="fas fa-tree" aria-hidden="true"></i>
                        <p>Protecting Romblon's Natural Heritage</p>
                    `;
                    forestCard.appendChild(fallback);
                }
            }
        });
    }
    
    // Handle logo fallback
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
   Scroll Animations with Intersection Observer
   ======================================== */
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    if (fadeElements.length === 0) return;
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(el => observer.observe(el));
}

/* ========================================
   Active Navigation Link Highlighter
   ======================================== */
function initActiveNavHighlighter() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const scrollY = window.pageYOffset;
                const header = document.querySelector('.site-header');
                const headerHeight = header ? header.offsetHeight : 80;
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop - headerHeight - 10;
                    const sectionBottom = sectionTop + section.offsetHeight;
                    const sectionId = section.getAttribute('id');
                    
                    if (scrollY >= sectionTop && scrollY < sectionBottom) {
                        navLinks.forEach(link => {
                            link.classList.remove('active');
                            if (link.getAttribute('href') === '#' + sectionId) {
                                link.classList.add('active');
                            }
                        });
                    }
                });
                
                ticking = false;
            });
            
            ticking = true;
        }
    });
}

/* ========================================
   Preload Images
   ======================================== */
function preloadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    if (images.length === 0) return;
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Add loading class to images
document.querySelectorAll('img').forEach(img => {
    img.classList.add('loading');
    img.addEventListener('load', function() {
        this.classList.remove('loading');
        this.classList.add('loaded');
    });
});