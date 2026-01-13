import express from "express";
const router = express.Router();

// GET /api/parc - Informations du parc

router.get("/", function (req, res) {
  res.json({
    parc: {
      nom: "Aetheria Mystica",
      slogan: "Où les dimensions se rencontrent",
      thematique: {
        principal: "Fantasy / Steampunk magique",
        elements: ["fantasy", "steampunk", "magie", "dimensions"],
        atmosphere:
          "Monde flottant avec créatures enchantées, machineries de vapeur, alchimistes et voyageurs interdimensionnels",
      },
      histoire: {
        titre: "La Légende d'Aetheria",
        resume:
          "Il existe, au-dessus de nos cieux, un royaume oublié : Aetheria, un archipel d'îles flottantes maintenues en lévitation par l'Aetherion, une énergie mystique ancestrale.",

        contexte:
          "Autrefois, les peuples d'Aetheria vivaient en harmonie jusqu'à ce que le Cœur Aetherion explose, créant des brèches et faisant dériver les dimensions.",

        mission: "Le parc raconte l'histoire d'une tentative de réunification de ces mondes.",

        elementCle: {
          nom: "L'Aetherion",
          type: "Énergie mystique ancestrale",
          role: "Maintient les îles flottantes en lévitation",
          etat: "Fracturé suite à l'explosion du Cœur Aetherion",
        },

        evenementCle: {
          nom: "L'Explosion du Cœur Aetherion",
          consequences: [
            "Fracture du royaume",
            "Création de brèches dimensionnelles",
            "Dérive des dimensions",
            "Séparation des peuples",
          ],
        },
      },
      valeurs: [
        "Harmonie entre les peuples",
        "Équilibre magie-technologie",
        "Unité dans la diversité",
        "Réparation et rédemption",
      ],
    },
  });
});

export default router;
