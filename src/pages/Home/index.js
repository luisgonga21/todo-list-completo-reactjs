import React, { useEffect, useState } from "react";
import { Primeira, Form } from "./style";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");
  
  useEffect(() => {
    const temp = localStorage.getItem("todos")
    const loadedTodos = JSON.parse(temp)
    if(loadedTodos) {
      setTodos(loadedTodos)
    }
  }, [])

  useEffect(() => {
    const temp = JSON.stringify(todos)
    localStorage.setItem("todos", temp)
  },[todos])

  function handleSubmit(e) {
    e.preventDefault()

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    }
    setTodos([...todos].concat(newTodo))
    setTodo("")
  }

  function deleteTodo(id) {
    const updatedTodos = [...todos].filter((todo) => todo.id !== id)   
    setTodos(updatedTodos)
  }

  function toggleComplete(id) {
    const updatedTodos = [...todos].map((todo) => {
      if(todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo
    })   
    setTodos(updatedTodos)
  }

  function editTodo(id) {
    const updatedTodos = [...todos].map((todo) => {
      if(todo.id === id) {
        todo.text = editingText
      }
      return todo
    })   
    setTodos(updatedTodos);
    setTodoEditing(null);
    setEditingText("");
  }

  return (
    <>
      <Primeira>
          <Form onSubmit={handleSubmit}>
          <input
            className="sech"
            type="text"
            required
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button type="submit">add Todo</button>
          </Form>
          {todos.map((todo) => <div key={todo.id}>
            {todoEditing === todo.id ? (
              <input 
              type="text" 
              onChange={(e) => 
              setEditingText(e.target.value)}
              value={editingText}
              />
              ) : (
              <div>{todo.text}</div>)
            }
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            <input type="checkbox" 
              onChange={() => 
              toggleComplete(todo.id)} 
              checked={
                todo.completed
              }
            />
            {todoEditing === todo.id 
            ? 
            (<button onClick={() => editTodo(todo.id)}>Submit Edits</button>) 
            : 
            (<button onClick={() => setTodoEditing(todo.id)}>Edit Todo</button>)
            }
          </div>)}
      </Primeira>
    </>
  );
}


