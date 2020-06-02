import React, { PureComponent,useState, useEffect,createContext,useContext, useMemo, memo , useCallback, useRef} from "react";
import "./App.css";

import {
  createAdd,
  createRemove,
  createSet,
  createToggle
} from './action'
let idSeq = Date.now();


function bindActionCreators(actionCreators, dispatch) {
  const ret = {}
  for(let key in actionCreators){
    ret[key] = function(...args){
      const actionCreator = actionCreators[key]
      const action = actionCreator(...args);
      dispatch(action)
    }
  }

  return ret
}

function combineReducers(reducers) {
  return function reducer(state, action) {
    const changed  = {};
    for(let key in reducers){
      changed[key] = reducers[key](state[key], action)
    }
  }

  return {
    ...state,
    ...changed
  }
}


const LS_KEY = '_$-Todos_';

function App(props) {
  const [todo, setTodo] = useState([]);
  const [incrementCount, setIncrementCount] = useState(0);


  const Control = memo(function Control(props) {
    const { addTodo } = props;
    const inputRef = useRef();
  
    const onSubmit = (e)=>{
      e.preventDefault()
      const newText = inputRef.current.value.trim();
      if(newText.length == 0) return;
  

      addTodo({
        id: ++idSeq,
        value: newText,
        complete: false
      })
      inputRef.current.value = ''
    }


    return (
      <div className='control'>
        <h1>todos</h1>
        <form onSubmit={onSubmit}>
            <input
            type="text"
            className='new-todo'
            ref={inputRef}
            placeholder='what need to be done'>
            
            </input> 
        </form>  
      </div> 
    )
  })
  
  const Todos = memo(function Todos(props){
    const { todos, removeTodo, toggleTodo } = props; 
    return (
      <ul>
        {
          todos.map(todo =>  {
            return (
              <TodoItem
                key={todo.id}
                todo={todo}
                toggleTodo={toggleTodo}
                removeTodo={removeTodo}
              />)
          })
        }
      </ul>
    )
  })

  const TodoItem = memo(function TodoItem(props){
    const {
      todo: {
        id,value,complete
      }, toggleTodo,
      removeTodo
    } = props;
    const onChange = ()=>{
        toggleTodo(id)
    }

    const onRemove = ()=>{
      removeTodo(id)
    }
    return (
      <li className='todo-item'>
        <input type="checkbox" onChange={onChange} checked={complete}/>
        <label className={complete ? 'complete' : ''}>{value}</label>
        <button onClick={onRemove}>&#xd7;</button>
      </li>
    )
  })

  const [todos, setTodos] = useState([])

  useEffect(()=>{
    const value = JSON.parse(localStorage.getItem(LS_KEY)) || [];
    console.log('value: ', value);
    dispatch(createSet(value))
  }, [])

  useEffect(()=>{
    localStorage.setItem(LS_KEY, JSON.stringify(todos));
  }, [todos])


  const reducers = {
    todos(state, action){
      const { type, payload } = action;
      switch(type) {
        case 'set':
          return payload
        case 'add':
          return [...state, payload]
        case 'remove':
          return state.filter(todo=>{
            return todo.id !== payload
          })
        case 'toggle':
          return state.map(todo=>{
            return todo.id == payload
                ? {
                  ...todo,
                  complete : !todo.complete
                }
                : todo
          })
          default 
      }

      return state
    },
    incrementCount(state, action){
      const { type, payload } = action;
      switch(type){
        case 'set':
        case 'add':
          return state + 1
      }
      return state
    }
  }


  function reducer(state, action) {
    const { type, payload } = action;


    return state
  }


  const dispatch = useCallback((action) => {
    const state = {
      todos,
      incrementCount
    }

    const setters = {
      todos: setTodos,
      incrementCount: setIncrementCount
    }

    const newState = reducer(state, action);

    for(let key in newState){
      setters[key](newState[key])
    }


  },[todos, incrementCount])

  return (
    <div className='todo-list'>
      <Control 
      {
        ...bindActionCreators({
          addTodo: createAdd
        }, dispatch)
      }></Control>
      <Todos todos={todos} 
      {
        ...bindActionCreators({
          toggleTodo: createToggle ,
          removeTodo: createRemove
        }, dispatch)
      }>
        </Todos>
    </div>
  );
}

export default App;
