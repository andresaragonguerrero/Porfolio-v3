document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('.menu-button');
    const closeBtn = document.querySelector('#closeMenu');
    const overlay = document.querySelector('#menuOverlay');
    const links = document.querySelectorAll('.menu-content .nav-link');

    // Comprobamos que los elementos existen antes de añadir el listener
    if (menuBtn && overlay && closeBtn) {

        // Abrir
        menuBtn.addEventListener('click', () => {
            overlay.classList.add('is-open');
            document.body.style.overflow = 'hidden';
        });

        // Cerrar
        const closeMenu = () => {
            overlay.classList.remove('is-open');
            document.body.style.overflow = 'auto';
        };

        closeBtn.addEventListener('click', closeMenu);

        // Cerrar al pulsar links
        links.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

    } else {
        console.error("No se han encontrado los elementos del menú. Revisa las clases e IDs.");
    }
});

const menuBtn = document.querySelector('.menu-button');
const closeBtn = document.getElementById('closeMenu');
const overlay = document.getElementById('menuOverlay');
const links = document.querySelectorAll('.menu-content .nav-link');

// Abrir
menuBtn.addEventListener('click', () => {
    overlay.classList.add('is-open');
});

// Cerrar
const closeMenu = () => overlay.classList.remove('is-open');

closeBtn.addEventListener('click', closeMenu);

// Cerrar automáticamente al pulsar un enlace
links.forEach(link => link.addEventListener('click', closeMenu));

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card-project');
    const bgContainer = document.querySelector('.projects__backgrounds');

    if (cards.length && bgContainer) {
        cards.forEach((card) => {
            const projectName = card.getAttribute('data-project');
            const bgLayer = document.createElement('div');
            bgLayer.classList.add('projects__bg-layer');
            bgLayer.setAttribute('data-bg', projectName);
            bgLayer.style.setProperty('--bg-current-project', `var(--bg-${projectName})`);
            bgContainer.appendChild(bgLayer);
        });

        const observerOptions = {
            root: null,
            rootMargin: '0% -20% 0% -20%',
            threshold: 0
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                const activeProject = entry.target.getAttribute('data-project');
                const targetBg = bgContainer.querySelector(`[data-bg="${activeProject}"]`);

                if (entry.isIntersecting) {
                    bgContainer.querySelectorAll('.projects__bg-layer').forEach(layer => {
                        layer.classList.remove('is-active');
                    });
                    if (targetBg) targetBg.classList.add('is-active');
                } else {
                    if (targetBg && targetBg.classList.contains('is-active')) {
                        targetBg.classList.remove('is-active');
                    }
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        cards.forEach((card) => observer.observe(card));
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const animatedTexts = document.querySelectorAll('.text-reveal-effect');
    const animatedTitles = document.querySelectorAll('.title-reveal-effect');
    const animatedCards = document.querySelectorAll('.card-reveal-effect');
    const animatedPoly = document.querySelectorAll('.poly-reveal-effect');

    const observerOptions = {
        root: null,
        threshold: 0.8
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedTexts.forEach(text => observer.observe(text));
    animatedTitles.forEach(title => observer.observe(title));
    animatedCards.forEach(card => observer.observe(card));
    animatedPoly.forEach(poly => observer.observe(poly));
});

document.addEventListener("DOMContentLoaded", () => {
    const dateElement = document.getElementById("current-date");
    const today = new Date();
    const formatter = new Intl.DateTimeFormat('es-ES', {
        weekday: 'long',
        day: '2-digit', 
        month: 'long',   
        year: 'numeric'  
    });

    let formattedDate = formatter.format(today);

    formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

    if (dateElement) {
        dateElement.textContent = formattedDate;
    }
});
