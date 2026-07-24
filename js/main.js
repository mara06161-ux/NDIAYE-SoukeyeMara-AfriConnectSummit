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
/* FILTRAGE DYNAMIQUE DES INTERVENANTS */

const filtreBtns = document.querySelectorAll('.filtre-btn');

if (filtreBtns.length > 0) {
    const intervenantCards = document.querySelectorAll('.intervenant-card');

    filtreBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filtreCible = btn.dataset.filtre; // ex: "ia-tech", "tous"...

            // On met à jour le bouton actif
            filtreBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // On affiche/masque chaque carte selon sa thématique
            intervenantCards.forEach(card => {
                const thematiqueCard = card.dataset.thematique;

                if (filtreCible === 'tous' || filtreCible === thematiqueCard) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}
/* VALIDATION DU FORMULAIRE DE CONTACT */

const formInscription = document.getElementById('form-inscription');

if (formInscription) {
    const champNom = document.getElementById('nom');
    const champEmail = document.getElementById('email');
    const champTelephone = document.getElementById('telephone');
    const champParticipation = document.getElementById('participation');
    const champPays = document.getElementById('pays');
    const champMessage = document.getElementById('message');
    const successMessage = document.getElementById('success-message');

    // Fonction générique pour afficher une erreur sur un champ
    function afficherErreur(champ, idErreur, texteErreur) {
        champ.classList.add('invalid');
        champ.classList.remove('valid');
        document.getElementById(idErreur).textContent = texteErreur;
    }

    // Fonction générique pour valider un champ (pas d'erreur)
    function afficherValide(champ, idErreur) {
        champ.classList.add('valid');
        champ.classList.remove('invalid');
        document.getElementById(idErreur).textContent = '';
    }

    // Validation à la soumission du formulaire
    formInscription.addEventListener('submit', (event) => {
        event.preventDefault(); // empêche le rechargement de la page

        let formulaireValide = true; // on suppose valide, on invalide si besoin

        // --- Nom complet : juste requis, pas vide ---
        if (champNom.value.trim() === '') {
            afficherErreur(champNom, 'error-nom', 'Le nom complet est requis.');
            formulaireValide = false;
        } else {
            afficherValide(champNom, 'error-nom');
        }

        // --- Email : requis + format valide via regex ---
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (champEmail.value.trim() === '') {
            afficherErreur(champEmail, 'error-email', 'L\'email est requis.');
            formulaireValide = false;
        } else if (!regexEmail.test(champEmail.value)) {
            afficherErreur(champEmail, 'error-email', 'Format d\'email invalide.');
            formulaireValide = false;
        } else {
            afficherValide(champEmail, 'error-email');
        }

        // --- Téléphone : requis + minimum 8 chiffres ---
        const chiffresUniquement = champTelephone.value.replace(/\D/g, ''); // enlève tout sauf les chiffres
        if (champTelephone.value.trim() === '') {
            afficherErreur(champTelephone, 'error-telephone', 'Le téléphone est requis.');
            formulaireValide = false;
        } else if (chiffresUniquement.length < 8) {
            afficherErreur(champTelephone, 'error-telephone', 'Minimum 8 chiffres requis.');
            formulaireValide = false;
        } else {
            afficherValide(champTelephone, 'error-telephone');
        }

        // --- Type de participation : requis (select non vide) ---
        if (champParticipation.value === '') {
            afficherErreur(champParticipation, 'error-participation', 'Veuillez choisir une option.');
            formulaireValide = false;
        } else {
            afficherValide(champParticipation, 'error-participation');
        }

        // --- Pays : requis (select non vide) ---
        if (champPays.value === '') {
            afficherErreur(champPays, 'error-pays', 'Veuillez choisir un pays.');
            formulaireValide = false;
        } else {
            afficherValide(champPays, 'error-pays');
        }

        // --- Message : requis + minimum 20 caractères ---
        if (champMessage.value.trim() === '') {
            afficherErreur(champMessage, 'error-message', 'Le message est requis.');
            formulaireValide = false;
        } else if (champMessage.value.trim().length < 20) {
            afficherErreur(champMessage, 'error-message', 'Minimum 20 caractères requis.');
            formulaireValide = false;
        } else {
            afficherValide(champMessage, 'error-message');
        }

        // --- Si tout est valide : succès + reset ---
        if (formulaireValide) {
            successMessage.classList.add('visible');
            formInscription.reset();

            // On retire aussi les classes valid/invalid après reset
            document.querySelectorAll('.form-group input, .form-group select, .form-group textarea')
                .forEach(champ => champ.classList.remove('valid', 'invalid'));

            // Le message de succès disparaît après quelques secondes
            setTimeout(() => {
                successMessage.classList.remove('visible');
            }, 4000);
        }
    });
}
/* ANIMATIONS AU SCROLL (IntersectionObserver) */

// On observe toutes les sections + cartes qu'on veut animer à l'apparition
const elementsAAnimer = document.querySelectorAll(
    'section, .stat-card, .raison-card, .intervenant-card, .thematique-card'
);

const observerAnimations = new IntersectionObserver((entrees) => {
    entrees.forEach(entree => {
        if (entree.isIntersecting) {
            entree.target.classList.add('visible');
            observerAnimations.unobserve(entree.target); // on arrête d'observer une fois animé
        }
    });
}, {
    threshold: 0.15 // se déclenche quand 15% de l'élément est visible
});

elementsAAnimer.forEach(el => {
    el.classList.add('fade-in'); // classe de départ (invisible + décalé)
    observerAnimations.observe(el);
});


/* COMPTEURS ANIMÉS AU SCROLL */

const statNumbers = document.querySelectorAll('.stat-number');

const observerCompteurs = new IntersectionObserver((entrees) => {
    entrees.forEach(entree => {
        if (entree.isIntersecting) {
            const element = entree.target;
            const cible = parseInt(element.dataset.target); // valeur finale (ex: 1200)
            let valeurActuelle = 0;
            const increment = cible / 60; // on divise en 60 étapes (~1 seconde à 60fps)

            const interval = setInterval(() => {
                valeurActuelle += increment;
                if (valeurActuelle >= cible) {
                    element.textContent = cible; // on fixe la valeur exacte à la fin
                    clearInterval(interval);
                } else {
                    element.textContent = Math.floor(valeurActuelle);
                }
            }, 16); // environ 16ms = 60 images par seconde

            observerCompteurs.unobserve(element); // une seule animation par élément
        }
    });
}, {
    threshold: 0.5
});

statNumbers.forEach(stat => observerCompteurs.observe(stat));