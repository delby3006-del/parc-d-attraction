<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: 'attractions')]
class Attraction
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(name: 'id_attraction', type: 'integer')]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: Zone::class, inversedBy: 'attractions')]
    #[ORM\JoinColumn(name: 'id_zone', referencedColumnName: 'id_zone', nullable: false)]
    private Zone $zone;

    #[ORM\Column(type: 'string')]
    private string $nom;

    #[ORM\Column(type: 'string', nullable: true)]
    private ?string $categorie = null;

    #[ORM\Column(type: 'string', nullable: true)]
    private ?string $description = null;

    #[ORM\Column(name: 'taille_min_cm', type: 'integer', nullable: true)]
    private ?int $tailleMinCm = null;

    #[ORM\Column(name: 'duree_min', type: 'integer', nullable: true)]
    private ?int $dureeMin = null;

    #[ORM\Column(type: 'string', options: ['default' => 'ouverte'])]
    private string $statut = 'ouverte';

    #[ORM\Column(type: 'integer', nullable: true)]
    private ?int $x = null;

    #[ORM\Column(type: 'integer', nullable: true)]
    private ?int $y = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getZone(): Zone
    {
        return $this->zone;
    }

    public function setZone(Zone $zone): static
    {
        $this->zone = $zone;
        return $this;
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

    public function getCategorie(): ?string
    {
        return $this->categorie;
    }

    public function setCategorie(?string $categorie): static
    {
        $this->categorie = $categorie;
        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;
        return $this;
    }

    public function getTailleMinCm(): ?int
    {
        return $this->tailleMinCm;
    }

    public function setTailleMinCm(?int $tailleMinCm): static
    {
        $this->tailleMinCm = $tailleMinCm;
        return $this;
    }

    public function getDureeMin(): ?int
    {
        return $this->dureeMin;
    }

    public function setDureeMin(?int $dureeMin): static
    {
        $this->dureeMin = $dureeMin;
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

    public function getX(): ?int
    {
        return $this->x;
    }

    public function setX(?int $x): static
    {
        $this->x = $x;
        return $this;
    }

    public function getY(): ?int
    {
        return $this->y;
    }

    public function setY(?int $y): static
    {
        $this->y = $y;
        return $this;
    }
}
