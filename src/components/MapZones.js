import React, { useState } from 'react';
import { Map, TileLayer, Marker, Popup, GeoJSON  } from 'react-leaflet'; 

function MapZones({data}){

    const coordinates = [19.4204502, -99.1566862];
    //const [zones, setZones ] = useState(data.map( z => z.location ))
    const zones = data.map( z => z.location )
    return(
        <Map center={coordinates} zoom={12}>
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <GeoJSON data={zones} style={{backgroundColor:"#391E39",border:"1px solid #391E39"}} />
              <Marker position={coordinates}>
                <Popup>
                  Desde mi app en react
                </Popup>
              </Marker>
    </Map>
    )

}

export default MapZones;