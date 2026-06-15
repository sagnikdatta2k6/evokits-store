import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { order, userProfile } = await req.json();

    if (!order || !userProfile) {
      return NextResponse.json({ error: 'Missing order data or user profile' }, { status: 400 });
    }

    // MOCK EMAIL SENDING
    // In a real application, you would use Resend, SendGrid, or Nodemailer here.
    // Example with Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({ ... })

    console.log(`\n\n======================================================`);
    console.log(`📧 MOCK EMAIL SENT`);
    console.log(`======================================================`);
    console.log(`To: ${userProfile.email}`);
    console.log(`From: billing@evokits.com`);
    console.log(`Subject: Your EVOKITS Order Receipt - #${order.id}`);
    console.log(`\nHello ${userProfile.name},`);
    console.log(`Thank you for your purchase! We are currently processing your order.`);
    console.log(`\n--- Order Summary ---`);
    order.items.forEach((item: any) => {
      console.log(`- ${item.quantity}x ${item.jersey.name} (Size ${item.size}) - ₹${item.jersey.price * item.quantity}`);
    });
    console.log(`\nTotal: ₹${order.total}`);
    console.log(`\nYou can view and download your full invoice from your profile dashboard.`);
    console.log(`======================================================\n\n`);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    return NextResponse.json({ success: true, message: 'Invoice emailed successfully.' });

  } catch (error) {
    console.error('Email API Error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
