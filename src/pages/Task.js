import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext.js";
import { Redirect } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { FormControl, TextField } from "@mui/material";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { printTaskList, sortedTasks } from "../functions/taskOptimization.js";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import {
  getEnergyLevel,
  getDrowsiness,
} from "../functions/drowsinessCalulation.js";

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
    h3: {
      fontSize: "1.5rem",
      fontFamily: "Segoe UI",
      fontWeight: "500",
      color: "#535E4B",
      textAlign: "left",
      marginLeft: "0.5vw",
    },
  },
});

const currentDate = new Date().toISOString().substring(0, 10);
const hours = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24,
];
const oneToTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
function Task() {
  const [inputList, setInputList] = useState([
    { taskName: "", duration: "", difficulty: "", enjoyment: "" },
  ]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const { currentUser } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching data");
      try {
        const docRef = doc(db, "users", currentUser.email);
        const taskRef = doc(db, "tasks", currentUser.email);
        await getDoc(docRef)
          .then((docSnap) => {
            console.log(docSnap.data());
            setUser(docSnap.data());
          })
          .then(() => {
            setLoading(false);
            console.log("user:", user);
          });
        await getDoc(taskRef)
          .then((docSnap) => {
            console.log("task1: ", docSnap.data());
            setInputList(docSnap.data().list);
          })
          .then(() => {
            setLoading(false);
            console.log("task:", inputList);
          });
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);
  async function updateDatabase() {
    await setDoc(doc(db, "tasks", currentUser.email), {
      list: inputList,
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
    setInputList([
      ...inputList,
      {
        taskName: e.taskName,
        duration: e.duration,
        difficulty: e.diffculty,
        enjoyment: e.enjoyment,
      },
    ]);
    updateDatabase();
    e = "";
  };

  const sortInputList = (e) => {
    console.log("ear read: ", user.EAR);
    setInputList(sortedTasks(inputList, getDrowsiness(user.EAR)));
    refresh(e);
  };

  const refresh = (e) => {
    e.preventDefault();
    updateDatabase();
    e = "";
  };

  //handleCompleteClick

  if (!currentUser) {
    return <Redirect to="/login" />;
  } else {
    if (loading) {
      return "the time turner team will get back to you shortly";
    } else {
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
            {
              <button
                style={{
                  backgroundColor: "#7c9c96",
                  border: "none",
                  borderRadius: 5,
                  color: "white",
                  padding: "1vw 2vw",
                  textAlign: "center",
                  textdecoration: "none",
                  display: "inlineblock",
                  marginLeft: "71.7vw",
                  cursor: "default",
                  marginTop: "0.3vw",
                  fontsize: "16px",
                }}
                onClick={handleLogoutClick}
              >
                Log Out
              </button>
            }

            <Typography
              variant="h1"
              fontSize="title"
              component="div"
              gutterBottom
            >
              {user.name}'s To Do List
            </Typography>
            <Typography
              variant="h2"
              fontSize="title"
              component="div"
              gutterBottom
            >
              {currentDate}
            </Typography>
          </ThemeProvider>
        );
      }
      return (
        <ThemeProvider theme={theme}>
          <div title="Taskpage"></div>
          <Box
            component="main"
            sx={{
              backgroundColor: "bg",
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Paper
              sx={{
                mx: "auto",
                elevation: 1,
                bgcolor: "background",
                width: "80%",
                mt: 3,
              }}
            >
              <Title />
            </Paper>

            <Paper
              sx={{
                mx: "auto",
                elevation: 1,
                bgcolor: "background",
                width: "80%",
                height: "10%",
                mt: 6,
              }}
            >
              <Grid container spacing={4}>
                <Grid item xs={3}>
                  <Typography variant="h3">
                    Energy Level: {(getEnergyLevel(user.EAR) * 10).toFixed(2)}%
                  </Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="h3">
                    Current Task: {inputList[0].taskName}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  {
                    <button
                      style={{
                        backgroundColor: "#7c9c96",
                        border: "none",
                        borderRadius: 5,
                        color: "white",
                        padding: "1vw 4vw",
                        textAlign: "center",
                        textdecoration: "none",
                        display: "inlineblock",
                        cursor: "default",
                        marginLeft: "15.3vw",
                        marginTop: "-30%",
                        fontsize: "16px",
                      }}
                      onClick={sortInputList}
                    >
                      Sort
                    </button>
                  }
                </Grid>
                {/* <Grid item xs={2}> */}
                {/* {
                  <button
                    style={{
                      backgroundColor: "#7c9c96",
                      border: "none",
                      borderRadius: 5,
                      color: "white",
                      padding: "1vw 4vw",
                      textAlign: "center",
                      textdecoration: "none",
                      display: "inlineblock",
                      cursor: "default",
                      marginLeft: "-0.5vw",
                      marginTop: "-2vw",
                      ontsize: "16px",
                    }}
                    onClick={refresh}
                  >
                    Refresh
                  </button>
                } */}
                {/* </Grid> */}
              </Grid>
            </Paper>

            {inputList.map((x, i) => {
              return (
                <div className="box">
                  <TextField
                    sx={{ color: "#535E4B", marginLeft: "1vw" }}
                    margin="normal"
                    required
                    sx={{ bgcolor: "background", borderRadius: 1 }}
                    name="taskName"
                    placeholder="Task Name"
                    value={x.taskName}
                    onChange={(e) => handleInputChange(e, i)}
                  />

                  <FormControl
                    variant="standard"
                    sx={{
                      borderRadius: 0.5,
                      minWidth: 200,
                      mt: 2,
                      marginLeft: "0.5vw",
                      backgroundColor: "background",
                      height: "55px",
                    }}
                  >
                    <InputLabel
                      sx={{ color: "#535E4B", marginLeft: "1vw" }}
                      id="duration"
                    >
                      Duration (hours)
                    </InputLabel>
                    <Select
                      margin="normal"
                      required
                      sx={{ borderRadius: 1, height: "55px" }}
                      width="30%"
                      name="duration"
                      value={x.duration}
                      labelId="duration"
                      id="select"
                      onChange={(e) => handleInputChange(e, i)}
                    >
                      {hours.map((hour) => (
                        <MenuItem
                          key={hour}
                          value={hour}
                          sx={{ bgcolor: "background" }}
                        >
                          {hour}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl
                    variant="standard"
                    sx={{
                      borderRadius: 1,
                      marginLeft: "0.5vw",
                      minWidth: 200,
                      mt: 2,
                      backgroundColor: "background",
                      height: "55px",
                    }}
                  >
                    <InputLabel
                      sx={{ color: "#535E4B", marginLeft: "1vw" }}
                      id="difficulty"
                    >
                      Difficulty{" "}
                    </InputLabel>
                    <Select
                      margin="normal"
                      required
                      sx={{ borderRadius: 1, height: "55px" }}
                      width="30%"
                      name="difficulty"
                      value={x.difficulty}
                      onChange={(e) => handleInputChange(e, i)}
                    >
                      {oneToTen.map((num) => (
                        <MenuItem
                          key={num}
                          value={num}
                          sx={{ bgcolor: "background" }}
                        >
                          {num}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl
                    variant="standard"
                    sx={{
                      borderRadius: 1,
                      marginLeft: "0.5vw",
                      minWidth: 200,
                      mt: 2,
                      backgroundColor: "background",
                      height: "55px",
                    }}
                  >
                    <InputLabel
                      sx={{ color: "#535E4B", marginLeft: "1vw" }}
                      id="enjoyment"
                    >
                      Enjoyment{" "}
                    </InputLabel>
                    <Select
                      margin="normal"
                      required
                      sx={{ height: "55px", borderRadius: 1 }}
                      width="30%"
                      name="enjoyment"
                      value={x.enjoyment}
                      onChange={(e) => handleInputChange(e, i)}
                    >
                      {oneToTen.map((num) => (
                        <MenuItem
                          key={num}
                          value={num}
                          sx={{ bgcolor: "background" }}
                        >
                          {num}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {/* Remove function  */}
                  {inputList.length !== 0 && (
                    <button
                      style={{
                        backgroundColor: "#7c9c96",
                        border: "none",
                        borderRadius: 5,
                        color: "white",
                        padding: "0.2vw 0.5vw",
                        textAlign: "center",
                        textdecoration: "none",
                        display: "inlineblock",
                        marginLeft: "0.5vw",
                        marginTop: "1.5vw",
                        cursor: "default",
                        marginTop: "0.1vw",
                        fontSize: "23px",
                      }}
                      onClick={() => handleRemoveClick(i)}
                    >
                      x
                    </button>
                  )}

                  {/* Add button  */}
                  {inputList.length - 1 === i && (
                    <button
                      style={{
                        backgroundColor: "#7c9c96",
                        border: "none",
                        borderRadius: 5,
                        color: "white",
                        padding: "0.2vw 0.5vw",
                        textAlign: "center",
                        textdecoration: "none",
                        display: "inlineblock",
                        marginLeft: "0.5vw",
                        marginTop: "1.5vw",
                        cursor: "default",
                        fontSize: "23px",
                      }}
                      onClick={handleAddClick}
                    >
                      +
                    </button>
                  )}

                  {/* complete button  */}
                  {inputList.length !== 0 && inputList.length - 1 !== i && (
                    <button
                      style={{
                        backgroundColor: "#7c9c96",
                        border: "none",
                        borderRadius: 5,
                        color: "white",
                        padding: "0.2vw 0.5vw",
                        textAlign: "center",
                        textdecoration: "none",
                        display: "inlineblock",
                        marginLeft: "0.5vw",
                        cursor: "default",
                        marginTop: "1.5vw",
                        fontSize: "23px",
                      }}
                      onClick={() => handleRemoveClick(i)}
                    >
                      ✓
                    </button>
                  )}
                </div>
              );
            })}
          </Box>
        </ThemeProvider>
      );
    }
  }
}

export default Task;
