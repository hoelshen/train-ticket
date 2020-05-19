import React, { PureComponent,useState, useEffect,createContext,useContext, useMemo, memo , useCallback, useRef} from "react";
import "./App.css";

function List(props){
  const { list } = props

  return (
    <ul>
      {
        list.map(item=>{
          return (
            <li>
            <input type="checkout"/>
            <span>item.val</span>
            <span>x</span>
            </li>
          )
        })
      }
    </ul>
  )
}

function Todo(){
  return (
    <div>
      <h1>todo</h1> 
      <input type="text" placeholder='why we need to do' />
    </div>
  )
}

function App(props) {
  const [todo, setTodo] = useState([]);

  return (
    <Todo></Todo>
  );
}

export default App;
