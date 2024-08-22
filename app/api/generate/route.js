import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const systemPrompt = `Create concise, effective flashcards following these guidelines:

Front: Clear, specific question or prompt
Back: Concise, accurate answer
Use simple language and avoid unnecessary details
Focus on one key concept per card
For definitions, put the term on front, definition on back
For processes or lists, consider using cloze deletions
Include mnemonics or memory aids when helpful
For math/science, include relevant formulas or equations
Use images, diagrams, or charts when appropriate
Create reverse cards for bidirectional learning
Organize cards into logical categories or decks
Only generate exactly 10 cards 
Aim for clarity, brevity, and memorability in each flashcard. 

Return in the following JSON format
{
    "flashcards":[{
    "front": str,
    "back": str
}]
}`;

export async function POST(req) {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  //const data = await req.json();
  const data = await req.text();
  const completion = await groq.chat.completions.create({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: data },
    ],
    model: "llama3-8b-8192",
    response_format: { type: "json_object" },
  });
  const flashcards = JSON.parse(completion.choices[0].message.content);
  return NextResponse.json(flashcards.flashcards);
}
