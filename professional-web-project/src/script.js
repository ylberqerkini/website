document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const navList = document.getElementById('nav-list');

    menuToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    const progressBar = document.getElementById('myBar');
    let width = 0;
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
        } else {
            width++;
            progressBar.style.width = width + '%';
        }
    }, 30);

    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        const windowHeight = window.innerHeight;

        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < windowHeight - 100) {
                element.classList.add('fade-in');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check
});