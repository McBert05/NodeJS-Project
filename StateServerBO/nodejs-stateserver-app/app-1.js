// this is the most simplified version of this program using a prebuilt library 'point-in-polygon' to determine the location of our points with respect to the polygon (border) of each state.
const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const pointInPolygon = require('point-in-polygon'); // Install this library using `npm install point-in-polygon`

const statesData = JSON.parse(fs.readFileSync('./states.json', 'utf8'));

app.use(express.static('public'));

// Serve the JSON data when the '/states' route is accessed
app.get('/states', (req, res) => {
    res.json(statesData);
});

// Handle coordinate-to-state mapping
app.get('/getState', (req, res) => {
    const latitude = parseFloat(req.query.latitude);
    const longitude = parseFloat(req.query.longitude);

    const state = statesData.find((stateData) => {
        const border = stateData.border;
        return pointInPolygon([longitude, latitude], border);
    });

    if (state) {
        res.json({ state: state.state });
    } else {
        res.json({ state: 'Not Found' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
