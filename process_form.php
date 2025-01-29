<?php
header('Content-Type: application/json');

// Replace with your email address
$recipient_email = "chadiabinader34@gmail.com";

// Get form data
$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$company = $_POST['company'] ?? '';
$message = $_POST['message'] ?? '';

// Validate inputs
if (empty($name) || empty($email) || empty($message)) {
    echo json_encode(['success' => false, 'message' => 'Please fill in all required fields']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Please enter a valid email address']);
    exit;
}

// Prepare email content
$subject = "New Contact Form Submission from Virtubot";
$email_content = "You have received a new contact form submission:\n\n";
$email_content .= "Name: $name\n";
$email_content .= "Email: $email\n";
$email_content .= "Company: $company\n";
$email_content .= "Message:\n$message\n";

// Email headers
$headers = "From: $name <$email>";

// Send email
$success = mail($recipient_email, $subject, $email_content, $headers);

if ($success) {
    echo json_encode(['success' => true, 'message' => 'Thank you for your message. We will contact you shortly!']);
} else {
    echo json_encode(['success' => false, 'message' => 'Sorry, there was an error sending your message. Please try again later.']);
}
?>
