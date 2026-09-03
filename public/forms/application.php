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


// Honeypot
if (!empty($_POST['website'])) {
    echo json_encode([
        'success' => true,
        'message' => 'Application received.'
    ]);

    exit;
}


// Get fields
$name = trim($_POST['name'] ?? '');
$phone = trim($_POST['phone'] ?? '');
$email = trim($_POST['email'] ?? '');
$experience = trim($_POST['experience'] ?? '');


// Validation
if (
    $name === '' ||
    $phone === '' ||
    $email === '' ||
    $experience === ''
) {
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
$phone = str_replace(["\r", "\n"], '', $phone);
$email = str_replace(["\r", "\n"], '', $email);
$experience = str_replace(["\r", "\n"], '', $experience);


// Email
$subject = 'New Driver Application - CIA Transport';

$message = "New driver application received from the CIA Transport website.\n\n";

$message .= "Name: " . $name . "\n";
$message .= "Phone: " . $phone . "\n";
$message .= "Email: " . $email . "\n";
$message .= "Years of experience: " . $experience . "\n";


$headers = [
    'From: ' . COMPANY_NAME . ' <' . FROM_EMAIL . '>',
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=UTF-8'
];


$sent = mail(
    RECRUITING_EMAIL,
    $subject,
    $message,
    implode("\r\n", $headers)
);


if (!$sent) {
    http_response_code(500);

    echo json_encode([
        'success' => false,
        'message' => 'We could not send your application. Please try again or call us directly.'
    ]);

    exit;
}


echo json_encode([
    'success' => true,
    'message' => 'Application received successfully.'
]);