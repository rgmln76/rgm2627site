(function () {
    var KEY = 'rgm-theme';
    var root = document.documentElement;

    function read() {
        try { return localStorage.getItem(KEY); } catch (e) { return null; }
    }
    function write(value) {
        try { localStorage.setItem(KEY, value); } catch (e) { /* mode privat: abaikan */ }
    }
    function isDark() { return root.getAttribute('data-theme') === 'dark'; }

    if (read() === 'dark') root.setAttribute('data-theme', 'dark');

    var button = null;

    function sync() {
        var dark = isDark();
        var meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute('content', dark ? '#0b1120' : '#1a2744');
        if (button) {
            button.setAttribute('aria-checked', dark ? 'true' : 'false');
            button.title = dark ? 'Ganti ke mode terang' : 'Ganti ke mode gelap';
        }
    }

    function apply(theme) {
        if (theme === 'dark') root.setAttribute('data-theme', 'dark');
        else root.removeAttribute('data-theme');
        sync();
    }

    function toggle() {
        var next = isDark() ? 'light' : 'dark';
        var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!reduce) {
            root.classList.add('theme-anim');
            setTimeout(function () { root.classList.remove('theme-anim'); }, 450);
        }
        apply(next);
        write(next);
    }

    var SUN = '<svg class="ts-icon ts-sun" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
              '<circle cx="12" cy="12" r="4.2" fill="currentColor"/>' +
              '<path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M5.3 5.3L7 7M17 17l1.7 1.7M5.3 18.7L7 17M17 7l1.7-1.7" ' +
              'stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/></svg>';
    var MOON = '<svg class="ts-icon ts-moon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
               '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor"/></svg>';

    function build() {
        button = document.createElement('button');
        button.type = 'button';
        button.id = 'themeSwitch';
        button.className = 'theme-switch';
        button.setAttribute('role', 'switch');
        button.setAttribute('aria-label', 'Mode gelap');
        button.innerHTML = SUN + MOON + '<span class="theme-switch-knob"></span>';
        button.addEventListener('click', toggle);
        document.body.appendChild(button);
        sync();
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
    else build();

    // Sincronyze with other tabs
    window.addEventListener('storage', function (e) {
        if (e.key === KEY) apply(e.newValue === 'dark' ? 'dark' : 'light');
    });
})();