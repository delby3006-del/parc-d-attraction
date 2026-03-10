import { getData } from "./fonction.js";

// ============================================================================
// 1. CONFIGURATION & ÉTAT GLOBAL
// ============================================================================

const CONFIG = {
	API_URL: "http://localhost:81/api/billeterie",
	USER_ID: 1, // À dynamiser selon la session de l'utilisateur
};

const state = {
	offresDisponibles: [], // Stockera les offres depuis l'API
	commande: {
		offres: {
			idOffre: "", // Utilisation de l'ID plutôt que le nom
			nombreOffres: 0,
			date: "",
		},
		extras: {
			fastpass: { etat: false, prix: 125 },
			visiteGuidee: { etat: false, prix: 245 },
			parking: { etat: false, prix: 21 },
		},
		acheteur: { nom: "", prenom: "", email: "", telephone: "" },
	},
};

// ============================================================================
// 2. UTILITAIRES DOM
// ============================================================================

const $ = (id) => document.getElementById(id);
const $$ = (selector) => document.querySelectorAll(selector);

/**
 * Lie un champ HTML à une propriété de l'état global
 */
function lierEntree(id, objetParent, propriete, fonctionValidation = null) {
	const el = $(id);
	if (!el) return;

	const evenement = el.type === "checkbox" ? "change" : "input";
	const cleValeur = el.type === "checkbox" ? "checked" : "value";

	el.addEventListener(evenement, (e) => {
		objetParent[propriete] = e.target[cleValeur];
		if (fonctionValidation) fonctionValidation();
	});
}

// ============================================================================
// 3. NAVIGATION (Slider / Modales)
// ============================================================================

const Navigation = {
	slider: document.querySelector(".slider"),
	modales: $$(".modal"),
	barreProgression: document.querySelector(".progress"),
	etapeActuelle: 0,

	allerEtape(etape) {
		if (etape < 0 || etape >= this.modales.length) return;

		this.etapeActuelle = etape;
		this.slider.style.transform = `translateX(-${this.etapeActuelle * 100}%)`;

		const pourcentage = ((this.etapeActuelle + 1) / this.modales.length) * 100;
		this.barreProgression.style.width = `${pourcentage}%`;
	},

	allerModale(nomClasse) {
		const index = Array.from(this.modales).findIndex((m) => m.classList.contains(nomClasse));
		if (index !== -1) this.allerEtape(index);
	},
};

// ============================================================================
// 4. INITIALISATION DE L'APPLICATION
// ============================================================================

async function initApp() {
	try {
		// 1. Récupération et filtrage des offres actives
		const data = await getData(CONFIG.API_URL);
		state.offresDisponibles = data.filter((offre) => offre.actif === 1);

		// 2. Construction de l'interface
		construireSelectOffres();
		Navigation.allerEtape(0);

		// 3. Initialisation des écouteurs
		initialiserEcouteurs();
	} catch (erreur) {
		console.error("Erreur d'initialisation :", erreur);
		alert("Impossible de charger les offres pour le moment.");
	}
}

// ============================================================================
// 5. GESTION DE L'INTERFACE (UI)
// ============================================================================

function construireSelectOffres() {
	const select = $("type-offres");
	if (!select) return;

	const billets = state.offresDisponibles.filter((o) => o.typeOffre === "billet");
	const pass = state.offresDisponibles.filter((o) => o.typeOffre === "abonnement");

	select.appendChild(creerOptGroup("Billets", billets));
	select.appendChild(creerOptGroup("Pass", pass));
}

function creerOptGroup(label, offres) {
	const group = document.createElement("optgroup");
	group.label = label;

	offres.forEach((offre) => {
		const option = document.createElement("option");
		// FIX : On stocke l'ID au lieu du nom pour éviter les bugs
		option.value = offre.id;

		const infosPrix =
			offre.typeOffre === "billet"
				? `${offre.dureeJours} jour(s) - ${offre.prixUnitaire} €`
				: `${offre.dureeMois} mois - ${offre.prixUnitaire * offre.dureeMois} €`;

		option.textContent = `${offre.nom} (${infosPrix})`;
		group.appendChild(option);
	});

	return group;
}

// ============================================================================
// 6. VALIDATION ET RÉCAPITULATIF
// ============================================================================

function validerOffres() {
	const { idOffre, nombreOffres, date } = state.commande.offres;
	const btnSuivant = $("suivant-offres");

	const aujourdhui = new Date().toISOString().split("T")[0];
	const estValide = idOffre && nombreOffres > 0 && date >= aujourdhui;

	btnSuivant.disabled = !estValide;

	if (estValide) actualiserRecap();

	return estValide;
}

function actualiserRecap() {
	const offreSelectionnee = state.offresDisponibles.find(
		(o) => o.id == state.commande.offres.idOffre
	);
	if (!offreSelectionnee) return;

	const quantite = parseInt(state.commande.offres.nombreOffres);
	const prixUnitaire =
		offreSelectionnee.typeOffre === "abonnement"
			? offreSelectionnee.prixUnitaire * offreSelectionnee.dureeMois
			: offreSelectionnee.prixUnitaire;

	let total = prixUnitaire * quantite;

	// Gestion des extras
	const extrasHTML = Object.entries(state.commande.extras)
		.filter(([_, data]) => data.etat)
		.map(([nom, data]) => {
			const coutExtra = data.prix * quantite;
			total += coutExtra;
			return `<li>${nom} - Prix : ${coutExtra} €</li>`;
		})
		.join("");

	const contenuRecap = `
        <span>${quantite} x ${offreSelectionnee.nom} (Prix Unitaire : ${prixUnitaire} €)</span>
        <ul>${extrasHTML}</ul>
    `;

	$$(".recap-data").forEach((el) => (el.innerHTML = contenuRecap));
	const recapPrix = document.querySelector(".recap-prix");
	if (recapPrix) recapPrix.innerHTML = `Total : ${total} €`;
}

// ============================================================================
// 7. PAIEMENT ET SOUMISSION API
// ============================================================================

async function simulerPaiement(e) {
	e.preventDefault();
	Navigation.allerModale("chargement-paiement");

	const payload = {
		id_utilisateur: CONFIG.USER_ID,
		id_billeterie: parseInt(state.commande.offres.idOffre),
		quantite: parseInt(state.commande.offres.nombreOffres),
		statut: "payée",
		date_visite: state.commande.offres.date,
	};

	try {
		const reponse = await fetch(`${CONFIG.API_URL}/commande`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
		});

		if (!reponse.ok) throw new Error(`Erreur HTTP: ${reponse.status}`);

		const resultat = await reponse.json();
		console.log("Commande validée :", resultat);

		// ✅ Déclarer quantite AVANT de l'utiliser
		const quantite = parseInt(state.commande.offres.nombreOffres);
		const offreSelectionnee = state.offresDisponibles.find(
			(o) => o.id == state.commande.offres.idOffre
		);
		const prixUnitaire =
			offreSelectionnee.typeOffre === "abonnement"
				? offreSelectionnee.prixUnitaire * offreSelectionnee.dureeMois
				: offreSelectionnee.prixUnitaire;

		let total = prixUnitaire * quantite;

		const extrasHTML = Object.entries(state.commande.extras)
			.filter(([_, data]) => data.etat)
			.map(([nom, data]) => {
				const coutExtra = data.prix * quantite;
				total += coutExtra;
				return `<li>${nom} - Prix : ${coutExtra} €</li>`;
			})
			.join("");

		const randomId = Math.floor(Math.random() * 1000);
		const année = new Date().getFullYear();

		$("numero-commande").innerHTML = `AET-${année}-${randomId}`;
		$("recap-date").innerHTML = state.commande.offres.date;
		$("recap-type").innerHTML = offreSelectionnee.nom;
		$("recap-nombre").innerHTML = String(quantite);
		$("recap-extras").innerHTML = extrasHTML || "Aucun";
		$("recap-total").innerHTML = `${total} €`;
		$("recap-email").innerHTML = state.commande.acheteur.email;
		Navigation.allerModale("fin");
	} catch (erreur) {
		console.error("Échec du paiement :", erreur);
		afficherErreur("Une erreur est survenue...");
	}
}

function afficherErreur(message) {
	const erreurMessage = $("erreur-message");
	if (erreurMessage) erreurMessage.textContent = message;
	Navigation.allerModale("erreur");
}

// ============================================================================
// 8. ÉCOUTEURS D'ÉVÉNEMENTS
// ============================================================================

function initialiserEcouteurs() {
	// Étape 1 : Offres
	lierEntree("type-offres", state.commande.offres, "idOffre", validerOffres);
	lierEntree("nombre-offres", state.commande.offres, "nombreOffres", validerOffres);
	lierEntree("date", state.commande.offres, "date", validerOffres);

	$("suivant-offres").addEventListener("click", (e) => {
		e.preventDefault();
		if (validerOffres()) Navigation.allerEtape(1);
	});

	// Étape 2 : Extras (Exemple avec un bouton suivant)
	lierEntree("fastpass", state.commande.extras.fastpass, "etat", actualiserRecap);
	lierEntree("visite-guide", state.commande.extras.visiteGuidee, "etat", actualiserRecap);
	lierEntree("parking", state.commande.extras.parking, "etat", actualiserRecap);

	$("suivant-extras").addEventListener("click", (e) => {
		e.preventDefault();
		if (validerOffres()) Navigation.allerEtape(2);
	});
	// Validation Finale
	const btnValiderPaiement = $("valider-paiement");
	if (btnValiderPaiement) {
		btnValiderPaiement.addEventListener("click", simulerPaiement);
	}

	// État d'erreur
	const btnReessayer = $("erreur-reessayer");
	if (btnReessayer) {
		btnReessayer.addEventListener("click", () => Navigation.allerModale("reacp"));
	}

	const btnRetourAccueil = $("erreur-retour");
	if (btnRetourAccueil) {
		btnRetourAccueil.addEventListener("click", () => Navigation.allerEtape(0));
	}
}

// Lancement du script
initApp();
