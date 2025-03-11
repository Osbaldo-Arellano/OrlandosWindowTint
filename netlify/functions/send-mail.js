const nodemailer = require("nodemailer");

exports.handler = async (event, context) => {
  try {
    // Parse the body of the POST request
    const { name, email, message } = JSON.parse(event.body);

    // Basic input validation
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          message: "Please fill out all required fields.",
        }),
      };
    }

    // Set up Nodemailer transporter
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: "mpjd izmt qcsn esab "
      },
    });

    // Email options
    let mailOptions = {
      from: "valdoarellano4@gmail.com",
      to: "osbaldoarellano1996@gmail.com",
      subject: `New contact form submission from ${name}`,
      text: `You have a new message from your website contact form.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "Your message has been sent successfully!",
      }),
    };
  } catch (error) {
    console.error("Error sending email:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message:
          "There was an error sending your message. Please try again later.",
      }),
    };
  }
};