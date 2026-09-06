<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['email'])) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "E-posta adresi eksik"]);
    exit;
}

$email = filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL);

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Geçersiz e-posta adresi"]);
    exit;
}

require_once 'db.php';

try {
    // E-posta adresinin daha önce kayıtlı olup olmadığını kontrol et
    $stmt = $pdo->prepare("SELECT id FROM subscribers WHERE email = ?");
    $stmt->execute([$email]);
    
    if ($stmt->rowCount() > 0) {
        http_response_code(409); // Conflict
        echo json_encode(["status" => "warning", "message" => "Bu e-posta adresi zaten kayıtlı."]);
        exit;
    }

    // IP adresini al
    $ip_address = $_SERVER['REMOTE_ADDR'] ?? null;

    // Yeni kaydı ekle
    $insertStmt = $pdo->prepare("INSERT INTO subscribers (email, ip_address) VALUES (?, ?)");
    $insertStmt->execute([$email, $ip_address]);

    http_response_code(200);
    echo json_encode(["status" => "success", "message" => "Bülten aboneliğiniz başarıyla onaylandı."]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Sunucu hatası: Kayıt yapılamadı."]);
}
?>
