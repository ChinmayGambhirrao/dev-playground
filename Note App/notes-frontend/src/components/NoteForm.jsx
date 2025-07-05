// src/components/NoteForm.jsx
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import api from "../services/api";

// Zod schema for validation
const noteSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});

const NoteForm = ({ onNoteCreated }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(noteSchema),
  });

  const onSubmit = async (data) => {
    try {
      await api.post("/notes", data);
      onNoteCreated(); // Trigger parent refresh
      reset(); // Clear form
    } catch (err) {
      console.error("Error creating note", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded-xl shadow-md mb-8 space-y-4"
    >
      <h2 className="text-xl font-semibold text-gray-800">Create a New Note</h2>

      <div>
        <input
          type="text"
          placeholder="Title"
          {...register("title")}
          className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.title && (
          <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <textarea
          placeholder="Content"
          {...register("content")}
          rows={4}
          className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.content && (
          <p className="text-sm text-red-500 mt-1">{errors.content.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all"
      >
        {isSubmitting ? "Saving..." : "Add Note"}
      </button>
    </form>
  );
};

export default NoteForm;
