const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authentication, authorization } = require("../middlewares/auth");
const {
  getNotes,
  addNotes,
  updateNotes,
  deleteNotes
} = require("../controllers/notesController");

//==============================USER APIS======================================

router.post("/register", userController.regiserUser);
router.post("/login", userController.login);
router.get("/getNotes", authentication, getNotes);
router.post("/save", authentication, authorization, addNotes);
router.delete("/delete", authentication, authorization, deleteNotes);
router.put("/update", authentication, authorization, updateNotes);

module.exports = router;
