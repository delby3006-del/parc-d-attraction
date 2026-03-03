<?php

namespace App\Controller;

use App\Entity\OffreBilletterie;
use App\Entity\Commande;
use App\Entity\Utilisateur;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\ErrorHandler\ErrorHandler;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;


#[Route('/api/billeterie', name: 'app_billeterie')]

final class BilleterieController extends AbstractController
{
    #[Route('', name: 'get_offres', methods:['GET'])]
    public function get(EntityManagerInterface $em): JsonResponse
    {

        $offres = $em->getRepository(OffreBilletterie::class)->findAll();

        if(!$offres){
            return $this->json(['message' => "Offres non trouvé"], JsonResponse::HTTP_NOT_FOUND);
        }
        return $this->json($offres, Response::HTTP_OK);
    }

    
    #[Route('/{id}', name: 'get_one_offre', methods:['GET'])]
    public function getOne(EntityManagerInterface $em,$id): JsonResponse
    {

        $offre = $em->getRepository(OffreBilletterie::class)->find($id);

        if(!$offre){
            return $this->json(['message' => "Data non trouvé"], JsonResponse::HTTP_NOT_FOUND);
        }
        return $this->json($offre, Response::HTTP_OK);
    }

    #[Route('', name: 'create_offre',methods:['POST'])]
    public function create(Request $req,EntityManagerInterface $em): JsonResponse
    {

        try {
        $data = json_decode($req->getContent(),true);
        $offre = new OffreBilletterie();

        $offre->setNom($data['nom']);
        $offre->setTypeOffre($data['type_offre']);
        $offre->setPrixUnitaire($data['prix']);
        $offre->setDureeJours($data['duree_jour']);
        $offre->setDureeMois($data['duree_mois']);
        $offre->setSeuilRemise($data['seuil_remise']);
        $offre->setRemisePourcent($data['remise']);
        
        $em->persist($offre);
        $em->flush();
            return $this->json(['message'=>"Type de offre creer"], Response::HTTP_CREATED);
        } catch (ErrorHandler $e) {
            return $this->json(['message'=>'Erreur server'], Response::HTTP_OK);
        }
    }

    #[Route('/{id}', name: 'delete_offre',methods:['DELETE'])]
    public function deleteOne(EntityManagerInterface $em,$id): JsonResponse
    {

        $offre = $em->getRepository(OffreBilletterie::class)->find($id);
        
        if(!$offre){
            return $this->json(['message' => "offre non trouvé"], JsonResponse::HTTP_NOT_FOUND);
        }
        try {
            $em->remove($offre);
            $em->flush();
            return $this->json(['message'=>"offre supprime"], Response::HTTP_OK);
        } catch (ErrorHandler $e) {
            return $this->json(['message'=>'Erreur server'], 500);
        }
    }

        
    #[Route('/commande', name: 'get_commandes', methods: ['GET'])]
    public function getCommandes(EntityManagerInterface $em): JsonResponse
    {
    $commandes = $em->getRepository(Commande::class)->findAll();

    if (empty($commandes)) {
        return $this->json(['message' => 'Aucune commande trouvée'], Response::HTTP_NOT_FOUND);
    }

    return $this->json($commandes, Response::HTTP_OK);
    }

    #[Route('/commande/{id}', name: 'get_one_commande', methods: ['GET'])]
    public function getOneCommande(int $id, EntityManagerInterface $em): JsonResponse
    {
        $commande = $em->getRepository(Commande::class)->find($id);

        if (!$commande) {
            return $this->json(['message' => "Cette commande n'existe pas"], Response::HTTP_NOT_FOUND);
        }

        return $this->json($commande, Response::HTTP_OK);
    }

    #[Route('/commande', name: 'create_commande', methods: ['POST'])]
    public function createCommande(Request $req, EntityManagerInterface $em): JsonResponse
    {
        try {
            $data = json_decode($req->getContent(), true);

            if (!$data) {
                return $this->json(['message' => 'Données invalides'], Response::HTTP_BAD_REQUEST);
            }

            $utilisateur = null;
            if (!empty($data['id_utilisateur'])) {
                $utilisateur = $em->getRepository(Utilisateur::class)->find($data['id_utilisateur']);
                if (!$utilisateur) {
                    return $this->json(['message' => 'Utilisateur non trouvé'], Response::HTTP_NOT_FOUND);
                }
            }

            $offre = null;
            if (!empty($data['id_billeterie'])) {
                $offre = $em->getRepository(OffreBilletterie::class)->find($data['id_billeterie']);
                if (!$offre) {
                    return $this->json(['message' => 'Offre de Billetterie non trouvée'], Response::HTTP_NOT_FOUND);
                }
            }

            $quantite = $data['quantite'] ?? 1;
            $prixTotal = $offre ? $offre->getPrixUnitaire() * $quantite : 0;

            $commande = new Commande();
            $commande->setUtilisateur($utilisateur);
            $commande->setOffre($offre);
            $commande->setQuantite($quantite);
            $commande->setPrixTotal($prixTotal);
            $commande->setStatut($data['statut'] ?? 'en_attente');
            $commande->setDateVisite($data['date_visite'] ?? null);
            $commande->setDateCommande((new \DateTime())->format('Y-m-d H:i:s'));

            $em->persist($commande);
            $em->flush();

            return $this->json(['message' => 'Commande créée avec succès'], Response::HTTP_CREATED);

        } catch (\Exception $e) {
            return $this->json(['message' => 'Erreur serveur', 'detail' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    
    #[Route('/commande/{id}', name: 'remove_commande', methods: ['DELETE'])]
    public function deleteCommande(int $id, EntityManagerInterface $em): JsonResponse
    {
        $commande = $em->getRepository(Commande::class)->find($id);

        if (!$commande) {
            return $this->json(['message' => "Cette commande n'existe pas"], Response::HTTP_NOT_FOUND);
        }

        try {
            $em->remove($commande);
            $em->flush();

            return $this->json(['message' => 'Commande supprimée avec succès'], Response::HTTP_OK);

        } catch (\Exception $e) {
            return $this->json(['message' => 'Erreur serveur', 'detail' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
