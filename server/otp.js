const express = require('express');
const wbm = require('wbm');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());  // For parsing application/json

// In-memory store for OTPs (In production, use a database or cache)
const otpStore = {};

// Endpoint to receive mobile number and OTP
app.post('/send-otp', async (req, res) => {
    const { mobile, otp } = req.body;

    if (!mobile || !otp) {
        return res.status(400).json({ message: 'Mobile number and OTP are required!' });
    }

    try {
        // Start wbm session and send OTP via WhatsApp
        await wbm.start({
            showBrowser: true,
            qrCodeData: true
        });

        const phones = [mobile];
        const message = `Your OTP is: ${otp}`;
        await wbm.send(phones, message);

        // Store OTP in memory
        otpStore[mobile] = otp;

        await new Promise(resolve => setTimeout(resolve, 10000));

        await wbm.end();

        res.status(200).json({ message: 'OTP sent successfully!', otp, mobile });
    } catch (error) {
        res.status(500).json({ message: 'Error sending OTP', error });
    }
});

// Endpoint to verify the OTP
app.post('/verify-otp', (req, res) => {
    const { mobile, otp } = req.body;

  

    // Check if the OTP is valid
    if (otpStore[mobile] === otp) {
        delete otpStore[mobile];
        res.status(200).json({ message: 'OTP verified successfully!' });
    } else {
        res.status(400).json({ message: 'Invalid OTP. Please try again.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
