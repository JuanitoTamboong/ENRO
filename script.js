document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initScrollEffects();
    initSmoothScroll();
    initScrollAnimations();
    initActiveNavHighlighter();
    initCounterAnimation();
    initFormHandlers();
    initImageFallbacks();
    initPageLoad();
});

function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.querySelector('.main-nav');
    if (!menuToggle || !mainNav) return;

    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);

    function toggleMenu(open) {
        const isOpen = open !== undefined ? open : !mainNav.classList.contains('active');
        mainNav.classList.toggle('active', isOpen);
        menuToggle.classList.toggle('active', isOpen);
        overlay.classList.toggle('active', isOpen);
        document.body.classList.toggle('menu-open', isOpen);
        const icon = menuToggle.querySelector('i');
        icon.classList.toggle('fa-bars', !isOpen);
        icon.classList.toggle('fa-times', isOpen);
    }

    menuToggle.addEventListener('click', (e) => {
        e.preventDefault();
        toggleMenu();
    });

    overlay.addEventListener('click', () => toggleMenu(false));

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mainNav.classList.contains('active')) {
            toggleMenu(false);
        }
    });

    const navLinks = mainNav.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            setTimeout(() => toggleMenu(false), 150);
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && mainNav.classList.contains('active')) {
            toggleMenu(false);
        }
    });
}

function initScrollEffects() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                header.classList.toggle('scrolled', window.scrollY > 50);
                ticking = false;
            });
            ticking = true;
        }
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(link => {
        link.addEventListener('click', (e) => {
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('.site-header').offsetHeight;
                window.scrollTo({
                    top: target.getBoundingClientRect().top + window.scrollY - headerHeight,
                    behavior: 'smooth'
                });
                history.pushState(null, null, link.getAttribute('href'));
            }
        });
    });
}

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

function initActiveNavHighlighter() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    if (!sections.length || !navLinks.length) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                const headerHeight = document.querySelector('.site-header').offsetHeight;
                let current = '';

                sections.forEach(section => {
                    const top = section.offsetTop - headerHeight - 20;
                    const bottom = top + section.offsetHeight;
                    if (scrollY >= top && scrollY < bottom) {
                        current = section.getAttribute('id');
                    }
                });

                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
                });
                ticking = false;
            });
            ticking = true;
        }
    });
}

function initCounterAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'));
                const duration = 2000;
                const startTime = performance.now();

                function animate(now) {
                    const progress = Math.min((now - startTime) / duration, 1);
                    el.textContent = Math.floor(target * (1 - Math.pow(1 - progress, 3))).toLocaleString();
                    if (progress < 1) requestAnimationFrame(animate);
                    else el.textContent = target.toLocaleString();
                }
                requestAnimationFrame(animate);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.stat-number').forEach(el => observer.observe(el));
}

function initFormHandlers() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.btn-submit');
            const originalText = btn.textContent;

            btn.textContent = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                btn.textContent = 'Message Sent!';
                btn.style.backgroundColor = 'var(--primary-light)';

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                    btn.style.backgroundColor = '';
                    contactForm.reset();
                    setTimeout(() => alert('Thank you for your message!'), 100);
                }, 1500);
            }, 800);
        });
    }
}

function initImageFallbacks() {
    const forestImage = document.getElementById('forestImage');
    if (forestImage) {
        forestImage.addEventListener('error', function() {
            this.style.display = 'none';
            const card = this.closest('.forest-card');
            card.classList.add('no-image');
            if (!card.querySelector('.fallback-content')) {
                const fallback = document.createElement('div');
                fallback.className = 'fallback-content';
                fallback.innerHTML = '<i class="fas fa-tree"></i><p>Protecting Romblon\'s Natural Heritage</p>';
                card.appendChild(fallback);
            }
        });

        if (forestImage.complete && forestImage.naturalHeight === 0) {
            forestImage.dispatchEvent(new Event('error'));
        }
    }

    const logo = document.getElementById('logo');
    if (logo) {
        logo.addEventListener('error', function() {
            this.style.display = 'none';
        });
    }

    const footerLogo = document.querySelector('.footer-logo');
    if (footerLogo) {
        footerLogo.addEventListener('error', function() {
            this.style.display = 'none';
        });
    }
}

function initPageLoad() {
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        setTimeout(() => {
            document.querySelectorAll('.fade-in').forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    el.classList.add('visible');
                }
            });
        }, 100);
    });
}