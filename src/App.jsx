import React, { useState, useEffect, memo, useCallback, useRef } from "react";
import "./App.css";

import { createAdd, createRemove, createSet, createToggle } from "./action";

import reducer from "./reducers";

function bindActionCreators(actionCreators, dispath) {
  const ret = {};

  for (let key in actionCreators) {
    ret[key] = function (...args) {
      const actionCreator = actionCreators[key];
      const action = actionCreator(...args);
      dispath(action);
    };
  }
  return ret;
}

const LS_KEY = "_$-Todos_";
let store = {
  todos: [],
  incrementCount: 0,
};
function App(props) {
  const [todo, setTodo] = useState([]);
  const [incrementCount, setIncrementCount] = useState(0);

  const Control = memo(function Control(props) {
    const { addTodo } = props;
    const inputRef = useRef();

    const onSubmit = (e) => {
      e.preventDefault();
      const newText = inputRef.current.value.trim();
      if (newText.length == 0) return;

      addTodo(newText);
      inputRef.current.value = "";
    };

    return (
      <div className="control">
        <h1>todos</h1>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            className="new-todo"
            ref={inputRef}
            placeholder="what need to be done"
          ></input>
        </form>
      </div>
    );
  });



  const Todos = memo(function Todos(props) {
    const { todos, removeTodo, toggleTodo } = props;
    return (
      <ul>
        {todos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleTodo={toggleTodo}
              removeTodo={removeTodo}
            />
          );
        })}
      </ul>
    );
  });

  const TodoItem = memo(function TodoItem(props) {
    const {
      todo: { id, text, complete },
      toggleTodo,
      removeTodo,
    } = props;
    const onChange = () => {
      toggleTodo(id);
    };

    const onRemove = () => {
      removeTodo(id);
    };
    return (
      <li className="todo-item">
        <input type="checkbox" onChange={onChange} checked={complete} />
        <label className={complete ? "complete" : ""}>{text}</label>
        <button onClick={onRemove}>&#xd7;</button>
      </li>
    );
  });

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const value = JSON.parse(localStorage.getItem(LS_KEY)) || [];
    console.log("value: ", value);
    dispatch(createSet(value));
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    Object.assign(store, {
      todos,
      incrementCount,
    });
  }, [todos, incrementCount]);

  const dispatch = (action) => {
    const setters = {
      todos: setTodos,
      incrementCount: setIncrementCount,
    };

    if ("function" === typeof action) {
      action(dispatch, () => store);
      return;
    }

    const newState = reducer(store, action);

    for (let key in newState) {
      setters[key](newState[key]);
    }
  };

  return (
    <div className="todo-list">
      <Control
        {...bindActionCreators(
          {
            addTodo: createAdd,
          },
          dispatch
        )}
      ></Control>
      <Todos
        todos={todos}
        {...bindActionCreators(
          {
            toggleTodo: createToggle,
            removeTodo: createRemove,
          },
          dispatch
        )}
      ></Todos>
    </div>
  );
}

export default App;
