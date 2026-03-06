<?php

namespace App\Repository;

use App\Entity\OffreBilletterie;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<OffreBilletterie>
 */
class OffreBilletterieRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, OffreBilletterie::class);
    }

    public function findgetMaxPrices(): array
    {
        return $this->createQueryBuilder('o')
            // Utiliser les noms des propriétés de l'entité (o.prixUnitaire et o.typeOffre)
            // Ajouter un alias "as max_prix" rendra le JSON plus propre
            ->select('MAX(o.prixUnitaire) as max_prix', 'o.typeOffre')
            ->groupBy('o.typeOffre')
            ->getQuery()
            ->getResult();
    }
    // /**
    // * @return MotherBoard[] Returns an array of MotherBoard objects
    // */
    // public function findByExampleField($value): array
    // {
    // return $this->createQueryBuilder('m')
    // ->andWhere('m.exampleField = :val')
    // ->setParameter('val', $value)
    // ->orderBy('m.id', 'ASC')
    // ->setMaxResults(10)
    // ->getQuery()
    // ->getResult()
    // ;
    // }

    // public function findOneBySomeField($value): ?MotherBoard
    // {
    // return $this->createQueryBuilder('m')
    // ->andWhere('m.exampleField = :val')
    // ->setParameter('val', $value)
    // ->getQuery()
    // ->getOneOrNullResult()
    // ;
    // }
}
