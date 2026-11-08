document.addEventListener('DOMContentLoaded', function () {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const newsCards = document.querySelectorAll('.news-card, .featured-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            newsCards.forEach(card => {
                card.classList.remove('fade-in');

                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.classList.remove('hidden');
                    void card.offsetWidth;
                    card.classList.add('fade-in');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
});