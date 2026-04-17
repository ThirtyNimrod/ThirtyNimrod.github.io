/* script.js — Portfolio Interactions */
(function () {
    'use strict';

    const html  = document.documentElement;
    const glitch = document.getElementById('glitch-overlay');
    const toggleBtn = document.getElementById('mode-toggle');
    const dayView   = document.getElementById('day-view');
    const nightView = document.getElementById('night-view');
    const navLinks  = document.getElementById('nav-links');
    const toggleIcon = document.getElementById('toggle-icon');

    // ── NAV LINK SETS ─────────────────────────────────────────────
    const DAY_LINKS = [
        { href: '#d-top',      label: 'TOP' },
        { href: '#d-work',     label: 'WORK' },
        { href: '#d-projects', label: 'PROJECTS' },
        { href: '#d-skills',   label: 'SKILLS' },
        { href: '#d-certs',    label: 'CERTS' },
    ];
    const NIGHT_LINKS = [
        { href: '#n-top',   label: 'TOP' },
        { href: '#n-vibe',  label: 'VIBE' },
        { href: '#n-quote', label: 'QUOTE' },
    ];

    function buildNavLinks(links) {
        navLinks.innerHTML = links
            .map(l => `<a href="${l.href}">${l.label}</a>`)
            .join('');
    }

    // ── THEME STATE ───────────────────────────────────────────────
    let currentTheme = localStorage.getItem('portfolio-theme') || 'day';

    function applyTheme(theme, animate) {
        if (animate) {
            glitch.classList.add('flash');
            setTimeout(() => {
                setTheme(theme);
                setTimeout(() => glitch.classList.remove('flash'), 180);
            }, 160);
        } else {
            setTheme(theme);
        }
    }

    function setTheme(theme) {
        currentTheme = theme;
        html.setAttribute('data-theme', theme);
        localStorage.setItem('portfolio-theme', theme);

        if (theme === 'day') {
            dayView.classList.add('active');
            nightView.classList.remove('active');
            buildNavLinks(DAY_LINKS);
            toggleIcon.textContent = '🌙';
        } else {
            nightView.classList.add('active');
            dayView.classList.remove('active');
            buildNavLinks(NIGHT_LINKS);
            toggleIcon.textContent = '☀️';
        }

        // Re-trigger reveal observer for newly active section
        setTimeout(checkReveals, 100);
    }

    toggleBtn.addEventListener('click', () => {
        applyTheme(currentTheme === 'day' ? 'night' : 'day', true);
    });

    // Initial apply (no animation)
    applyTheme(currentTheme, false);

    // ── SCROLL REVEAL ─────────────────────────────────────────────
    function checkReveals() {
        const items = document.querySelectorAll('.reveal, .reveal-night');
        if (!items.length) return;

        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry, i) => {
                    if (entry.isIntersecting) {
                        // Stagger children in the same parent
                        const siblings = entry.target.parentElement
                            ? [...entry.target.parentElement.querySelectorAll('.reveal, .reveal-night')]
                            : [];
                        const sibIdx = siblings.indexOf(entry.target);
                        const delay = sibIdx * 90;

                        setTimeout(() => {
                            entry.target.classList.add('in-view');
                        }, delay);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.12 });

            items.forEach(el => {
                if (!el.classList.contains('in-view')) {
                    observer.observe(el);
                }
            });
        } else {
            // Fallback: show everything
            items.forEach(el => el.classList.add('in-view'));
        }
    }

    // ── NAV HIGHLIGHT on scroll ───────────────────────────────────
    document.addEventListener('scroll', () => {
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => link.classList.remove('active'));

        let current = null;
        links.forEach(link => {
            const target = document.querySelector(link.getAttribute('href'));
            if (target && target.getBoundingClientRect().top <= 120) {
                current = link;
            }
        });
        if (current) current.classList.add('active');
    }, { passive: true });

})();
