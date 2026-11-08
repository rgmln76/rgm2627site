(function () {
    const wrapper = document.querySelector('.hero-logo-wrapper');
    const spin = document.querySelector('.hologram-spin-container');
    if (!wrapper || !spin) return;

    let angle = 0, startX = 0, startAngle = 0, dragging = false;
    let lastX = 0, lastT = 0, resetTimer = null, fastTimer = null;

    function apply(a) { spin.style.transform = `rotateY(${a}deg)`; }

    wrapper.addEventListener('pointerdown', (e) => {
        if (e.button !== undefined && e.button !== 0) return;
        dragging = true;
        clearTimeout(resetTimer);
        spin.classList.add('user-controlled');
        spin.style.transition = 'none';
        startX = lastX = e.clientX;
        lastT = performance.now();
        startAngle = angle;
        wrapper.setPointerCapture(e.pointerId);
        wrapper.classList.add('dragging');
    });

    wrapper.addEventListener('pointermove', (e) => {
        if (!dragging) return;
        angle = startAngle + (e.clientX - startX) * 0.5;
        apply(angle);
        const now = performance.now();
        const speed = Math.abs(e.clientX - lastX) / Math.max(now - lastT, 1);
        lastX = e.clientX;
        lastT = now;
        if (speed > 0.8) {
            spin.classList.add('fast-spin');
            clearTimeout(fastTimer);
            fastTimer = setTimeout(() => spin.classList.remove('fast-spin'), 600);
        }
    });

    function release() {
        if (!dragging) return;
        dragging = false;
        wrapper.classList.remove('dragging');
        resetTimer = setTimeout(() => {
            spin.style.transition = 'transform 1s ease';
            apply(0);
            angle = 0;
            setTimeout(() => {
                spin.style.transition = '';
                spin.style.transform = '';
                spin.classList.remove('user-controlled');
            }, 1000);
        }, 2500);
    }
    wrapper.addEventListener('pointerup', release);
    wrapper.addEventListener('pointercancel', release);
})();