import "./App.css";
import Homepage from "./components/Home/Homepage";
import Profile from "./components/Profile/Profile";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    
    <Router>
      <Routes>
      //if we have userid in local storage then we will redirect to homepage else we will redirect to login page
        // if we have userid in local storage then we will redirect to homepage else we will redirect to login page
        <Route path="/" element={localStorage.getItem("user") ? <Homepage /> : <Navigate to="/login" />}/>
        //if we have userid in local storage then we will redirect to profile page else we will redirect to login page
        <Route path="/profile" element={localStorage.getItem("user") ? <Profile /> : <Navigate to="/login" />}/>
        <Route path="/login" element={localStorage.getItem("user") ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={localStorage.getItem("user") ? <Navigate to="/" /> : <Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
