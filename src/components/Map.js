import React from 'react';
import { MapMarker, GMap } from 'react-rainbow-components';

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      render: true,
    };
  }

  // are both latitude and longitude set?
  isLocationSet(location) {
    return location.latitude && location.longitude;
  }

  // make sure our location is defined with floats
  toFloats(location) {
    if (this.isLocationSet(location)) {
      location.latitude = parseFloat(location.latitude);
      location.longitude = parseFloat(location.longitude);
    }

    return location;
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      // this is a bit of a hack, the GMap doesn't update when props are
      // changed, so this hides and remounts it to force changes to be shown
      if (this.state.render) {
        this.setState(
          {
            render: false,
          },
          () => {
            setTimeout(() => {
              this.setState({
                render: true,
              });
            }, 0);
          }
        );
      }
    }
  }

  render() {
    const styles = {
      width: '100%',
      height: '100%',
    };

    let { origin, destination } = this.props;
    origin = this.toFloats(origin);
    destination = this.toFloats(destination);

    // set default values
    let mapLatitude = null;
    let mapLongitude = null;
    let mapZoom = 8;

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
      <div
        className="rainbow-p-vertical_x-large rainbow-p-horizontal_small"
        style={styles}
      >
        {(!mapLatitude || !mapLongitude) && (
          <div className="map-placeholder">
            <h3>
              Please enter your journey origin and destination to show a map of
              your proposed journey.
            </h3>
          </div>
        )}
        {this.state.render && mapLatitude && mapLongitude && (
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
                latitude={destination.latitude}
                longitude={destination.longitude}
                label={destination.text}
              />
            )}
          </GMap>
        )}
      </div>
    );
  }
}
export default Map;
