import "./login.css";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import bcrypt from "bcryptjs";
import CircularProgress from "@mui/material/CircularProgress";
import login from "../../Database/login";
import { Link } from "react-router-dom";

export default function Login() {
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
            const hashedPassword = bcrypt.hashSync(password, "$2a$10$CwTycUXWue0Thq9StjUM0u");
            const user = login.find(
                (user) => user.email === email && user.password === hashedPassword
            );
            if (user) {
                setError("");
                setIsError(false);
                window.location.replace("/");
                localStorage.setItem("user", user.userid);
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
                        <form onSubmit={formik.handleSubmit}>
                            <input
                                placeholder="Email"
                                type="email"
                                id="email"
                                {...formik.getFieldProps("email")}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <span className="loginError">{formik.errors.email}</span>
                            )}
                            <input
                                placeholder="Password"
                                type="password"
                                id="password"
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
