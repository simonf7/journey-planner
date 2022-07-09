import React from 'react';
import {
  GoogleAddressLookup,
  Input,
  ButtonIcon,
} from 'react-rainbow-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

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
    this.setLatitudeAndLongitude = this.setLatitudeAndLongitude.bind(this);
  }

  // new location chosen using the geocoding component
  setNewLocation(event) {
    let newState = {
      text: '',
      latitude: null,
      longitude: null,
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

    this.setState(newState, () => {
      if (this.props.updateLocation) {
        this.props.updateLocation(this.state);
      }
    });
  }

  // latitude manually updated, remove the chosen location
  setNewLatitude(event) {
    this.setState({
      text: '',
      latitude: event.target.value,
    });
  }

  // longitude manually updated, remove the chosen location
  setNewLongitude(event) {
    this.setState({
      text: '',
      longitude: event.target.value,
    });
  }

  // new latitude and longitude entered manually, update the map
  setLatitudeAndLongitude() {
    if (this.props.updateLocation) {
      this.props.updateLocation(this.state);
    }
  }

  render() {
    const inputStyles = {
      marginRight: '1em',
    };

    const { placeholder, id, disabled } = this.props;
    const { text, latitude, longitude } = this.state;
    const buttonDisabled = !this.state.latitude || !this.state.longitude;

    return (
      <div className="location">
        <div className="location-lookup">
          <GoogleAddressLookup
            id={id + '_lookup'}
            placeholder={placeholder}
            apiKey={process.env.REACT_APP_API_KEY}
            value={text}
            onChange={this.setNewLocation}
            className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
            disabled={disabled}
          />
        </div>
        <div className="location-coordinates">
          <Input
            id={id + '_latitude'}
            placeholder="Latitude"
            value={latitude ?? ''}
            onChange={this.setNewLatitude}
            className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
            style={inputStyles}
            disabled={disabled}
          />
          <Input
            id={id + '_longitude'}
            placeholder="Longitude"
            value={longitude ?? ''}
            onChange={this.setNewLongitude}
            className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
            style={inputStyles}
            disabled={disabled}
          />
          <div className="rainbow-p-right_large">
            <ButtonIcon
              id={id + '_button'}
              variant="border-filled"
              size="medium"
              tooltip="Set co-ordinates"
              icon={<FontAwesomeIcon icon={faLocationDot} />}
              disabled={buttonDisabled}
              onClick={this.setLatitudeAndLongitude}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default Location;
