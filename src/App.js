import './App.css';
import React from 'react';
import { DateTimePicker, Button } from 'react-rainbow-components';
import Location from './components/Location';
import Map from './components/Map';
import axios from 'axios';

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
    this.submitJourney = this.submitJourney.bind(this);
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
    this.setState(
      {
        submitting: true,
      },
      () => {
        // post the state as that contains all the data we need, except the submitting status
        const postData = { ...this.state };
        delete postData.submitting;

        axios
          .post('https://reqres.in/api/journey', postData)
          .then((res) => {
            alert('Journey submitted successfully!');
          })
          .catch((err) => {
            alert('Sorry, there was an error submitting your journey :-(');
          })
          .finally(() => {
            this.setState({
              submitting: false,
            });
          });
      }
    );
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
      submitting;

    const submitText = submitting
      ? 'Submitting your journey'
      : 'Submit journey';

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
                  disabled={submitting}
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
                  disabled={submitting}
                />
              </div>
              <div>
                <h3>Departure date/time</h3>
                <DateTimePicker
                  id="departure-datetime"
                  locale="en-UK"
                  value={departureDate}
                  onChange={(value) => this.setState({ departureDate: value })}
                  disabled={submitting}
                />
              </div>
              <div>
                <h3>Return date/time</h3>
                <DateTimePicker
                  id="return-datetime"
                  locale="en-UK"
                  value={returnDate}
                  onChange={(value) => this.setState({ returnDate: value })}
                  disabled={submitting}
                />
              </div>
            </div>
            <div className="app-submit">
              <Button
                id="submit-journey"
                label={submitText}
                variant="brand"
                className="rainbow-m-around_medium"
                disabled={submitDisabled}
                onClick={this.submitJourney}
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
              label={submitText}
              variant="brand"
              className="rainbow-m-around_medium"
              disabled={submitDisabled}
              onClick={this.submitJourney}
            />
          </div>
        </main>
      </div>
    );
  }
}

export default App;
