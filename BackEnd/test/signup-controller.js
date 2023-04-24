const { expect } = require("chai");
const sinon = require("sinon");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const LoginModel = require("../models/loginModel");
const profileSc = require("../models/profileModel");
const { signup } = require("../controllers/signupController");

describe("Signup Controller", () => {
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
  describe("signup", () => {
    let req = {
      body: {
        email: "test@test.com",
        password: "testpassword",
        userid: "testuserid",
        username: "testusername",
      },
    };
    const res = {
      statusCode: 0,
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
      req = {
        body: {
          email: "test@test.com",
          password: "testpassword",
          userid: "testuserid",
          username: "testusername",
        },
      };
      res.statusCode = 0;
      res.responseJson = null;
    });

    it("should return status code 403 and an error message if email already exists", async () => {
      const findOneStub = sinon.stub(LoginModel, "findOne");
      findOneStub.resolves({ email: req.body.email });

      await signup(req, res, () => {});
      expect(res.statusCode).to.equal(403);
      expect(res.responseJson).to.have.property("message", "Email already exists");

      findOneStub.restore();
    });

    it("should create a new user and profile if email does not exist", async () => {
      const findOneStub = sinon.stub(LoginModel, "findOne");
      findOneStub.resolves(null);

      const saveUserStub = sinon.stub(LoginModel.prototype, "save");
      saveUserStub.resolves({});

      const saveProfileStub = sinon.stub(profileSc.prototype, "save");
      saveProfileStub.resolves({});

      const hashStub = sinon.stub(bcrypt, "hash");
      hashStub.resolves("hashedpassword");

      await signup(req, res, () => {});
      expect(res.statusCode).to.equal(200);
      expect(res.responseJson).to.have.property("message", "User created successfully");

      expect(findOneStub.calledOnceWith({ email: req.body.email })).to.be.true;
      expect(saveUserStub.calledOnce).to.be.true;
      expect(saveProfileStub.calledOnce).to.be.true;
      expect(hashStub.calledOnce).to.be.true;

      findOneStub.restore();
      saveUserStub.restore();
      saveProfileStub.restore();
      hashStub.restore();
    });

    it("should return status code 500 and an error message if an error occurs", async () => {
      const findOneStub = sinon.stub(LoginModel, "findOne");
      findOneStub.rejects(new Error("DB error"));

      await signup(req, res, () => {});
      expect(res.statusCode).to.equal(500);
      expect(res.responseJson).to.have.property("message", "Server error");

      findOneStub.restore();
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
