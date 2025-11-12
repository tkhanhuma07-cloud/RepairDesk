// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    // Mobile menu functionality
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 767) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 767) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Cookie Banner
    const cookieBanner = document.getElementById('cookieBanner');
    const acceptBtn = document.querySelector('.accept-btn');
    
    if (cookieBanner && !localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1000);
    }
    
    if (acceptBtn) {
        acceptBtn.addEventListener('click', function() {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieBanner.classList.remove('show');
        });
    }

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // =============================================
    // PARTNERS CAROUSEL - FIXED VERSION
    // =============================================
    const partnersTrack = document.querySelector('.partners-track');
    const partnerLogos = document.querySelectorAll('.partner-logo');
    
    if (partnersTrack && partnerLogos.length > 0) {
        let autoScrollInterval;
        let isPaused = false;
        
        // Function to start auto-scroll
        function startAutoScroll() {
            stopAutoScroll();
            autoScrollInterval = setInterval(() => {
                if (!isPaused) {
                    // Move first logo to the end for infinite effect
                    const firstLogo = partnersTrack.firstElementChild;
                    partnersTrack.appendChild(firstLogo);
                    // Reset transform to create smooth loop
                    partnersTrack.style.transition = 'none';
                    partnersTrack.style.transform = 'translateX(0)';
                    
                    // Force reflow
                    void partnersTrack.offsetWidth;
                    
                    // Add transition back
                    partnersTrack.style.transition = 'transform 0.5s ease';
                }
            }, 2000); // Change every 2 seconds
        }
        
        function stopAutoScroll() {
            if (autoScrollInterval) {
                clearInterval(autoScrollInterval);
            }
        }
        
        // Pause on hover
        partnersTrack.addEventListener('mouseenter', () => {
            isPaused = true;
        });
        
        partnersTrack.addEventListener('mouseleave', () => {
            isPaused = false;
        });
        
        // Touch support for mobile
        let touchStartX = 0;
        let touchStartY = 0;
        
        partnersTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            isPaused = true;
        }, { passive: true });
        
        partnersTrack.addEventListener('touchend', (e) => {
            isPaused = false;
        }, { passive: true });
        
        // Start the carousel
        startAutoScroll();
        
        // Handle window resize
        window.addEventListener('resize', () => {
            // Reset transform on resize
            partnersTrack.style.transition = 'none';
            partnersTrack.style.transform = 'translateX(0)';
        });
    }

    // =============================================
    // INDUSTRIES SLIDER - FIXED VERSION
    // =============================================
    const industriesTrack = document.querySelector('.industries-track');
    const industryCards = document.querySelectorAll('.industry-card');
    const paginationDots = document.querySelectorAll('.pagination-dot');
    
    if (industriesTrack && industryCards.length > 0 && paginationDots.length > 0) {
        let currentSlide = 0;
        let autoPlayInterval;
        let isPaused = false;
        
        function updateSlider() {
            const cardWidth = industryCards[0].offsetWidth + 24; // card width + gap
            const translateX = -currentSlide * cardWidth;
            industriesTrack.style.transform = `translateX(${translateX}px)`;
            
            // Update pagination dots
            paginationDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % paginationDots.length;
            updateSlider();
        }
        
        function startAutoPlay() {
            stopAutoPlay();
            autoPlayInterval = setInterval(() => {
                if (!isPaused) {
                    nextSlide();
                }
            }, 3000);
        }
        
        function stopAutoPlay() {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
            }
        }
        
        // Pagination dot clicks
        paginationDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                updateSlider();
            });
        });
        
        // Pause on hover
        industriesTrack.addEventListener('mouseenter', () => {
            isPaused = true;
        });
        
        industriesTrack.addEventListener('mouseleave', () => {
            isPaused = false;
        });
        
        // Touch support
        let touchStartX = 0;
        
        industriesTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            isPaused = true;
        }, { passive: true });
        
        industriesTrack.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const swipeDistance = touchEndX - touchStartX;
            
            if (Math.abs(swipeDistance) > 50) {
                if (swipeDistance > 0 && currentSlide > 0) {
                    // Swipe right - previous
                    currentSlide--;
                } else if (swipeDistance < 0 && currentSlide < paginationDots.length - 1) {
                    // Swipe left - next
                    currentSlide++;
                }
                updateSlider();
            }
            isPaused = false;
        }, { passive: true });
        
        // Initialize
        updateSlider();
        startAutoPlay();
        
        // Handle resize
        window.addEventListener('resize', updateSlider);
    }

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements
    const animateElements = document.querySelectorAll('.feature-item, .industry-card, .comm-card, .award-badge');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Ripple effect for buttons
    document.querySelectorAll('.btn-primary, .btn-accent, .btn-outline, .btn-outline-white').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add ripple effect styles
if (!document.querySelector('#ripple-styles')) {
    const rippleStyle = document.createElement('style');
    rippleStyle.id = 'ripple-styles';
    rippleStyle.textContent = `
        .btn-primary, .btn-accent, .btn-outline, .btn-outline-white {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        /* Mobile menu scroll prevention */
        body {
            overflow-x: hidden;
        }
        
        body.menu-open {
            overflow: hidden;
        }
    `;
    document.head.appendChild(rippleStyle);
}