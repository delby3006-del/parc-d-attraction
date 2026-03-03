<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: 'commandes')]
class Commande
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(name: 'id_commande', type: 'integer')]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: Utilisateur::class, inversedBy: 'commandes')]
    #[ORM\JoinColumn(name: 'id_utilisateur', referencedColumnName: 'id_utilisateur', nullable: true)]
    private ?Utilisateur $utilisateur = null;

    #[ORM\ManyToOne(targetEntity: OffreBilletterie::class, inversedBy: 'commandes')]
    #[ORM\JoinColumn(name: 'id_offre', referencedColumnName: 'id_offre', nullable: true)]
    private ?OffreBilletterie $offre = null;

    #[ORM\Column(name: 'date_visite', type: 'string', nullable: true)]
    private ?string $dateVisite = null;

    #[ORM\Column(type: 'integer', options: ['default' => 1])]
    private int $quantite = 1;

    #[ORM\Column(name: 'prix_total', type: 'integer', options: ['default' => 0])]
    private int $prixTotal = 0;

    #[ORM\Column(type: 'string', options: ['default' => 'en_attente'])]
    private string $statut = 'en_attente';

    #[ORM\Column(name: 'date_commande', type: 'string')]
    private string $dateCommande;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUtilisateur(): ?Utilisateur
    {
        return $this->utilisateur;
    }

    public function setUtilisateur(?Utilisateur $utilisateur): static
    {
        $this->utilisateur = $utilisateur;
        return $this;
    }

    public function getOffre(): ?OffreBilletterie
    {
        return $this->offre;
    }

    public function setOffre(?OffreBilletterie $offre): static
    {
        $this->offre = $offre;
        return $this;
    }

    public function getDateVisite(): ?string
    {
        return $this->dateVisite;
    }

    public function setDateVisite(?string $dateVisite): static
    {
        $this->dateVisite = $dateVisite;
        return $this;
    }

    public function getQuantite(): int
    {
        return $this->quantite;
    }

    public function setQuantite(int $quantite): static
    {
        $this->quantite = $quantite;
        return $this;
    }

    public function getPrixTotal(): int
    {
        return $this->prixTotal;
    }

    public function setPrixTotal(int $prixTotal): static
    {
        $this->prixTotal = $prixTotal;
        return $this;
    }

    public function getStatut(): string
    {
        return $this->statut;
    }

    public function setStatut(string $statut): static
    {
        $this->statut = $statut;
        return $this;
    }

    public function getDateCommande(): string
    {
        return $this->dateCommande;
    }

    public function setDateCommande(string $dateCommande): static
    {
        $this->dateCommande = $dateCommande;
        return $this;
    }
}
