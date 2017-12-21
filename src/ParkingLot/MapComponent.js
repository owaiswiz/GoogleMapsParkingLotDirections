/*global google*/
import {
  GoogleMap,
  Marker,
  Polygon,
  withGoogleMap,
  withScriptjs,
} from 'react-google-maps';
import DrawingManager from "react-google-maps/lib/components/drawing/DrawingManager";
import React from 'react';

import Direction from './Direction';

const MapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={0}
    defaultCenter={{ lat: 0, lng: 0 }}
  >
    {
      props.enableDrawing && <DrawingManager
        defaultDrawingMode={google.maps.drawing.OverlayType.POLYGON}
        defaultOptions={{
          drawingControl: true,
          drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [
              google.maps.drawing.OverlayType.POLYGON,
            ],
          }
        }}
        onPolygonComplete={props.handlePolygonComplete}
      />
    },
    {
      props.polygons.map((polyCoords,index) => {
          var lowX, highX, lowY, highY, centerX, centerY, polygonCenter, lats = [], lngs = [];

          for(var i=0; i<polyCoords.length; i++) {
            lngs.push(polyCoords[i].lng);
            lats.push(polyCoords[i].lat);
          }

          lats.sort();
          lngs.sort();
          lowX = lats[0];
          highX = lats[lats.length - 1];
          lowY = lngs[0];
          highY = lngs[lngs.length - 1];
          centerX = lowX + ((highX - lowX) / 2);
          centerY = lowY + ((highY - lowY) / 2);
          polygonCenter = new google.maps.LatLng(centerX, centerY);
        return (
          <div key={index}>
            <Marker
              key={"marker-"+index}
              label={String(index+1)}
              position={polygonCenter}
            />
            <Polygon
              key={index}
              path={polyCoords}
              options={{
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                draggable: false,
                zIndex: -999
              }}
            />
          </div>
        );
      })
    },
    {
      props.direction && <Direction direction={props.direction} latLng={props.polygons[props.direction-1]} />
    }
  </GoogleMap>
))

export default MapComponent;
