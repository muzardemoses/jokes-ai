"use client"
import { useState } from "react";

// Define the Joke interface for better typing
interface Joke {
  description: string;
  punchline: string;
  tone: "funny" | "sarcastic" | "punny" | "dry";
}

export default function Home() {
  const [subject, setSubject] = useState<string>("");
  const [joke, setJoke] = useState<Joke | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Handle joke generation on form submit
  const handleJokeGeneration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim()) {
      setError("Please enter a subject!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/generateJoke", {
        method: "POST",
        body: JSON.stringify({ subject }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (response.ok) {
        setJoke(result);
      } else {
        setError(result.error || "Error generating joke. Try again.");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError("Error generating joke. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)] flex flex-col items-center justify-center bg-black text-white p-6 sm:p-10 gap-12">
      <div className="text-center flex flex-col items-center gap-4">
        <h1 className="text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500">
          Joke Generator
        </h1>
        <p className="text-lg text-gray-400 mt-2">Enter a subject, and let&apos;s get a joke!</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          width="120"
          height="120"
          fill="none"
          stroke="none"
        >
          <circle cx="50" cy="50" r="45" fill="yellow" stroke="black" stroke-width="2" />
          <circle cx="35" cy="40" r="5" fill="black" />
          <circle cx="65" cy="40" r="5" fill="black" />
          <path
            d="M 30 55 Q 50 75, 70 55"
            stroke="black"
            stroke-width="4"
            fill="transparent"
            stroke-linecap="round"
          />
          <path
            d="M 25 45 Q 50 65, 75 45"
            stroke="black"
            stroke-width="3"
            fill="transparent"
            stroke-linecap="round"
          />
        </svg>
      </div>

      <form
        onSubmit={handleJokeGeneration}
        className="flex flex-col items-center gap-8 w-full max-w-lg bg-gray-800 p-6 rounded-lg shadow-xl"
      >
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Enter a subject for the joke"
          className="p-4 w-full rounded-lg border-2 border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="p-4 bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-lg w-full hover:bg-gradient-to-l hover:from-pink-600 hover:to-blue-600 focus:ring-2 focus:ring-pink-500"
        >
          {loading ? "Generating..." : "Generate Joke"}
        </button>
      </form>

      {error && <p className="text-red-400 text-sm mt-4">{error}</p>}

      {joke && (
        <div className="mt-8 text-center max-w-lg p-6 rounded-lg shadow-xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500">
          <h2 className="text-2xl font-semibold text-white">Your Joke:</h2>
          <p className="text-lg text-gray-200 mt-2">{joke.description}</p>
          <p className="text-3xl font-bold text-yellow-300 mt-4">{joke.punchline}</p>
          <p className="mt-2 text-sm text-black">Tone: {joke.tone}</p>
        </div>

      )}
    </div>
  );
}
