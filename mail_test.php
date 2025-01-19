<?php
$to = "pushpakoirala.com.np@gmail.com";
$subject = "Test Email";
$message = "This is a test email to check if PHP mail() is working.";
$headers = "From: noreply@example.com";

if (mail($to, $subject, $message, $headers)) {
    echo "Email sent successfully!";
} else {
    echo "Failed to send email.";
}
?>
