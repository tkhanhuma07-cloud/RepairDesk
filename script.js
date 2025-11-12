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

document.addEventListener('DOMContentLoaded', function() {
    const featureItems = document.querySelectorAll('.feature-item');
    const featureTitle = document.getElementById('feature-title');
    const featureDescription = document.getElementById('feature-description');
    const featureImage = document.getElementById('feature-image');
    
    // Feature content data
    const featureData = {
        pos: {
            title: "Point of Sale",
            description: "Generate more revenue and provide a great checkout experience to your customers with a comprehensive POS software that has everything you need for your business operations. Sell more repair services, accessories and gadgets, generate and print invoices, collect payments, and more – all from a single POS system screen. RepairDesk Point of sale software is fast, efficient, reliable, and tailor-made for your store's workflow.",
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        appointments: {
            title: "Appointment Scheduling",
            description: "Simplify your booking process with our smart scheduling system. Allow customers to book online, send automated reminders, manage technician schedules, and reduce no-shows. Optimize your shop's workflow with intelligent appointment management.",
            image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        employees: {
            title: "Employee Management",
            description: "Efficiently manage your repair shop staff with our comprehensive employee management system. Track schedules, assign tasks, monitor performance, and handle payroll all in one place. Streamline your workforce management to boost productivity.",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        reporting: {
            title: "Business Reporting",
            description: "Make data-driven decisions with our comprehensive reporting tools. Track key performance indicators, analyze sales trends, monitor technician productivity, and identify growth opportunities. Customizable dashboards provide insights at a glance.",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        payments: {
            title: "Integrated Payments",
            description: "Accept all payment types securely with our integrated payment processing. From credit cards to digital wallets, our system handles transactions seamlessly while keeping customer data safe. Simplify reconciliation with automatic payment tracking.",
            image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        notifications: {
            title: "SMS & Email Notification",
            description: "Keep customers informed with automated SMS and email notifications. Send appointment reminders, status updates, repair completion alerts, and promotional messages. Improve customer satisfaction with timely communication.",
            image: "https://images.unsplash.com/photo-1563013546-7e566d5c9e65?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        tickets: {
            title: "Repair Ticket Management",
            description: "Streamline your repair workflow with our ticket management system. Create, track, and manage repair jobs from intake to completion. Assign technicians, track parts usage, and maintain detailed service histories for each device.",
            image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        }
    };
    
    // Set initial active state
    document.querySelector('.feature-item[data-target="pos"]').classList.add('active');
    
    // Add event listeners to feature items
    featureItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // Remove active class from all items
            featureItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to current item
            this.classList.add('active');
            
            // Get feature data
            const target = this.getAttribute('data-target');    
            const data = featureData[target];
            
            // Update content
            featureTitle.textContent = data.title;
            featureDescription.textContent = data.description;
            featureImage.src = data.image;
        });
    });
});

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get all feature items
    const featureItems = document.querySelectorAll('.feature-item');
    
    // Define content for each feature
    const featureContent = {
        payments: {
            title: "Integrated Payments",
            description: "Accept payments seamlessly with our integrated payment system. Support for credit cards, digital wallets, and cash transactions. Process refunds, track payment history, and reconcile transactions with ease. Our secure payment processing ensures your customers' data is always protected.",
            graphic: `
                <rect x="50" y="50" width="400" height="250" rx="10" fill="#e8f5e9" stroke="#4caf50" stroke-width="2"/>
                <rect x="70" y="80" width="360" height="40" rx="5" fill="#4caf50"/>
                <text x="250" y="105" text-anchor="middle" fill="white" font-weight="bold" font-size="16">Payment Processing</text>
                <rect x="80" y="140" width="150" height="40" rx="5" fill="#c8e6c9"/>
                <text x="155" y="165" text-anchor="middle" fill="#2e7d32" font-size="14">Credit Cards</text>
                <rect x="250" y="140" width="150" height="40" rx="5" fill="#c8e6c9"/>
                <text x="325" y="165" text-anchor="middle" fill="#2e7d32" font-size="14">Digital Wallets</text>
                <rect x="80" y="200" width="150" height="40" rx="5" fill="#c8e6c9"/>
                <text x="155" y="225" text-anchor="middle" fill="#2e7d32" font-size="14">Payment History</text>
                <rect x="250" y="200" width="150" height="40" rx="5" fill="#c8e6c9"/>
                <text x="325" y="225" text-anchor="middle" fill="#2e7d32" font-size="14">Refunds</text>
            `
        },
        appointments: {
            title: "Appointment Scheduling",
            description: "Streamline your appointment booking process with our intuitive scheduling system. Allow customers to book appointments online 24/7, reduce no-shows with automated reminders, and optimize your technician's schedule. View daily, weekly, and monthly calendars at a glance.",
            graphic: `
                <rect x="50" y="50" width="400" height="250" rx="10" fill="#fff3e0" stroke="#ff9800" stroke-width="2"/>
                <rect x="70" y="80" width="360" height="40" rx="5" fill="#ff9800"/>
                <text x="250" y="105" text-anchor="middle" fill="white" font-weight="bold" font-size="16">Appointment Calendar</text>
                <rect x="80" y="140" width="150" height="40" rx="5" fill="#ffe0b2"/>
                <text x="155" y="165" text-anchor="middle" fill="#e65100" font-size="14">Book Online</text>
                <rect x="250" y="140" width="150" height="40" rx="5" fill="#ffe0b2"/>
                <text x="325" y="165" text-anchor="middle" fill="#e65100" font-size="14">Reminders</text>
                <rect x="80" y="200" width="150" height="40" rx="5" fill="#ffe0b2"/>
                <text x="155" y="225" text-anchor="middle" fill="#e65100" font-size="14">Calendar View</text>
                <rect x="250" y="200" width="150" height="40" rx="5" fill="#ffe0b2"/>
                <text x="325" y="225" text-anchor="middle" fill="#e65100" font-size="14">Technicians</text>
            `
        },
        pos: {
            title: "Point of Sale Software",
            description: "Generate more revenue and provide a great checkout experience to your customers with a comprehensive POS software that has everything you need for your business operations. Sell more repair services, accessories and gadgets, generate and print invoices, collect payments, and more – all from a single POS system screen. RepairDesk Point of sale software is fast, efficient, reliable, and tailor-made for your store's workflow.",
            graphic: `
                <rect x="50" y="50" width="400" height="250" rx="10" fill="#e3f2fd" stroke="#3498db" stroke-width="2"/>
                <rect x="70" y="80" width="360" height="40" rx="5" fill="#3498db"/>
                <text x="250" y="105" text-anchor="middle" fill="white" font-weight="bold" font-size="16">Point of Sale System</text>
                <rect x="80" y="140" width="150" height="40" rx="5" fill="#bbdefb"/>
                <text x="155" y="165" text-anchor="middle" fill="#1976d2" font-size="14">Checkout</text>
                <rect x="250" y="140" width="150" height="40" rx="5" fill="#bbdefb"/>
                <text x="325" y="165" text-anchor="middle" fill="#1976d2" font-size="14">Inventory</text>
                <rect x="80" y="200" width="150" height="40" rx="5" fill="#bbdefb"/>
                <text x="155" y="225" text-anchor="middle" fill="#1976d2" font-size="14">Reports</text>
                <rect x="250" y="200" width="150" height="40" rx="5" fill="#bbdefb"/>
                <text x="325" y="225" text-anchor="middle" fill="#1976d2" font-size="14">Customers</text>
            `
        },
        notifications: {
            title: "SMS and Email Notifications",
            description: "Keep your customers informed every step of the way with automated SMS and email notifications. Send repair status updates, appointment reminders, payment confirmations, and promotional messages. Customize templates to match your brand voice and increase customer engagement.",
            graphic: `
                <rect x="50" y="50" width="400" height="250" rx="10" fill="#fce4ec" stroke="#e91e63" stroke-width="2"/>
                <rect x="70" y="80" width="360" height="40" rx="5" fill="#e91e63"/>
                <text x="250" y="105" text-anchor="middle" fill="white" font-weight="bold" font-size="16">Notification Center</text>
                <rect x="80" y="140" width="150" height="40" rx="5" fill="#f8bbd9"/>
                <text x="155" y="165" text-anchor="middle" fill="#ad1457" font-size="14">SMS Alerts</text>
                <rect x="250" y="140" width="150" height="40" rx="5" fill="#f8bbd9"/>
                <text x="325" y="165" text-anchor="middle" fill="#ad1457" font-size="14">Email Updates</text>
                <rect x="80" y="200" width="150" height="40" rx="5" fill="#f8bbd9"/>
                <text x="155" y="225" text-anchor="middle" fill="#ad1457" font-size="14">Templates</text>
                <rect x="250" y="200" width="150" height="40" rx="5" fill="#f8bbd9"/>
                <text x="325" y="225" text-anchor="middle" fill="#ad1457" font-size="14">Automation</text>
            `
        },
        employees: {
            title: "Employee Management",
            description: "Efficiently manage your team with comprehensive employee management tools. Track technician performance, assign repairs based on skill level, manage schedules, and control access permissions. Streamline payroll with integrated time tracking and performance reporting.",
            graphic: `
                <rect x="50" y="50" width="400" height="250" rx="10" fill="#e0f2f1" stroke="#009688" stroke-width="2"/>
                <rect x="70" y="80" width="360" height="40" rx="5" fill="#009688"/>
                <text x="250" y="105" text-anchor="middle" fill="white" font-weight="bold" font-size="16">Employee Dashboard</text>
                <rect x="80" y="140" width="150" height="40" rx="5" fill="#b2dfdb"/>
                <text x="155" y="165" text-anchor="middle" fill="#00695c" font-size="14">Performance</text>
                <rect x="250" y="140" width="150" height="40" rx="5" fill="#b2dfdb"/>
                <text x="325" y="165" text-anchor="middle" fill="#00695c" font-size="14">Scheduling</text>
                <rect x="80" y="200" width="150" height="40" rx="5" fill="#b2dfdb"/>
                <text x="155" y="225" text-anchor="middle" fill="#00695c" font-size="14">Permissions</text>
                <rect x="250" y="200" width="150" height="40" rx="5" fill="#b2dfdb"/>
                <text x="325" y="225" text-anchor="middle" fill="#00695c" font-size="14">Time Tracking</text>
            `
        },
        reporting: {
            title: "Business Reporting",
            description: "Make data-driven decisions with comprehensive business reporting and analytics. Track key performance indicators, monitor sales trends, analyze technician productivity, and identify profit margins. Export reports in multiple formats for further analysis and presentation.",
            graphic: `
                <rect x="50" y="50" width="400" height="250" rx="10" fill="#fff8e1" stroke="#ffb300" stroke-width="2"/>
                <rect x="70" y="80" width="360" height="40" rx="5" fill="#ffb300"/>
                <text x="250" y="105" text-anchor="middle" fill="white" font-weight="bold" font-size="16">Business Analytics</text>
                <rect x="80" y="140" width="150" height="40" rx="5" fill="#ffecb3"/>
                <text x="155" y="165" text-anchor="middle" fill="#b26a00" font-size="14">Sales Reports</text>
                <rect x="250" y="140" width="150" height="40" rx="5" fill="#ffecb3"/>
                <text x="325" y="165" text-anchor="middle" fill="#b26a00" font-size="14">Performance</text>
                <rect x="80" y="200" width="150" height="40" rx="5" fill="#ffecb3"/>
                <text x="155" y="225" text-anchor="middle" fill="#b26a00" font-size="14">Trends</text>
                <rect x="250" y="200" width="150" height="40" rx="5" fill="#ffecb3"/>
                <text x="325" y="225" text-anchor="middle" fill="#b26a00" font-size="14">Export Data</text>
            `
        },
        tickets: {
            title: "Repair Ticket Management",
            description: "Streamline your repair workflow with our comprehensive ticket management system. Create, track, and manage repair tickets from intake to completion. Assign tickets to technicians, update repair status in real-time, track parts inventory, and provide customers with accurate repair estimates.",
            graphic: `
                <rect x="50" y="50" width="400" height="250" rx="10" fill="#e8eaf6" stroke="#3f51b5" stroke-width="2"/>
                <rect x="70" y="80" width="360" height="40" rx="5" fill="#3f51b5"/>
                <text x="250" y="105" text-anchor="middle" fill="white" font-weight="bold" font-size="16">Repair Ticket System</text>
                <rect x="80" y="140" width="150" height="40" rx="5" fill="#c5cae9"/>
                <text x="155" y="165" text-anchor="middle" fill="#283593" font-size="14">Create Tickets</text>
                <rect x="250" y="140" width="150" height="40" rx="5" fill="#c5cae9"/>
                <text x="325" y="165" text-anchor="middle" fill="#283593" font-size="14">Assign Techs</text>
                <rect x="80" y="200" width="150" height="40" rx="5" fill="#c5cae9"/>
                <text x="155" y="225" text-anchor="middle" fill="#283593" font-size="14">Track Status</text>
                <rect x="250" y="200" width="150" height="40" rx="5" fill="#c5cae9"/>
                <text x="325" y="225" text-anchor="middle" fill="#283593" font-size="14">Inventory</text>
            `
        }
    };
    
    // Add event listeners to each feature item
    featureItems.forEach(item => {
        // Mouse enter event (hover)
        item.addEventListener('mouseenter', function() {
            // Remove active class from all items
            featureItems.forEach(i => {
                i.classList.remove('active');
            });
            
            // Add active class to hovered item
            this.classList.add('active');
            
            // Get the data-target attribute value
            const target = this.getAttribute('data-target');
            
            // Update content based on target
            if (featureContent[target]) {
                document.getElementById('feature-title').textContent = featureContent[target].title;
                document.getElementById('feature-description').textContent = featureContent[target].description;
                document.getElementById('feature-graphic').innerHTML = featureContent[target].graphic;
            }
        });
        
        // Click event as fallback for touch devices
        item.addEventListener('click', function() {
            // Remove active class from all items
            featureItems.forEach(i => {
                i.classList.remove('active');
            });
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Get the data-target attribute value
            const target = this.getAttribute('data-target');
            
            // Update content based on target
            if (featureContent[target]) {
                document.getElementById('feature-title').textContent = featureContent[target].title;
                document.getElementById('feature-description').textContent = featureContent[target].description;
                document.getElementById('feature-graphic').innerHTML = featureContent[target].graphic;
            }
        });
    });
});
