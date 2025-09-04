document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Hover effects for project cards
    const projectCards = document.querySelectorAll('.project-card, .project-card1');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('hover');
        });
        card.addEventListener('mouseleave', () => {
            card.classList.remove('hover');
        });
    });

    // Fade-in effect for sections on scroll
    const sections = document.querySelectorAll('section');
    const options = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });
});