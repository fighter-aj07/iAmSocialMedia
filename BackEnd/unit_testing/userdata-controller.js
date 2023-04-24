const chai = require("chai");
const userdataController = require("../controllers/userdataController");
const LoginModel = require("../models/loginModel");
const ProfileModel = require("../models/profileModel");
const mongoose = require("mongoose");

const expect = chai.expect;

describe("Userdata Controller", function () {
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
      const userprofile = new ProfileModel({
        _id: "5c0f66b979af55031b34728a",
        userid: "testId",
        name: "testName",
        city: "testCity",
        from: "testFrom",
        dob: "1351-01-01",
        relationship: "testingRelationship",
        profilePicture: "testProfilePicture",
      });
      await userprofile.save();
    } catch (err) {
      console.log(err);
    }
  });

  describe("getdetails", function () {
    let req = {
      body: {
        userid: "",
      },
    };

    const res = {
      responseJson: null,
      json(response) {
        this.responseJson = response;
        return this;
      },
    };

    afterEach(() => {
      req = {
        body: {
          userid: "",
        },
      };
      res.json(null);
    });

    it("should return an array of Profile Model object", async () => {
      req.body.userid = "notTestId";

      try {
        await userdataController.getdetails(req, res, () => {});
      } catch (err) {
        console.log(err);
      }
      expect(res.responseJson).to.be.an("array");
      expect(res.responseJson.length).to.greaterThan(0);
      expect(res.responseJson[0].userid).to.equal("testId");
    });
  });

  after(async () => {
    try {
      await LoginModel.deleteMany({});
      await ProfileModel.deleteMany({});
      await mongoose.disconnect();
    } catch (err) {
      console.log(err);
    }
  });
});
