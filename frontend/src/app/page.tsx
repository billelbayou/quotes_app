import { createPost } from "@/lib/actions";

async function getQuotes() {
  try {
    const response = await fetch("http://localhost:5000/quotes");
    if (!response.ok) {
      throw new Error("Failed to fetch quotes");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching quotes:", error);
    return [];
  }
}

export default async function Home() {
  const quotes = await getQuotes();
  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Form Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add a New Quote</h2>
        <form action={createPost} className="space-y-4">
          <div>
            <label htmlFor="quote" className="block text-gray-700 font-medium">
              Write your quote:
            </label>
            <textarea
              name="quote"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Enter your quote..."
            />
          </div>
          <div>
            <label htmlFor="author" className="block text-gray-700 font-medium">
              Your name:
            </label>
            <input
              type="text"
              name="author"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name (optional)"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Submit Quote
          </button>
        </form>
      </div>

      {/* Quotes List */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Quotes</h2>
        <ul className="space-y-4">
          {quotes.length > 0 ? (
            quotes.map(
              (quote: { id: string; quote: string; author: string }) => (
                <li
                  key={quote.id}
                  className="p-4 border-l-4 border-blue-500 bg-gray-50 rounded-lg"
                >
                  <p className="text-lg font-medium text-gray-800">
                    &quot;{quote.quote}&quot;
                  </p>
                  <p className="text-gray-600 text-sm mt-1">
                    - {quote.author || "Unknown"}
                  </p>
                </li>
              )
            )
          ) : (
            <p className="text-gray-500">No quotes available. Add one above!</p>
          )}
        </ul>
      </div>
    </div>
  );
}
