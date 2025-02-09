import { createPost } from "@/lib/actions";

async function getPosts() {
  try {
    const response = await fetch("http://localhost:5000/posts");
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export default async function Home() {
  const posts = await getPosts();
  return (
    <div>
      <form action={createPost}>
        <label htmlFor="content">Write your content :</label>
        <textarea name="content" />
        <label htmlFor="author">Your name</label>
        <input type="text" name="author" />
        <input type="submit" value="Submit" />
      </form>
      <div>
        {posts.map((post: { id: string; content: string; author: string }) => (
          <div key={post.id}>
            <li>{post.content}</li>
            <li>{post.author}</li>
          </div>
        ))}
      </div>
    </div>
  );
}
