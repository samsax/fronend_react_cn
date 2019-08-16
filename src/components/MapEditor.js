import React, { Component } from 'react';
import {Map,TileLayer,FeatureGroup} from 'react-leaflet'
import L from 'leaflet';
import {EditControl} from 'react-leaflet-draw';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-shadow.png',
});

let polyline;

export default class MapEditor extends Component {

    _onCreated = (e) => {
        const layer = e.layer;
        console.log(layer)
        this.props.setZone(layer.toGeoJSON().geometry);
        this._onChange();
    }

    _onDeleted = (e) => {
        this.props.setZone(null);
        console.log(e.layers);
    }

    _onEdited = (e) => {
        e.layers.eachLayer((layer)=>{
            this.props.setZone(layer.toGeoJSON().geometry);
        })
    }

    render() { 
        return (
            <Map center={[19.42,-99.15]} zoom={13} zoomControl={false}>
                <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                />
                <FeatureGroup>
                    <EditControl
                        position='topright'
                        onEdited={this._onEdited}
                        onCreated={this._onCreated}
                        onDeleted={this.onDeleted}
                        draw={{
                            rectangle:false
                        }}
                    />
                </FeatureGroup>
            </Map>
          );
    }
    _editableFG = null

    _onChange = () => {
        const { onChange } = this.props;
        if(!this._editableFG || !onChange){
            return;
        }
        const geoJsonData = this._editableFG.leafletElement.toGeoJson();
        onChange(geoJsonData)
    
    }
}
 
