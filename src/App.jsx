import React, { useState, useEffect } from "react";
import "./App.css";
import { Component } from "react";

class App extends Component {
  state = {
    count: 0,
    size: {
      width: 0,
      height: 0
    }
  };

  onResize = () => {
    this.setState({
      size: {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      }
    });
  };
  componentDidMount() {
    document.title = this.state.count;
    window.addEventListener("resize", this.onResize, false);
  }

  render() {
    const { count, size } = this.state;
    return (
      <button
        onClick={() => {
          this.setState({ count: this.state.count + 1 });
        }}
      >
        Click({count}) size:({size.width}, {size.height})
      </button>
    );
  }
}

function App2(props) {
  const [count, setCount] = useState(0);
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  });
  //useState 按照第一次返回的顺序给你state的

  useEffect(() => {
    document.title = count;
  });

  useEffect(() => {
    console.log("count", count);
  }, [count]);

  useEffect(() => {
    window.addEventListener("resize", onResize, false);
    return () => {
      window.removeEventListener("resize", onResize, false);
    };
  }, []);

  useEffect(() => {
    document.querySelector('#size').addEventListener("click", onClick, false);
/*     return () => {
      document.querySelector('#size').removeEventListener("click", onClick, false);
    }; */
  });

  const onClick = () => {
    console.log("click");
  };

  const onResize = () => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    });
  };
  return (
    <div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Click({count})
      </button>
      {count % 2 ? (
        <span id="size">
          size:({size.width}, {size.height})
        </span>
      ) : (
        <p id="size">
          size:({size.width}, {size.height})
        </p>
      )}
    </div>
  );
}

export default App2;
