// What is timestamps? if timestamps: true automatically adds createdAt and updatedAt fields

const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
}, {timestamps: true});

module.exports = mongoose.model("Note", noteSchema);
