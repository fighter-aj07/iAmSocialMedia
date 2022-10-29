import "./App.css";
import Homepage from "./components/Home/Homepage";
import Profile from "./components/Profile/Profile"
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>


  );
}

export default App;
