const express = require("express");
const router = express.Router();
const {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
} = require("../controllers/goalController");

const { protect } = require("../middleware/authMiddleware");
//Chaning them for a cleaner code
router.route("/").get(protect, getGoals).post(protect, setGoals);
router.route("/:id").put(protect, updateGoals).delete(protect, deleteGoals);

//Normal way of setting the routes
// router.get(`/`, getGoals);

// router.post(`/`, setGoals);

// router.put(`/:id`, updateGoals);

// router.delete(`/:id`, deleteGoals);

module.exports = router;
