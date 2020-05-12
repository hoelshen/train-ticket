import React, { PureComponent,useState, useEffect,createContext,useContext, useMemo, memo , useCallback, useRef} from "react";
import "./App.css";

function useCounter(props){
  const size = useSize()
  return(
  <h1 >{props}, {size.width} * {size.height}</h1>
  )
}



function useCount(defaultCount) {
  const [count, setCount] = useState(defaultCount);
  const it = useRef();


  useEffect(()=>{
    it.current = setInterval(()=>{
      setCount(count => count +1)
    }, 1000)
  }, [])

  useEffect(()=>{
    if(count >= 10){
      clearInterval(it.current)
    }
  })
  return  [count, setCount]
};

function useSize(){

  function onResize(){
    setSize({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
      }
    )
  }
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  })

  useEffect(()=>{
    window.addEventListener('resize', onResize, false)
    return ()=>{
    window.removeEventListener('resize', onResize, false)

    }
  }, [])

  return size
}




function App2(props) {
const [count, setCount] = useCount(0);
const Counter = useCounter(count)
const size = useSize();
  return (
    <div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Click({count})
      </button>
      {size.width} * {size.height}
      {Counter}
    </div>
  );
}

export default App2;
