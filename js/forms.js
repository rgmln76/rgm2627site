const FORM_ENDPOINT = 'https://formsubmit.co/rgmln76@gmail.com';

document.getElementById('contactForm').addEventListener('submit', function (e) {
            e.preventDefault();
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';

            const formData = new FormData(this);
            formData.append('_subject', 'Saran & Masukan Baru - Web RGM');

            fetch(FORM_ENDPOINT, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                btn.disabled = false;
                btn.innerHTML = originalText;
                if (data.success === 'true' || data.success === true) {
                    alert('Terima kasih! Pesan anda berhasil terkirim langsung ke email kami.');
                    this.reset();
                } else {
                    alert('Maaf, terjadi kesalahan saat mengirim pesan. Silakan coba lagi.');
                }
            })
            .catch(error => {
                btn.disabled = false;
                btn.innerHTML = originalText;
                alert('Terima kasih! Kotak saran Anda telah terkirim.');
                this.reset();
            });
        });

        const newsletterFooterForm = document.getElementById('newsletterFooterForm');
        if (newsletterFooterForm) {
            newsletterFooterForm.addEventListener('submit', function (e) {
                e.preventDefault();
                const btn = this.querySelector('button[type="submit"]');
                const originalText = btn.innerHTML;
                btn.disabled = true;
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

                const formData = new FormData(this);
                formData.append('_subject', 'Langganan Newsletter Baru (Footer) - Web RGM');

                fetch(FORM_ENDPOINT, {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    btn.disabled = false;
                    btn.innerHTML = originalText;
                    alert('Terima kasih! Email Anda berhasil didaftarkan ke newsletter kami.');
                    this.reset();
                })
                .catch(error => {
                    btn.disabled = false;
                    btn.innerHTML = originalText;
                    alert('Terima kasih! Email Anda telah didaftarkan.');
                    this.reset();
                });
            });
        }

        const newsletterPremiumForm = document.getElementById('newsletterPremiumForm');
        if (newsletterPremiumForm) {
            newsletterPremiumForm.addEventListener('submit', function (e) {
                e.preventDefault();
                const btn = this.querySelector('button[type="submit"]');
                const originalText = btn.innerHTML;
                btn.disabled = true;
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mendaftarkan...';

                const formData = new FormData(this);
                formData.append('_subject', 'Langganan Berita RGM Baru - Web RGM');

                fetch(FORM_ENDPOINT, {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    btn.disabled = false;
                    btn.innerHTML = originalText;
                    alert('Terima kasih! Email Anda telah berhasil terdaftar untuk mendapatkan berita terbaru.');
                    this.reset();
                })
                .catch(error => {
                    btn.disabled = false;
                    btn.innerHTML = originalText;
                    alert('Terima kasih! Email Anda telah terdaftar.');
                    this.reset();
                });
            });
        }
