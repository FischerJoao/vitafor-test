<?php

class AuthService
{
    private UserRepository $userRepository;

    public function __construct(
        UserRepository $userRepository
    ) {
        $this->userRepository = $userRepository;
    }

    private function validatePassword(
        string $password
    ): void {
        $hasMinLength =
            strlen($password) >= 5;

        $hasLetter =
            preg_match('/[A-Za-z]/', $password);

        $hasNumber =
            preg_match('/\d/', $password);

        if (
            !$hasMinLength
            ||
            !$hasLetter
            ||
            !$hasNumber
        ) {
            throw new Exception(
                "A senha deve ter no mínimo 5 caracteres, com pelo menos 1 letra e 1 número"
            );
        }
    }

    public function register(
        string $name,
        string $email,
        string $password
    ): void {

        $userAlreadyExists =
            $this->userRepository
                ->findByEmail($email);

        if ($userAlreadyExists) {
            throw new Exception(
                "Email já cadastrado"
            );
        }

        $this->validatePassword(
            $password
        );

        $passwordHash = password_hash(
            $password,
            PASSWORD_DEFAULT
        );

        $this->userRepository->create(
            $name,
            $email,
            $passwordHash
        );
    }

    public function login(
        string $email,
        string $password
    ): array {

        $user =
            $this->userRepository
                ->findByEmail($email);

        if (!$user) {
            throw new Exception(
                "Usuário não encontrado"
            );
        }

        $passwordIsValid =
            password_verify(
                $password,
                $user["password"]
            );

        if (!$passwordIsValid) {
            throw new Exception(
                "Senha inválida"
            );
        }

        unset($user["password"]);

        session_regenerate_id(true);
        $_SESSION["user_id"] = $user["id"];

        return $user;
    }

    public function me(): array
    {
        $userId = $_SESSION["user_id"] ?? null;

        if (!$userId) {
            throw new Exception(
                "Usuário não autenticado"
            );
        }

        $user = $this->userRepository->findById(
            (int) $userId
        );

        if (!$user) {
            unset($_SESSION["user_id"]);

            throw new Exception(
                "Usuário não encontrado"
            );
        }

        return $user;
    }

    public function logout(): void
    {
        $_SESSION = [];

        if (ini_get("session.use_cookies")) {
            $params = session_get_cookie_params();

            setcookie(
                session_name(),
                "",
                time() - 42000,
                $params["path"],
                $params["domain"],
                $params["secure"],
                $params["httponly"]
            );
        }

        session_destroy();
    }
}
