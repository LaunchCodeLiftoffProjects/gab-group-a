let mapOptions = {
    center:[38.614, -90.286],
    zoom: 10
}

let map = new Location.map('map' ,mapOptions);

let layer = new Location.TileLayer('http//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
map.addLayer(layer);