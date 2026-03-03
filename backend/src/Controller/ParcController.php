<?php

namespace App\Controller;

use App\Entity\Attraction;
use App\Entity\Zone;
use App\Entity\PointInteret;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Validator\Constraints\Json;

#[Route('api/parc', name: 'app_')]
final class ParcController extends AbstractController
{
    #[Route('/attractions', name: 'parc_attractions', methods: ['GET'])]

    public function getAttraction(EntityManagerInterface $em): JsonResponse
    {
        $attraction = $em->getRepository(Attraction::class)->findAll();
        return $this->json($attraction);
    }


    #[Route('/attractions/{id}', name: 'one_attractions', methods: ['GET'])]
    public function getOneAttraction(EntityManagerInterface $em, int $id):JsonResponse
    {
        $attraction = $em->getRepository(Attraction::class)->find($id);
        
        if(!$attraction){
            return $this->json(['message' => "Attraction non trouvée"], 404);
        }
        return $this->json($attraction);
    }

    #[Route('/attractions', name: 'create_attractions', methods: ['POST'])]
    public function createAttraction(EntityManagerInterface $em, Request $req): JsonResponse
    {
        $data = json_decode($req->getContent(), true);

        $attraction = new Attraction();
        $attraction->setNom($data['nom']);
        $attraction->setCategorie($data['categorie'] ?? null);
        $attraction->setDescription($data['description'] ?? null);
        $attraction->setTailleMinCm($data['taille_min_cm'] ?? null);
        $attraction->setDureeMin($data['duree_min'] ?? null);
        $attraction->setStatut($data['statut'] ?? 'ouverte');
        $attraction->setX($data['x'] ?? null);
        $attraction->setY($data['y'] ?? null);

        $zone = $em->getRepository(Zone::class)->find($data['id_zone']);
        if(!$zone){
            return $this->json(['message' => "Zone non trouvée"], 404);
        }
        $attraction->setZone($zone);

        $em->persist($attraction);
        $em->flush();

        return $this->json(['message' => "Votre nouvelle attraction à bien été enregistrée"], Response::HTTP_CREATED);
    }

    
    #[Route('/attractions/{id}', name: 'remove_attractions', methods: ['DELETE'])]
    public function deleteAttraction(int $id, EntityManagerInterface $em) : JsonResponse
    {
        $attraction = $em->getRepository(Attraction::class)->find($id);
        if(!$attraction){
            return $this->json(['message' => 'Attraction non trouvée'], 404);
        }

        $em->remove($attraction);
        $em->flush();

        return $this->json(['message' => 'Attraction supprimée'], Response::HTTP_OK);

    }


    #[Route('/zone', name: 'parc_zone', methods: ['GET'])]
    public function getZone(EntityManagerInterface $em) : JsonResponse
    {
        $zones = $em->getRepository(Zone::class)->findAll();
        return $this->json($zones, Response::HTTP_OK);
    }

    #[Route('/zone/{id}', name: 'one_zone', methods: ['GET'])]
    public function getOneZone(EntityManagerInterface $em, int $id) : JsonResponse
    {
        $zone = $em->getRepository(Zone::class)->find($id);
        
        if(!$zone){
            return $this->json(['message' => 'Zone non trouvée'], 404);
        }

        return $this->json($zone);
    }

    #[Route('/zone', name: 'create_zone', methods: ['POST'])]
    public function createZone(EntityManagerInterface $em, Request $req) : JsonResponse
    {
        $data = json_decode($req->getContent(), true);

        $zone = new Zone();
        $zone->setNom($data['nom']);
        $zone->setDescription($data['description'] ?? null);

        $em->persist($zone);
        $em->flush();

        return $this->json(['message' => 'Zone créée'], Response::HTTP_CREATED);
    }

    #[Route('/zone/{id}', name: 'remove_zone', methods: ['DELETE'])]
    public function deleteZone(int $id, EntityManagerInterface $em) :JsonResponse
    {
        $zone = $em->getRepository(Zone::class)->find($id);
        
        if(!$zone){
            return $this->json(['message' => "Cette zone n'existe pas"], 404);
        }

        $em->remove($zone);
        $em->flush();

        return $this->json(['message' => "Zone supprimée"], Response::HTTP_OK);
    }

    #[Route('/point-interet', name: 'parc_point_interet', methods: ['GET'])]
    public function getPointInteret(EntityManagerInterface $em): JsonResponse
    {
        $pointInteret = $em->getRepository(PointInteret::class)->findAll();

        return $this->json($pointInteret, Response::HTTP_OK);
    }

    #[Route('/point-interet/{id}', name: 'one_point_interet', methods: ['GET'])]
    public function getOnePointInteret(int $id, EntityManagerInterface $em,) : JsonResponse
    {
        $pointInteret = $em->getRepository(PointInteret::class)->find($id);

        if(!$pointInteret){
            return $this->json(['message' => "Point Interet non trouvé"], 404);
        }

        return $this->json($pointInteret, Response::HTTP_OK);
    }

    #[Route('/point-interet', name: 'create_point_interet', methods: ['POST'])]
    public function createPointInteret(Request $req, EntityManagerInterface $em) :JsonResponse
    {
        $data = json_decode($req->getContent(), true);
        if(!$data){
            return $this->json(['message' => "Data non trouvé"], 404);
        }

        $pointInteret = new PointInteret();
        $pointInteret->setNom($data['nom']);
        $pointInteret->setTypePoint($data['type_point']);
        $pointInteret->setDescription($data['description'] ?? null);
        $pointInteret->setX($data['x'] ?? null);
        $pointInteret->setY($data['y'] ?? null);
        if(isset($data['id_zone'])){
           $zone = $em->getRepository(Zone::class)->find($data['id_zone']);
           if (!$zone) {
                return $this->json(['message' => 'Zone non trouvée'], 404);
            }   
            $pointInteret->setZone($zone);
        }

        $em->persist($pointInteret);
        $em->flush();

        return $this->json(['message' => "Point Interet Créé"], Response::HTTP_CREATED);
    }

    #[Route('/point-interet/{id}', name: 'remove_point_interet', methods: ['DELETE'])]
    public function deletePointInteret(int $id, EntityManagerInterface $em) :JsonResponse
    {
        $pointInteret = $em->getRepository(PointInteret::class)->find($id);
        if(!$pointInteret){
            return $this->json(['message' => "Ce point interet n'existe pas"], 404);
        }

        $em->remove($pointInteret);
        $em->flush();

        return $this->json(['message' => "Point interet Supprimé"], Response::HTTP_OK);
    }
}
