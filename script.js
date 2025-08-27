// Simple script for any shared functionality across pages
document.addEventListener('DOMContentLoaded', () => {
    // Add any shared functionality here
    console.log('Portfolio loaded successfully!');
    
    // Add smooth animations to any elements with the 'animate-in' class
    const animateElements = document.querySelectorAll('.animate-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s, transform 0.6s';
        observer.observe(el);
    });
    
    // Theme dropdown integration for all pages
    const themeDropdown = document.getElementById('themeDropdown');
    if (themeDropdown) {
        const themeClasses = [
            'theme-virtual-reality',
            'theme-quantum-flux',
            'theme-electric-city',
            'theme-glitch-vibes'
        ];
        themeDropdown.addEventListener('change', function() {
            themeClasses.forEach(cls => document.body.classList.remove(cls));
            document.body.classList.add('theme-' + themeDropdown.value);
        });
    }
});
