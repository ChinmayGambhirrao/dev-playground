const zod = require("zod");

const noteSchema = zod.object({
    title: zod.string().min(1, "Title is required"),
    content: zod.string().min(1, "Content is required"),
})

module.exports = noteSchema;