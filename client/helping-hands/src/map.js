import { Class } from 'leaflet';
import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import './App.css';
import mapData from "./data/map-location.json"

class Map extends Component{
    state = {
        location: {
          lat: 38.6308,  
          lng: -90.2831,
        },
        haveUserLocation: false,
        zoom: 13,
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.state({
                location: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                },
                haveUserLocation: true,
                zoom: 10
            });
        }, () =>{
            console.log('no location given');
            fetch('https://ipapi.co/json')
            .then(res => res.json())
            .then(location => {
                console.log(location);
                this.setState({
                    location:{
                        lat: location.latitude,
                        lng: location.longitude,
                    },
                    haveUserLocation: true,
                    zoom: 10
                });
            });
        });
    }

 render(){
     const position = [this.state.location.lat,  this.state.location.lng];
     return(
        < Map class='map' center={[38.6308, -90.2831]} zoom={13} scrollWheelZoom={true}>
            <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {mapData.map(map => (
                <Marker position={[38.6308, -90.2831]}>
                key= {map.id}
                position={[mapData.gps.latitude, mapData.gps.longitude]}
                </Marker>
            ))}

        </Map>
    );
}
}

export default Map;