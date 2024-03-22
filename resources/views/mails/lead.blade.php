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
            font-size: 28px;
            text-transform: uppercase;
            letter-spacing: 2px;
        }

        .lead-details {
            margin-bottom: 20px;
            padding: 20px;
            border: 2px solid #007bff;
            border-radius: 8px;
            background-color: #f0f8ff;
        }

        .lead-details p {
            margin: 10px 0;
            color: #333;
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
            font-weight: bold;
        }

        .decorative-line {
            width: 100%;
            height: 2px;
            background-color: #007bff;
            margin: 20px 0;
        }

        .thank-you {
            font-size: 18px;
            text-align: center;
            margin-bottom: 20px;
            color: #007bff;
        }

        .logo {
            display: block;
            margin: 0 auto;
            width: 150px;
            height: auto;
        }

        .graphic {
            display: block;
            margin: 20px auto;
            max-width: 100%;
            height: auto;
        }
    </style>
</head>
<body>

<div class="container">
    {{--<img src="logo.png" alt="Samgan Logo" class="logo">--}}
    <h1>New Lead Notification</h1>
    <div class="decorative-line"></div>
    <div class="lead-details">
        <p><strong>Name:</strong> {{ $lead['name'] }}
        <p><strong>Email:</strong> {{ $lead['email'] }}</p>
        <p><strong>Phone:</strong> {{ $lead['phone'] }}</p>
        <p><strong>Message:</strong> {{ $lead['message'] }}</p>
    </div>
    <p class="thank-you">Thank you for using Samgan as your Tech Partner.</p>
    <img src="https://msamgan.com/img/logo/msamgan.png" alt="Thank You Graphic" class="graphic">
    <p>Have a nice day!</p>
    <p class="footer">Best regards,<br>Team
        <a href="https://msamgan.com" target="_blank" rel="noopener noreferrer"
           style="color: #007bff;">Samgan</a></p>
</div>

</body>
</html>
