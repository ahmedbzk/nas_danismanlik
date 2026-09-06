<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once 'db.php';

$headers = apache_request_headers();
$authHeader = isset($headers['Authorization']) ? $headers['Authorization'] : '';

if (strpos($authHeader, 'Bearer ') !== 0) {
    http_response_code(401);
    echo json_encode(["status" => "error", "message" => "Yetkisiz erişim. Lütfen giriş yapın."]);
    exit;
}

$token = substr($authHeader, 7);

$data = json_decode(file_get_contents("php://input"), true);
$current_password = $data['current_password'] ?? '';
$new_password = $data['new_password'] ?? '';

if (empty($current_password) || empty($new_password)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Tüm alanları doldurun."]);
    exit;
}

try {
    // 1. Token ile admini bul
    // Şimdilik sadece tek admin ("ahmedosuper") olduğu için doğrudan onu buluyoruz. 
    // Ancak gerçekte token jwt ise decode edilmeli. Burada basit tutuyoruz.
    $stmt = $pdo->prepare("SELECT * FROM admins WHERE username = 'ahmedosuper' LIMIT 1");
    $stmt->execute();
    $admin = $stmt->fetch();

    if (!$admin) {
        http_response_code(401);
        echo json_encode(["status" => "error", "message" => "Kullanıcı bulunamadı."]);
        exit;
    }

    // 2. Mevcut şifreyi kontrol et
    if (!password_verify($current_password, $admin['password_hash'])) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Mevcut şifre hatalı."]);
        exit;
    }

    // 3. Yeni şifreyi hashle ve kaydet
    $new_hash = password_hash($new_password, PASSWORD_DEFAULT);
    $updateStmt = $pdo->prepare("UPDATE admins SET password_hash = ? WHERE id = ?");
    $updateStmt->execute([$new_hash, $admin['id']]);

    http_response_code(200);
    echo json_encode(["status" => "success", "message" => "Şifreniz başarıyla güncellendi."]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Veritabanı hatası."]);
}
?>
