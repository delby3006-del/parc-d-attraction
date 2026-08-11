import { getData } from "./fonction.js";

const classNames = ["or", "vert", "violet", "bronze"];

async function init() {
	const zones = await getData("http://localhost:81/api/parc/zone/");
	displayZones(zones);
	const points = await getData("http://localhost:81/api/parc/point-interet/");
	displayPoints(points);
}

function displayZones(zones) {
	const zonesContainer = document.getElementById("zones-container");
	zonesContainer.innerHTML = ""; // Clear previous content
	zones.forEach((zone) => {
		const zoneElement = document.createElement("div");
		zoneElement.classList.add("zone");
		zoneElement.classList.add(classNames[zone.id % classNames.length]); // Add a class based on the zone ID
		const infos = document.createElement("div");
		infos.classList.add("infos");
		infos.innerHTML = `
            <h2>${zone.nom}</h2>
            <p>${zone.description}</p>
        `;
		zonesContainer.appendChild(zoneElement);
		zoneElement.appendChild(infos);
		const img = document.createElement("img");
		img.src = "../images/aires_des_lutins_sylvans.webp";
		img.alt = zone.name;
		zoneElement.appendChild(img);
	});
}

function displayPoints(points) {
	const carte = document.querySelector(".carte-section");
	const pointsContainer = document.getElementById("points-container");
	points.forEach((point) => {
		const pointElement = document.createElement("span");
		pointElement.classList.add("point");
		const pourcentagex = point.x / carte.offsetWidth;
		const pourcentagey = point.y / carte.offsetHeight;
		pointElement.style.left = `${pourcentagex * 100}%`;
		pointElement.style.top = `${pourcentagey * 100}%`;
		pointElement.setAttribute("data-text", point.nom);
		pointsContainer.appendChild(pointElement);
	});
}

init();
