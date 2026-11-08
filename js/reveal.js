const revealElements = document.querySelectorAll('.reveal');
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) { entry.target.classList.add('active'); revealObserver.unobserve(entry.target); }
            });
        }, { threshold: 0.1 });
        revealElements.forEach(el => revealObserver.observe(el));