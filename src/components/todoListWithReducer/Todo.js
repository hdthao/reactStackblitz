import React from 'react';
import { useReducer, useRef, useState } from 'react';
const initTodo = {
  todo: '',
  listTodo: [],
};
const setTodo = (data) => {
  return {
    type: 'set_todo',
    data,
  };
};
const addTodo = (data) => {
  return {
    type: 'add_todo',
    data,
  };
};
const deleteTodo = (data) => {
  return {
    type: 'delete_todo',
    data,
  };
};
const saveTodo = (data, id) => {
  return {
    type: 'save_todo',
    data,
    id,
  };
};
const reducer = (state, action) => {
  if (action.type === 'set_todo') {
    return {
      ...state,
      todo: action.data,
    };
  }
  if (action.type === 'add_todo') {
    return {
      ...state,
      listTodo: [...state.listTodo, action.data],
    };
  }
  if (action.type === 'delete_todo') {
    const data = state.listTodo.filter((elm, index) => {
      return index !== action.data;
    });
    return {
      ...state,
      listTodo: data,
    };
  }
  if (action.type === 'save_todo') {
    const newTodo = state.listTodo.map((elm, index) => {
      if (index === action.id) {
        return (elm = action.data);
      }
      return elm;
    });
    return {
      ...state,
      listTodo: newTodo,
    };
  }
};
function Todo() {
  const inputRef = useRef();
  const [text, setText] = useState('');
  const [index, setIndex] = useState(null);
  const [state, dispath] = useReducer(reducer, initTodo);
  const handleSetTodo = (event) => {
    dispath(setTodo(event.target.value));
  };
  const handleAddTodo = () => {
    dispath(addTodo(state.todo));
    state.todo = '';
    inputRef.current.focus();
  };
  const handleDelete = (index) => {
    dispath(deleteTodo(index));
  };
  const handleEdit = (i) => {
    const setValue = state.listTodo[i];
    setText(setValue);
    setIndex(i);
  };
  const handleSaveTodo = () => {
    dispath(saveTodo(text, index));
  };
  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        value={state.todo}
        onChange={handleSetTodo}
      />
      <ul>
        {state.listTodo.map((elm, index) => {
          return (
            <li key={index}>
              {elm}:<span onClick={() => handleDelete(index)}>Delete</span>
              <button onClick={() => handleEdit(index)}>Edit</button>
            </li>
          );
        })}
      </ul>
      <label htmlFor="">value edit</label>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleSaveTodo}>Save</button>
      <br />
      <button onClick={handleAddTodo}>Add</button>
    </div>
  );
}
export default Todo;
