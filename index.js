const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(express.json());


app.get('/', async (req, res) => {
    try {
      const recentEvents = await fetch('https://api.cricapi.com/v1/currentMatches?apikey=c3845bb7-b0a7-4c67-a11a-e4303aacca2d&offset=0');
      const data = await recentEvents.json(); 
      console.log(data);
      res.render('homepage', { recentEvents: data });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
});
  
app.get('/scoreboard', async (req, res) => {
    try {
        const detailEvents = await fetch('https://api.cricapi.com/v1/currentMatches?apikey=c3845bb7-b0a7-4c67-a11a-e4303aacca2d&offset=0');
        const data = await detailEvents.json(); 
        console.log(data);
        res.render('scoreboard', { detailEvents: data });
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
});

app.get('/series-info', async (req, res) => {
    try {
        const seriesInfo= await fetch('https://api.cricapi.com/v1/series?apikey=c3845bb7-b0a7-4c67-a11a-e4303aacca2d&offset=0');
        const data = await seriesInfo.json(); 
        console.log(data);
        res.render('series-info', { seriesInfo: data });
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
});

app.get('/teams', async (req, res) => {
    try {
        const teamInfo= await fetch('https://api.cricapi.com/v1/players?apikey=c3845bb7-b0a7-4c67-a11a-e4303aacca2d&offset=0');
        const data = await teamInfo.json(); 
        console.log(data);
        res.render('teams', { teamInfo: data });
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
});

app.get('/player', async (req, res) => {
    try {

        res.render('player');
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
});

app.get('/player-details/:playerId', async (req, res) => {
    try {
      const playerId = req.params.playerId;
  
      const playerDetails = await fetch(`https://api.cricapi.com/v1/players_info?apikey=c3845bb7-b0a7-4c67-a11a-e4303aacca2d&id=${playerId}`);
      const data = await playerDetails.json();
      console.log(data);
      res.render('player-details', { playerDetails: data });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

app.post('/search-players', async (req, res) => {
    try {
      const playerName = req.body.name; 
  
      // Make an API request to get players by name
      const response = await fetch(`https://api.cricapi.com/v1/players?apikey=c3845bb7-b0a7-4c67-a11a-e4303aacca2d&offset=0&search=${playerName}`);
      const data = await response.json();
  
      // Send the player data to the client
      res.json(data.data);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  

app.use((req, res) => {
    res.status(404).render('404');
});

app.listen('8000', () => {
  console.log(`Server is running on port 8000`);
});


