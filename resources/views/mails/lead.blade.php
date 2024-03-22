<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Lead Notification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f8f9fa;
        }

        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        h1 {
            color: #007bff;
            text-align: center;
            margin-bottom: 20px;
        }

        .lead-details {
            margin-bottom: 20px;
            padding: 10px;
            border: 2px solid #007bff;
            border-radius: 5px;
        }

        .lead-details p {
            margin: 5px 0;
            color: #555;
        }

        .footer {
            margin-top: 20px;
            text-align: center;
            color: #666;
            font-size: 14px;
        }

        .footer a {
            color: #007bff;
            text-decoration: none;
        }
    </style>
</head>
<body>

<div class="container">
    <h1>New Lead Notification</h1>
    <div class="lead-details">
        <p><strong>Name:</strong> {{$lead['name']}}</p>
        <p><strong>Email:</strong> {{$lead['email']}}</p>
        <p><strong>Phone:</strong> {{$lead['phone']}}</p>
        <p><strong>Message:</strong> {{$lead['message']}}</p>
    </div>
    <p>Thank you for using Samgan as your Tech Partner.</p>
    <p>Have a nice day!</p>
    <p class="footer">Best regards,<br>Team <a href="https://msamgan.com" target="_blank" rel="noopener noreferrer"
                                               style="color: #007bff;">Samgan</a></p>
</div>

</body>
</html>
