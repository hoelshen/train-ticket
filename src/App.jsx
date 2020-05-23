import React, { PureComponent,useState, useEffect,createContext,useContext, useMemo, memo , useCallback, useRef} from "react";
import "./App.css";

let idSeq = Date.now();


const LS_KEY = '_$-Todos_';

function App(props) {
  const [todo, setTodo] = useState([]);

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
    const { todos, toggleTodo, removeTodo } = props; 
    return (
      <ul>
        {
          todos.map(todo =>  {
            return (
              <TodoItem
                key={todo.id}
                todo={todo}
                toggleTodo={toggleTodo}
                removeTodo = {removeTodo}
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
      }, toggleTodo, removeTodo
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
  const addTodo = useCallback((todo)=>{
    setTodos(todos=> [...todos, todo])
  })

  const removeTodo = useCallback((id)=>{
    setTodos(todos => todos.filter(todo=>{
      return todo.id !== id
    }))
  })

  const toggleTodo = useCallback((id)=>{
    console.log('id: ', id);
    setTodos(todos => todos.map(todo=>{
      return todo.id == id
          ? {
            ...todo,
            complete : !todo.complete
          }
          : todo
    }))
  })

  useEffect(()=>{
    const value = JSON.parse(localStorage.getItem(LS_KEY));
    if(value) setTodos(value)
  }, [])

  useEffect(()=>{
    localStorage.setItem(LS_KEY, JSON.stringify(todos));
  }, [todos])



  return (
    <div className='todo-list'>
      <Control addTodo={addTodo}></Control>
      <Todos todos={todos} removeTodo={removeTodo} toggleTodo={toggleTodo}></Todos>
    </div>
  );
}

export default App;


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
