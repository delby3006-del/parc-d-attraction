# 🎡 Aetheria Mystica — Le Royaume Suspendu

> **"Là où la magie rencontre la mécanique."**

Bienvenue dans le dépôt officiel du projet **Aetheria Mystica**, un parc d'attractions immersif au concept unique mêlant _Steampunk_ et _Heroic Fantasy_. Ce projet englobe la conception de l'univers narratif, l'identité visuelle et le développement de la plateforme digitale interactive (billetterie, espace client, expérience immersive).

---

## 🌌 L'Univers

Aetheria Mystica est un archipel d'îles flottantes alimentées par l'**Aetherion**, une énergie mystique ancestrale. Le parc est divisé en 5 zones thématiques majeures :

1.  **Portail des Mondes** : L'entrée majestueuse, un marché interdimensionnel.
2.  **Cité des Engrenages** : Le bastion des Mécanistes (Steampunk, vapeur et cuivre).
3.  **Sylva Enchantée** : Une forêt bioluminescente protégée par les Sylvans.
4.  **Aetherium Ascendant** : Les hauteurs célestes, domaine des voyageurs ailés.
5.  **Nexus Obscura** : Une dimension miroir où les lois de la physique sont instables.

---

## 🎢 Attractions Phares

- **L’Œil du Cyclotron** : Montagnes russes inversées à haute intensité dans un accélérateur temporel.
- **Vol des Archalchimistes** : Simulateur 4D immersif à travers les îles flottantes.
- **La Forêt des Murmures** : Parcours interactif en réalité augmentée.
- **ChronoDrop** : Tour de chute libre avec effets de ralentissement temporel.

---

## 💻 Fonctionnalités du Site Internet

Le site internet a été conçu pour offrir une immersion totale avant même l'arrivée au parc :

- **Billetterie Interactive** : Achat sécurisé de billets datés, pass annuels et options FastPass.
- **Espace Compte Client** : Gestion des réservations, historique et avantages fidélité.
- **Plan Interactif** : Exploration 3D des zones et temps d'attente en temps réel.
- **Lore & Histoire** : Section narrative dédiée à la mythologie du parc et de ses peuples.
- **Responsive Design** : Optimisation Mobile-First pour une utilisation fluide sur le parc.

---

## 🎨 Identité Visuelle

L'identité graphique repose sur un équilibre entre le métal industriel et l'éclat magique :

- **Couleurs** : Or Aetherion (`#D8A944`), Bronze (`#A9713C`), Bleu Nuit (`#0E1A2B`), Vert Sylvan (`#0B6E4F`).
- **Typographies** : _Cinzel Decorative_ (Titres) & _Bebas Neue_ (Sous-titres).
- **Logo** : Un engrenage ailé entourant un cristal d'Aetherion.

---

## 🛠️ Spécifications Techniques

- **Architecture** :
    - Frontend : HTML5/CSS3 avancé.
    - Backend(API) : Symfony
    - Base de données : Mysql

---

## 📂 Structure du Projet

```text
├── frontend/           # Code du frontend
├── backend/            # Code du backend
├── BDD/                # Base de donnée originel en sqlite
├── docker/             # Conteneur apache, MYSQL
├── images/             # Images, logos, icones
├── maquette/           # Maquette des pages
└── README.md           # Présentation du projet
```

---

## 📄 Pages web du projets

- Accueil :
    - Lien : index.html
    - Description : Pose le cadre narratif, présente l'ambiance visuelle (Steampunk/Fantasy) et incite à l'action avec les événements phares et l'accès direct à la billetterie.

- Zones du Parc :
    - Lien : zones.html
    - Description : Guide immersif à travers les 5 mondes (Portail des Mondes, Cité des Engrenages, Sylva Enchantée, Aetherium Ascendant et Nexus Obscura) avec leurs ambiances sonores et visuelles spécifiques.

- Attractions :
    - Lien : attractions.html
    - Description : Catalogue complet des expériences. Propose des filtres par intensité (sensations fortes ou familial) et par âge, avec des fiches détaillées pour chaque machine (ex: l'Œil du Cyclotron).

- Restaurants & Boutiques :
    - Lien : services.html
    - Description : Présente l'offre de restauration thématique (cuisine à la vapeur, banquet végétal) et les boutiques de souvenirs proposant des gadgets steampunk ou des cristaux magiques.

- Billetterie :
    - Lien : billetterie.html
    - Description : Espace de vente en ligne sécurisé pour l'achat de billets 1 jour, pass annuels et options premium (FastPass dimensionnel). 

- Espace Compte Client :
    - Lien : compte.html
    - Description : Espace personnel permettant aux visiteurs de retrouver leurs billets numériques, de gérer leurs réservations et de suivre leurs avantages fidélité.

---
### 🏁 Route API

CRUD (Create, Read, Update, Delete)  sur tous chaque tables de la base de données