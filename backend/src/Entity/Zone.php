<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Serializer\Attribute\Ignore; 

#[ORM\Entity]
#[ORM\Table(name: 'zones')]
class Zone
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(name: 'id_zone', type: 'integer')]
    private ?int $id = null;

    #[ORM\Column(type: 'string', unique: true)]
    private string $nom;

    #[ORM\Column(type: 'string', nullable: true)]
    private ?string $description = null;

    #[ORM\OneToMany(mappedBy: 'zone', targetEntity: Attraction::class)]
    private Collection $attractions;

    #[ORM\OneToMany(mappedBy: 'zone', targetEntity: PointInteret::class)]
    private Collection $pointsInteret;

    public function __construct()
    {
        $this->attractions = new ArrayCollection();
        $this->pointsInteret = new ArrayCollection();
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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;
        return $this;
    }

    #[Ignore]
    public function getAttractions(): Collection
    {
        return $this->attractions;
    }

    public function addAttraction(Attraction $attraction): static
    {
        if (!$this->attractions->contains($attraction)) {
            $this->attractions->add($attraction);
            $attraction->setZone($this);
        }
        return $this;
    }

    public function removeAttraction(Attraction $attraction): static
    {
        $this->attractions->removeElement($attraction);
        return $this;
    }

    #[Ignore]
    public function getPointsInteret(): Collection
    {
        return $this->pointsInteret;
    }

    public function addPointInteret(PointInteret $point): static
    {
        if (!$this->pointsInteret->contains($point)) {
            $this->pointsInteret->add($point);
            $point->setZone($this);
        }
        return $this;
    }

    public function removePointInteret(PointInteret $point): static
    {
        $this->pointsInteret->removeElement($point);
        return $this;
    }
}
