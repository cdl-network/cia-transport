<?php

header('Content-Type: application/json');

require_once __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);

    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method.'
    ]);

    exit;
}


// Honeypot spam protection
if (!empty($_POST['website'])) {
    echo json_encode([
        'success' => true,
        'message' => 'Inquiry received.'
    ]);

    exit;
}


// Get fields
$name = trim($_POST['name'] ?? '');
$company = trim($_POST['company'] ?? '');
$email = trim($_POST['email'] ?? '');
$phone = trim($_POST['phone'] ?? '');
$shipping = trim($_POST['shipping'] ?? '');


// Validation
if ($name === '' || $email === '' || $shipping === '') {
    http_response_code(422);

    echo json_encode([
        'success' => false,
        'message' => 'Please complete all required fields.'
    ]);

    exit;
}


if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);

    echo json_encode([
        'success' => false,
        'message' => 'Please enter a valid email address.'
    ]);

    exit;
}


// Prevent header injection
$name = str_replace(["\r", "\n"], '', $name);
$company = str_replace(["\r", "\n"], '', $company);
$email = str_replace(["\r", "\n"], '', $email);
$phone = str_replace(["\r", "\n"], '', $phone);


// Email
$subject = 'New Quote Request - CIA Transport';

$message = "New quote request received from the CIA Transport website.\n\n";

$message .= "Name: " . $name . "\n";
$message .= "Company: " . ($company ?: 'Not provided') . "\n";
$message .= "Email: " . $email . "\n";
$message .= "Phone: " . ($phone ?: 'Not provided') . "\n\n";

$message .= "What are you shipping:\n";
$message .= $shipping . "\n";


$headers = [
    'From: ' . COMPANY_NAME . ' <' . FROM_EMAIL . '>',
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=UTF-8'
];


// Send
$sent = mail(
    CONTACT_EMAIL,
    $subject,
    $message,
    implode("\r\n", $headers)
);


if (!$sent) {
    http_response_code(500);

    echo json_encode([
        'success' => false,
        'message' => 'We could not send your inquiry. Please try again or call us directly.'
    ]);

    exit;
}


echo json_encode([
    'success' => true,
    'message' => 'Thanks. Your inquiry has been sent successfully.'
]);