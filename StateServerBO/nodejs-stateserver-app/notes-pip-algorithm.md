`function pointInPolygon(point, polygon) {
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
}`

The function takes two arguments: point and polygon.

point is an array with two elements, representing the x and y coordinates of the point you want to check.
polygon is an array of objects, where each object represents a vertex of the polygon with x and y properties. These vertices should be ordered in either a clockwise or counterclockwise direction.
x and y are assigned the x and y coordinates of the point.

n is assigned the number of vertices in the polygon.

inside is a boolean variable used to track whether the point is inside the polygon. It's initialized as false.

The function enters a loop that iterates through each pair of consecutive vertices in the polygon, using the variables i and j.

xi and yi represent the x and y coordinates of the current vertex.
xj and yj represent the x and y coordinates of the next vertex, which is determined by incrementing i or decrementing j.
The algorithm checks if the y-coordinate of the current vertex (yi) is greater than the y-coordinate of the point (y) and if the y-coordinate of the next vertex (yj) is not greater than y:

(yi > y) !== (yj > y)
This condition checks if the point's y-coordinate is within the y-range of the edge formed by the two vertices.

If the condition in the above step is true, the algorithm proceeds to calculate the x-coordinate where a ray extending horizontally from the point x intersects the edge defined by the two vertices.

x < ((xj - xi) * (y - yi)) / (yj - yi) + xi
This equation represents the x-coordinate where the ray intersects the edge. If the point x is to the left of this intersection point, it means the ray crosses the edge.

If the condition in step 7 is true, the inside variable is toggled (from false to true or vice versa). This is because the ray crosses the edge, and this means the point is inside the polygon.

The loop continues with the next pair of vertices, and the process repeats for all edges of the polygon.

After checking all edges (sides), the inside variable contains the final result, which indicates whether the point is inside the polygon.

The function returns inside, which is true if the point is inside the polygon and false if it's outside.

The ray casting algorithm works by counting the number of edge crossings. If the count is odd, the point is inside the polygon; if it's even, the point is outside. This is why the inside variable is toggled each time a ray crosses an edge.

Here is another example of the algorithm but with a counter variable: