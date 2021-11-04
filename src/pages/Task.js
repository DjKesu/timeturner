import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext.js";
import { Redirect } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const theme = createTheme({
  palette: {
    bg: "#C1C2AD",
    background: "#E9E6E2",
    text: "#331E38",
  },
  typography: {
    h1: {
      fontSize: "6rem",
      fontFamily: "Segoe UI",
      fontWeight: "400",
      color: "#535E4B",
    },
    h2: {
      fontSize: "2rem",
      fontFamily: "Segoe UI",
      fontWeight: "500",
      color: "#7c9c96",
    },
  },
});

const currentDate = new Date().toISOString().substring(0, 10);

function Title(props) {
  const { currentUser, logout } = useAuth();
  // handle logout
  const handleLogoutClick = async () => {
    await logout();


function Task() {
  const [inputList, setInputList] = useState([{ taskName: "", duration: "", difficulty: "", enjoyment: "" }]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching data");
      try {
        const docRef = doc(db, "users", currentUser.email);
        await getDoc(docRef)
          .then((docSnap) => {
            console.log(docSnap.data());
            setUser(docSnap.data());
          })
          .then(() => {
            setLoading(false);
            console.log("user:", user);
          });
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  async function updateDatabase() {
    await setDoc(doc(db, "tasks", currentUser.email), {
      list: inputList
    });
  }

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
  const handleAddClick = (e) => {
    e.preventDefault();
    setInputList([...inputList, { taskName: e.taskName, duration: e.duration, difficulty: e.diffculty, enjoyment: e.enjoyment }]);
    updateDatabase();
    e = "";
  };

  //handleCompleteClick

  if (!currentUser) {

    return <Redirect to="/login" />;
  }
  else {
    console.log(currentUser.email);
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
          <Typography variant='h1' fontSize='title' component="div" gutterBottom>
            {user.name}'s To Do list
          </Typography>
          <Typography variant="h2" fontSize="title" component="div" gutterBottom>
            {currentDate}
          </Typography>
          {<button onClick={handleLogoutClick}>Log Out</button>}
        </ThemeProvider>
      );
    }
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
                <TextField margin="normal"
                  required
                  sx={{ bgcolor: 'background', borderRadius: 1 }}
                  width='30%'
                  name="taskName"
                  placeholder="Enter Task Name"
                  value={x.taskName}
                  onChange={e => handleInputChange(e, i)}
                />

                <TextField margin="normal"
                  required
                  sx={{ bgcolor: 'background', borderRadius: 1 }}
                  width='30%'
                  name="duration"
                  placeholder="Duration (hours)"
                  value={x.duration}
                  onChange={e => handleInputChange(e, i)}
                />

                <TextField margin="normal"
                  required
                  sx={{ bgcolor: 'background', borderRadius: 1 }}
                  width='30%'
                  name="difficulty"
                  placeholder="Difficulty (1-10)"
                  value={x.difficulty}
                  onChange={e => handleInputChange(e, i)}
                />

                <TextField margin="normal"
                  required
                  sx={{ bgcolor: 'background', borderRadius: 1 }}
                  width='30%'
                  name="enjoyment"
                  placeholder="Enjoyment level (1-10)"
                  value={x.enjoyment}
                  onChange={e => handleInputChange(e, i)}
                />

                {inputList.length !== 0 && <button
                  onClick={() => handleRemoveClick(i)}>Remove</button>}
                {inputList.length - 1 === i && <button onClick={handleAddClick}>Add</button>}
                {(inputList.length !== 0 && inputList.length - 1 !== i) && <button
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
