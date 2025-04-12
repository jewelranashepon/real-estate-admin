// // This is a placeholder for email functionality
// // In a real application, you would use a service like SendGrid, Mailgun, etc.

// interface EmailParams {
//     to: string
//     subject: string
//     text: string
//     html?: string
//   }
  
//   export async function sendEmail({ to, subject, text, html }: EmailParams) {
//     // In development, just log the email
//     if (process.env.NODE_ENV !== "production") {
//       console.log("Sending email:", {
//         to,
//         subject,
//         text,
//         html,
//       })
//       return true
//     }
  
//     // In production, you would use an email service
//     try {
//       // Example with a hypothetical email service
//       // const response = await emailService.send({
//       //   to,
//       //   from: process.env.EMAIL_FROM,
//       //   subject,
//       //   text,
//       //   html: html || text,
//       // })
  
//       // Return true for now as a placeholder
//       return true
//     } catch (error) {
//       console.error("Error sending email:", error)
//       throw error
//     }
//   }
  








import nodemailer from "nodemailer";

interface EmailParams {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export async function sendEmail({ to, subject, text, html }: EmailParams) {
  if (process.env.NODE_ENV !== "production") {
    console.log("📬 Dev Mode Email Log:", {
      to,
      subject,
      text,
      html,
    });
    return true;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false, // true for port 465, false for 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"Real Estate App" <${process.env.EMAIL_FROM}>`,
      to,
      subject,
      text,
      html: html || text,
      replyTo: process.env.REPLY_TO || process.env.EMAIL_FROM,
    });

    console.log("✅ Email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw error;
  }
}
