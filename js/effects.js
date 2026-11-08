document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section, .hero, .programs, .impact, .team, .gallery, .contact');
    sections.forEach(section => {
        if (!section.querySelector('.section-falling-logo')) {
            const bg = document.createElement('div');
            bg.className = 'section-falling-logo';
            section.insertBefore(bg, section.firstChild);
        }
    });
});