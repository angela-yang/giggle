import React from 'react';
import { useNavigate } from 'react-router-dom';

const levels = [
  { id: 1, name: "Level 1", label: "Find a Job", color: "bg-sky-700" },
  { id: 2, name: "Level 2", label: "Organize Jobs", color: "bg-sky-800" },
  { id: 3, name: "Level 3", label: "Interview Prep", color: "bg-sky-900" },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div 
        className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center overflow-hidden relative" 
        style={{ backgroundImage: "url('/images/bubble.jpg')" }}
    >
        <h1 className="text-5xl font-extrabold text-sky-800 mb-4">Giggle Job Search</h1>
        <p className="text-xl text-sky-700 mb-12 text-center px-4 max-w-lg">
            Embark on a bubbly adventure to land your next job! Complete levels to succeed at your dream gig.
        </p>

        <div className="flex flex-wrap justify-center gap-10">
            {levels.map((level) => (
            <div
                key={level.id}
                className={`w-40 h-40 ${level.color} rounded-full flex flex-col items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 cursor-pointer`}
                onClick={() => navigate(`/level/${level.id}`)}
            >
                <span className="text-white text-xl font-bold">{level.name}</span>
                <span className="text-white text-sm mt-1">{level.label}</span>
            </div>
            ))}
        </div>
    </div>
  );
}