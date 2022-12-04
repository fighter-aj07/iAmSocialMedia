const postSc = require("../models/postModel");

const getposts = async (req, res, next) => {
  const getpost = await postSc.find({});
  res.json(getpost);
};

const addpost = async (req, res, next) => {
    console.log(req.body);
    const { compname, duration, salary, position, location, userid } = req.body;
    let previousJobs;
    previousJobs = await Jobs.findOne({ compname: compname,userid:userid });
    if (previousJobs) {
      const error = new HttpError(
        "Job exists already, please add different job",
        422
      );
      return next(error);
    }
  
    const addJob = new Jobs({
      compname: compname,
      duration: duration,
      position: position,
      salary: salary,
      location: location,
      userid: userid,
    });
    try {
      await addJob.save();
    } catch (err) {
      console.log("saving error");
      const error = new HttpError(
        "Adding Job failed, please try again later.",
        500
      );
      return next(error);
    }
    // console.log(newJob)
    res.json({ job: addJob });
  };

exports.getposts = getposts;
