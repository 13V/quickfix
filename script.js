// Navbar scroll effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handling
const quoteForm = document.getElementById('quoteForm');

quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(quoteForm);
    const data = Object.fromEntries(formData);

    // In a real implementation, you would send this to a server
    console.log('Quote request submitted:', data);

    // Show success message
    const urgency = data.urgency;
    let message = 'Thank you for your quote request! ';

    if (urgency === 'emergency') {
        message += 'For emergency service, please call us immediately at 0400 000 000.';
    } else {
        message += 'We will contact you shortly at ' + data.phone + ' to discuss your requirements.';
    }

    alert(message);

    // Reset form
    quoteForm.reset();
});

// Floating emergency button - show/hide on scroll
const floatingEmergency = document.getElementById('floatingEmergency');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 500) {
        floatingEmergency.style.display = 'flex';
    } else {
        floatingEmergency.style.display = 'none';
    }

    lastScroll = currentScroll;
});

// Initialize floating button
if (window.pageYOffset <= 500) {
    floatingEmergency.style.display = 'none';
}

// Scroll animations for service cards
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

// Observe service cards and other elements
document.querySelectorAll('.service-card, .feature-item, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
