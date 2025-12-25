import * as functions from "firebase-functions";
import * as nodemailer from "nodemailer";

export const sendContactEmail = functions.https.onRequest(async (request, response) => {
  // Enable CORS
  response.set("Access-Control-Allow-Origin", "*");
  response.set("Access-Control-Allow-Methods", "POST");
  response.set("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight
  if (request.method === "OPTIONS") {
    response.status(204).send("");
    return;
  }

  // Only allow POST
  if (request.method !== "POST") {
    response.status(405).send("Method Not Allowed");
    return;
  }

  try {
    const { name, email, message } = request.body;

    // Validate input
    if (!name || !email || !message) {
      response.status(400).json({ error: "All fields are required" });
      return;
    }

    // Get email credentials from environment
    const emailUser = process.env.EMAIL_USER;
    const emailPassword = process.env.EMAIL_PASSWORD;

    if (!emailUser || !emailPassword) {
      console.error("Email configuration missing");
      response.status(500).json({ error: "Email configuration missing" });
      return;
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPassword,
      },
    });

    // Email options
    const mailOptions = {
      from: emailUser,
      to: "mindfulconsulting.my@gmail.com",
      subject: `New Contact Form Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7a8a6f; border-bottom: 2px solid #7a8a6f; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
          </div>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Message:</strong></p>
            <p style="margin: 10px 0; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
            <p>This message was sent from the Mindful Consulting website contact form.</p>
            <p>Reply directly to: <a href="mailto:${email}">${email}</a></p>
          </div>
        </div>
      `,
      replyTo: email,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    response.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    response.status(500).json({ error: "Failed to send email" });
  }
});
