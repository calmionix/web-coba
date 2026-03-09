/**
 * CALMIONIX - Modern Creator Portfolio
 * JavaScript Functions
 */

document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // LOADING SCREEN
    // ============================================
    const loadingScreen = document.getElementById('loading');
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 1500);
    });

    // ============================================
    // PARTICLES
    // ============================================
    function createParticles() {
        const container = document.getElementById('particles');
        const particleCount = 30;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 4 + 2;
            const left = Math.random() * 100;
            const delay = Math.random() * 15;
            const duration = Math.random() * 10 + 10;
            
            particle.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${left}%;
                animation-delay: ${delay}s;
                animation-duration: ${duration}s;
            `;
            
            container.appendChild(particle);
        }
    }
    createParticles();

    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link on scroll
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
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

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ============================================
    // ANIMATED COUNTER
    // ============================================
    function animateCounter(element, target, suffix = '') {
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                element.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
            }
        };

        updateCounter();
    }

    // Intersection Observer for stats
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    animateCounter(stat, target);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // ============================================
    // SCROLL REVEAL ANIMATION
    // ============================================
    const revealElements = document.querySelectorAll('.stat-card, .info-card, .video-card, .price-card, .benefit-card');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        revealObserver.observe(el);
    });

    // ============================================
    // MODAL
    // ============================================
    const modal = document.getElementById('confirmModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalConfirm = document.getElementById('modalConfirm');
    const modalCancel = document.getElementById('modalCancel');

    let modalLink = '';

    function openModal(title, desc, link) {
        modalTitle.textContent = title;
        modalDesc.textContent = desc;
        modalLink = link;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    modalConfirm.addEventListener('click', () => {
        if (modalLink) {
            window.open(modalLink, '_blank');
        }
        closeModal();
    });

    modalCancel.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Social links with modal
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const platform = link.getAttribute('data-platform');
            const href = link.getAttribute('href');
            openModal(
                `Buka ${platform}?`,
                `Kamu akan diarahkan ke ${platform} dalam tab baru.`,
                href
            );
        });
    });

    // ============================================
    // PRICE LIST - TIKTOK OPTIONS
    // ============================================
    const tiktokOptions = document.querySelectorAll('.price-option');
    const tiktokBtn = document.getElementById('tiktokBtn');
    let selectedTiktokPrice = 'Rp60.000';
    let selectedTiktokDetail = '1x Revisi';

    tiktokOptions.forEach(option => {
        option.addEventListener('click', function() {
            tiktokOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            selectedTiktokPrice = this.getAttribute('data-price');
            selectedTiktokDetail = this.getAttribute('data-detail');
        });
    });

    // Price buttons
    document.querySelectorAll('.price-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const service = this.getAttribute('data-service');
            let price, detail;

            if (service === 'TikTok') {
                price = selectedTiktokPrice;
                detail = selectedTiktokDetail;
            } else {
                price = this.getAttribute('data-price');
                detail = this.getAttribute('data-detail');
            }

            const phone = '6282130570915';
            const message = `Halo Calmionix, saya ingin memesan endorse ${service} paket ${price} (${detail}).`;
            const waLink = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
            
            window.open(waLink, '_blank');
        });
    });

    // ============================================
    // SMOOTH SCROLL
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // BUTTON RIPPLE EFFECT
    // ============================================
    function createRipple(e, button) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }

    document.querySelectorAll('.btn, .price-btn, .watch-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            createRipple(e, this);
        });
    });

    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to { transform: scale(2); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // ============================================
    // PARALLAX EFFECT
    // ============================================
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const scrolled = window.pageYOffset;
                const shapes = document.querySelectorAll('.shape');
                shapes.forEach((shape, index) => {
                    const speed = (index + 1) * 0.1;
                    shape.style.transform = `translateY(${scrolled * speed}px)`;
                });
                ticking = false;
            });
            ticking = true;
        }
    });

    // ============================================
    // TILT EFFECT FOR CARDS (Desktop only)
    // ============================================
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    
    if (!isTouchDevice) {
        document.querySelectorAll('.price-card, .video-card, .stat-card').forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    }

    // ============================================
    // CONSOLE LOG
    // ============================================
    console.log('%c🎮 Calmionix Portfolio', 'font-size: 24px; font-weight: bold; color: #ff6b35;');
    console.log('%cModern Creator Portfolio', 'font-size: 14px; color: #ffffff;');
    console.log('%c© 2024 Calmionix', 'font-size: 12px; color: #888888;');
});
