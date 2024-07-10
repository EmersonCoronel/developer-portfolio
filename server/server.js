require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;
const WORDNIK_API_KEY = process.env.WORDNIK_API_KEY;

app.use(cors());

app.get('/api/words', async (req, res) => {
    try {
        const words = [];
        for (let i = 0; i < 30; i++) {
            const response = await axios.get('https://api.wordnik.com/v4/words.json/randomWord', {
                params: {
                    api_key: process.env.WORDNIK_API_KEY,
                    minLength: 2,
                    maxLength: 7,
                    hasDictionaryDef: true
                }
            });
            words.push(response.data.word);
        }
        res.json(words);
    } catch (error) {
        console.error('Error fetching random words:', error);
        res.status(500).json({ error: 'Failed to fetch random words' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
