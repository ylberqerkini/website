// This file contains JavaScript code for animations on the website.

document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(animateOnScroll, options);

    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
});