<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $message = htmlspecialchars($_POST['message']);
    
    // Recipient email
    $to = "pushpakoirala.com.np@gmail.com"; // Replace with your email
    
    // Email subject
    $subject = "New Contact Form Submission from $name";
    
    // Email body
    $body = "You have received a new message from your website contact form.\n\n".
            "Here are the details:\n".
            "Name: $name\n".
            "Email: $email\n".
            "Phone: $phone\n".
            "Message:\n$message\n";
    
    // Email headers
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    
    // Send the email
    if (mail($to, $subject, $body, $headers)) {
        header("Location: thank_you.html"); // Redirect to thank-you page
        exit;
    } else {
        echo "Failed to send your message. Please try again later.";
    }
} else {
    echo "Invalid request.";
}
?>
