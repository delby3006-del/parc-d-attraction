<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: 'publications')]
class Publication
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(name: 'id_publication', type: 'integer')]
    private ?int $id = null;

    #[ORM\Column(type: 'string')]
    private string $titre;

    #[ORM\Column(name: 'type_publication', type: 'string', options: ['default' => 'actualite'])]
    private string $typePublication = 'actualite';

    #[ORM\Column(type: 'text')]
    private string $contenu;

    #[ORM\Column(name: 'date_publication', type: 'string')]
    private string $datePublication;

    #[ORM\Column(type: 'integer', options: ['default' => 0])]
    private int $publie = 0;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitre(): string
    {
        return $this->titre;
    }

    public function setTitre(string $titre): static
    {
        $this->titre = $titre;
        return $this;
    }

    public function getTypePublication(): string
    {
        return $this->typePublication;
    }

    public function setTypePublication(string $typePublication): static
    {
        $this->typePublication = $typePublication;
        return $this;
    }

    public function getContenu(): string
    {
        return $this->contenu;
    }

    public function setContenu(string $contenu): static
    {
        $this->contenu = $contenu;
        return $this;
    }

    public function getDatePublication(): string
    {
        return $this->datePublication;
    }

    public function setDatePublication(string $datePublication): static
    {
        $this->datePublication = $datePublication;
        return $this;
    }

    public function getPublie(): int
    {
        return $this->publie;
    }

    public function setPublie(int $publie): static
    {
        $this->publie = $publie;
        return $this;
    }

    public function isPublie(): bool
    {
        return $this->publie === 1;
    }
}
