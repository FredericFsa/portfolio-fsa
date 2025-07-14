// edge-fixes.js - Correctifs supplémentaires pour Edge

if (/Edg|Edge/.test(navigator.userAgent)) {
    // Correction pour les transitions CSS
    document.documentElement.classList.add('edge-browser');
    
    // Fallback pour les animations
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => {
        el.style.transition = 'none';
        setTimeout(() => {
            el.style.transition = '';
        }, 100);
    });
    
    // Force le repaint après chargement
    window.addEventListener('load', () => {
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            document.body.style.overflow = '';
        }, 100);
    });
}