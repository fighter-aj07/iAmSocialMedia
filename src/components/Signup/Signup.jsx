import "./signup.css";
import {useState} from "react";
import login from "../../Database/login";
import { Link } from "react-router-dom";
import bcrypt from "bcryptjs";
import CircularProgress from '@mui/material/CircularProgress';

export default function Signup() {
    const [email, setEmail] = useState("");
    const [fetching, setFetching] = useState(false);
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [isError, setisError] = useState(false);
    const [error, setError] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const handleClick = (e) => {
        setFetching(true);
        e.preventDefault();
        if(email && password && username && passwordAgain){
            
            if(validateEmail(email)){
                if(password === passwordAgain){
                    setError("");
                    setisError(false);
                    const hashedPassword = bcrypt.hashSync(password, "$2a$10$CwTycUXWue0Thq9StjUM0u");
                    //if email or username already exists in database then show error
                    const user = login.find((user) => user.email === email);
                    if(user){
                        setError("Email already exists");
                        setisError(true);
                    }
                    else{
                    //hash password and save to database
                    console.log(hashedPassword);
                    //save to database
                    //insert into login object
                    //generate userid from time
                    const userid = (Date.now() + Math.random()).toString().split(".")[0];

                    console.log(userid, username, email, hashedPassword);

                    login.push({
                        "userid": userid,
                        "username": username,
                        "password": hashedPassword,
                        "email": email
                    });
                    //set user to local storage
                    localStorage.setItem("user", JSON.stringify(
                        {
                            "userid": userid,
                        }
                    ));

                    window.location.replace("/profile");
                }
            }
                else{
                    setError("Passwords do not match");
                    setisError(true);
                }
            }
            else{
                setError("Invalid email");
                setisError(true);
            }

        }
        else if(email === "" || password === "" || username === "" || passwordAgain === ""){
            setError("Please fill in all fields");
            setisError(true);
        }
        else if(password.length < 6){
            setError("Password must be at least 6 characters");
            setisError(true);
        }

        setFetching(false);
    }

    return (
        <div className="login">
            <div className="loginWrapper">
            <div className="loginLeft">
            <h3 className="loginLogo">Sign-Up</h3>
            <span className="loginDesc">
            Connect with friends and the world around you on IamSocial.
            </span>
            </div>
            <div className="loginRight">
            <div className="loginBox">
                        <input 
                        placeholder="Username" 
                        className="loginInput" 
                        required
                        type="text"
                        onChange={(e) => {
                            setUsername(e.target.value);
                            setError("");
                        }}/>
                        <input 
                        placeholder="Email" 
                        className="loginInput"
                        required
                        type="email"
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError("");
                        }}
                        />
                        <input placeholder="Password" 
                        className="loginInput" 
                        required
                        type="password"
                        minLength="6"
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError("");
                        }}/>
                        <input placeholder="Password Again" 
                        className="loginInput" 
                        required
                        type="password"
                        minLength="6"
                        onChange={(e) => {
                            setPasswordAgain(e.target.value);
                            setError("");
                        }}/>
                        {isError && <span className="error">{error}</span>}

                        <button className="loginButton"
                        onClick={handleClick}
                        type="submit"
                        disabled={fetching}
                        >
                            {fetching ? <CircularProgress color="inherit" size="20px" /> : "Sign Up"}
                        </button>

                        <Link to="/login" style = {{textDecoration: "none",textAlign: "center"}}>
                        <button className="loginRegisterButton">
                            Log-In
                        </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}