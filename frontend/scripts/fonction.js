/**
 * Permet de récuperer des donnée d'un API
 * @param {String} url url de l'api
 * @returns Retourne les resultats ou l'erreur
 */
export async function getData(url) {
	try {
		const reponse = await fetch(url);
		if (!reponse.ok) {
			throw new Error(`Statut de réponse : ${reponse.status}`);
		}
		const resultat = await reponse.json();
		return resultat;
	} catch (erreur) {
		return erreur;
	}
}

