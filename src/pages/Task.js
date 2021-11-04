import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext.js";
import { Redirect } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const theme = createTheme({
  palette: {
    bg: '#C1C2AD',
    background: '#E9E6E2',
    text: '#331E38',

  },
  typography: {
    h1: {
      fontSize: '6rem',
      fontFamily: 'Segoe UI',
      fontWeight: '400',
      color: '#535E4B',
    },
    h2: {
      fontSize: '2rem',
      fontFamily: 'Segoe UI',
      fontWeight: '500',
      color: '#7c9c96',
    },
  },
});


function Title(props) {
  const { currentUser } = useAuth();
  // handle logout
  /*const handleLogoutClick = async () => {
    // Implement logout stuff here
    await logout();

    window.location.href = "/";
  }; */
  return (

    <ThemeProvider theme={theme}>
      <Typography variant='h1' fontSize='title' component="div" gutterBottom>
        {currentUser.name}'s To Do List
      </Typography>
    </ThemeProvider>

  )
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

    return <Redirect to="/signup" />;
  }
  else {
    console.log(currentUser.email);

    return (
      <ThemeProvider theme={theme}>
        <div title="Taskpage">
        </div>
        <Box component="main" sx={{ backgroundColor: 'bg', flexGrow: 1, height: '100vh', overflow: 'auto', }} >

          <Paper sx={{ mx: 'auto', elevation: 1, bgcolor: 'background', width: '80%', mt: 3 }}>
            <Title />
          </Paper>

          {inputList.map((x, i) => {
            return (
              <div className="box">
                <input
                  name="taskName"
                  placeholder="Enter Task Name"
                  value={x.taskName}
                  onChange={e => handleInputChange(e, i)}
                />
                <input
                  className="ml10"
                  name="duration"
                  placeholder="Duration (hours)"
                  value={x.duration}
                  onChange={e => handleInputChange(e, i)}
                />
                {inputList.length !== 0 && <button
                  className="mr10"
                  onClick={() => handleRemoveClick(i)}>Remove</button>}
                {inputList.length - 1 === i && <button onClick={handleAddClick}>Add</button>}
                {(inputList.length !== 0 && inputList.length - 1 !== i) && <button
                  className="mr10"
                  onClick={() => handleRemoveClick(i)}>Complete</button>}
              </div>
            );
          })}

        </Box>
      </ThemeProvider>
    );
  }
}

export default Task;
