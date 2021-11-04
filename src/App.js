import './App.css';
import '@mui/material';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Task from './pages/Task'
// import Task from "./pages/Task"

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route exact path="/Signup" component={Signup}/>
          <Route exact path="/Task" component={Task}/> 
        </Switch>
      </Router>
    </div>
  );
}

export default App;
