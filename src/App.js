import './App.css';
import React from 'react';
import { DateTimePicker, Button } from 'react-rainbow-components';
import Location from './components/Location';
import Map from './components/Map';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      originText: '',
      originLatitude: null,
      originLongitude: null,
      destinationText: '',
      destinationLatitude: null,
      destinationLongitude: null,
      departureDate: Date(),
      returnDate: Date(),
      submitting: false,
    };

    this.updateOrigin = this.updateOrigin.bind(this);
    this.updateDestination = this.updateDestination.bind(this);
  }

  updateOrigin(value) {
    this.setState({
      originText: value.text,
      originLatitude: value.latitude,
      originLongitude: value.longitude,
    });
  }

  updateDestination(value) {
    this.setState({
      destinationText: value.text,
      destinationLatitude: value.latitude,
      destinationLongitude: value.longitude,
    });
  }

  submitJourney() {

  }

  render() {
    const {
      originText,
      originLatitude,
      originLongitude,
      destinationText,
      destinationLatitude,
      destinationLongitude,
      departureDate,
      returnDate,
      submitting,
    } = this.state;

    const submitDisabled =
      !originLatitude ||
      !originLongitude ||
      !destinationLatitude ||
      !destinationLongitude ||
      !submitting;

    return (
      <div className="app">
        <header className="app-header">
          <h1>Add your journey</h1>
        </header>

        <main className="app-main">
          <aside className="app-aside">
            <div className="app-journey">
              <div>
                <h3>Journey Origin</h3>
                <Location
                  id="origin"
                  placeholder="Enter origin location by name or coordinates below"
                  value={{
                    text: originText,
                    latitude: originLatitude,
                    longitude: originLongitude,
                  }}
                  updateLocation={this.updateOrigin}
                />
              </div>
              <div>
                <h3>Journey Destination</h3>
                <Location
                  id="destination"
                  placeholder="Enter destination location by name or coordinates below"
                  value={{
                    text: destinationText,
                    latitude: destinationLatitude,
                    longitude: destinationLongitude,
                  }}
                  updateLocation={this.updateDestination}
                />
              </div>
              <div>
                <h3>Departure date/time</h3>
                <DateTimePicker
                  id="departure-datetime"
                  locale="en-UK"
                  value={departureDate}
                  onChange={(value) => this.setState({ departureDate: value })}
                />
              </div>
              <div>
                <h3>Return date/time</h3>
                <DateTimePicker
                  id="return-datetime"
                  locale="en-UK"
                  value={returnDate}
                  onChange={(value) => this.setState({ returnDate: value })}
                />
              </div>
            </div>
            <div className="app-submit">
              <Button
                id="submit-journey"
                label="Submit Journey"
                variant="brand"
                className="rainbow-m-around_medium"
                disabled={submitDisabled}
              />
            </div>
          </aside>
          <section className="app-section">
            <Map
              origin={{
                text: originText,
                latitude: originLatitude,
                longitude: originLongitude,
              }}
              destination={{
                text: destinationText,
                latitude: destinationLatitude,
                longitude: destinationLongitude,
              }}
            />
          </section>
          <div className="main-submit">
            <Button
              id="extra-submit-journey"
              label="Submit Journey"
              variant="brand"
              className="rainbow-m-around_medium"
              disabled={submitDisabled}
            />
          </div>
        </main>
      </div>
    );
  }
}

export default App;
