const sendEmail = async (emailData) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_ADDRESS,
      to: emailData.email,
      subject: emailData.subject,
      html: emailData.html,
    };

    // send mail with defined transport object
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("-----SMTP ERROR1--------");
        console.log(error);
      } else {
        console.log("Message sent: %s", info.response);
      }
    });
  } catch (error) {
    console.log("-----SMTP ERROR2--------");
    console.log("Problem sending Email: ", error);
  }
};

module.exports = sendEmail;
