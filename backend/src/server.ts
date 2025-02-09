import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import prisma from "./db";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Create a new post
app.post("/posts", async (req, res) => {
  try {
    const { content, author } = req.body;
    const newPost = await prisma.post.create({
      data: { content, author },
    });
    res.json(newPost);
  } catch (error) {
    res.status(500).json({ error: "Failed to create post" });
  }
});

// Get all posts
app.get("/posts", async (req, res) => {
  try {
    const posts = await prisma.post.findMany();
    res.type("json");
    res.send(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
