const express = require("express");
const router = express.Router(); // Creates a new Router object

// Import controller functions

const {
    getNotes,
    createNote,
    updateNote,
    deleteNote
} = require("../controllers/notesController");

// Route: GET /api/notes -> Fetch all notes
router.get("/", getNotes);

// Route: POST /api/notes -> Create a new note
router.post("/", createNote);

// Route: PUT /api/notes/:id -> Update a note by its ID
router.put("/:id", updateNote);

// Route: DELETE /api/notes/:id -> Delete a note by its ID
router.delete("/:id", deleteNote);

module.exports = router;