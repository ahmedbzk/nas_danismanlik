<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["status" => "error", "message" => "No data received"]);
    exit;
}

$name = isset($data['name']) ? strip_tags(trim($data['name'])) : '';
$email = isset($data['email']) ? filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL) : '';
$subject = isset($data['subject']) ? strip_tags(trim($data['subject'])) : 'Web Sitesi İletişim Formu';
$message = isset($data['message']) ? strip_tags(trim($data['message'])) : '';

if (empty($name) || empty($email) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Geçersiz veya eksik bilgi"]);
    exit;
}

// Veritabanına Loglama
require_once 'db.php';
try {
    $stmt = $pdo->prepare("INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)");
    $stmt->execute([$name, $email, $subject, $message]);
} catch (PDOException $e) {
    error_log("DB Kayıt Hatası: " . $e->getMessage());
}

// PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

$mail = new PHPMailer(true);

try {
    // Sunucu ayarları
    $mail->isSMTP();
    $mail->Host       = 'mail.kurumsaleposta.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = '**SMTP_USER**';
    $mail->Password   = '**SMTP_PASSWORD**';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; 
    $mail->Port       = 465;
    $mail->CharSet    = 'UTF-8';

    // Alıcılar
    $mail->setFrom('**MAIL_FROM**', 'NAS Danışmanlık İletişim');
    $mail->addAddress('**MAIL_TO**'); 
    $mail->addReplyTo($email, $name);

    // İçerik
    $mail->isHTML(true);
    $mail->Subject = "Web Form: " . $subject;
    $mail->Body    = "<strong>Ad Soyad:</strong> $name<br>
                      <strong>E-posta:</strong> $email<br>
                      <strong>Konu:</strong> $subject<br><br>
                      <strong>Mesaj:</strong><br>" . nl2br($message);
    $mail->AltBody = "Ad Soyad: $name\nE-posta: $email\nKonu: $subject\nMesaj:\n$message";

    $mail->send();

    // Otomatik Yanıt
    $reply = new PHPMailer(true);
    $reply->isSMTP();
    $reply->Host       = 'mail.kurumsaleposta.com';
    $reply->SMTPAuth   = true;
    $reply->Username   = '**SMTP_USER**';
    $reply->Password   = '**SMTP_PASSWORD**';
    $reply->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $reply->Port       = 465;
    $reply->CharSet    = 'UTF-8';
    
    $reply->setFrom('**MAIL_FROM**', 'NAS Danışmanlık');
    $reply->addAddress($email, $name);
    
    $reply->isHTML(true);
    $reply->Subject = "Mesajınız Alınmıştır - NAS Danışmanlık";
    $reply->Body    = "Sayın $name,<br><br>
                       Web sitemiz üzerinden gönderdiğiniz mesajınızı başarıyla aldık. Uzman ekibimiz konuyu inceleyip en kısa sürede sizinle iletişime geçecektir.<br><br>
                       İlginiz için teşekkür ederiz.<br><br>
                       Saygılarımızla,<br>
                       <strong>NAS Danışmanlık Ekibi</strong><br>
                       <a href='https://nasdanismanlik.com'>www.nasdanismanlik.com</a>";

    @$reply->send(); // Yanıt hatalarını yoksay

} catch (Exception $e) {
    error_log("Mail gönderim hatası: {$mail->ErrorInfo}");
}

http_response_code(200);
echo json_encode(["status" => "success", "message" => "Mesajınız başarıyla alındı."]);
?>
