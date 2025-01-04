import nodemailer from "nodemailer";

const EMAIL_USER = process.env.NEXT_PUBLIC_EMAIL_USER;
const EMAIL_PASS = process.env.NEXT_PUBLIC_EMAIL_PASS;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: "Gmail",
  port: 587,
  secure: false,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

export async function POST(req: Request) {
  const { email, user } = await req.json();

  try {
    const info = await transporter.sendMail({
      from: "Luxury Hotel <noreply@luxuryhotel.com>",
      to: email,
      subject: "Booking Hotel success",
      text: `Hello ${user}, your booking was successful!`,
      html: `
      <div>
        <p>Dear Mr/Mrs. ${user}</p>
        <p>Hope this message finds you well.</p>
        <p>I’m CEO, from Luxury Hotel reservation department</p>
        <p>Thank you for your reservation.</p>
        <p>Please note that the credit card details provided at the time of booking are just for room guarantee purposes and we're not allowed to proceed with the automatic payment, to complete your booking, please follow the payment link</p>
        <p>instructions <a href="https://sis.redsys.es/sis/p2f?t=2D7AE99ECDD13089C9AB7462F3182628420EE18B">HERE</a></p>
        <p>I kindly inform you that if payment is not received by the specified deadline (24 hours after the issuance of this message), your reservation may be subject to cancellation.</p>
        <p>If you have any questions, please do not hesitate to contact us at <a href="mailto:trongleele@gmail.com">trongleele@gmail.com</a></p>
          <div class= "flex gap-20">
            <img src="https://res.cloudinary.com/dyjvnhq5s/image/upload/v1735978886/Luxury_Hotel/kfbr7a8usehlxml6yqyw.png" style="max-width: auto; height: 100px; border-radius: 8px; " />
            <img src="https://res.cloudinary.com/dyjvnhq5s/image/upload/v1735978886/Luxury_Hotel/wv4t4xk5fmsmkuedzvtw.jpg" style="max-width: auto; height: 100px; border-radius: 8px;" />
        </div>
        </div>
      `,
    });

    return new Response(
      JSON.stringify({ message: "Email sent successfully", info }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error sending email", details: error }),
      { status: 500 }
    );
  }
}
