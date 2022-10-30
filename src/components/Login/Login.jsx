import "./login.css";
import {useState} from "react";
import bcrypt from "bcryptjs";
import CircularProgress from '@mui/material/CircularProgress';
// import bcrypt from "bcryptjs";
import login  from "../../Database/login";
import { Link } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [fetching, setFetching] = useState(false);
    const [password, setPassword] = useState("");
    //is error
    const [isError, setisError] = useState(false);
    const [error, setError] = useState("");

    const handleClick = (e) => {
        setFetching(true);
        e.preventDefault();
        if(email && password){
            if(validateEmail(email)){
                const hashedPassword = bcrypt.hashSync(password, "$2a$10$CwTycUXWue0Thq9StjUM0u");
            console.log(hashedPassword);
            const user = login.find((user) => user.email === email && user.password === hashedPassword);
            if(user){
                setError("");
                setisError(false);
                window.location.replace("/");
                //set user to local storage
                localStorage.setItem("user", JSON.stringify(
                    {
                        "userid": user.userid,
                    }
                ));
            }
            else{
                setError("Invalid email or password");
                setisError(true);
            }
        }
        else{
            setError("Invalid email");
            setisError(true);
        }
        }
        setFetching(false);
    }
    //function to check email fromat and return true or false
    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">IamSocial</h3>
                    <span className="loginDesc">
                        Connect with friends and the world around you on IamSocial.
                    </span>
                </div>
                <div className="loginRight">
                    <div className="loginBox">
                        <h3 className="loginBoxTitle">Log In</h3>
                        <input placeholder="Email" 
                        type="email"
                        required
                        className="loginInput" 
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError("");
                        }}/>
                        <input placeholder="Password" 
                        type = "password"
                        required
                        minLength="6"
                        className="loginInput" 
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError("");
                        }}/>
                        {isError && <span className="loginError">{error}</span>}
                        <span className="loginForgot">Forgot Password?</span>
                        <button className="loginButton"
                        onClick={handleClick}
                        type="submit"
                        disabled={fetching}
                        >
                            {fetching ? <CircularProgress color="inherit" size="20px" /> : "Log In"}
                        </button>
                        <Link to="/signup" style = {{textDecoration: "none",textAlign: "center"}}>
                        <button className="loginRegisterButton">
                            Sign-Up
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}