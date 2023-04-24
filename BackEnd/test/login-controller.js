const { expect } = require("chai");
const mongoose = require("mongoose");
const sinon = require("sinon");
const bcrypt = require("bcrypt");

const LoginModel = require("../models/loginModel");
const loginController = require("../controllers/loginController");

describe("Login Controller", () => {
  before(async () => {
    try {
      await mongoose.connect(
        "mongodb+srv://meetjain:meetjain@iamsocialmedia.drwlypm.mongodb.net/test-test"
      );
      const userLogin = new LoginModel({
        _id: "5c0f66b979af55031b34728a",
        userid: "testId",
        username: "testName",
        password: "12345678",
        email: "test@test.com",
      });
      await userLogin.save();
    } catch (err) {
      console.log(err);
    }
  });

  describe("login", async () => {
    let req = {
      body: {
        email: "",
        password: "",
      },
    };

    const res = {
      statusCode: 1351,
      responseJson: null,
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(response) {
        this.responseJson = response;
        return this;
      },
    };

    afterEach(() => {
      req.body.email = "";
      req.body.password = "";
      res.status(1351);
      res.json(null);
    });

    it("should return userid of null with an error message of Incorrect password or email because password did not match", async () => {
        req.body.email = "test@test.com";
        req.body.password = "123456789";
        sinon.stub(bcrypt, "compare").returns(true);
        try {
          await loginController.login(req, res, () => {});
        } catch (err) {
          console.log(err);
        }

        bcrypt.compare.restore();
        expect(res.responseJson).have.property("userid", "testId");
      });

    it("should return userid of null with an error message of Incorrect password or email because password did not match", async () => {
      req.body.email = "test@test.com";
      req.body.password = "123456789";
      try {
        await loginController.login(req, res, () => {});
      } catch (err) {
        console.log(err);
      }
      expect(res.responseJson).have.property("userid", null);
      expect(res.responseJson).have.property(
        "error",
        "Incorrect password or email"
      );
    });

    it("should return userid of null with an error message of Incorrect password or email", async () => {
      try {
        await loginController.login(req, res, () => {});
      } catch (err) {
        console.log(err);
      }
      expect(res.responseJson).have.property("userid", null);
      expect(res.responseJson).have.property(
        "error",
        "Incorrect password or email"
      );
    });
  });

  after(async () => {
    try {
      await LoginModel.deleteMany({});
      await mongoose.disconnect();
    } catch (err) {
      console.log(err);
    }
  });
});
