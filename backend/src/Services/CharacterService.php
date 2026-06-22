<?php

class CharacterService
{
    private CharacterRepository $characterRepository;
    private UserRepository $userRepository;

    public function __construct(
        CharacterRepository $characterRepository,
        UserRepository $userRepository
    ) {
        $this->characterRepository = $characterRepository;
        $this->userRepository = $userRepository;
    }

    private function getAuthenticatedUserId(): int
    {
        $userId = $_SESSION["user_id"] ?? null;

        if (!$userId) {
            throw new Exception(
                "Você precisa estar logado para salvar personagens"
            );
        }

        $user = $this->userRepository->findById((int) $userId);

        if (!$user) {
            unset($_SESSION["user_id"]);

            throw new Exception(
                "Usuário não encontrado"
            );
        }

        return (int) $userId;
    }

    public function create(
        string $name,
        string $species,
        string $image,
        string $url
    ): void {
        $userId = $this->getAuthenticatedUserId();

        $alreadySaved = $this->characterRepository->findByUrlAndUserId(
            $url,
            $userId
        );

        if ($alreadySaved) {
            throw new Exception(
                "Esse personagem já foi salvo"
            );
        }

        $this->characterRepository->create(
            $userId,
            $name,
            $species,
            $image,
            $url
        );
    }

    public function listByAuthenticatedUser(): array
    {
        $userId = $this->getAuthenticatedUserId();

        return $this->characterRepository->findAllByUserId($userId);
    }

    public function findOneByAuthenticatedUser(int $id): array
    {
        $userId = $this->getAuthenticatedUserId();

        $character = $this->characterRepository->findByIdAndUserId($id, $userId);

        if (!$character) {
            throw new Exception(
                "Personagem salvo não encontrado"
            );
        }

        return $character;
    }

    public function update(
        int $id,
        string $name,
        string $species,
        string $image,
        string $url
    ): void {
        $userId = $this->getAuthenticatedUserId();

        $character = $this->characterRepository->findByIdAndUserId($id, $userId);

        if (!$character) {
            throw new Exception(
                "Personagem salvo não encontrado"
            );
        }

        $this->characterRepository->update(
            $id,
            $userId,
            $name,
            $species,
            $image,
            $url
        );
    }

    public function delete(int $id): void
    {
        $userId = $this->getAuthenticatedUserId();

        $character = $this->characterRepository->findByIdAndUserId($id, $userId);

        if (!$character) {
            throw new Exception(
                "Personagem salvo não encontrado"
            );
        }

        $this->characterRepository->delete($id, $userId);
    }
}
