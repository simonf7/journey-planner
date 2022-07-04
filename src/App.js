import './App.css';
import React from 'react';
import { DateTimePicker, Button } from 'react-rainbow-components';
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
      departureDate: null,
      returnDate: null,
    };
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
            </div>
            <div>
              <h3>Destination</h3>
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
