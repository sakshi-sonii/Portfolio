const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail', // or use 'SMTP' if not using Gmail
    auth: {
        user: 'sakshisonienv@gmail.com', // Your email
        pass: 'swik@SAK#1608', // Your email password or app-specific password
    },
});

// Route to handle form submissions
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: 'your_email@gmail.com', // Sender's email
        to: 'your_email@gmail.com', // Your email address (receiver)
        subject: `New Contact Form Submission from ${name}`,
        text: `You have a new message from your website contact form:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send({ success: false, error });
        }
        console.log('Email sent:', info.response);
        res.status(200).send({ success: true });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
