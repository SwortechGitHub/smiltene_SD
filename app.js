const express = require('express');
const axios = require('axios');
const app = express();

//Public files
app.use(express.static('Public'));

// Sets new view engine
app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
    res.render('index',{temp:""});
});

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    const days = req.query.days*8
    console.log(city, days);
    try {
      const apiKey = "607b3faab3e3bd481165029dfe9e9e16";
      //Get from API lat and lon of city
      const apiResponse = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`);
      const data = apiResponse.data;
      //Get from API location weather data
      const apiResponse2 = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&appid=${apiKey}&units=metric&lang=la&cnt=${days}`);
      const data2 = apiResponse2.data;
      // Filter data and create a new array with weather data points
      const weatherDataPoints = data2.list.filter((item, index) => index % 8 === 0).map(item => ({
        dt_txt: item.dt_txt,
        main: item.main,
        weather: item.weather[0],
      }));
      console.log(weatherDataPoints)
      //Send JSON data
      res.json(weatherDataPoints);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching data from API' });
    }
  });

// 404 Error handler
app.use((req, res) => {
    res.status(404).send('404error')
    });

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
    });
  