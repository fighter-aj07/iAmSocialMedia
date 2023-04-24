const chai = require("chai");
const sinon = require("sinon");
const postController = require("../controllers/postController");
const cloudinary = require("../utils/cloudinary");
const getDataUri = require("../utils/dataUri");
const PostModel = require("../models/postModel");
const LoginModel = require("../models/loginModel");
const mongoose = require("mongoose");
const expect = chai.expect;

describe("Post Controller", () => {
  before(async () => {
    try {
      await mongoose.connect(
        "mongodb+srv://meetjain:meetjain@iamsocialmedia.drwlypm.mongodb.net/test-test"
      );
      const userPost = new PostModel({
        _id: "5c0f66b979af55031b34728a",
        userid: "testId",
        sendName: "testName",
        time: "69:69",
        description: "I want to have a good time",
        imageUrl: "https://res.cloudinary.com",
        likes: 0,
        comments: 0,
      });
      await userPost.save();
    } catch (err) {
      console.log(err);
    }
  });
  describe("updatepostscomment", () => {
    it("should return a success", async () => {
      const req = {
        body: {
          userid: "testId",
          comment: "I am testing",
          comments: 0,
        },
      };

      const res = {
        responseJson: null,
        json(response) {
          this.responseJson = response;
          return this;
        },
      };

      try {
        await postController.updatepostscomment(req, res, () => {});
      } catch (err) {
        console.log(err);
      }

      expect(res.responseJson).to.equal("success");
    });
  });

  describe("deletePost", () => {
    let req = {
      body: {
        userid: "testId",
        postid: "5c0f66b979af55031b34728a",
      },
    };

    const res = {
      statusCode: 1351,
      responseSend: null,
      responseJson: null,
      status(code) {
        this.statusCode = code;
        return this;
      },
      send(response) {
        this.responseSend = response;
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
          userid: "",
          postid: "",
        },
      };
      res.status(1351);
      res.json(null);
    });

    it("should return an object with success as key and Post has been Removed as value", async () => {
      sinon.stub(PostModel, "findById").throws();

      try {
        await postController.deletePost(req, res, () => {});
      } catch (err) {
        console.log(err);
      }

      PostModel.findById.restore();
      expect(res.statusCode).to.equal(500);
      expect(res.responseSend).to.equal("Internal Server Error");
    });

    it("should return an object with success as key and Post has been Removed as value", async () => {
      req.body.userid = "testId";
      req.body.postid = "5c0f66b979af55031b34728b";

      try {
        await postController.deletePost(req, res, () => {});
      } catch (err) {
        console.log(err);
      }

      expect(res.statusCode).to.equal(404);
      expect(res.responseSend).to.equal("Not Found");
    });

    it("should return an object with success as key and Post has been Removed as value", async () => {
      req.body.userid = "newTestId";
      req.body.postid = "5c0f66b979af55031b34728a";

      try {
        await postController.deletePost(req, res, () => {});
      } catch (err) {
        console.log(err);
      }

      expect(res.statusCode).to.equal(401);
      expect(res.responseSend).to.equal("Not Allowed");
    });

    it("should return an object with success as key and Post has been Removed as value", async () => {
      req.body.userid = "testId";
      req.body.postid = "5c0f66b979af55031b34728a";

      try {
        await postController.deletePost(req, res, () => {});
      } catch (err) {
        console.log(err);
      }

      expect(res.responseJson).have.property(
        "Success",
        "Post has been Removed"
      );
    });
  });

  after(async () => {
    try {
      await PostModel.deleteMany({});
      await mongoose.disconnect();
    } catch (err) {
      console.log(err);
    }
  });
});

// describe("likeupdate", () => {
//   it("should call postSc.find and postSc.findByIdAndUpdate, and return the updated post", async () => {
//     const post = {
//       _id: 1,
//       likeArr: [1],
//       likes: 1,
//     };
//     const findStub = sinon.stub(postSc, "find").resolves([post]);
//     const findByIdAndUpdateStub = sinon
//       .stub(postSc, "findByIdAndUpdate")
//       .resolves(post);
//     const req = { body: { postid: 1, userid: 2 } };
//     const res = { status: sinon.stub().returns({ json: sinon.spy() }) };

//     await likeupdate(req, res);

//     expect(findStub.calledOnce).to.be.true;
//     expect(findByIdAndUpdateStub.calledOnce).to.be.true;
//     expect(res.status.calledOnceWith(200)).to.be.true;
//     expect(res.status().json.calledOnceWith(post)).to.be.true;

//     findStub.restore();
//     findByIdAndUpdateStub.restore();
//   });
// });
