import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext.js";
import { Redirect } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/system";
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

    window.location.href = "/";
  };
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "100%" }}>
        <Typography variant="h1" fontSize="title" component="div" gutterBottom>
          {props.name}'s To Do List
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
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [inputList, setInputList] = useState([{ taskName: "", duration: "" }]);
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
    await setDoc(doc(db, "users", currentUser.email), {
      tasks: [
        {
          list: inputList,
        },
      ],
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
    setInputList([...inputList, { taskName: "e.taskName", duration: "e.duration" }]);
    updateDatabase();
    e="";
  };

  //handleCompleteClick

  if (!currentUser) {
    return <Redirect to="/Signup" />;
  } else {
    if (user) {
      return (
        <ThemeProvider theme={theme}>
          <Box sx={{ bgcolor: "background", width: "100%" }}>
            <div className="App">
              <Title sx={{ mt: 5, height: "10%" }} name={user.name} />
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
    } else {
      return "loading";
    }
  }
}

export default Task;
