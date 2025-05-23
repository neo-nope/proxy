const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());           // Enable CORS for all origins
app.use(express.json());   // Parse JSON body

app.post('/proxy/:guildId', async (req, res) => {
  const guildId = req.params.guildId;
  const backendUrl = `http://us3.bot-hosting.net:20128/config/${guildId}`;

  try {
    const backendResponse = await fetch(backendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    const data = await backendResponse.json();
    res.status(backendResponse.status).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
