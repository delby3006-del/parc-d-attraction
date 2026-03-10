# 📖 Documentation de l'API - Gestion du Parc

Bienvenue dans la documentation de l'API. Cette API permet de gérer la billetterie, les commandes, les publications et les images du système.

### Lancement du l'API (**via docker**)

- #### Vérifier que php est installé localement

    ```PowerShell
    PS C:\...\project-attraction\parc-d-attraction> php -v
    PHP 8.5.3 (cli) (built: Feb 10 2026 18:43:53) (NTS Visual C++ 2022 x64)
    Copyright (c) The PHP Group
    Built by The PHP Group
    Zend Engine v4.5.3, Copyright (c) Zend Technologies
        with Zend OPcache v8.5.3, Copyright (c), by Zend Technologies
    ```

- #### Vérifier que composer est installé localement

    ```PowerShell
    PS C:\...\project-attraction\parc-d-attraction> composer -V
    Composer version 2.9.5 2026-01-29 11:40:53
    PHP version 8.5.3 (C:\Users\moi\AppData\Local\Programs\PHP\current\php.exe)
    Run the "diagnose" command to get more detailed diagnostics output.
    ```

- #### Installer les dépendences dans le dossier `backend`

    ```PowerShell
    PS C:\...\project-attraction\parc-d-attraction\backend> composer install
    Installing dependencies from lock file (including require-dev)
    Verifying lock file contents can be installed on current platform.
    Package operations: 68 installs, 0 updates, 0 removals
     - Installing symfony/flex (v2.10.0): Extracting archive
     - Installing symfony/runtime (v8.0.1): Extracting archive
     - Installing symfony/deprecation-contracts (v3.6.0): Extracting archive
     - Installing psr/container (2.0.2): Extracting archive
     - Installing symfony/service-contracts (v3.6.1): Extracting archive
    ...
    Generating autoload files
    53 packages you are using are looking for funding.
    Use the `composer fund` command to find out more!

    Run composer recipes at any time to see the status of your Symfony recipes.

    Executing script cache:clear [OK]
    Executing script assets:install public [OK]
    ```

- #### Suivre les étapes dans le readme du dossier `docker` pour créer le docker et mettre le chemin jusqu'au dossier `backend` pour créer la liason

    _L'API peut mettre du temps a répondre en fonction de la puissance de votre ordinateur_

---

## 🎟️ Billetterie (Offres)

Gestion des offres tarifaires du parc.

| Méthode  | Endpoint                       | Description                                                                                       |
| :------- | :----------------------------- | :------------------------------------------------------------------------------------------------ |
| `GET`    | `/api/billeterie`              | Récupère la liste de toutes les offres de billetterie disponibles.                                |
| `GET`    | `/api/billeterie/getMaxPrices` | Récupère les prix maximums actuels des offres de billetterie.                                     |
| `GET`    | `/api/billeterie/{id}`         | Récupère les détails d'une offre de billetterie spécifique via son ID.                            |
| `POST`   | `/api/billeterie`              | Crée une nouvelle offre de billetterie (attend un JSON avec : `nom`, `type_offre`, `prix`, etc.). |
| `DELETE` | `/api/billeterie/{id}`         | Supprime une offre de billetterie existante via son ID.                                           |

---

## 🛒 Commandes

Suivi et gestion des commandes passées par les utilisateurs.

| Méthode | Endpoint                        | Description                                                                |
| :------ | :------------------------------ | :------------------------------------------------------------------------- |
| `GET`   | `/api/billeterie/commande`      | Récupère l'historique de toutes les commandes passées.                     |
| `GET`   | `/api/billeterie/commande/{id}` | Récupère les informations détaillées d'une commande spécifique via son ID. |

---

## 📰 Publications (Actualités / Articles)

Gestion du contenu informatif et des actualités du parc.

| Méthode  | Endpoint                | Description                                                                                             |
| :------- | :---------------------- | :------------------------------------------------------------------------------------------------------ |
| `GET`    | `/api/publication`      | Récupère la liste de toutes les publications.                                                           |
| `GET`    | `/api/publication/{id}` | Récupère une publication spécifique via son ID.                                                         |
| `POST`   | `/api/publication/`     | Crée une nouvelle publication (attend un JSON avec : `titre`, `contenu`, `date_publication`, `publie`). |
| `DELETE` | `/api/publication/{id}` | Supprime une publication existante via son ID.                                                          |

---

## 🖼️ Images (Médias)

Gestion de la galerie d'images liées aux objets du système (attractions, publications, etc.).

| Méthode  | Endpoint                      | Description                                                                                     |
| :------- | :---------------------------- | :---------------------------------------------------------------------------------------------- |
| `GET`    | `/api/publication/image`      | Récupère la liste de toutes les images enregistrées dans la base de données.                    |
| `GET`    | `/api/publication/image/{id}` | Récupère les détails d'une image spécifique via son ID.                                         |
| `POST`   | `/api/publication/image`      | Ajoute une nouvelle image (attend un JSON avec : `type_objet`, `id_objet`, `url`, `alt`, etc.). |
| `DELETE` | `/api/publication/image/{id}` | Supprime une image existante du système via son ID.                                             |

---

### 💡 Format de retour standard

La majorité de ces routes renvoient les données au format **JSON**.
En cas d'erreur (ressource non trouvée, erreur serveur), l'API renvoie un objet JSON contenant un message d'erreur :

```json
{
    "message": "Description de l'erreur"
}
```

---

_Note : toutes les routes n'ont pas été documentés ici_
