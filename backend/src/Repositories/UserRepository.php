<?php

class UserRepository
{
    private PDO $db;

    public function __construct(PDO $db)
    {
        $this->db = $db;
    }

    public function create(
        string $name,
        string $email,
        string $password
    ): bool {
        $createUserQuery = $this->db->prepare("
            INSERT INTO users (
                name,
                email,
                password
            )
            VALUES (
                :name,
                :email,
                :password
            )
        ");

        return $createUserQuery->execute([
            "name" => $name,
            "email" => $email,
            "password" => $password
        ]);
    }

    public function findByEmail(string $email): array|false
    {
        $findUserByEmailQuery = $this->db->prepare("
            SELECT *
            FROM users
            WHERE email = :email
            LIMIT 1
        ");

        $findUserByEmailQuery->execute([
            "email" => $email
        ]);

        return $findUserByEmailQuery->fetch(PDO::FETCH_ASSOC);
    }

    public function findById(int $id): array|false
    {
        $findUserByIdQuery = $this->db->prepare("
            SELECT id, name, email, created_at, updated_at
            FROM users
            WHERE id = :id
            LIMIT 1
        ");

        $findUserByIdQuery->execute([
            "id" => $id
        ]);

        return $findUserByIdQuery->fetch(PDO::FETCH_ASSOC);
    }
}