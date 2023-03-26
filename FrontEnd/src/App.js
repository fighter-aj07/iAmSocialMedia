import "./App.css";
import Homepage from "./components/Home/Homepage";
import Profile from "./components/Profile/Profile";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Questions from "./components/Questions/Questions";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Timeline from "./components/Timeline/Timeline";
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            localStorage.getItem("user") ? (
              <Homepage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/profile/:useridpr"
          element={
            localStorage.getItem("user") ? (
              <Profile />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/timeline"
          element={
            localStorage.getItem("user") ? (
              <Timeline />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={
            localStorage.getItem("user") ? <Navigate to="/" /> : <Login />
          }
        />
        <Route
          path="/signup"
          element={
            localStorage.getItem("user") ? <Navigate to="/" /> : <Signup />
          }
        />
        <Route
          path="/questions"
          element={
            localStorage.getItem("user") ? (
              <Questions />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
