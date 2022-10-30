import React from "react";
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "./Questions.css";

function Contact() {
  return (
    <div style={{ marginLeft: "30%" }}>
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
                />
              </Col>

              <Col className="form-group">
                <input
                  className="form-control rounded-0"
                  id="email"
                  name="email"
                  placeholder="Email"
                  type="email"
                />
              </Col>

              <Col className="form-group">
                <input
                  className="form-control rounded-0"
                  id="number"
                  name="number"
                  placeholder="Phone-Number"
                  type="text"
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
            ></textarea>
            <br />
            <Row>
              <Col lg="12" className="form-group">
                <Button className="subbuttt" variant="primary" size="sm">
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
