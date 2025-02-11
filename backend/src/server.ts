import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import prisma from "./db";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Create a new post
app.post("/quotes", async (req, res) => {
  try {
    const { quote, author } = req.body;
    const newQuote = await prisma.quote.create({
      data: { quote, author },
    });
    res.json(newQuote);
  } catch (error) {
    res.status(500).json({ error: "Failed to create quote" });
  }
});

// Get all posts
app.get("/quotes", async (req, res) => {
  try {
    const quotes = await prisma.quote.findMany();
    res.type("json");
    res.send(quotes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch quotes" });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
