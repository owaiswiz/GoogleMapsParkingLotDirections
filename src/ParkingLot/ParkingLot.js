import React from 'react';
import MapComponent from './MapComponent';

export default class ParkingLot extends React.Component {
  state = {
    enableDrawing: true,
    polygons: []
  }

  handlePolygonComplete = (polygon) => {
    this.setState({ enableDrawing: false});
    this.createPolygon(polygon);
    var self = this;
    polygon.addListener('click',function(){
      self.createPolygon(this);
    });
    polygon.setOptions({draggable:true})
  }

  createPolygon = (polygon) => {
    var vertices = polygon.getPath();
    var newPolygon = [];
    for (var i =0; i < vertices.getLength(); i++) {
      var xy = vertices.getAt(i);
      newPolygon.push({lat: xy.lat(),lng: xy.lng()});
    }
    this.setState({
      polygons: this.state.polygons.concat([newPolygon])
    });
  }

  render() {
    return (
      <MapComponent
        enableDrawing={this.state.enableDrawing}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC0qASxIarxwj9Z7Iu0J6S6nCcUtEgNv_Y&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        polygons={this.state.polygons}
        handlePolygonComplete={this.handlePolygonComplete}
        direction={1}
      />
    );
  }
}
