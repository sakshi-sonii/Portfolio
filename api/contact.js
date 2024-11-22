const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');


const app = express();
const PORT = 3000;
app.use(cors());
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
app.post('/api/contact', (req, res) => {
    console.log('Received request:', req.body); // Log incoming data

    const { name, email, message } = req.body;

    // Validate input data
    if (!name || !email || !message) {
        console.error('Invalid input data');
        return res.status(400).send({ success: false, message: 'All fields are required.' });
    }

    const mailOptions = {
        from: 'your_email@gmail.com',
        to: 'sakshisonienv@gmail.com',
        subject: `New Contact Form Submission from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send({ success: false, message: 'Failed to send email.' });
        }
        console.log('Email sent:', info.response);
        res.status(200).send({ success: true });
    });
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
