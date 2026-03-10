async function init() {
	const pBillet = document.querySelector("span.billet-prices");
	const spanPricePass = document.querySelector("span.pass-prices");
	let billetPrice = window.localStorage.getItem("billet");
	let passPrice = window.localStorage.getItem("pass");

	if (billetPrice === null || passPrice === null) {
		const url = "http://localhost:81/api/billeterie/getMaxPrices";
		try {
			const reponse = await fetch(url);

			if (!reponse.ok) {
				throw new Error(`Statut de réponse : ${reponse.status}`);
			}

			const resultat = await reponse.json();
			console.log(resultat);
			billetPrice = resultat[1].max_prix;
			passPrice = resultat[0].max_prix;

			localStorage.setItem("billet", billetPrice);
			localStorage.setItem("pass", passPrice);
		} catch (erreur) {
			console.error(erreur.message);
		}
	}
	pBillet.innerHTML = billetPrice + " € ";
	spanPricePass.innerHTML = passPrice + " € ";
}

init();
