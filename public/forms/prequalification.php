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
        'message' => 'Submission received.'
    ]);

    exit;
}


// Contact information
$name = trim($_POST['prequal-name'] ?? '');
$phone = trim($_POST['prequal-phone'] ?? '');
$email = trim($_POST['prequal-email'] ?? '');


// Qualification result
$qualification = trim($_POST['qualification'] ?? '');


// Questions
$q1 = trim($_POST['q1'] ?? '');
$q2 = trim($_POST['q2'] ?? '');
$q3 = trim($_POST['q3'] ?? '');
$q4 = trim($_POST['q4'] ?? '');
$q5 = trim($_POST['q5'] ?? '');
$q6 = trim($_POST['q6'] ?? '');
$q7 = trim($_POST['q7'] ?? '');
$q8 = trim($_POST['q8'] ?? '');


// Validate contact information
if (
    $name === '' ||
    $phone === '' ||
    $email === ''
) {
    http_response_code(422);

    echo json_encode([
        'success' => false,
        'message' => 'Please complete your contact information.'
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


// Validate questions
$answers = [$q1, $q2, $q3, $q4, $q5, $q6, $q7, $q8];

foreach ($answers as $answer) {
    if ($answer === '') {
        http_response_code(422);

        echo json_encode([
            'success' => false,
            'message' => 'Please answer all qualification questions.'
        ]);

        exit;
    }
}


// Prevent header injection
$name = str_replace(["\r", "\n"], '', $name);
$phone = str_replace(["\r", "\n"], '', $phone);
$email = str_replace(["\r", "\n"], '', $email);
$qualification = str_replace(["\r", "\n"], '', $qualification);


// Email
$subject = 'Driver Prequalification - ' . strtoupper($qualification);

$message = "New driver prequalification received from the CIA Transport website.\n\n";

$message .= "RESULT: " . strtoupper($qualification) . "\n\n";

$message .= "CONTACT INFORMATION\n";
$message .= "Name: " . $name . "\n";
$message .= "Phone: " . $phone . "\n";
$message .= "Email: " . $email . "\n\n";

$message .= "QUALIFICATION ANSWERS\n";

$message .= "1. Valid Class A CDL: " . $q1 . "\n";
$message .= "2. Verifiable Class A tractor-trailer experience: " . $q2 . "\n";
$message .= "3. Flatbed experience: " . $q3 . "\n";
$message .= "4. Age 23 or older: " . $q4 . "\n";
$message .= "5. Moving violations in last 3 years: " . $q5 . "\n";
$message .= "6. DOT-recordable/preventable accidents in last 3 years: " . $q6 . "\n";
$message .= "7. DUI/DWI, reckless driving, or license suspension in last 5 years: " . $q7 . "\n";
$message .= "8. FMCSA Clearinghouse prohibited/SAP status: " . $q8 . "\n";


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
        'message' => 'We could not send your information. Please try again or call us directly.'
    ]);

    exit;
}


echo json_encode([
    'success' => true,
    'message' => 'Prequalification submitted successfully.'
]);