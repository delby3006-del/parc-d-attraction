document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".slider");
  const modals = document.querySelectorAll(".modal");
  const progressBar = document.querySelector(".progress");
  let currentStep = 0;
  const totalSteps = modals.length;

  function goToStep(step) {
    if (step < 0 || step >= totalSteps) return;
    currentStep = step;

    // Déplace le slider
    slider.style.transform = `translateX(-${currentStep * 100}%)`;

    // Met à jour la barre de progression
    const percent = ((currentStep + 1) / totalSteps) * 100;
    progressBar.style.width = `${percent}%`;
  }

  // Écoute tous les boutons "Continuer"
  const buttons = document.querySelectorAll("form button");
  buttons.forEach((btn, index) => {
    // Active les boutons (retire disabled pour tester)

    btn.addEventListener("click", (e) => {
      e.preventDefault(); // ← empêche le rechargement de la page
      goToStep(currentStep + 1);
    });
  });

  // Initialise à l'étape 0
  goToStep(0);
});

// ══════════════════════════════════════════════
// État global de la commande
// ══════════════════════════════════════════════

// ══════════════════════════════════════════════
// État global de la commande
// ══════════════════════════════════════════════

const commande = {
  offres: {
    typeOffres: "",
    nombreOffres: "",
    date: "",
  },

  extras: {
    fastpass: false,
    visiteGuide: false,
    parking: false,
  },

  acheteur: {
    nom: "",
    prenom: "",
    email: "",
    emailConfirm: "",
    telephone: "",
    adresse: "",
    creerCompte: false,
  },

  visiteurs: {
    attributionOffres: false,
    billets: [{ nom: "", prenom: "" }],
  },

  paiement: {
    codePromo: "",
    numeroCarte: "",
    dateCarte: "",
    cvv: "",
    cgu: false,
    newsletter: false,
  },
};

// ══════════════════════════════════════════════
// Boutons
// ══════════════════════════════════════════════

const btnSuivantOffres = document.querySelector("#suivant-offres");
const btnSuivantExtras = document.querySelector("#suivant-extras");
const btnSuivantAcheteur = document.querySelector("#suivant-acheteur");
const btnSuivantVisiteur = document.querySelector("#suivant-visiteur");
const btnValider = document.querySelector("#valider");

// ══════════════════════════════════════════════
// Étape 1 : Offres
// ══════════════════════════════════════════════

const typeOffres = document.querySelector("#type-offres");
const nombreOffres = document.querySelector("#nombre-offres");
const dateVisite = document.querySelector("#date");

typeOffres.addEventListener("change", (e) => {
  commande.offres.typeOffres = e.target.value;
  console.log("Type offre →", commande.offres.typeOffres);
  validerOffres();
});

nombreOffres.addEventListener("input", (e) => {
  commande.offres.nombreOffres = e.target.value;
  console.log("Nombre offres →", commande.offres.nombreOffres);
  validerOffres();
});

dateVisite.addEventListener("change", (e) => {
  commande.offres.date = e.target.value;
  console.log("Date →", commande.offres.date);
  validerOffres();
});

btnSuivantOffres.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("→ Validation offres", commande.offres);
  if (!validerOffres) goToStep(2);
});

function validerOffres() {
  // TODO : conditions de validation
  if (
    commande.offres.nombreOffres !== "" &&
    commande.offres.date !== "" &&
    commande.offres.typeOffres !== ""
  ) {
    btnSuivantOffres.disabled = false;
    return false;
  }
  btnSuivantOffres.disabled = true;
  return true;
}

// ══════════════════════════════════════════════
// Étape 2 : Extras
// ══════════════════════════════════════════════

const fastpass = document.querySelector("#fastpass");
const visiteGuide = document.querySelector("#visite-guide");
const parking = document.querySelector("#parking");

fastpass.addEventListener("change", (e) => {
  commande.extras.fastpass = e.target.checked;
  console.log("Fastpass →", commande.extras.fastpass);
  validerExtras();
});

visiteGuide.addEventListener("change", (e) => {
  commande.extras.visiteGuide = e.target.checked;
  console.log("Visite guidée →", commande.extras.visiteGuide);
  validerExtras();
});

parking.addEventListener("change", (e) => {
  commande.extras.parking = e.target.checked;
  console.log("Parking →", commande.extras.parking);
  validerExtras();
});

btnSuivantExtras.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("→ Validation extras", commande.extras);
  goToStep(3);
});

function validerExtras() {
  btnSuivantExtras.disabled = false;
}

// ══════════════════════════════════════════════
// Étape 3 : Acheteur
// ══════════════════════════════════════════════

const nom = document.querySelector("#nom");
const prenom = document.querySelector("#prenom");
const email = document.querySelector("#email");
const emailConfirm = document.querySelector("#email-comfirm");
const telephone = document.querySelector("#telephone");
const adresse = document.querySelector("#adresse");
const creerCompte = document.querySelector("#creer-compte");

nom.addEventListener("input", (e) => {
  commande.acheteur.nom = e.target.value;
  console.log("Nom →", commande.acheteur.nom);
  validerAcheteur();
});

prenom.addEventListener("input", (e) => {
  commande.acheteur.prenom = e.target.value;
  console.log("Prénom →", commande.acheteur.prenom);
  validerAcheteur();
});

email.addEventListener("input", (e) => {
  commande.acheteur.email = e.target.value;
  console.log("Email →", commande.acheteur.email);
  validerAcheteur();
});

emailConfirm.addEventListener("input", (e) => {
  commande.acheteur.emailConfirm = e.target.value;
  console.log("Email confirm →", commande.acheteur.emailConfirm);
  validerAcheteur();
});

telephone.addEventListener("input", (e) => {
  commande.acheteur.telephone = e.target.value;
  console.log("Téléphone →", commande.acheteur.telephone);
  validerAcheteur();
});

adresse.addEventListener("input", (e) => {
  commande.acheteur.adresse = e.target.value;
  console.log("Adresse →", commande.acheteur.adresse);
  validerAcheteur();
});

creerCompte.addEventListener("change", (e) => {
  commande.acheteur.creerCompte = e.target.checked;
  console.log("Créer compte →", commande.acheteur.creerCompte);
});

btnSuivantAcheteur.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("→ Validation acheteur", commande.acheteur);
  if (!validerAcheteur) {
    goToStep(3);
  }
});

function validerAcheteur() {
  // TODO : conditions de validation
  if (
    commande.acheteur.nom !== "" &&
    commande.acheteur.prenom !== "" &&
    commande.acheteur.email !== "" &&
    commande.acheteur.emailConfirm !== "" &&
    commande.acheteur.telephone !== "" &&
    commande.acheteur.adresse !== ""
  ) {
    btnSuivantAcheteur.disabled = false;
    return false;
  } else {
    btnSuivantAcheteur.disabled = true;
    return true;
  }
}

// ══════════════════════════════════════════════
// Étape 4 : Voyageurs
// ══════════════════════════════════════════════

const attributionOffres = document.querySelector("#attribution-offres");
const nomVisiteur1 = document.querySelector("#nom-visiteur-1");
const prenomVisiteur1 = document.querySelector("#prenom-visiteur-1");

attributionOffres.addEventListener("change", (e) => {
  commande.visiteurs.attributionOffres = e.target.checked;
  console.log("Attribution →", commande.visiteurs.attributionOffres);
  validerVisiteur();
});

nomVisiteur1.addEventListener("input", (e) => {
  commande.visiteurs.billets[0].nom = e.target.value;
  console.log("Nom visiteur 1 →", commande.visiteurs.billets[0].nom);
  validerVisiteur();
});

prenomVisiteur1.addEventListener("input", (e) => {
  commande.visiteurs.billets[0].prenom = e.target.value;
  console.log("Prénom visiteur 1 →", commande.visiteurs.billets[0].prenom);
  validerVisiteur();
});

btnSuivantVisiteur.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("→ Validation visiteurs", commande.visiteurs);
});

function validerVisiteur() {
  // TODO : conditions de validation
  // btnSuivantVisiteur.disabled = true / false;
}

// ══════════════════════════════════════════════
// Étape 5 : Paiement
// ══════════════════════════════════════════════

const codePromo = document.querySelector("#code-promo");
const numeroCarte = document.querySelector("#numero-carte");
const dateCarte = document.querySelector("#date-carte");
const cvv = document.querySelector("#cvv");
const cgu = document.querySelector("#cgu");
const newsletter = document.querySelector("#newsletter");

codePromo.addEventListener("input", (e) => {
  commande.paiement.codePromo = e.target.value;
  console.log("Code promo →", commande.paiement.codePromo);
});

numeroCarte.addEventListener("input", (e) => {
  commande.paiement.numeroCarte = e.target.value;
  console.log("N° carte →", commande.paiement.numeroCarte);
  validerPaiement();
});

dateCarte.addEventListener("input", (e) => {
  commande.paiement.dateCarte = e.target.value;
  console.log("Date carte →", commande.paiement.dateCarte);
  validerPaiement();
});

cvv.addEventListener("input", (e) => {
  commande.paiement.cvv = e.target.value;
  console.log("CVV →", commande.paiement.cvv);
  validerPaiement();
});

cgu.addEventListener("change", (e) => {
  commande.paiement.cgu = e.target.checked;
  console.log("CGU →", commande.paiement.cgu);
  validerPaiement();
});

newsletter.addEventListener("change", (e) => {
  commande.paiement.newsletter = e.target.checked;
  console.log("Newsletter →", commande.paiement.newsletter);
});

btnValider.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("→ COMMANDE FINALE", commande);
});

function validerPaiement() {
  // TODO : conditions de validation
  // btnValider.disabled = true / false;
}

// ══════════════════════════════════════════════
// Debug : voir l'état complet
// ══════════════════════════════════════════════

function afficherCommande() {
  console.log("══════ COMMANDE ══════");
  console.table(commande.offres);
  console.table(commande.extras);
  console.table(commande.acheteur);
  console.table(commande.visiteurs);
  console.table(commande.paiement);
}
