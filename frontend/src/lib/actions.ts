"use server";

import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
  const content = formData.get("content");
  const author = formData.get("author");
  try {
    const response = await fetch("http://localhost:5000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content, author }),
    });

    if (!response.ok) {
      throw new Error("Failed to create post");
    }
    revalidatePath("/");
    return await response.json();
  } catch (error) {
    console.error("Error creating post:", error);
    return null;
  }
}
