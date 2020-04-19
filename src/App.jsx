import React, { useState } from "react";
import "./App.css";

function App(props){
  const defaultCount = props.defaultCount || 0;
  const [count, setCount] = useState(defaultCount)
  //useState 按照第一次返回的顺序给你state的
  
  return(
    <button onClick={()=>{ setCount(1)}}>
      Click({count})
    </button>
  )
}


export default App;
