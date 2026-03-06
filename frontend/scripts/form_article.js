import { getData } from "./fonction.js";

// ══════════════════════════════════════════════
// Helpers
// ══════════════════════════════════════════════

const $ = (id) => document.getElementById(id);

function lierEntree(id, parent, cle, fonctionValidation) {
	const el = $(id);
	if (!el) return;
	const evenement = el.type === "checkbox" ? "change" : "input";
	const propriete = el.type === "checkbox" ? "checked" : "value";

	el.addEventListener(evenement, (e) => {
		parent[cle] = e.target[propriete];
		if (fonctionValidation) fonctionValidation();
	});
}

// ══════════════════════════════════════════════
// Navigation (slider + barre de progression)
// ══════════════════════════════════════════════

const slider = document.querySelector(".slider");
const modales = document.querySelectorAll(".modal");
const barreProgression = document.querySelector(".progress");
let etapeActuelle = 0;
const totalEtapes = modales.length;

function allerEtape(etape) {
	if (etape < 0 || etape >= totalEtapes) return;
	etapeActuelle = etape;
	slider.style.transform = `translateX(-${etapeActuelle * 100}%)`;
	const pourcentage = ((etapeActuelle + 1) / totalEtapes) * 100;
	barreProgression.style.width = `${pourcentage}%`;
}

function allerModale(nomClasse) {
	modales.forEach((modale, i) => {
		if (modale.classList.contains(nomClasse)) allerEtape(i);
	});
}

allerEtape(0);

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
		fastpass: { etat: false, prix: 125 },
		visiteGuidee: { etat: false, prix: 245 },
		parking: { etat: false, prix: 21 },
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

const type_offre = await init();

async function init() {
	let data = await getData("http://localhost:81/api/billeterie");
	console.log(data);
	data.forEach((d) => {
		delete d.commandes;
	});
	data = data.filter(({ actif }) => actif === 1);
	return data;
}

// ══════════════════════════════════════════════
// Boutons
// ══════════════════════════════════════════════

const btnSuivantOffres = $("suivant-offres");
const btnSuivantExtras = $("suivant-extras");
const btnSuivantAcheteur = $("suivant-acheteur");
const btnSuivantVisiteur = $("suivant-visiteur");
const btnValider = $("valider-paiement");

// ══════════════════════════════════════════════
// Étape 1 : Offres
// ══════════════════════════════════════════════

lierEntree("type-offres", commande.offres, "typeOffres", validerOffres);
lierEntree("nombre-offres", commande.offres, "nombreOffres", validerOffres);
lierEntree("date", commande.offres, "date", validerOffres);

btnSuivantOffres.addEventListener("click", (e) => {
	e.preventDefault();
	if (!validerOffres()) allerEtape(1);
});

function validerOffres() {
	actualiserRecap();

	const { typeOffres, nombreOffres, date } = commande.offres;

	if (!typeOffres || !nombreOffres || !date) {
		btnSuivantOffres.disabled = true;
		return true;
	}

	if (nombreOffres < 1) {
		btnSuivantOffres.disabled = true;
		return true;
	}

	const aujourdhui = new Date().toISOString().split("T")[0];
	if (date < aujourdhui) {
		btnSuivantOffres.disabled = true;
		return true;
	}

	btnSuivantOffres.disabled = false;
	return false;
}

// ══════════════════════════════════════════════
// Étape 2 : Extras
// ══════════════════════════════════════════════

lierEntree("fastpass", commande.extras.fastpass, "etat", validerExtras);
lierEntree("visite-guide", commande.extras.visiteGuidee, "etat", validerExtras);
lierEntree("parking", commande.extras.parking, "etat", validerExtras);

btnSuivantExtras.addEventListener("click", (e) => {
	e.preventDefault();
	allerEtape(2);
});

function validerExtras() {
	actualiserRecap();
	btnSuivantExtras.disabled = false;
}

// // ══════════════════════════════════════════════
// // Étape 3 : Acheteur
// // ══════════════════════════════════════════════

// lierEntree("nom", commande.acheteur, "nom", validerAcheteur);
// lierEntree("prenom", commande.acheteur, "prenom", validerAcheteur);
// lierEntree("email", commande.acheteur, "email", validerAcheteur);
// lierEntree("email-confirm", commande.acheteur, "emailConfirm", validerAcheteur);
// lierEntree("telephone", commande.acheteur, "telephone", validerAcheteur);
// lierEntree("adresse", commande.acheteur, "adresse", validerAcheteur);
// lierEntree("creer-compte", commande.acheteur, "creerCompte");

// btnSuivantAcheteur.addEventListener("click", (e) => {
// 	e.preventDefault();
// 	if (!validerAcheteur()) allerEtape(3);
// });

// function validerAcheteur() {
// 	actualiserRecap();

// 	const { nom, prenom, email, emailConfirm, telephone, adresse } = commande.acheteur;
// 	const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 	if (!nom || !prenom || !email || !emailConfirm || !telephone || !adresse) {
// 		btnSuivantAcheteur.disabled = true;
// 		return true;
// 	}

// 	if (email !== emailConfirm) {
// 		btnSuivantAcheteur.disabled = true;
// 		return true;
// 	}

// 	if (!regexEmail.test(email)) {
// 		btnSuivantAcheteur.disabled = true;
// 		return true;
// 	}

// 	if (telephone.length !== 8) {
// 		btnSuivantAcheteur.disabled = true;
// 		return true;
// 	}

// 	btnSuivantAcheteur.disabled = false;
// 	return false;
// }

// // ══════════════════════════════════════════════
// // Étape 4 : Visiteurs
// // ══════════════════════════════════════════════

// lierEntree("attribution-offres", commande.visiteurs, "attributionOffres", validerVisiteur);
// lierEntree("nom-visiteur-1", commande.visiteurs.billets[0], "nom", validerVisiteur);
// lierEntree("prenom-visiteur-1", commande.visiteurs.billets[0], "prenom", validerVisiteur);

// btnSuivantVisiteur.addEventListener("click", (e) => {
// 	e.preventDefault();
// 	if (!validerVisiteur()) allerEtape(4);
// });

// function validerVisiteur() {
// 	actualiserRecap();
// 	btnSuivantVisiteur.disabled = false;
// 	return false;
// }

// ══════════════════════════════════════════════
// Étape 5 : Paiement
// ══════════════════════════════════════════════

lierEntree("code-promo", commande.paiement, "codePromo");
lierEntree("numero-carte", commande.paiement, "numeroCarte", validerPaiement);
lierEntree("date-carte", commande.paiement, "dateCarte", validerPaiement);
lierEntree("cvv", commande.paiement, "cvv", validerPaiement);
lierEntree("cgu", commande.paiement, "cgu", validerPaiement);
lierEntree("newsletter", commande.paiement, "newsletter");

$("valider").addEventListener("click", (e) => {
	e.preventDefault();
	if (!validerPaiement()) simulerPaiement();
});

function validerPaiement() {
	const { numeroCarte, dateCarte, cvv, cgu } = commande.paiement;

	if (!cgu || !cvv || !dateCarte || !numeroCarte) {
		btnValider.disabled = true;
		return true;
	}

	if (cvv.length !== 3) {
		btnValider.disabled = true;
		return true;
	}

	if (dateCarte.length !== 4) {
		btnValider.disabled = true;
		return true;
	}

	if (numeroCarte.length !== 16) {
		btnValider.disabled = true;
		return true;
	}

	btnValider.disabled = false;
	return false;
}

// ══════════════════════════════════════════════
// Récapitulatif
// ══════════════════════════════════════════════

function actualiserRecap() {
	let prix = [];
	const extrasActifs = Object.entries(commande.extras)
		.filter(([, valeur]) => valeur.etat)
		.map(([cle, valeur]) => {
			prix.push(valeur.prix * commande.offres.nombreOffres);
			return `<li>${cle} - Prix : ${valeur.prix * commande.offres.nombreOffres} € </li>`;
		});

	const contenuRecap = `
            <span>${commande.offres.nombreOffres} x ${commande.offres.typeOffres} </span>
            <ul>${extrasActifs.join("")}</ul>
        `;

	const prixTypeOffres = type_offre.filter((t) => t.nom === commande.offres.typeOffres)[0]
		.prixUnitaire;

	prix.push(temp * commande.offres.nombreOffres);

	document.querySelectorAll(".recap-data").forEach((el) => {
		el.innerHTML = contenuRecap;
	});
	document.querySelector(".recap-prix").innerHTML =
		`Total : ${prix.reduce((acc, p) => acc + parseInt(p), 0)}€`;
}

// ══════════════════════════════════════════════
// Simulation du paiement
// ══════════════════════════════════════════════

function simulerPaiement() {
	allerModale("chargement-paiement");

	setTimeout(() => {
		const numero = "AET-2025-" + Math.random().toString(36).substring(2, 6).toUpperCase();

		$("numero-commande").textContent = numero;
		$("recap-date").textContent = commande.offres.date || "--";
		$("recap-type").textContent = commande.offres.typeOffres || "--";
		$("recap-nombre").textContent = commande.offres.nombreOffres || "--";
		$("recap-email").textContent = commande.acheteur.email || "votre email";

		const extrasActifs = Object.entries(commande.extras)
			.filter(([, v]) => v)
			.map(([c]) => c);
		$("recap-extras").textContent = extrasActifs.length ? extrasActifs.join(", ") : "Aucun";

		allerModale("fin");
	}, 3000);
}

// ══════════════════════════════════════════════
// Debug
// ══════════════════════════════════════════════

window.afficherCommande = () => {
	console.log("══════ COMMANDE ══════");
	console.table(commande.offres);
	console.table(commande.extras);
	console.table(commande.acheteur);
	console.table(commande.visiteurs);
	console.table(commande.paiement);
};

function creerSelect() {
	const billets = type_offre.filter(({ typeOffre }) => typeOffre === "billet");
	const passs = type_offre.filter(({ typeOffre }) => typeOffre === "abonnement");

	const select = document.querySelector("select#type-offres");

	const optionGroupBillets = document.createElement("optgroup");
	optionGroupBillets.label = "Billets";

	billets.forEach((billet) => {
		optionGroupBillets.appendChild(
			creerOption(billet.nom, billet.dureeJours + " jour(s) - " + billet.prixUnitaire + " € ")
		);
	});
	select.appendChild(optionGroupBillets);

	const optionGroupPass = document.createElement("optgroup");
	optionGroupPass.label = "Pass";

	passs.forEach((pass) => {
		optionGroupPass.appendChild(
			creerOption(
				pass.nom.replaceAll(" ", "_"),
				pass.dureeMois + " mois - " + pass.prixUnitaire * pass.dureeMois + " € "
			)
		);
	});
	select.appendChild(optionGroupPass);
}

function creerOption(value, text) {
	const select = document.querySelector("select#type-offres");
	const option = document.createElement("option");
	option.value = value;
	option.innerHTML = text;
	select.appendChild(option);
	return option;
}

creerSelect();
