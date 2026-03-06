<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: 'points_interet')]
class PointInteret
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(name: 'id_point', type: 'integer')]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: Zone::class, inversedBy: 'pointsInteret')]
    #[ORM\JoinColumn(name: 'id_zone', referencedColumnName: 'id_zone', nullable: true)]
    private ?Zone $zone = null;

    #[ORM\Column(type: 'string')]
    private string $nom;

    #[ORM\Column(name: 'type_point', type: 'string')]
    private string $typePoint;

    #[ORM\Column(type: 'string', nullable: true)]
    private ?string $description = null;

    #[ORM\Column(type: 'integer', nullable: true)]
    private ?int $x = null;

    #[ORM\Column(type: 'integer', nullable: true)]
    private ?int $y = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getZone(): ?Zone
    {
        return $this->zone;
    }

    public function setZone(?Zone $zone): static
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

    public function getTypePoint(): string
    {
        return $this->typePoint;
    }

    public function setTypePoint(string $typePoint): static
    {
        $this->typePoint = $typePoint;
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
