<?php

class CharacterController
{
    private CharacterService $characterService;

    public function __construct(CharacterService $characterService)
    {
        $this->characterService = $characterService;
    }

    public function create(): void
    {
        $requestBody = json_decode(
            file_get_contents("php://input"),
            true
        );

        $name = trim($requestBody["name"] ?? "");
        $species = trim($requestBody["species"] ?? "");
        $image = trim($requestBody["image"] ?? "");
        $url = trim($requestBody["url"] ?? "");

        try {
            $this->characterService->create(
                $name,
                $species,
                $image,
                $url
            );

            http_response_code(201);

            echo json_encode([
                "message" => "Personagem salvo com sucesso"
            ]);
        } catch (Exception $error) {
            http_response_code(400);

            echo json_encode([
                "error" => $error->getMessage()
            ]);
        }
    }

    public function index(): void
    {
        try {
            $characters = $this->characterService->listByAuthenticatedUser();

            echo json_encode([
                "characters" => $characters
            ]);
        } catch (Exception $error) {
            http_response_code(401);

            echo json_encode([
                "error" => $error->getMessage()
            ]);
        }
    }

    public function show(int $id): void
    {
        try {
            $character = $this->characterService->findOneByAuthenticatedUser($id);

            echo json_encode([
                "character" => $character
            ]);
        } catch (Exception $error) {
            http_response_code(404);

            echo json_encode([
                "error" => $error->getMessage()
            ]);
        }
    }

    public function update(int $id): void
    {
        $requestBody = json_decode(
            file_get_contents("php://input"),
            true
        );

        $name = trim($requestBody["name"] ?? "");
        $species = trim($requestBody["species"] ?? "");
        $image = trim($requestBody["image"] ?? "");
        $url = trim($requestBody["url"] ?? "");

        try {
            $this->characterService->update(
                $id,
                $name,
                $species,
                $image,
                $url
            );

            echo json_encode([
                "message" => "Personagem atualizado com sucesso"
            ]);
        } catch (Exception $error) {
            http_response_code(400);

            echo json_encode([
                "error" => $error->getMessage()
            ]);
        }
    }

    public function delete(int $id): void
    {
        try {
            $this->characterService->delete($id);

            echo json_encode([
                "message" => "Personagem excluído com sucesso"
            ]);
        } catch (Exception $error) {
            http_response_code(400);

            echo json_encode([
                "error" => $error->getMessage()
            ]);
        }
    }
}
