import "./signup.css";
import {useState} from "react";
import bcrypt from "bcryptjs";
import {useRequest} from "../../hooks/request-hook.js";
import CircularProgress from '@mui/material/CircularProgress';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from "react-router-dom";
const SignupSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    passwordAgain: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Password confirmation is required"),
});

export default function Signup() {
    const { sendRequest } = useRequest();
    const [fetching, setFetching] = useState(false);
    const handleClick = async (values) => {
        setFetching(true);
        try {
            const { username, email, password } = values;
            const hashedPassword = await bcrypt.hash(password, 10);
            //if email or username already exists in database then show error
            //post req to backend
            const userid = (Date.now() + Math.random()).toString().split(".")[0];
            const responseData = await sendRequest(
                "http://localhost:5002/signup",
                "POST",
                JSON.stringify({
                    username,
                    email,
                    password: hashedPassword,
                    userid,
                }),
                {
                    "Content-Type": "application/json",
                },
            );
            if (responseData) {
                window.location.replace("/login");
            }
        } catch (error) {
            console.error(error);
            alert("Invalid Credentials");
        }
        setFetching(false);
    };

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
                        <Formik
                            initialValues={{
                                username: "",
                                email: "",
                                password: "",
                                passwordAgain: "",
                            }}
                            validationSchema={SignupSchema}
                            onSubmit={(values, { setSubmitting }) => {
                                setSubmitting(true);
                                handleClick(values);
                                setSubmitting(false);
                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form className="loginForm">
                                    <Field
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        className="loginInput"
                                    />
                                    <ErrorMessage name="username">
                                        {(msg) => <span className="error">{msg}</span>}
                                    </ErrorMessage>
                                    <Field
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        className="loginInput"
                                    />
                                    <ErrorMessage name="email">
                                        {(msg) => <span className="error">{msg}</span>}
                                    </ErrorMessage>
                                    <Field
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        className="loginInput"
                                    />
                                    <ErrorMessage name="password">
                                        {(msg) => <span className="error">{msg}</span>}
                                    </ErrorMessage>
                                    <Field
                                        type="password"
                                        name="passwordAgain"
                                        placeholder="Confirm Password"
                                        className="loginInput"
                                    />
                                    <ErrorMessage name="passwordAgain">
                                        {(msg) => <span className="error">{msg}</span>}
                                    </ErrorMessage>
                                    <button
                                        type="submit"
                                        className="loginButton"
                                        disabled={isSubmitting}
                                    >
                                        {fetching ? (
                                            <CircularProgress color="inherit" size="20px" />
                                        ) : (
                                            "Sign Up"
                                        )}
                                    </button>
                                    <Link to="/login">
                                        <button className="loginRegisterButton">
                                            Log into Account
                                        </button>
                                    </Link>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
}
