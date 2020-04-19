import React, { useState, useEffect, createContext,useContext } from "react";
import "./App.css";
import { Component } from "react";

const CountContext = createContext();

class Foo extends Component{
  render(){
    return(
      <CountContext.Consumer>
      {
        count => <h1>{count}</h1>
      }
      </CountContext.Consumer>
    )
  }
}

function Counter(){
  const count = useContext(CountContext)
  return(
    <h1>{count}</h1>

  ) 
}

class Bar extends Component{
  static contextType = CountContext;
  render(){
    const count = this.context;
    return(
      <h1>{count}</h1>
    )
  }
}

function App2(props) {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Click({count})
      </button>
      <CountContext.Provider value={count}>
        <Foo/>
        <Bar/>
        <Counter/>
      </CountContext.Provider >

    </div>
  );
}

export default App2;
