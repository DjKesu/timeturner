/*import React from "react";
import "../styles/Task.css";

function Todo({ todo, index, completeTodo, removeTodo }) {
  return (
    <div
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      {todo.text}
      <div>
        <button onClick={() => completeTodo(index)}>Complete</button>
        <button onClick={() => removeTodo(index)}>x</button>
      </div>
    </div>
  );
}

function TodoForm({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={this.useState.value}
        onChange={e => setValue(e.target.value)}
      />
        <input
        type="text"
        className="time"
        value={this.useState.value}
        onChange={f => setValue(f.target.value)}
      />
    </form>
  );
}

function Task() {
  const [todos, setTodos] = React.useState([
  ]);

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

export default Task;*/

import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext.js";
import { Redirect } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/system";

const theme = createTheme({
  palette: {
    background: "#403F3C",
    text: "#F5CD89",
  },
  typography: {
    h1: {
      fontSize: "6rem",
      fontFamily: "Segoe UI",
      fontWeight: "350",
      color: "#F5CD89",
    },
    h2: {
      fontSize: "2rem",
      fontFamily: "Segoe UI",
      fontWeight: "500",
      color: "#F5CD89",
    },
  },
});
const currentDate = new Date().toISOString().substring(0, 10);
function Title(props) {
  const { currentUser, logout } = useAuth();
  // handle logout
  const handleLogoutClick = async () => {
    // Implement logout stuff here
    await logout();

    window.location.href = "/";
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "100%" }}>
        <Typography variant="h1" fontSize="title" component="div" gutterBottom>
          {currentUser.email}'s To Do List
        </Typography>
        <Typography variant="h2" fontSize="title" component="div" gutterBottom>
          November 4, 2021
        </Typography>
      </Box>
      {<button onClick={handleLogoutClick}>Log Out</button>}
    </ThemeProvider>
  );
}

function Task() {
  const [inputList, setInputList] = useState([{ taskName: "", duration: "" }]);
  const { currentUser } = useAuth();

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { taskName: "", duration: "" }]);
  };

  //handleCompleteClick

  if (!currentUser) {
<<<<<<< HEAD

    return <Redirect to="/signup" />;
  }
  else {
=======
    return <Redirect to="/Signup" />;
  } else {
>>>>>>> 59e93d82c71834b5f13f7f00356988ec9f731523
    console.log(currentUser.email);

    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ bgcolor: "background", width: "100%" }}>
          <div className="App">
            <Title sx={{ mt: 5, height: "10%" }} />
            <div title="Taskpage"></div>

            {inputList.map((x, i) => {
              return (
                <div className="box">
                  <input
                    name="taskName"
                    placeholder="Enter Task Name"
                    value={x.taskName}
                    onChange={(e) => handleInputChange(e, i)}
                  />
                  <input
                    className="ml10"
                    name="duration"
                    placeholder="Duration (hours)"
                    value={x.duration}
                    onChange={(e) => handleInputChange(e, i)}
                  />
                  {inputList.length !== 0 && (
                    <button
                      className="mr10"
                      onClick={() => handleRemoveClick(i)}
                    >
                      Remove
                    </button>
                  )}
                  {inputList.length - 1 === i && (
                    <button onClick={handleAddClick}>Add</button>
                  )}
                  {inputList.length !== 0 && inputList.length - 1 !== i && (
                    <button
                      className="mr10"
                      onClick={() => handleRemoveClick(i)}
                    >
                      Complete
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </Box>
      </ThemeProvider>
    );
  }
}

export default Task;
