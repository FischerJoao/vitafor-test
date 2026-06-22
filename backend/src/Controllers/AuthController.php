<?php

class AuthController
{
    private AuthService $authService;

    public function __construct(
        AuthService $authService
    ) {
        $this->authService = $authService;
    }

    public function register(): void
    {
        $requestBody = json_decode(
            file_get_contents("php://input"),
            true
        );

        $name = trim(
            $requestBody["name"] ?? ""
        );

        $email = trim(
            $requestBody["email"] ?? ""
        );

        $password = trim(
            $requestBody["password"] ?? ""
        );

        try {

            $this->authService->register(
                $name,
                $email,
                $password
            );

            http_response_code(201);

            echo json_encode([
                "message" =>
                    "Usuário cadastrado com sucesso"
            ]);

        } catch (Exception $error) {

            http_response_code(400);

            echo json_encode([
                "error" => $error->getMessage()
            ]);
        }
    }

    public function login(): void
    {
        $requestBody = json_decode(
            file_get_contents("php://input"),
            true
        );

        $email = trim(
            $requestBody["email"] ?? ""
        );

        $password = trim(
            $requestBody["password"] ?? ""
        );

        try {

            $user = $this->authService->login(
                $email,
                $password
            );

            echo json_encode([
                "user" => $user
            ]);

        } catch (Exception $error) {

            http_response_code(401);

            echo json_encode([
                "error" => $error->getMessage()
            ]);
        }
    }

    public function me(): void
    {
        try {
            $user = $this->authService->me();

            echo json_encode([
                "user" => $user
            ]);
        } catch (Exception $error) {
            http_response_code(401);

            echo json_encode([
                "error" => $error->getMessage()
            ]);
        }
    }

    public function logout(): void
    {
        $this->authService->logout();

        echo json_encode([
            "message" => "Logout realizado com sucesso"
        ]);
    }
}
