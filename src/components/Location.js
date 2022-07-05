import React from 'react';
import { GoogleAddressLookup, Input } from 'react-rainbow-components';

class Location extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      latitude: null,
      longitude: null,
    };

    this.setNewLocation = this.setNewLocation.bind(this);
    this.setNewLatitude = this.setNewLatitude.bind(this);
    this.setNewLongitude = this.setNewLongitude.bind(this);

    // set some geocoding defaults
  }

  setNewLocation(event) {
    let text = '';
    let latitude = null;
    let longitude = null;

    if (event) {
      text = event.formatted_address;
      latitude = event.geometry.location.lat();
      longitude = event.geometry.location.lng();
    }
    this.setState(
      {
        text: text,
        latitude: latitude,
        longitude: longitude,
      },
      () => {
        if (this.props.updateLocation) {
          this.props.updateLocation(this.state);
        }
      }
    );
  }

  setNewLatitude(event) {
    this.setState(
      {
        text: '',
        latitude: event.target.value,
      },
      () => {
        if (this.props.updateLocation) {
          this.props.updateLocation(this.state);
        }
      }
    );
  }

  setNewLongitude(event) {
    this.setState(
      {
        text: '',
        longitude: event.target.value,
      },
      () => {
        if (this.props.updateLocation) {
          this.props.updateLocation(this.state);
        }
      }
    );
  }

  render() {
    return (
      <div className="location">
        <div className="location-lookup">
          <GoogleAddressLookup
            id={this.props.id + '_lookup'}
            placeholder={this.props.placeholder}
            apiKey={process.env.REACT_APP_API_KEY}
            value={this.props.value.text}
            onChange={this.setNewLocation}
            className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
          />
        </div>
        <div className="location-coordinates">
          <Input
            id={this.props.id + 'latitude'}
            placeholder="Latitude"
            value={this.props.value.latitude}
            onChange={this.setNewLatitude}
            className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
          />
          <Input
            id={this.props.id + 'longitude'}
            placeholder="Longitude"
            value={this.props.value.longitude}
            onChange={this.setNewLongitude}
            className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
          />{' '}
        </div>
      </div>
    );
  }
}
export default Location;
