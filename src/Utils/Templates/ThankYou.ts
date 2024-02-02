const thankYouTemplate = (firstName: string, lastName: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You for Registering - Grab your Tickets Admin</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        #container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h1 {
            color: #333;
        }

        p {
            color: #555;
        }

        #button {
            display: inline-block;
            padding: 10px 20px;
            margin: 20px 0;
            text-decoration: none;
            background-color: #007BFF;
            color: #fff;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div id="container">
        <h1>Thank You for Registering!</h1>
        <p>Dear ${firstName} ${lastName},</p>
        <p>Thank you for registering on Grab your Tickets Admin. We are thrilled to have you on board!</p>
        <p>With your registration, you now have access to a range of exciting events and ticket options. Get ready to explore and enjoy.</p>
        <p>If you have any questions or need assistance, feel free to contact our support team.</p>
        <a href="[Your Website URL]" id="button">Explore Events</a>
        <p>Best regards,<br>Grab your Tickets Admin Team</p>
    </div>
</body>
</html>

`;

export default thankYouTemplate;