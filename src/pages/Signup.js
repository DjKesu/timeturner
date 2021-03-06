import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
//firebase stuff
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { getFirestore, collection, setDoc, doc } from "firebase/firestore";
//import state things
import { useState } from "react";
import { getAuth } from "firebase/auth";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide() {
  const auth = getAuth();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    setError("");
    setLoading(true);
    event.preventDefault();
    try {
      const data = new FormData(event.currentTarget);

      await signup(auth, data.get("email"), data.get("password"));
      await setDoc(doc(db, "users", data.get("email")), {
        name: data.get("name"),
        email: data.get("email"),
      })
        .then((docRef) => {
          console.log("Document written with ID: ");
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
          setError(error);
        });
      //redirect to "/Task"
      window.location.href = "/tasks";
    } catch (err) {
      console.log(err);
      setError("Error Signing Up: " + err);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(lake.jpeg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) => "#C1C2AD",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#535E4B" }}>
              {/* <LockOutlinedIcon /> */}
            </Avatar>
            <Typography
              component="h1"
              variant="h5"
              sx={{ m: 1, color: "#535E4B" }}
            >
              Sign Up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                sx={{ m: 1, color: "#535E4B" }}
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
              />
              <TextField
                sx={{ m: 1, color: "#535E4B" }}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                sx={{ m: 1, color: "#535E4B" }}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" />}
                sx={{ m: 1, color: "#535E4B" }}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: (t) => "#535E4B" }}
              >
                Sign Up
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
