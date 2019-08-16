import React, { Component } from "react";
import { Map, TileLayer, FeatureGroup } from "react-leaflet";
import L from "leaflet";
import { EditControl } from "react-leaflet-draw";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-shadow.png"
});

let polyline;

export default class MapEditor extends Component {

    state = {
        editable:''
    }

  _onCreated = e => {
    const layer = e.layer;
    this.setState({editable:e.layer.toGeoJSON()})
    this.props.setZone(layer.toGeoJSON().geometry);
    //this._onChange()
  };

  _onDeleted = e => {
    console.log(e.layers);
    this.props.setZone(null)
  };

  _onEdited = e => {
    console.log(e.layers);
    e.layers.eachLayer((layer) => {
        this.props.setZone(layer.toGeoJSON().geometry);
    })
  };

  render() {
    return (
      <Map center={[19.4204502, -99.1566862]} zoom={13} zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />

        <FeatureGroup>
            <EditControl
                position='topright'
                onEdited={this._onEdited}
                onCreated={this._onCreated}
                onDeleted={this._onDeleted}
                draw={{
                    reactangle:false
                }}
            />
        </FeatureGroup>
      </Map>
    );
  }



  _onChange = () => {

    // this._editableFG contains the edited geometry, which can be manipulated through the leaflet API
    const { onChange } = this.props;
    //console.log(this.state.editable, onChange)
    //console.log(this.state.editable)
    if (!this.state.editable || !onChange) {
      return;
    }
    const geojsonData = this.state.editable.toGeoJSON()
    //console.log(geojsonData)
    onChange(geojsonData);
  
}


}
