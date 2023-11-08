function pointInPolygon(point, polygon) {
    const x = point[0];
    const y = point[1];
    const n = polygon.length;
    let inside = false;

    for (let i = 0, j = n - 1; i < n; j = i++) {
        const xi = polygon[i][0];
        const yi = polygon[i][1];
        const xj = polygon[j][0];
        const yj = polygon[j][1];

        if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
            inside = !inside;
        }
    }

    return inside;
}

const polygon = [
    [0, 0],
    [0, 4],
    [4, 4],
    [4, 0]
];

const point = [2, 2];

const result = pointInPolygon(point, polygon);

if (result) {
    console.log("Point is inside the polygon");
} else {
    console.log("Point is outside the polygon");
}


