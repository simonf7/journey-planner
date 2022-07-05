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
  }

  setNewLocation(value) {
    this.setState(
      {
        text: value,
      },
      () => {
        if (this.props.onChange) {
          this.props.onChange(this.state);
        }
      }
    );

    // lookup location from GMaps
    // if successful, update the state and call onChange
  }

  setNewLatitude(value) {
    this.setState(
      {
        text: '',
        latitude: value,
      },
      () => {
        if (this.props.onChange) {
          this.props.onChange(this.state);
        }
      }
    );
  }

  setNewLongitude(value) {
    this.setState(
      {
        text: '',
        longitude: value,
      },
      () => {
        if (this.props.onChange) {
          this.props.onChange(this.state);
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
            value={this.props.latitude}
            onChange={this.setNewLatitude}
            className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
          />
          <Input
            id={this.props.id + 'longitude'}
            placeholder="Longitude"
            value={this.props.longitude}
            onChange={this.setNewLongitude}
            className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
          />{' '}
        </div>
      </div>
    );
  }
}
export default Location;
