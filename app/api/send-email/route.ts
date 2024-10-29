import FormData from 'form-data';
import Mailgun from 'mailgun.js';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const mailgunApiKey = process.env.MAILGUN_API_KEY;
  const mailgunDomain = process.env.MAILGUN_DOMAIN;

  if (!mailgunApiKey || !mailgunDomain) {
    return NextResponse.json({ error: 'Missing Mailgun API Key or Domain' }, { status: 500 });
  }

  if (req.method === 'POST') {
    const formData = await req.json();

    // Initialize Mailgun
    const mailgun = new Mailgun(FormData);
    const mg = mailgun.client({
      username: 'api',
      key: mailgunApiKey,
    });

    try {
      // Send email with Mailgun
      const result = await mg.messages.create(mailgunDomain, {
        from: 'moe.lak20@gmail.com',
        to: "booking@bridesdream.org",
        subject: "test..",
        text: "Hi,,,,,,",
      });

      return NextResponse.json({ message: 'Email sent successfully', result }, { status: 200 });
    } catch (error) {
      console.error('Error sending email:', error);
      return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
