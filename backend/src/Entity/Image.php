<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: 'images')]
#[ORM\UniqueConstraint(name: 'unique_principale', columns: ['type_objet', 'id_objet', 'est_principale'])]
class Image
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(name: 'id_image', type: 'integer')]
    private ?int $id = null;

    #[ORM\Column(name: 'type_objet', type: 'string')]
    private string $typeObjet;

    #[ORM\Column(name: 'id_objet', type: 'integer')]
    private int $idObjet;

    #[ORM\Column(type: 'string')]
    private string $url;

    #[ORM\Column(type: 'string', nullable: true)]
    private ?string $alt = null;

    #[ORM\Column(name: 'est_principale', type: 'integer', options: ['default' => 0])]
    private int $estPrincipale = 0;

    #[ORM\Column(type: 'integer', options: ['default' => 0])]
    private int $ordre = 0;

    #[ORM\Column(name: 'date_ajout', type: 'string')]
    private string $dateAjout;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTypeObjet(): string
    {
        return $this->typeObjet;
    }

    public function setTypeObjet(string $typeObjet): static
    {
        $this->typeObjet = $typeObjet;
        return $this;
    }

    public function getIdObjet(): int
    {
        return $this->idObjet;
    }

    public function setIdObjet(int $idObjet): static
    {
        $this->idObjet = $idObjet;
        return $this;
    }

    public function getUrl(): string
    {
        return $this->url;
    }

    public function setUrl(string $url): static
    {
        $this->url = $url;
        return $this;
    }

    public function getAlt(): ?string
    {
        return $this->alt;
    }

    public function setAlt(?string $alt): static
    {
        $this->alt = $alt;
        return $this;
    }

    public function getEstPrincipale(): int
    {
        return $this->estPrincipale;
    }

    public function setEstPrincipale(int $estPrincipale): static
    {
        $this->estPrincipale = $estPrincipale;
        return $this;
    }

    public function isPrincipale(): bool
    {
        return $this->estPrincipale === 1;
    }

    public function getOrdre(): int
    {
        return $this->ordre;
    }

    public function setOrdre(int $ordre): static
    {
        $this->ordre = $ordre;
        return $this;
    }

    public function getDateAjout(): string
    {
        return $this->dateAjout;
    }

    public function setDateAjout(string $dateAjout): static
    {
        $this->dateAjout = $dateAjout;
        return $this;
    }
}
