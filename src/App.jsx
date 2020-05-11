import React, { useState, createContext,useContext, useMemo, memo , useCallback} from "react";
import "./App.css";
import { Component } from "react";


function App2(props) {
  const [count, setCount] = useState(0);
  const [clickCount, setClickCount] = useState(0)
  const double = useMemo(()=>{
    return count * 2
  },[count === 3])

/*   const onClick = useMemo(()=>{
    return ()=>{
      console.log('Click')
    }
  }, []) */
  const onClick = useCallback(()=>{
    console.log('Click')
    setClickCount(clickCount + 1);
  }, [clickCount])
  //if useMemo(()=> fn)
  //useCallback(fn) 
  const Count = memo(function Counter(props){
    console.log('Count render')
    return (
    <h1>{props.count}</h1>
    )
  })

  return (
    <div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Click({count}), double: ({double})
      </button>
    
        <Count count={double} onClick={onClick}> </Count>
    </div>
  );
}

export default App2;
