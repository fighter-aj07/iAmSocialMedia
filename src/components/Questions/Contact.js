import React from "react";
import {useState} from 'react';
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "./Questions.css";

function Contact() {
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const handleName = (e) => {
    setName(e.target.value);
  }
  const handleEmail = (e) => {
    setEmail(e.target.value)
  }
  const handleMessage = (e) => {
    setMessage(e.target.value)
  }
  const handleNumber = (e) => {
    setNumber(e.target.value)
  }
  const submitHandler = () => {
     if(name.length > 20 || !email.includes('@') || message == '' || number.length > 10) {
       console.log('ERROR')
     }
     else {
      setEmail('');
      setMessage('');
      setName('');
      setNumber('');
     }
  }
  return (
    <div style={{ marginLeft: "27%" }}>
      <Row className="mb-3 mt-3">
        <Col lg="8">
          <h1 className="display-8 mb-4">Contact US</h1>
        </Col>
      </Row>

      <Col className="sec_sp">
        <Col lg="5" className="mb-5">
          <h3 className="color_sec py-4">Ask Your Query</h3>
          <h5>
            "Hi Guys welcome to Iamsocial If you find any problems or bugs feel
            free to contact us as we are always open to take your suggestions."
          </h5>
          <br />
        </Col>

        <Col lg="7" className="d-flex align-items-center">
          <form className="conatct_form w-100">
            <Col>
              <Col className="form-group">
                <input
                  className="form-control rounded-0"
                  id="name"
                  name="name"
                  placeholder="Name"
                  type="Name"
                  onChange={handleName}
                  value={name}
                />
              </Col>

              <Col className="form-group">
                <input
                  className="form-control rounded-0"
                  id="email"
                  name="email"
                  placeholder="Email"
                  type="email"
                  onChange={handleEmail}
                  value={email}
                />
              </Col>

              <Col className="form-group">
                <input
                  className="form-control rounded-0"
                  id="number"
                  name="number"
                  placeholder="Phone-Number"
                  type="text"
                  onChange={handleNumber}
                  value={number}
                />
              </Col>
            </Col>
            <textarea
              className="form-control rounded-0"
              id="message"
              name="message"
              placeholder="Message"
              rows="5"
              style={{ resize: "none" }}
              onChange={handleMessage}
              value={message}
            ></textarea>
            <br />
            <Row>
              <Col lg="12" className="form-group">
                <Button className="subbuttt" variant="primary" size="sm" onClick={submitHandler}>
                  Submit
                </Button>
              </Col>
            </Row>
          </form>
        </Col>
      </Col>
    </div>
  );
}

export default Contact;
