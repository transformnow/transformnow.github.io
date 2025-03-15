document.addEventListener('DOMContentLoaded', function() {
    // Get the modal
    const modal = document.getElementById('payment-modal');
    
    // Make sure the modal starts hidden
    if (modal) {
        modal.style.display = 'none';
    }
    
    // Only get buttons with exact text "Get Instant Access Now"
    const accessButtons = document.querySelectorAll('a.btn-primary.float');
    const accessNowButtons = Array.from(accessButtons).filter(button => 
        button.textContent.trim() === 'Get Instant Access Now'
    );
    
    // Get the close button
    const closeButton = document.querySelector('.close-modal');
    
    // When the user clicks on the "Get Instant Access Now" button, open the modal
    accessNowButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
            }
        });
    });
    
    // When the user clicks on the close button, close the modal
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Re-enable scrolling
        });
    }
    
    // When the user clicks anywhere outside of the modal content, close it
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Re-enable scrolling
        }
    });

        
        // Payment tab functionality
        const paymentTabs = document.querySelectorAll('.payment-tab');
        const paymentContents = document.querySelectorAll('.payment-tab-content');
        
        paymentTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs
                paymentTabs.forEach(t => {
                    t.classList.remove('active');
                });
                
                // Add active class to clicked tab
                tab.classList.add('active');
                
                // Hide all content sections
                paymentContents.forEach(content => {
                    content.classList.remove('active');
                });
                
                // Show the corresponding content
                const method = tab.getAttribute('data-method');
                document.getElementById(`${method}-payment`).classList.add('active');
            });
        });
        
        // Credit card input formatting
        const cardNumberInput = document.getElementById('card-number');
        if (cardNumberInput) {
            cardNumberInput.addEventListener('input', function(e) {
                let value = e.target.value;
                
                // Remove all non-digits
                value = value.replace(/\D/g, '');
                
                // Add spaces after every 4 digits
                value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
                
                e.target.value = value;
            });
        }
        
        // Expiry date formatting
        const expiryInput = document.getElementById('expiry');
        if (expiryInput) {
            expiryInput.addEventListener('input', function(e) {
                let value = e.target.value;
                
                // Remove all non-digits
                value = value.replace(/\D/g, '');
                
                // Insert slash after 2 digits
                if (value.length > 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2);
                }
                
                e.target.value = value;
            });
        }
        
        // Form submission
        const paymentForm = document.getElementById('payment-form');
        if (paymentForm) {
            paymentForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // In a real implementation, you would handle the payment processing here
                alert('Thank you for your purchase! Check your email for the digital guide and Discord invitation.');
                modal.style.display = 'none';
                document.body.style.overflow = ''; // Re-enable scrolling
            });
        }
    });
        // Toggle mobile menu
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navLinks = document.getElementById('navLinks');
        
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        // Shrink header on scroll
        const header = document.getElementById('header');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    navLinks.classList.remove('active');
                }
            });
        });
        
        // Chapter accordion functionality
        const chapterAccordions = document.querySelectorAll('.chapter-accordion');
        
        chapterAccordions.forEach(accordion => {
            const header = accordion.querySelector('.chapter-header');
            
            header.addEventListener('click', () => {
                accordion.classList.toggle('active');
            });
        });
        
        // FAQ accordion functionality
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                item.classList.toggle('active');
            });
        });
        
        // Testimonial slider functionality
        const testimonialSlides = document.querySelectorAll('.testimonial-slide');
        const sliderDots = document.querySelectorAll('.slider-dot');
        let currentSlide = 0;
        
        function showSlide(index) {
            testimonialSlides.forEach(slide => {
                slide.classList.remove('active');
            });
            
            sliderDots.forEach(dot => {
                dot.classList.remove('active');
            });
            
            testimonialSlides[index].classList.add('active');
            sliderDots[index].classList.add('active');
            currentSlide = index;
        }
        
        sliderDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
            });
        });
        
        // Auto-advance testimonials
        setInterval(() => {
            let nextSlide = currentSlide + 1;
            if (nextSlide >= testimonialSlides.length) {
                nextSlide = 0;
            }
            showSlide(nextSlide);
        }, 6000);
        
        // Fade-in animation on scroll
        const fadeElements = document.querySelectorAll('.fade-in');
        
        function checkFade() {
            fadeElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementBottom = element.getBoundingClientRect().bottom;
                
                if (elementTop < window.innerHeight - 50 && elementBottom > 0) {
                    element.classList.add('visible');
                }
            });
        }
        
        window.addEventListener('scroll', checkFade);
        window.addEventListener('resize', checkFade);
        
        // Initial check for elements in view
        checkFade();
        
        // Countdown timer functionality
        function updateCountdown() {
            // Set the target date (48 hours from now)
            const now = new Date();
            const target = new Date(now);
            target.setHours(now.getHours() + 48);
            
            const difference = target - now;
            
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);
            
            document.getElementById('countdown-days').innerText = String(days).padStart(2, '0');
            document.getElementById('countdown-hours').innerText = String(hours).padStart(2, '0');
            document.getElementById('countdown-minutes').innerText = String(minutes).padStart(2, '0');
            document.getElementById('countdown-seconds').innerText = String(seconds).padStart(2, '0');
        }
        
        setInterval(updateCountdown, 1000);
        updateCountdown();