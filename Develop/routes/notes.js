const notes = require("express").Router();
const {
  readAndAppend,
  readFromFile,
  writeToFile,
} = require("../helpers/fsUtils");
const { v4: uuidv4 } = require("uuid");

notes.get("/", (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile("./db/db.json")
  .then((data) => res.json(JSON.parse(data)));
});

notes.post("/", (req, res) => {
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
    res.error("Error adding note");
  }
});

notes.delete("/:noteId", (req, res) => {
  const noteId = parseInt(req.params.noteId);
  readFromFile("./db/db.json")
    .then((data) => res.json(JSON.parse(data)))

    .then((json) => {
      const noteUpdate = json.filter((note) => note.id === noteId);
      if (noteUpdate !== -1) {
        notes.splice(noteUpdate, 1);

        writeToFile("./db/db.json", noteUpdate).then(() => {
          res.json(`Note ${noteId} was updated`);
        });
      }
    });
});
