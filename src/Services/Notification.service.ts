import nodemailer from 'nodemailer';

export const sendEmail = async (email: string, subject: string, message: string) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'grabyourticketslk@gmail.com',
        pass: 'hhgf goix ombe hqwb',
      },
    });

    const mailOptions = {
      from: 'grabyourticketslk@gmail.com',
      to: email,
      subject,
      html: message,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};