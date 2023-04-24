const chai = require("chai");
const sinon = require("sinon");
const mongoose = require("mongoose");

const profileController = require("../controllers/profileController");
const ProfileModel = require("../models/profileModel");

const expect = chai.expect;

describe("Profile Controller", () => {
  before(async () => {
    try {
      await mongoose.connect(
        "mongodb+srv://meetjain:meetjain@iamsocialmedia.drwlypm.mongodb.net/test-test"
      );
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

  describe("getprofiles", () => {
    it("should return an array of Profile Model object", async () => {
      const res = {
        responseJson: null,
        json(response) {
          this.responseJson = response;
          return this;
        },
      };
      try {
        await profileController.getprofiles({}, res, () => {});
      } catch (err) {
        console.log(err);
      }

      expect(res.responseJson).to.be.an("array");
      expect(res.responseJson[0]).to.be.an("object");
    });
  });

  describe("getprofile", () => {
    it("should return a Profile Model object", async () => {
      const req = {
        body: {
          userid: "testId",
          projection: null,
        },
      };
      const res = {
        statusCode: 500,
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
      try {
        await profileController.getprof(req, res, () => {});
      } catch (err) {
        console.log(err);
      }

      expect(res.statusCode).to.be.equal(200);
      expect(res.responseJson).to.be.an("array");
      expect(res.responseJson[0]).to.be.an("object");
    });
  });


  // describe('GET /profiles', () => {
  //   it('should return an array of profiles', async () => {
  //     const profiles = [{ userid: 'user1' }, { userid: 'user2' }];
  //     sinon.stub(profileSc, 'find').resolves(profiles);

  //     const res = await chai.request(app).get('/profiles');

  //     expect(res).to.have.status(200);
  //     expect(res.body).to.deep.equal(profiles);

  //     profileSc.find.restore();
  //   });
  // });

  // describe('POST /profile', () => {
  //   it('should return the details of a profile', async () => {
  //     const profile = { userid: 'user1', name: 'John Doe' };
  //     sinon.stub(profileSc, 'find').resolves(profile);

  //     const res = await chai.request(app).post('/profile').send({ userid: 'user1' });

  //     expect(res).to.have.status(200);
  //     expect(res.body).to.deep.equal(profile);

  //     profileSc.find.restore();
  //   });
  // });

  // describe('PUT /profile', () => {
  //   it('should update a profile', async () => {
  //     const update = { userid: 'user1', name: 'Jane Doe' };
  //     sinon.stub(profileSc, 'updateOne').resolves({ nModified: 1 });

  //     const res = await chai.request(app).put('/profile').send(update);

  //     expect(res).to.have.status(200);
  //     expect(res.body).to.deep.equal({ nModified: 1 });

  //     profileSc.updateOne.restore();
  //   });
  // });

  // describe('POST /profile/picture', () => {
  //   it('should update a profile picture', async () => {
  //     const file = { buffer: Buffer.from('fake-image-data') };
  //     const fileUri = getDataUri(file);
  //     const cloudimageurl = 'https://fake-cloudinary-url.com/image.jpg';
  //     sinon.stub(cloudinary.uploader, 'upload').resolves({ secure_url: cloudimageurl });
  //     sinon.stub(profileSc, 'updateOne').resolves({ nModified: 1 });

  //     const res = await chai.request(app)
  //       .post('/profile/picture')
  //       .set('Content-Type', 'multipart/form-data')
  //       .field('userid', 'user1')
  //       .attach('file', file.buffer, 'image.jpg');

  //     expect(res).to.have.status(200);
  //     expect(res.body).to.deep.equal({ nModified: 1 });

  //     cloudinary.uploader.upload.restore();
  //     profileSc.updateOne.restore();
  //   });
  // });

  after(async () => {
    try {
      await ProfileModel.deleteMany({});
      await mongoose.disconnect();
    } catch (err) {
      console.log(err);
    }
  });
});
