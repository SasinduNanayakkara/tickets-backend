const forgotPasswordTemplate = (otp: string) =>
`
   <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your OTP Code</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            padding: 10px 0;
        }
        .header img {
            max-width: 100px;
        }
        .content {
            text-align: center;
            padding: 20px;
        }
        .content h1 {
            font-size: 24px;
            margin-bottom: 20px;
        }
        .otp {
            font-size: 32px;
            font-weight: bold;
            color: #333333;
            background-color: #f0f0f0;
            padding: 10px 20px;
            border-radius: 5px;
            display: inline-block;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            padding: 10px 0;
            color: #888888;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="your-logo-url.png" alt="Your Company Logo">
        </div>
        <div class="content">
            <h1>Your OTP Code</h1>
            <p>Use the following OTP to complete your login process. This OTP is valid for the next 10 minutes.</p>
            <div class="otp">{{OTP_CODE}}</div>
            <p>If you did not request this, please ignore this email.</p>
        </div>
        <div class="footer">
            &copy; 2024 Your Company. All rights reserved.
        </div>
    </div>
</body>
</html>

    `;

export default forgotPasswordTemplate;