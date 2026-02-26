# 🎢 API Aetheria Mystica

## 📋 Table des matières

- [Installation](#installation)
- [Démarrage](#demarrage)
- [Endpoints](#endpoints)
- [Exemples de requêtes](#exemples-de-requetes)
- [Notes](#structure-du-projet)
- [Commandes utiles](#commandes-utiles)

## 🚀 Installation {#installation}

```bash
# Cloner le projet
git clone [url-du-repo]

# Installer les dépendances
npm install
```

## ▶️ Démarrage {#demarrage}

```bash
# Démarrer le serveur
npm start

# Le serveur démarre sur http://localhost:5555
```

## 📡 Endpoints {#endpoints}

### Route principale

| Méthode | Endpoint | Description                             |
| ------- | -------- | --------------------------------------- |
| GET     | `/api`   | Liste de tous les endpoints disponibles |

### Routes disponibles

| Méthode | Endpoint           | Description                          |
| ------- | ------------------ | ------------------------------------ |
| GET     | `/api/parc`        | Informations générales sur le parc   |
| GET     | `/api/zones`       | Liste de toutes les zones du parc    |
| GET     | `/api/attractions` | Liste de toutes les attractions      |
| GET     | `/api/peuples`     | Liste de tous les peuples d'Aetheria |
| GET     | `/api/restaurants` | Liste de tous les restaurants        |
| GET     | `/api/boutiques`   | Liste de toutes les boutiques        |

## 🔍 Exemples de requêtes {#exemples-de-requetes}

### Obtenir la liste des endpoints

```bash
GET http://localhost:5555/api
```

**Réponse :**

```json
{
  "message": "Bienvenue à l'API Aetheria Mystica",
  "endpoints": {
    "parc": "/api/parc",
    "zones": "/api/zones",
    "attractions": "/api/attractions",
    "peuples": "/api/peuples",
    "restaurants": "/api/restaurants",
    "boutiques": "/api/boutiques"
  }
}
```

### Obtenir les informations du parc

```bash
GET http://localhost:5555/api/parc
```

### Obtenir toutes les zones

```bash
GET http://localhost:5555/api/zones
```

### Obtenir toutes les attractions

```bash
GET http://localhost:5555/api/attractions
```

### Obtenir tous les peuples

```bash
GET http://localhost:5555/api/peuples
```

### Obtenir tous les restaurants

```bash
GET http://localhost:5555/api/restaurants
```

### Obtenir toutes les boutiques

```bash
GET http://localhost:5555/api/boutiques
```

## 📁 Structure du projet {#structure-du-projet}

```

aetheria-mystica-api/
├── server.js               # Point d'entrée de l'application
├── package.json
├── routes/
│   ├── index.js           # Routes du parc
│   ├── zones.js           # Routes des zones
│   ├── attractions.js     # Routes des attractions
│   ├── peuples.js         # Routes des peuples
│   ├── restaurents.js     # Routes des restaurants
│   └── boutiques.js       # Routes des boutiques
├── data/                  # Données des l'API en fichiers JS
│
└── public/images          # Images statiques
```

## 🛠️ Technologies utilisées {#technologies-utilisees}

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Morgan** - Logger HTTP
- **ES6 Modules** - Syntaxe moderne JavaScript

## 📝 Notes {#notes}

- Toutes les routes sont en **lecture seule** (GET uniquement)
- Le serveur utilise le port **5555**
- Les fichiers statiques sont servis depuis le dossier `images/`
- Format de réponse : **JSON**

## Commandes utiles {#commandes-utiles}

- npm start : Démarre le serveur
- npm run lint : Verifie le code pour eviter les erreurs
- npm run format : Format le code avec une configuration precise

## 🐛 Gestion des erreurs {#gestion des erreurs}

### Route non trouvée (404)

```json
{
  "error": "Route non trouvée"
}
```

### Erreur serveur (500)

En mode développement, le message d'erreur complet est retourné.
