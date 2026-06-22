<?php

class CharacterRepository
{
    private PDO $db;

    public function __construct(PDO $db)
    {
        $this->db = $db;
    }

    public function create(
        int $userId,
        string $name,
        string $species,
        string $image,
        string $url
    ): bool {
        $query = $this->db->prepare("
            INSERT INTO characters (
                user_id,
                name,
                species,
                image,
                url
            )
            VALUES (
                :user_id,
                :name,
                :species,
                :image,
                :url
            )
        ");

        return $query->execute([
            "user_id" => $userId,
            "name" => $name,
            "species" => $species,
            "image" => $image,
            "url" => $url
        ]);
    }

    public function findAllByUserId(int $userId): array
    {
        $query = $this->db->prepare("
            SELECT id, user_id, name, species, image, url, created_at, updated_at
            FROM characters
            WHERE user_id = :user_id
            ORDER BY created_at DESC
        ");

        $query->execute([
            "user_id" => $userId
        ]);

        return $query->fetchAll(PDO::FETCH_ASSOC);
    }

    public function findByIdAndUserId(int $id, int $userId): array|false
    {
        $query = $this->db->prepare("
            SELECT id, user_id, name, species, image, url, created_at, updated_at
            FROM characters
            WHERE id = :id AND user_id = :user_id
            LIMIT 1
        ");

        $query->execute([
            "id" => $id,
            "user_id" => $userId
        ]);

        return $query->fetch(PDO::FETCH_ASSOC);
    }

    public function findByUrlAndUserId(string $url, int $userId): array|false
    {
        $query = $this->db->prepare("
            SELECT id, user_id, name, species, image, url, created_at, updated_at
            FROM characters
            WHERE url = :url AND user_id = :user_id
            LIMIT 1
        ");

        $query->execute([
            "url" => $url,
            "user_id" => $userId
        ]);

        return $query->fetch(PDO::FETCH_ASSOC);
    }

    public function update(
        int $id,
        int $userId,
        string $name,
        string $species,
        string $image,
        string $url
    ): bool {
        $query = $this->db->prepare("
            UPDATE characters
            SET
                name = :name,
                species = :species,
                image = :image,
                url = :url,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = :id AND user_id = :user_id
        ");

        return $query->execute([
            "id" => $id,
            "user_id" => $userId,
            "name" => $name,
            "species" => $species,
            "image" => $image,
            "url" => $url
        ]);
    }

    public function delete(int $id, int $userId): bool
    {
        $query = $this->db->prepare("
            DELETE FROM characters
            WHERE id = :id AND user_id = :user_id
        ");

        return $query->execute([
            "id" => $id,
            "user_id" => $userId
        ]);
    }
}
