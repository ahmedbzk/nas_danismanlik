<?php
// XAMPP varsayılan ayarları (Genelde root ve şifresizdir)
$db_host = "localhost";
$db_user = "root";
$db_pass = ""; 
$db_name = "nas_db";

try {
    // PDO ile güvenli bağlantı oluşturuyoruz
    $pdo = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8mb4", $db_user, $db_pass);
    
    // Hata modunu exception olarak ayarlıyoruz
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // Varsayılan fetch modunu associative array yapıyoruz
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch(PDOException $e) {
    // Gerçek ortamda hatayı ekrana basmak yerine loglamak daha güvenlidir.
    // Şimdilik geliştirme ortamı için hata mesajını veriyoruz.
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Veritabanı bağlantı hatası."]);
    exit;
}
?>
