import React, { useEffect, useState } from "react";
import api from "../services/api";
import NoteCard from "../components/NoteCard";
import NoteForm from "../components/NoteForm";

const Home = () => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const res = await api.get("/notes");
      setNotes(res.data);
    } catch (error) {
      console.error("Failed to fetch notes", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">My Notes</h1>

      <NoteForm onNoteCreated={fetchNotes} />

      {notes.length === 0 ? (
        <p className="text-gray-500">No notes found. Try adding one!</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
