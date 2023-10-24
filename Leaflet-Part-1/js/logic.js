let url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'

let myMap = L.map("map", {
    center: [38.5, -97],
    zoom: 4
})

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

d3.json(url).then(function(data) {
    function styleMap(info) {
        return {
            fillColor: colourMap(info.geometry.coordinates[2]),
            radius: radiusMap(info.properties.mag),
            opacity: 0.1,
            fillOpacity: 0.8,
            color: "black",
            stroke: true,
            weight: 0.5
        };
    };

    function colourMap(mag) {
        if (mag > 90) {
            return "red"
        }
        else if (mag > 70) {
            return "orangered"
        }
        else if (mag > 50) {
            return "orange"
        }
        else if (mag > 30) {
            return "yellow"
        }
        else if (mag>10) {
            return "yellowgreen"
        }
        else {
            return "green"
        }
    };

    function radiusMap(mag) {
        if (mag === 0) {
            return 1;
        }
        return mag * 3
    };
    L.geoJSON(data, {
        pointToLayer: function(data, latlng) {
            return L.circleMarker(latlng);
        },
        style: styleMap,
        onEachFeature: function(data, layer) {
            layer.bindPopup("Location: " + data.properties.place + "<br>Depth " + data.geometry.coordinates[2] +"<br>Magnitude: " + data.properties.mag)
        }
    }).addTo(myMap);

    
});







