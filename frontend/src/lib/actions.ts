"use server";

import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
  const quote = formData.get("quote");
  const author = formData.get("author");
  try {
    const response = await fetch("http://localhost:5000/quotes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quote, author }),
    });

    if (!response.ok) {
      throw new Error("Failed to create quote");
    }
    revalidatePath("/");
    return await response.json();
  } catch (error) {
    console.error("Error creating quote:", error);
    return null;
  }
}
