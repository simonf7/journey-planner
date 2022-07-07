import React from 'react';
import { MapMarker, GMap } from 'react-rainbow-components';

class Map extends React.Component {
  isLocationSet(location) {
    return location.latitude && location.longitude;
  }

  toFloats(location) {
    if (this.isLocationSet(location)) {
      location.latitude = parseFloat(location.latitude);
      location.longitude = parseFloat(location.longitude);
    }

    return location;
  }

  render() {
    let { origin, destination } = this.props;

    origin = this.toFloats(origin);
    destination = this.toFloats(destination);

    // set default values
    let mapLatitude = null;
    let mapLongitude = null;
    let mapZoom = 10;

    // which locations can we show and where do we centre
    if (this.isLocationSet(origin) && this.isLocationSet(destination)) {
      mapLatitude = (origin.latitude + destination.latitude) / 2;
      mapLongitude = (origin.longitude + destination.longitude) / 2;
    } else if (this.isLocationSet(origin)) {
      mapLatitude = origin.latitude;
      mapLongitude = origin.longitude;
    } else if (this.isLocationSet(destination)) {
      mapLatitude = destination.latitude;
      mapLongitude = destination.longitude;
    }

    return (
      <div className="rainbow-p-vertical_x-large rainbow-p-horizontal_small">
        {mapLatitude && mapLongitude && (
          <GMap
            apiKey={process.env.REACT_APP_API_KEY}
            zoom={mapZoom}
            latitude={mapLatitude}
            longitude={mapLongitude}
          >
            {this.isLocationSet(origin) && (
              <MapMarker
                latitude={origin.latitude}
                longitude={origin.longitude}
                label={origin.text}
              />
            )}
            {this.isLocationSet(destination) && (
              <MapMarker
                latitude={this.props.destination.latitude}
                longitude={this.props.destination.longitude}
                label={this.props.destination.text}
              />
            )}
          </GMap>
        )}
      </div>
    );
  }
}
export default Map;
