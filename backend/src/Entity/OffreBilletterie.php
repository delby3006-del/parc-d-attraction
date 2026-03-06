<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use App\Repository\OffreBilletterieRepository;

#[ORM\Table(name: 'offres_billetterie')]
#[ORM\Entity(repositoryClass: OffreBilletterieRepository::class)]
class OffreBilletterie
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(name: 'id_offre', type: 'integer')]
    private ?int $id = null;

    #[ORM\Column(type: 'string', unique: true)]
    private string $nom;

    #[ORM\Column(name: 'type_offre', type: 'string')]
    private string $typeOffre;

    #[ORM\Column(name: 'prix_unitaire', type: 'integer')]
    private int $prixUnitaire;

    #[ORM\Column(name: 'duree_jours', type: 'integer', nullable: true)]
    private ?int $dureeJours = null;

    #[ORM\Column(name: 'duree_mois', type: 'integer', nullable: true)]
    private ?int $dureeMois = null;

    #[ORM\Column(name: 'seuil_remise', type: 'integer', options: ['default' => 10])]
    private int $seuilRemise = 10;

    #[ORM\Column(name: 'remise_pourcent', type: 'integer', options: ['default' => 15])]
    private int $remisePourcent = 15;

    #[ORM\Column(type: 'integer', options: ['default' => 1])]
    private int $actif = 1;

    #[ORM\OneToMany(mappedBy: 'offre', targetEntity: Commande::class)]
    private Collection $commandes;

    public function __construct()
    {
        $this->commandes = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): string
    {
        return $this->nom;
    }

    public function setNom(string $nom): static
    {
        $this->nom = $nom;
        return $this;
    }

    public function getTypeOffre(): string
    {
        return $this->typeOffre;
    }

    public function setTypeOffre(string $typeOffre): static
    {
        $this->typeOffre = $typeOffre;
        return $this;
    }

    public function getPrixUnitaire(): int
    {
        return $this->prixUnitaire;
    }

    public function setPrixUnitaire(int $prixUnitaire): static
    {
        $this->prixUnitaire = $prixUnitaire;
        return $this;
    }

    public function getDureeJours(): ?int
    {
        return $this->dureeJours;
    }

    public function setDureeJours(?int $dureeJours): static
    {
        $this->dureeJours = $dureeJours;
        return $this;
    }

    public function getDureeMois(): ?int
    {
        return $this->dureeMois;
    }

    public function setDureeMois(?int $dureeMois): static
    {
        $this->dureeMois = $dureeMois;
        return $this;
    }

    public function getSeuilRemise(): int
    {
        return $this->seuilRemise;
    }

    public function setSeuilRemise(int $seuilRemise): static
    {
        $this->seuilRemise = $seuilRemise;
        return $this;
    }

    public function getRemisePourcent(): int
    {
        return $this->remisePourcent;
    }

    public function setRemisePourcent(int $remisePourcent): static
    {
        $this->remisePourcent = $remisePourcent;
        return $this;
    }

    public function getActif(): int
    {
        return $this->actif;
    }

    public function setActif(int $actif): static
    {
        $this->actif = $actif;
        return $this;
    }

    public function getCommandes(): Collection
    {
        return $this->commandes;
    }

    public function addCommande(Commande $commande): static
    {
        if (!$this->commandes->contains($commande)) {
            $this->commandes->add($commande);
            $commande->setOffre($this);
        }
        return $this;
    }

    public function removeCommande(Commande $commande): static
    {
        if ($this->commandes->removeElement($commande)) {
            if ($commande->getOffre() === $this) {
                $commande->setOffre(null);
            }
        }
        return $this;
    }
}