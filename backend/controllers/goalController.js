const asyncHandler = require("express-async-handler");
const { reset } = require("nodemon");
const Goal = require("../modals/goalModel");
const User = require("../modals/userModel");

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.json(goals);
  console.log(goals);
});

const setGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  //do reserach on goal.create
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.json({ someInfo: "here" });
  res.json(goal);
});

const updateGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  //make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("user not authirzed");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedGoal);
});
const deleteGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //make sure the logged in user matches the goal user
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("user not authirzed");
  }

  await goal.remove();
  //# SECOND WAY
  //   await Goal.findByIdAndDelete(req.params.id, function (err, docs) {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log("Delete :", docs);
  //     }
  //   });

  res.json({ id: `ID:  ${req.params.id}` });
});

module.exports = {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
};
