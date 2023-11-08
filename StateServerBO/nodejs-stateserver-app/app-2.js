// this is a more complex version of this program using the 'point-in-polygon' algorithm to determine the location of our points with respect to the polygon (border) of each state.
const express = require('express');
const app = express();
const port = 4000;
const fs = require('fs');

const statesData = JSON.parse(fs.readFileSync('./states.json', 'utf8'));

// point-in-polygon like algorithm
function isPointInPolygon(point, polygon) {
    const [x, y] = point; // split the point into x and y coordinates
    let isInside = false; // create boolean flag to indicate if the point is inside the polygon

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        // Loop through the sides of the polygon using the indices i and j (respective points make a side: i----j)

        // first point
        const xi = polygon[i][0]; // x-coordinate of the i-th point of the polygon
        const yi = polygon[i][1]; // y-coordinate of the i-th point of the polygon

        // second point
        const xj = polygon[j][0]; // x-coordinate of the j-th point of the polygon
        const yj = polygon[j][1]; // y-coordinate of the j-th point of the polygon


        // Determine if the line segment defined by points i and j intersects with the horizontal line at point y
        const intersect = ((yi > y) !== (yj > y)) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;

        // If the line segment intersects with the horizontal line at point y, toggle the isInside flag
        if (intersect) {
            isInside = !isInside;
        }
    }

    return isInside; // Return whether the point is inside the polygon (true) or outside (false)
}

function getCorrespondingState(latitude, longitude, statesData) {
    for (const stateData of statesData) {
        const border = stateData.border;
        if (isPointInPolygon([longitude, latitude], border)) {
            return stateData.state;
        }
    }
    return 'Not Found';
}

app.use(express.static('public'));

app.get('/states', (req, res) => {
    res.json(statesData);
});

app.get('/getState', (req, res) => {
    const latitude = parseFloat(req.query.latitude);
    const longitude = parseFloat(req.query.longitude);

    const state = getCorrespondingState(latitude, longitude, statesData);

    if (state) {
        res.json({ state: state });
    } else {
        res.json({ state: 'Not Found' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
