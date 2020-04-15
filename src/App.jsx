import React, { Component, createContext } from "react";
import "./App.css";

const BatteryContext = createContext(90);
const OnlineContext = createContext();
class Leaf extends Component {
  render() {
    return (
      <BatteryContext.Consumer>
        {(battery) => (
          <OnlineContext.Consumer>
            {online => (
              <div>
                <h1>Battery: {battery}</h1>
                <h1>Online: {String(online)}</h1>
              </div>
            )}
          </OnlineContext.Consumer>
        )}
      </BatteryContext.Consumer>
    );
  }
}

class Middle extends Component {
  render() {
    return <Leaf />;
   }
}

class App extends Component {
  state = {
    online: false,
    battery: 60
  };
  render() {
    const { battery, online } = this.state;
    return (
      <BatteryContext.Provider value={battery}>
        <OnlineContext.Provider value={online}>
          <button
            type="button"
            onClick={() => {
              this.setState({ battery: battery + 1 });
            }}
          >
            onPress
          </button>
          <button
            type="button"
            onClick={() => {
              this.setState({ online: !online });
            }}
          >
            online
          </button>
          <Middle />
        </OnlineContext.Provider>
      </BatteryContext.Provider>
    );
  }
}

export default App;
