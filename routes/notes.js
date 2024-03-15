const router = require("express").Router();
const { readAndAppend, readFromFile, writeToFile } = require("../helpers/fsUtils");
const { v4: uuidv4 } = require("uuid");

router.get("/", (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile("./db/db.json")
  .then((data) => res.json(JSON.parse(data)));
});

router.post("/", (req, res) => {
  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, "./db/db.json");
    res.json("Note added successfully");
  } else {
    res.status(500).send("Error adding note");
  }
});

router.delete("/:noteId", (req, res) => {
  const noteId = req.params.noteId;
  console.log(noteId)
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))

    .then((json) => {
      const noteUpdate = json.filter((note) => note.id !== noteId);
      console.log(noteUpdate)
      if (noteUpdate) {

        writeToFile("./db/db.json", noteUpdate)
        res.json(`Note ${noteId} was updated`);
      }
    });
});

module.exports = router;