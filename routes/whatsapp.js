import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

// WhatsApp Business API credentials
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const API_VERSION = 'v17.0';

// Verify webhook token
router.get('/webhook', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    // Your verify token. Should be a random string.
    const YOUR_VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;

    if (mode && token) {
        if (mode === 'subscribe' && token === YOUR_VERIFY_TOKEN) {
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    }
});

// Handle incoming messages
router.post('/webhook', async (req, res) => {
    try {
        const entry = req.body.entry?.[0];
        const changes = entry?.changes?.[0];
        const value = changes?.value;
        
        if (value?.messages) {
            const message = value.messages[0];
            const phoneNumber = message.from;
            const messageText = message.text?.body || '';
            
            // Process the incoming message
            await processMessage(phoneNumber, messageText);
        }
        
        res.sendStatus(200);
    } catch (error) {
        console.error('Error processing webhook:', error);
        res.sendStatus(500);
    }
});

// Process incoming messages
async function processMessage(phoneNumber, messageText) {
    // Convert phone number to WhatsApp ID format
    const whatsappId = phoneNumber.includes('@') ? phoneNumber : `${phoneNumber}@c.us`;
    
    // Simple order processing logic
    if (messageText.toLowerCase().includes('order') || messageText.toLowerCase().includes('buy')) {
        await sendMessage(whatsappId, 'Thank you for your interest in placing an order! Please provide the product name and quantity.');
    } else if (messageText.toLowerCase().includes('help')) {
        await sendMessage(whatsappId, 'You can ask about:\n- Order status\n- New order\n- Track order\n- Contact support');
    } else {
        await sendMessage(whatsappId, 'Thank you for your message! How can I assist you with your order today?');
    }
}

// Send message function
async function sendMessage(phoneNumber, message) {
    try {
        const response = await axios.post(
            `https://graph.facebook.com/${API_VERSION}/${PHONE_NUMBER_ID}/messages`,
            {
                messaging_product: 'whatsapp',
                to: phoneNumber,
                text: { body: message }
            },
            {
                headers: {
                    'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error sending message:', error.response?.data || error.message);
        throw error;
    }
}

export default router;
