// const express = require('express');
// const nodemailer = require('nodemailer');
// const bodyParser = require('body-parser');
// const cors = require('cors'); // Import CORS
// require('dotenv').config(); // Load environment variables from .env file

// const app = express();
// const port = 3000;

// // Use CORS middleware
// app.use(cors()); // Allow all origins (for development purposes)

// // Middleware to parse form data
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json()); // To handle JSON format

// // Route to handle form submission
// app.post('/submit_form', async (req, res) => {
//     console.log('Received data:', req.body); // Log the entire body

//     console.log('Name:', req.body.name);
//     console.log('Email:', req.body.email);
//     console.log('Phone:', req.body.phone);
//     console.log('Origin:', req.body.origin);
//     console.log('Destination:', req.body.destination);
//     console.log('Vehicle:', req.body.vehicle);
//     console.log('Pickup Date:', req.body.pickupDate);


//     const { name, email, phone, origin, destination, vehicle, pickupDate } = req.body;

//     // Check if any field is undefined
//     if (!name || !email || !phone || !origin || !destination || !vehicle || !pickupDate) {
//         return res.status(400).send('All fields are required.');
//     }

//     // Nodemailer setup
//     let transporter = nodemailer.createTransport({
//         service: 'Gmail',
//         auth: {
//             user: process.env.EMAIL_USER,
//             pass: process.env.EMAIL_PASS
//         }
//     });

//     // Email options
//     let mailOptions = {
//         from: email,
//         to: process.env.EMAIL_USER,
//         subject: 'New Contact Form Submission',
//         text: `
//             Name: ${name}
//             Email: ${email}
//             Phone: ${phone}
//             Pickup Location: ${origin}
//             Delivery Location: ${destination}
//             Vehicle: ${vehicle}
//             Pickup Date: ${pickupDate}
//         `
//     };

//     // Send the email
//     try {
//         let info = await transporter.sendMail(mailOptions);
//         console.log('Message sent: %s', info.messageId);
//         res.status(200).send('Form submitted successfully!');
//     } catch (error) {
//         console.error('Error sending email:', error);
//         res.status(500).send('Error sending email');
//     }
// });



// // Start the server
// app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
// });

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const app = express();
const port = 3000;

// Use CORS middleware
app.use(cors());

// Middleware to parse form data
const upload = multer();

// Route to handle GET requests to the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Express server!');
});

// Route to handle form submission
app.post('/submit_form', upload.none(), async (req, res) => {
    console.log('Received data:', req.body);

    const { name, email, phone, origin, destination, vehicle, pickupDate } = req.body;

    // Check if any field is undefined
    if (!name || !email || !phone || !origin || !destination || !vehicle || !pickupDate) {
        return res.status(400).send('All fields are required.');
    }

    // Nodemailer setup
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Email options
    let mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: 'New Contact Form Submission',
        text: `
            Name: ${name}
            Email: ${email}
            Phone: ${phone}
            Pickup Location: ${origin}
            Delivery Location: ${destination}
            Vehicle: ${vehicle}
            Pickup Date: ${pickupDate}
        `
    };

    // Send the email
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        res.status(200).send('Form submitted successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
