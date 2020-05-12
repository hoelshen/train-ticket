import React, { PureComponent,useState, createContext,useContext, useMemo, memo , useCallback, useRef} from "react";
import "./App.css";
import { Component } from "react";

class Counter extends PureComponent{
  speak(){
    console.log(`now count ${this.props.count}`)
  }
  render(){
    const {props} = this
    return (
      <h1 onClick={props.onClick}>{props.count}</h1>
      )
  }

}

function App2(props) {
  const [count, setCount] = useState(0);
  const [clickCount, setClickCount] = useState(0)
  const double = useMemo(()=>{
    return count * 2
  },[count === 3])

  const counterRef = useRef();

  const onClick = useCallback(()=>{
    console.log('Click')
    setClickCount(clickCount + 1);
    console.log(counterRef.current)
  }, [counterRef])


  return (
    <div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Click({count}), double: ({double})
      </button>
    
        <Counter ref={counterRef} count={double} onClick={onClick}> </Counter>
    </div>
  );
}

export default App2;
