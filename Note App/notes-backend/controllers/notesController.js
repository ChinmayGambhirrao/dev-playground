const Note = require("../models/noteModel");
const noteSchema = require("../validators/noteSchema");

// @desc Gell all note
// @route GET /api/notes
// @access Public

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find(); // This line of code will fetch all notes from MongoDB
    res.json(notes); // Sends back the array of notes
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc Create a new note
// @route POST /api/notes
// @access Public

exports.createNote = async (req, res) => {
  try {
    const parsed = noteSchema.parse(req.body); // Validate the request body using zod

    const newNote = new Note(parsed); // Create a new Note instance

    const savedNote = await newNote.save(); // Save the note to the database

    res.status(201).json(savedNote); // Return the saved note
  } catch (error) {
    if (error.name === "ZodError") {
      res.status(400).json({ errors: error.errors }); // Zod validation errors
    } else {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  }
};

// @desc Update an existing note
// @route PUT /api/notes/:id
// @access Public

exports.updateNote = async (req, res) => {
  try {
    const parsed = noteSchema.parse(req.body); // Validate updated data

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id, // The note ID from the URL
      parsed, // The validated update data
      { new: true } // Option to return the updated document
    );
    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json(updatedNote);
  } catch (error) {
    if (error.name === "ZodError") {
      res.status(400).json({ errors: error.errors });
    } else {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  }
};

// @desc Delete a note
// @route DELETE /api/notes/:id
// @access Public

exports.deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id); // Delete the note by id

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
