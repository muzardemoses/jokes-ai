import { NextResponse } from "next/server";
import { gemini15Flash, googleAI } from '@genkit-ai/googleai';
import { genkit, z } from "genkit";

const ai = genkit({
    plugins: [googleAI()],
    model: gemini15Flash,
});

// Define the joke schema
const JokeSchema = z.object({
    description: z.string(),
    punchline: z.string(),
    tone: z.enum(['funny', 'sarcastic', 'punny', 'dry']),
});

// Define the joke generator flow
const jokeGeneratorFlow = ai.defineFlow(
    {
        name: "jokeGeneratorFlow",
        inputSchema: z.string(),
        outputSchema: JokeSchema,
    },
    async (jokeSubject) => {
        // If the joke subject is empty, return a predefined joke or handle it
        if (!jokeSubject || jokeSubject.trim() === "") {
            throw new Error("Joke subject cannot be empty.");
        }

        const { output } = await ai.generate({
            model: gemini15Flash,
            prompt: `Generate a very funny joke about ${jokeSubject}. Include a punchline and make it relevant and engaging. Add a playful tone and don't generate based on previous response.`,
            output: { schema: JokeSchema },
        });

        if (!output) {
            throw new Error("Response doesn't satisfy schema.");
        }

        return output;
    }
);

// API handler
export async function POST(request: Request) {
    try {
        const { subject } = await request.json();

        // Basic validation to ensure 'subject' is a string
        if (!subject || typeof subject !== "string") {
            return NextResponse.json(
                { error: "Invalid input. 'subject' must be a string." },
                { status: 400 }
            );
        }

        // Validate subject for non-empty strings
        if (subject.trim().length === 0) {
            return NextResponse.json(
                { error: "'subject' cannot be an empty string." },
                { status: 400 }
            );
        }

        // Generate the joke based on the subject provided
        const jokeData = await jokeGeneratorFlow(subject);
        
        // Return the joke along with the tone
        return NextResponse.json(jokeData);

    } catch (error) {
        console.error("Error generating joke data:", error);

        // Enhanced error handling with specific messages
        return NextResponse.json(
            { error: `Error generating joke: ${(error as Error).message}` },
            { status: 500 }
        );
    }
}

// export const runtime = "edge";
