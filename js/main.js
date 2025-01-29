document.addEventListener('DOMContentLoaded', function() {
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
    });

    // Navbar scroll effect with smooth transition
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.style.background = 'rgba(26, 26, 26, 0.98)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.borderBottom = '1px solid rgba(255, 215, 0, 0.1)';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.backdropFilter = 'none';
            navbar.style.borderBottom = 'none';
        }

        // Hide/Show navbar on scroll
        if (currentScroll > lastScroll && currentScroll > 500) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
    });

    // Smooth scrolling with easing
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const targetPosition = target.offsetTop - 100;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 1000;
                let start = null;

                function animation(currentTime) {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const run = ease(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) requestAnimationFrame(animation);
                }

                function ease(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t + b;
                    t--;
                    return -c / 2 * (t * (t - 2) - 1) + b;
                }

                requestAnimationFrame(animation);
            }
        });
    });

    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.solution-card, .price-card, .section-title');
        const triggerBottom = window.innerHeight * 0.8;

        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initialize animation states
    document.querySelectorAll('.solution-card, .price-card, .section-title').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease-out';
    });

    // Trigger animations
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check

    // Price card hover effects
    document.querySelectorAll('.price-card').forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Contact form handling with validation and animation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Add focus effects
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });

            // Validate on input
            input.addEventListener('input', function() {
                validateInput(this);
            });
        });

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            inputs.forEach(input => {
                if (!validateInput(input)) {
                    isValid = false;
                }
            });

            if (isValid) {
                const formData = new FormData(contactForm);
                const button = contactForm.querySelector('button[type="submit"]');
                button.disabled = true;
                button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

                fetch('process_form.php', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        button.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                        button.classList.add('success');
                        contactForm.reset();
                        inputs.forEach(input => {
                            input.parentElement.classList.remove('focused');
                        });
                    } else {
                        throw new Error(data.message);
                    }
                })
                .catch(error => {
                    button.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error';
                    button.classList.add('error');
                    alert(error.message || 'Sorry, there was an error sending your message. Please try again later.');
                })
                .finally(() => {
                    button.disabled = false;
                    setTimeout(() => {
                        button.innerHTML = 'Schedule a Demo Today';
                        button.classList.remove('success', 'error');
                    }, 3000);
                });
            }
        });
    }

    function validateInput(input) {
        const value = input.value.trim();
        const parent = input.parentElement;
        
        // Remove existing error message
        const existingError = parent.querySelector('.error-message');
        if (existingError) {
            parent.removeChild(existingError);
        }

        // Validate based on input type
        let isValid = true;
        let errorMessage = '';

        if (!value) {
            isValid = false;
            errorMessage = 'This field is required';
        } else if (input.type === 'email' && !/\S+@\S+\.\S+/.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }

        // Show error if invalid
        if (!isValid) {
            const error = document.createElement('div');
            error.className = 'error-message';
            error.textContent = errorMessage;
            parent.appendChild(error);
            parent.classList.add('error');
        } else {
            parent.classList.remove('error');
        }

        return isValid;
    }

    // Particle effect in hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const particleCount = 50;
        const particles = document.createElement('div');
        particles.className = 'particles';
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.setProperty('--x', `${Math.random() * 100}%`);
            particle.style.setProperty('--y', `${Math.random() * 100}%`);
            particle.style.setProperty('--duration', `${2 + Math.random() * 4}s`);
            particle.style.setProperty('--delay', `${-Math.random() * 4}s`);
            particles.appendChild(particle);
        }
        
        heroSection.appendChild(particles);
    }
});
