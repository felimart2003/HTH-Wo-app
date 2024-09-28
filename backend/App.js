const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// Nutritionix API credentials
const APP_ID = 'process.env.NUTRITIONIX_APP_ID';
const API_KEY = 'process.env.NUTRITIONIX_API_KEY';

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
