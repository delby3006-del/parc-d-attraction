<?php

namespace App\Controller;

use App\Entity\Publication;
use App\Entity\Image;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('api/publication', name: 'app_publication')]
final class PublicationController extends AbstractController
{
    #[Route('', name: 'get_publication', methods: ['GET'])]
    public function getPublication(EntityManagerInterface $em) :JsonResponse
    {
        $publication = $em->getRepository(Publication::class)->findAll();

        return $this->json($publication, Response::HTTP_OK);
    }

    #[Route('/{id}', name: 'get_one_publication', methods: ['GET'])]
    public function getOnePublication(int $id, EntityManagerInterface $em) : JsonResponse
    {
        $publication = $em->getRepository(Publication::class)->find($id);
        if(!$publication){
            return $this->json(['message' => "Publication non trouvée"], 404);
        }

        return $this->json($publication, Response::HTTP_OK);
    }

    #[Route('', name: 'create_publication', methods: ['POST'])]
    public function createPublication(Request $req, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($req->getContent(), true);
        if(!$data){
            return $this->json(['message' => "Data non trouvé"], 404);
        }

        $publication = new Publication();
        $publication->setTitre($data['titre']);
        $publication->setContenu($data['contenu']);
        $publication->setDatePublication($data['date_publication'] ?? 'actualite');
        $publication->setPublie($data['publie'] ?? 0);

        $em->persist($publication);
        $em->flush();

        return $this->json(['message' => "Publication créée avec succès"], Response::HTTP_CREATED);

    }

    #[Route('/{id}', name: 'delete_publication', methods: ['DELETE'])]
    public function deletePublication(EntityManagerInterface $em, int $id) :JsonResponse
    {
        $publication = $em->getRepository(Publication::class)->find($id);
        if (!$publication){
            return $this->json(['message' => "Publication non trouvée"], 404);
        }

        $em->remove($publication);
        $em->flush();

        return $this->json(['message' => "Publication supprimée avec succès"], Response::HTTP_OK);
    }


    #[Route('/image', name: 'get_image', methods: ['GET'])]
    public function getImage(EntityManagerInterface $em): JsonResponse
    {
        $images = $em->getRepository(Image::class)->findAll();

        return $this->json($images, Response::HTTP_OK);
    }

    #[Route('/image/{id}', name: 'get_one_image', methods: ['GET'])]
    public function getOneImage(int $id, EntityManagerInterface $em): JsonResponse
    {
        $image = $em->getRepository(Image::class)->find($id);

        if(!$image){
            return $this->json(['message' => "Cette image n'existe pas"], 404);
        }

        return $this->json($image, Response::HTTP_OK);
    }


    #[Route('/image', name: 'create_image', methods: ['POST'])]
    public function createImage(Request $req, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($req->getContent(), true);
        if(!$data){
            return $this->json(['message' => "Data non trouvé"], 404);
        }

        $image = new Image();
        $image->setTypeObjet($data['type_objet']);
        $image->setIdObjet($data["id_objet"]);
        $image->setUrl($data['url']);
        $image->setAlt($data['alt'] ?? null);
        $image->setDateAjout($data['date_ajout']);
        $image->setEstPrincipale($data['est_principale'] ?? 0);
        $image->setOrdre($data['ordre'] ?? 0);

        $em->persist($image);
        $em->flush();

        return $this->json(['message' => "Image créée avec succès"], Response::HTTP_CREATED);
    }

    
    #[Route('/image/{id}', name: 'remove_image', methods: ['DELETE'])]
    public function deleteImage(int $id, EntityManagerInterface $em) : JsonResponse
    {
        $image = $em->getRepository(Image::class)->find($id);
        if(!$image){
            return $this->json(['message' => "Cette Image n'existe pas"], 404);
        }

        $em->remove($image);
        $em->flush();

        return $this->json(['message' => "Image supprimée avec succès"], Response::HTTP_OK);
    }


}
