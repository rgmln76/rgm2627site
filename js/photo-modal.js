        document.addEventListener('DOMContentLoaded', function () {
            const modal = document.getElementById('photoModal');
            const modalImg = document.getElementById('modalImage');
            const closeBtn = document.getElementById('modalClose');

            // Add click listeners to all cards
            const cards = document.querySelectorAll('.staff-card, .team-card, .about-img-main, .about-img-small, .gallery-item');

            cards.forEach(card => {
                card.addEventListener('click', function (e) {
                    const img = this.querySelector('img');
                    if (img && img.src) {
                        e.preventDefault();
                        modalImg.src = img.src;
                        modal.classList.add('active');
                    }
                });
            });

            // Close modal when clicking on close button
            closeBtn.addEventListener('click', function () {
                modal.classList.remove('active');
            });

            // Close modal when clicking outside the image
            modal.addEventListener('click', function (e) {
                if (e.target === modal || e.target.classList.contains('modal-img-wrapper')) {
                    modal.classList.remove('active');
                }
            });

            // Optional: Close on Escape key
            document.addEventListener('keydown', function (e) {
                if (e.key === 'Escape' && modal.classList.contains('active')) {
                    modal.classList.remove('active');
                }
            });
        });
    