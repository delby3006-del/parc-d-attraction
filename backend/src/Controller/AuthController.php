<?php

namespace App\Controller;

use App\Entity\Utilisateur;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/utilisateur', name: 'app_utilisateur_')]
final class AuthController extends AbstractController
{
    #[Route('', name: 'get_utilisateur', methods: ['GET'])]
    public function getUtilisateur(EntityManagerInterface $em): JsonResponse
    {
        $user = $em->getRepository(Utilisateur::class)->findAll();

        return $this->json($user, Response::HTTP_OK);
    }

    #[Route('/{id}', name: 'get_one_utilisateur', methods: ['GET'])]
    public function getOneUtilisateur(EntityManagerInterface $em, int $id): JsonResponse
    {
        $user = $em->getRepository(Utilisateur::class)->find($id);
        if(!$user){
            return $this->json(['message' => "Utilisateur introuvable"], Response::HTTP_NOT_FOUND);
        }

        return $this->json($user, Response::HTTP_OK);
    }

    #[Route('', name: 'create_utilisateur', methods: ['POST'])]
    public function createUtilisateur(Request $req, EntityManagerInterface $em): JsonResponse
    {
        try {
            $data = json_decode($req->getContent(), true);

            if (!$data) {
                return $this->json(['message' => 'Données invalides'], Response::HTTP_BAD_REQUEST);
            }

            $user = new Utilisateur();
            $user->setEmail($data['email']);
            $user->setMotDePasseHash($data['mot_de_passe_hash']);
            $user->setRole($data['role'] ?? 'utilisateur');

            $em->persist($user);
            $em->flush();

            return $this->json(['message' => 'Utilisateur créé avec succès'], Response::HTTP_CREATED);

        } catch (\Exception $e) {
            return $this->json(['message' => 'Erreur serveur', 'detail' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}