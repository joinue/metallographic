<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (!empty($_POST['name']) && !empty($_POST['email']) && !empty($_POST['phone']) && !empty($_POST['job'])) {

        // Sanitize input
        $name = htmlspecialchars(strip_tags($_POST['name']));
        $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
        $phone = htmlspecialchars(strip_tags($_POST['phone']));
        $job = htmlspecialchars(strip_tags($_POST['job']));

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            die("<h2>Invalid email address provided.</h2>");
        }

        $boundary = md5(uniqid(time()));

        $to = "marcs@metallographic.com";
        $subject = "New Job Application - $name";

        // Email headers
        $headers = "MIME-Version: 1.0\r\n";
        $headers .= "From: noreply@metallographic.com\r\n"; // use your domain for best deliverability
        $headers .= "Reply-To: $email\r\n";
        $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

        // HTML message
        $message = "
        <html>
        <head><title>New Job Application</title></head>
        <body>
            <h2>New Job Application</h2>
            <p><strong>Name:</strong> $name</p>
            <p><strong>Email:</strong> $email</p>
            <p><strong>Phone:</strong> $phone</p>
            <p><strong>Job Applied For:</strong> $job</p>
        </body>
        </html>";

        // Create the body
        $body = "--$boundary\r\n";
        $body .= "Content-Type: text/html; charset=UTF-8\r\n";
        $body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
        $body .= $message . "\r\n";

        // Handle resume attachment
        if (isset($_FILES['resume']) && $_FILES['resume']['error'] === UPLOAD_ERR_OK) {
            $allowed_types = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            $resume_tmp_name = $_FILES['resume']['tmp_name'];
            $resume_name = basename($_FILES['resume']['name']);
            $resume_type = mime_content_type($resume_tmp_name);

            if (in_array($resume_type, $allowed_types)) {
                $resume_content = chunk_split(base64_encode(file_get_contents($resume_tmp_name)));

                $body .= "--$boundary\r\n";
                $body .= "Content-Type: $resume_type; name=\"$resume_name\"\r\n";
                $body .= "Content-Transfer-Encoding: base64\r\n";
                $body .= "Content-Disposition: attachment; filename=\"$resume_name\"\r\n\r\n";
                $body .= $resume_content . "\r\n";
            } else {
                echo "<h2>Error: Invalid resume file type. Only PDF, DOC, and DOCX allowed.</h2>";
                exit;
            }
        }

        $body .= "--$boundary--";

        // Send the email
        if (mail($to, $subject, $body, $headers)) {
            echo "<h2>Application submitted successfully!</h2>";
            echo "<a href='index.html'><button>Back to Home</button></a>";
        } else {
            echo "<h2>Error submitting application.</h2><p>Please try again later.</p>";
            echo "<a href='index.html'><button>Back to Home</button></a>";
        }
    } else {
        echo "<h2>Error: Please complete all required fields.</h2>";
        echo "<a href='index.html'><button>Back to Application Form</button></a>";
    }
}
?>
