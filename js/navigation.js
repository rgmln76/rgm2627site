const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) { navbar.classList.add('scrolled'); } else { navbar.classList.remove('scrolled'); }
        });

        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileOverlay = document.getElementById('mobileOverlay');
        const mobileClose = document.getElementById('mobileClose');
        const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

        function openMenu() { mobileMenu.classList.add('active'); mobileOverlay.classList.add('active'); document.body.style.overflow = 'hidden'; }
        function closeMenu() { mobileMenu.classList.remove('active'); mobileOverlay.classList.remove('active'); document.body.style.overflow = ''; }

        hamburger.addEventListener('click', openMenu);
        mobileClose.addEventListener('click', closeMenu);
        mobileOverlay.addEventListener('click', closeMenu);
        mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                if (this.getAttribute('href').length < 2 || this.hasAttribute('onclick')) return;
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) { target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
            });
        });

        const navLinks = document.querySelectorAll('.nav-links a');
        const sections = document.querySelectorAll('section[id]');
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => { const sectionTop = section.offsetTop - 100; if (scrollY >= sectionTop) { current = section.getAttribute('id'); } });
            navLinks.forEach(link => { link.classList.remove('active'); if (link.getAttribute('href') === '#' + current) { link.classList.add('active'); } });
        });

if (hamburger) {
    hamburger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openMenu(); }
    });
}
