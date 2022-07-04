import './App.css';
import React from 'react';

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
        <main classNae="app-main">
          <div>
            <h3>Origin</h3>
          </div>
          <div>
            <h3>Destination</h3>
          </div>
          <div>
            <h3>Departure</h3>
          </div>
          <div>
            <h3>Return</h3>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
