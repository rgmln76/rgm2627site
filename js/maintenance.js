(
    function () {
    const dialog = document.getElementById('notifyDialog');
    const openBtn = document.getElementById('notifyOpen');
    const form = document.getElementById('notifyForm');
    const emailInput = document.getElementById('notifyEmail');
    const errorEl = document.getElementById('notifyError');
    const cancelBtn = document.getElementById('notifyCancel');
    const submitBtn = document.getElementById('notifySubmit');
    const doneBox = document.getElementById('notifyDone');
    const closeBtn = document.getElementById('notifyClose');
    if (!dialog || !openBtn || !form) return;

    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const submitLabel = submitBtn.innerHTML;

    function showError(text) {
        errorEl.textContent = text;
        errorEl.hidden = false;
        emailInput.setAttribute('aria-invalid', 'true');
    }
    function clearError() {
        errorEl.hidden = true;
        errorEl.textContent = '';
        emailInput.removeAttribute('aria-invalid');
    }
    function setLoading(on) {
        submitBtn.disabled = on;
        cancelBtn.disabled = on;
        submitBtn.innerHTML = on ? '<i class="fas fa-spinner fa-spin"></i> Mengirim' : submitLabel;
    }
    function resetState() {
        form.hidden = false;
        doneBox.hidden = true;
        form.reset();
        clearError();
        setLoading(false);
    }

    function openDialog() {
        resetState();
        if (typeof dialog.showModal === 'function') dialog.showModal();
        else dialog.setAttribute('open', '');
        emailInput.focus();
    }
    function closeDialog() {
        if (typeof dialog.close === 'function') dialog.close();
        else dialog.removeAttribute('open');
    }

    openBtn.addEventListener('click', openDialog);
    cancelBtn.addEventListener('click', closeDialog);
    closeBtn.addEventListener('click', closeDialog);
    dialog.addEventListener('click', function (e) { if (e.target === dialog) closeDialog(); });
    emailInput.addEventListener('input', clearError);

    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        const email = emailInput.value.trim();
        if (!EMAIL_RE.test(email)) {
            showError('Masukkan alamat email yang valid, contoh: nama@email.com');
            emailInput.focus();
            return;
        }
        clearError();
        setLoading(true);
        try {
            const data = new FormData(form);
            data.set('email', email);
            data.append('_subject', 'Remind Me - RGM');
            const res = await fetch(FORM_ENDPOINT, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
            const json = await res.json().catch(function () { return {}; });
            if (!res.ok || String(json.success) === 'false') throw new Error('gagal kirim');
            form.hidden = true;
            doneBox.hidden = false;
            closeBtn.focus();
        } catch (err) {
            showError('Maaf, email tidak berhasil terkirim. Periksa koneksi internet Anda lalu coba lagi.');
            emailInput.focus();
        } finally {
            setLoading(false);
        }
    });
})();
