<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, DELETE, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Basit bir auth kontrolü (gerçek uygulamada JWT doğrulaması yapılır)
$headers = apache_request_headers();
$authHeader = isset($headers['Authorization']) ? $headers['Authorization'] : '';

if (empty($authHeader)) {
    http_response_code(401);
    echo json_encode(["status" => "error", "message" => "Yetkisiz erişim. Token bulunamadı."]);
    exit;
}

require_once 'db.php';

$method = $_SERVER['REQUEST_METHOD'];
$type = isset($_GET['type']) ? $_GET['type'] : '';

if ($method === 'GET') {
    try {
        if ($type === 'contacts') {
            $stmt = $pdo->query("SELECT * FROM contacts ORDER BY created_at DESC");
            $data = $stmt->fetchAll();
            echo json_encode(["status" => "success", "data" => $data]);
        } elseif ($type === 'subscribers') {
            $stmt = $pdo->query("SELECT * FROM subscribers ORDER BY subscribed_at DESC");
            $data = $stmt->fetchAll();
            echo json_encode(["status" => "success", "data" => $data]);
        } else {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Geçersiz veri tipi."]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Veritabanı hatası."]);
    }
} elseif ($method === 'DELETE') {
    $id = isset($_GET['id']) ? intval($_GET['id']) : 0;
    
    if ($id <= 0) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Geçersiz ID."]);
        exit;
    }
    
    try {
        if ($type === 'contacts') {
            $stmt = $pdo->prepare("DELETE FROM contacts WHERE id = ?");
            $stmt->execute([$id]);
            echo json_encode(["status" => "success", "message" => "Kayıt başarıyla silindi."]);
        } elseif ($type === 'subscribers') {
            $stmt = $pdo->prepare("DELETE FROM subscribers WHERE id = ?");
            $stmt->execute([$id]);
            echo json_encode(["status" => "success", "message" => "Kayıt başarıyla silindi."]);
        } else {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Geçersiz veri tipi."]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Veritabanı silme hatası."]);
    }
}
?>
