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

  setStateAndUpdate(newState) {
    this.setState(newState, () => {
      if (this.props.updateLocation) {
        this.props.updateLocation(this.state);
      }
    });
  }

  setNewLocation(event) {
    let newState = {
      text: '',
    };

    if (event) {
      if (event.formatted_address) {
        newState = {
          text: event.formatted_address,
          latitude: event.geometry.location.lat(),
          longitude: event.geometry.location.lng(),
        };
      }
    }

    this.setStateAndUpdate(newState);
  }

  setNewLatitude(event) {
    const newState = {
      text: '',
      latitude: event.target.value,
    };

    this.setStateAndUpdate(newState);
  }

  setNewLongitude(event) {
    const newState = {
      text: '',
      longitude: event.target.value,
    };

    this.setStateAndUpdate(newState);
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
            value={this.props.value.latitude ?? ''}
            onChange={this.setNewLatitude}
            className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
          />
          <Input
            id={this.props.id + 'longitude'}
            placeholder="Longitude"
            value={this.props.value.longitude ?? ''}
            onChange={this.setNewLongitude}
            className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
          />{' '}
        </div>
      </div>
    );
  }
}
export default Location;
