import React from "react";

const NoteCard = ({ note }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all duration-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{note.title}</h2>
      <p className="text-gray-600">{note.content}</p>
    </div>
  );
};

export default NoteCard;
