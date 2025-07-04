import React, { useState } from "react";
import SideBar from "../SideBar";

const checklistItems = [
  "Research the company",
  "Review the job description",
  "Practice common interview questions",
  "Prepare your own questions",
  "Print copies of your resume",
  "Pick your outfit",
  "Confirm interview time and location",
];

const flashcards = [
  { question: "Tell me about yourself.", answer: "Summarize your experience and what you're excited about in this role." },
  { question: "What is your greatest strength?", answer: "Pick a strength relevant to the job and back it up with an example." },
  { question: "Why do you want to work here?", answer: "Show you've done your research and connect it to your goals." },
];

export default function Level3InterviewPrep() {
  const [checked, setChecked] = useState([]);
  const [currentCard, setCurrentCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const toggleItem = (item) => {
    setChecked((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const nextCard = () => {
    setShowAnswer(false);
    setCurrentCard((prev) => (prev + 1) % flashcards.length);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <SideBar />
      <main className="flex-grow p-8 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Interview Preparation</h1>

        {/* Checklist */}
        <div className="w-full max-w-xl mb-12">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Checklist</h2>
          <ul className="space-y-3">
            {checklistItems.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={checked.includes(item)}
                  onChange={() => toggleItem(item)}
                  className="w-5 h-5"
                />
                <span className={checked.includes(item) ? "line-through text-gray-400" : "text-gray-800 dark:text-gray-100"}>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Flashcards */}
        <div className="w-full max-w-lg p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Flashcard</h2>
          <p className="text-lg text-gray-900 dark:text-gray-100 mb-4">{flashcards[currentCard].question}</p>
          {showAnswer && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{flashcards[currentCard].answer}</p>
          )}
          <div className="flex gap-4">
            <button
              onClick={() => setShowAnswer((prev) => !prev)}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              {showAnswer ? "Hide Answer" : "Show Answer"}
            </button>
            <button
              onClick={nextCard}
              className="px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600"
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </div>
  );
} 