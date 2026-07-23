/* DARK MODE / LIGHT MODE */

const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Applique le thème et le sauvegarde dans le localStorage
function appliquerTheme(theme) {
    if (theme === 'dark') {
        htmlElement.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
    } else {
        htmlElement.removeAttribute('data-theme');
        themeToggle.textContent = '🌙';
    }
    localStorage.setItem('theme', theme);
}

// Restaure le thème sauvegardé au chargement
const themeSauvegarde = localStorage.getItem('theme');
if (themeSauvegarde) {
    appliquerTheme(themeSauvegarde);
}

// Bascule le thème au clic
themeToggle.addEventListener('click', () => {
    const themeActuel = htmlElement.getAttribute('data-theme');
    appliquerTheme(themeActuel === 'dark' ? 'light' : 'dark');
});
/* NAVBAR AU SCROLL + MENU HAMBURGER */

const header = document.querySelector('header');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

// Ajoute la classe .scrolled après 80px de défilement
window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Ouvre/ferme le menu mobile au clic sur le hamburger
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

// Ferme le menu si on clique sur un lien (utile en mobile)
document.querySelectorAll('.nav-links a').forEach(lien => {
    lien.addEventListener('click', () => {
        navLinks.classList.remove('open');
    });
});
/* ANNÉE DYNAMIQUE DANS LE FOOTER */

const yearSpan = document.getElementById('year');
yearSpan.textContent = new Date().getFullYear();


/* BOUTON RETOUR EN HAUT */

const backToTopBtn = document.getElementById('back-to-top');

// Affiche/cache le bouton selon la position de scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

// Remonte en douceur au clic
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
/* ONGLETS DU PROGRAMME */

const ongletBtns = document.querySelectorAll('.onglet-btn');

// On vérifie que ces boutons existent avant d'ajouter la logique
// (ils n'existent que sur programme.html)
if (ongletBtns.length > 0) {
    ongletBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const jourCible = btn.dataset.jour; // ex: "jour1", "jour2"...

            // On retire "active" de tous les boutons et contenus
            document.querySelectorAll('.onglet-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.onglet-contenu').forEach(c => c.classList.remove('active'));

            // On active uniquement le bouton cliqué et le contenu correspondant
            btn.classList.add('active');
            document.getElementById(jourCible).classList.add('active');
        });
    });
}
