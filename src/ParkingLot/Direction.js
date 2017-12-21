/* global google */
import { DirectionsRenderer } from 'react-google-maps';
import React from 'react';

export default class Direction extends React.Component {

  state = {};
  componentDidMount() {


    var userLocation = {lat: 19.024017, lng: 73.097788}
    var parkingEntrance = {lat: 19.023453, lng: 73.095406}
    const DirectionsService = new google.maps.DirectionsService();
    DirectionsService.route({
      origin: userLocation,
      destination: parkingEntrance,
      travelMode: google.maps.TravelMode.DRIVING,
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.setState({
          directions: result,
        });
      } else {
        console.error(`error fetching directions ${result}`);
      }
    });
  }
  render() {
    return (
      (
        this.state.directions && 
        <DirectionsRenderer 
          options={{suppressMarkers: true}} 
          directions={this.state.directions} 
        />
      ) || null 
    );
  }
}
