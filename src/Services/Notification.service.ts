import nodemailer from 'nodemailer';

export const sendEmail = async (email: string, subject: string, message: string) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject,
      html: message,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};