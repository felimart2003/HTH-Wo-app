const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// Nutritionix API credentials
const APP_ID = '1036e2d3';
const API_KEY = 'ce53d1cb2ffe771e81efcf00ba449f3d';

// Endpoint to get food data
app.get('/getFoodData', async (req, res) => {
  const { foodItem } = req.query;

  try {
    const response = await axios.post('https://trackapi.nutritionix.com/v2/natural/nutrients', {
      query: foodItem,
    }, {
      headers: {
        'x-app-id': APP_ID,
        'x-app-key': API_KEY,
        'Content-Type': 'application/json',
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
