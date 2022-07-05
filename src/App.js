import './App.css';
import React from 'react';
import { DateTimePicker, Button } from 'react-rainbow-components';
import Location from './components/Location';

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

  render() {
    return (
      <div className="app">
        <header className="app-header">
          <h1>Add your journey</h1>
        </header>

        <main className="app-main">
          <aside className="app-aside">
            <div>
              <h3>Origin</h3>
              <Location
                id="origin"
                placeholder="Enter origin location by name or coordinates below"
                value={{
                  text: this.state.originText,
                  latitude: this.state.originLatitude,
                  longitude: this.state.originLongitude,
                }}
                onChange={this.updateOrigin}
              />
            </div>
            <div>
              <h3>Destination</h3>
              <Location
                id="destination"
                placeholder="Enter destination location by name or coordinates below"
                value={{
                  text: this.state.destinationText,
                  latitude: this.state.destinationLatitude,
                  longitude: this.state.destinationLongitude,
                }}
                onChange={this.updateDestination}
              />
            </div>
            <div>
              <h3>Departure</h3>
              <DateTimePicker
                id="departure-datetime"
                locale="en-UK"
                value={this.state.departureDate}
                onChange={(value) => this.setState({ departureDate: value })}
              />
            </div>
            <div>
              <h3>Return</h3>
              <DateTimePicker
                id="return-datetime"
                locale="en-UK"
                value={this.state.returnDate}
                onChange={(value) => this.setState({ returnDate: value })}
              />
            </div>
            <div>
              <Button
                label="Submit Journey"
                variant="brand"
                className="rainbow-m-around_medium"
              />
            </div>
          </aside>
          <section></section>
        </main>
      </div>
    );
  }
}

export default App;
