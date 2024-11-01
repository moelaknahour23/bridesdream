import { NextResponse } from 'next/server';
import mailgun from 'mailgun-js';
import { text } from 'stream/consumers';

const mailgunClient = mailgun({
	apiKey: process.env.MAILGUN_API_KEY,
	domain: process.env.MAILGUN_DOMAIN,
});

export async function POST(req) {
	const { formData } = await req.json();

	try {
		// Define email data
		const emailData = {
			from: formData.email,
			to: 'contact.madinehei@gmail.com',
			subject: `Contact Request from ${formData.name}`,
			html: `
        <html>
          <body>
            <p>Hello,</p>
            <p>You have received a new service request from the ${formData.name}. Here are the details:</p>
            
            <table>
              <tr><td><strong>Name:</strong></td><td>${formData.name}</td></tr>
              <tr><td><strong>Email:</strong></td><td>${formData.email}</td></tr>
              <tr><td><strong>Phone:</strong></td><td>${formData.phone}</td></tr>
            </table>
            <p><strong>Message:</strong></p>
            <p>${formData.message}</p>
          </body>
        </html>
      `,
		};

		// Send the email using messages().send()
		const result = await mailgunClient.messages().send(emailData);
		console.log('Email sent successfully!', result);

		// Second email data: Confirmation to user
		const userEmailData = {
			from: 'no-reply@bridesdream.org',
			to: formData.email,
			subject: 'We Received Your Request',
			html: `
      <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f7;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 500px;
      margin: 20px auto;
      background-color: #f4f4f7;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    }
    .email-header {
      background-color: #DF6751;
      padding: 30px;
      text-align: center;
    }
    .email-header img {
      width: 50px;
      height: auto;
    }
    .email-content {
      padding: 20px;
     
    }
    .email-content h2 {
      font-size: 24px;
      font-weight: bold;
      color: #333333;
      margin: 0;
    }
    h1{
          color: #ffffff;
    }
    .footer{
       color: #666666;
       margin: 20px;
    }
    .email-content p {
      font-size: 16px;
      color: #666666;
      margin: 20px 0;
      line-height: 1.5;
    }
    .reset-button {
      display: inline-block;
      padding: 15px 30px;
      background-color: #4A6CF7;
      color: #ffffff;
      text-decoration: none;
      font-weight: bold;
      border-radius: 5px;
      margin-top: 20px;
    }
    .email-footer {
      font-size: 14px;
      color: #888888;
      margin-top: 30px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
    <h1>Thanks for contacting us!</h1>
    </div>
    <div class="email-content">
    <p>Dear ${formData.name},</p>
    <p>
     We have received your message and will respond as soon as possible. Our team is here to help, and you can expect a reply within 24-48 hours.
     If your message is urgent, please feel free to call us directly at <a class="text-blue400" href="tel:6192191936">619-219-1936</a>. 
     Thank you for reaching out!
    </p>
  
    </div>
		<p class="footer">Best regards,<br>bridesdream</p>
  </div>
</body>
</html>

      `,
		};

		// Send the second email to the user
		const userResult = await mailgunClient.messages().send(userEmailData);
		console.log('User confirmation email sent successfully!', userResult);

		return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });
	} catch (error) {
		console.error('Error sending email:', error);
		return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
	}
}
