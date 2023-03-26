import "./login.css";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CircularProgress from "@mui/material/CircularProgress";
import bcrypt from "bcryptjs";
import { Link } from "react-router-dom";
import {useRequest} from "../../hooks/request-hook.js";

export default function Login() {
    const { sendRequest } = useRequest();
    const [fetching, setFetching] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState("");

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email address")
                .required("Required"),
            password: Yup.string()
                .min(6, "Password must be at least 6 characters long")
                .required("Required"),
        }),
        onSubmit: async (values) => {
            setFetching(true);
            const { email, password } = values;
            const response = await sendRequest(
                "http://localhost:5002/login",
                "POST",
                JSON.stringify({
                    email,
                    password,
                }),
                {
                    "Content-Type": "application/json",
                }
            );
            console.log(response);
            const user = response.userid;
            if (user) {
                setError("");
                setIsError(false);
                window.location.replace("/");
                localStorage.setItem("user", user);
            } else {
                setError("Invalid email or password");
                setIsError(true);
            }
            setFetching(false);
        },
    });

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
                        <form onSubmit={formik.handleSubmit} className="loginForm">
                            <input
                                placeholder="Email"
                                type="email"
                                id="email"
                                className="loginInput"
                                {...formik.getFieldProps("email")}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <span className="loginError">{formik.errors.email}</span>
                            )}
                            <input
                                placeholder="Password"
                                type="password"
                                id="password"
                                className="loginInput"
                                {...formik.getFieldProps("password")}
                            />
                            {formik.touched.password && formik.errors.password && (
                                <span className="loginError">{formik.errors.password}</span>
                            )}
                            {isError && <span className="loginError">{error}</span>}
                            <span className="loginForgot">Forgot Password?</span>
                            <button
                                className="loginButton"
                                type="submit"
                                disabled={fetching}
                            >
                                {fetching ? (
                                    <CircularProgress color="inherit" size="20px" />
                                ) : (
                                    "Log In"
                                )}
                            </button>
                        </form>
                        <Link
                            to="/signup"
                            style={{ textDecoration: "none", textAlign: "center" }}
                        >
                            <button className="loginRegisterButton">Sign-Up</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
