<?php

session_start();

$requestOrigin = $_SERVER["HTTP_ORIGIN"] ?? "";
$allowedOrigin = "http://localhost:5173";

if (
    $requestOrigin !== ""
    &&
    preg_match('#^https?://(localhost|127\.0\.0\.1)(:\d+)?$#', $requestOrigin)
) {
    $allowedOrigin = $requestOrigin;
}

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: " . $allowedOrigin);
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

require_once __DIR__ . "/../src/Database.php";

require_once __DIR__ . "/../src/Repositories/UserRepository.php";
require_once __DIR__ . "/../src/Repositories/CharacterRepository.php";

require_once __DIR__ . "/../src/Services/AuthService.php";
require_once __DIR__ . "/../src/Services/CharacterService.php";

require_once __DIR__ . "/../src/Controllers/AuthController.php";
require_once __DIR__ . "/../src/Controllers/CharacterController.php";

$db = Database::connect();

$userRepository =
    new UserRepository($db);

$characterRepository =
    new CharacterRepository($db);

$authService =
    new AuthService(
        $userRepository
    );

$characterService =
    new CharacterService(
        $characterRepository,
        $userRepository
    );

$authController =
    new AuthController(
        $authService
    );

$characterController =
    new CharacterController(
        $characterService
    );

$requestMethod =
    $_SERVER["REQUEST_METHOD"];

$requestUri =
    parse_url(
        $_SERVER["REQUEST_URI"],
        PHP_URL_PATH
    );

if (
    $requestMethod === "POST"
    &&
    $requestUri === "/register"
) {
    $authController->register();
    exit;
}

if (
    $requestMethod === "POST"
    &&
    $requestUri === "/login"
) {
    $authController->login();
    exit;
}

if (
    $requestMethod === "GET"
    &&
    $requestUri === "/me"
) {
    $authController->me();
    exit;
}

if (
    $requestMethod === "POST"
    &&
    $requestUri === "/logout"
) {
    $authController->logout();
    exit;
}

if (
    $requestMethod === "GET"
    &&
    $requestUri === "/characters"
) {
    $characterController->index();
    exit;
}

if (
    $requestMethod === "POST"
    &&
    $requestUri === "/characters"
) {
    $characterController->create();
    exit;
}

if (
    preg_match('#^/characters/(\d+)$#', $requestUri, $matches)
    &&
    $requestMethod === "GET"
) {
    $characterController->show((int) $matches[1]);
    exit;
}

if (
    preg_match('#^/characters/(\d+)$#', $requestUri, $matches)
    &&
    $requestMethod === "PUT"
) {
    $characterController->update((int) $matches[1]);
    exit;
}

if (
    preg_match('#^/characters/(\d+)$#', $requestUri, $matches)
    &&
    $requestMethod === "DELETE"
) {
    $characterController->delete((int) $matches[1]);
    exit;
}

if (
    $requestMethod === "GET"
    &&
    $requestUri === "/"
) {
    echo json_encode([
        "message" => "API funcionando"
    ]);

    exit;
}

http_response_code(404);

echo json_encode([
    "error" => "Rota não encontrada"
]);
