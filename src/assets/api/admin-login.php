<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['username']) || !isset($data['password'])) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Eksik bilgi."]);
    exit;
}

$username = strip_tags(trim($data['username']));
$password = $data['password'];

require_once 'db.php';

try {
    $stmt = $pdo->prepare("SELECT id, username, password_hash FROM admins WHERE username = ?");
    $stmt->execute([$username]);
    
    if ($stmt->rowCount() > 0) {
        $admin = $stmt->fetch();
        if (password_verify($password, $admin['password_hash'])) {
            // Şifre doğru, basit bir token üretip dönüyoruz (Gerçek bir uygulamada JWT önerilir)
            $token = bin2hex(random_bytes(32));
            
            http_response_code(200);
            echo json_encode([
                "status" => "success", 
                "message" => "Giriş başarılı.",
                "token" => $token,
                "username" => $admin['username']
            ]);
        } else {
            http_response_code(401);
            echo json_encode(["status" => "error", "message" => "Hatalı şifre."]);
        }
    } else {
        http_response_code(404);
        echo json_encode(["status" => "error", "message" => "Kullanıcı bulunamadı."]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Sunucu hatası."]);
}
?>
