// Router setup
const router = require("express").Router();

const notesRouter = require("./notes");

// Directing router to /notes
router.use("/notes", notesRouter);

module.exports = router;
