import React, { useState, useMemo, useEffect, useRef } from "react";
import SideBar from "../SideBar";

const JOBS = [
  {
    id: 1,
    title: "Barista",
    company: "Some Cafe",
    type: "Part-time",
    location: "Seattle",
    description: "part-time blurb",
    applyLink: "https://google.com",
  },
  {
    id: 2,
    title: "Software Intern",
    company: "Some Tech Corp",
    type: "Internship",
    location: "San Francisco",
    description: "intern blurb",
    applyLink: "https://google.com",
  },
  {
    id: 3,
    title: "Retail Associate",
    company: "Some Store",
    type: "Full-time",
    location: "Seattle",
    description: "full-time blurb",
    applyLink: "https://google.com",
  },
];

export default function Level1FindingJob() {
  const [jobTypeFilter, setJobTypeFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("");
  const [discarded, setDiscarded] = useState([]);
  const [saved, setSaved] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedJob, setSelectedJob] = useState(null);
  const [lastAction, setLastAction] = useState(null);
  const [viewMode, setViewMode] = useState("swipe"); // "swipe" or "list"

  const cardRef = useRef(null);

  // Filtered jobs excluding discarded/saved
  const remainingJobs = useMemo(() => {
    return JOBS.filter(
      (job) =>
        !discarded.some((d) => d.id === job.id) &&
        !saved.some((s) => s.id === job.id) &&
        (jobTypeFilter === "All" || job.type === jobTypeFilter) &&
        (locationFilter.trim() === "" ||
          job.location.toLowerCase().includes(locationFilter.trim().toLowerCase()))
    );
  }, [discarded, saved, jobTypeFilter, locationFilter]);

  // Reset all
  const resetAll = () => {
    setJobTypeFilter("All");
    setLocationFilter("");
    setDiscarded([]);
    setSaved([]);
    setCurrentIndex(0);
    setSelectedJob(null);
    setLastAction(null);
    setViewMode("swipe");
  };

  // Reset piles & index on filter change (except on resetAll)
  useEffect(() => {
    setDiscarded([]);
    setSaved([]);
    setCurrentIndex(0);
    setSelectedJob(null);
    setLastAction(null);
  }, [jobTypeFilter, locationFilter]);

  const currentJob = remainingJobs[currentIndex] || null;

  // Keyboard navigation & actions
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!currentJob && !selectedJob) return;

      if (selectedJob) {
        // Popup open
        if (e.key === "ArrowDown" || e.key === "Escape") {
          setSelectedJob(null);
          return;
        }
        if (e.key === "ArrowRight") {
          setSaved((prev) => [...prev, selectedJob]);
          setLastAction({ type: "save", job: selectedJob });
          setSelectedJob(null);
          setCurrentIndex((idx) => (idx + 1 < remainingJobs.length ? idx + 1 : 0));
          return;
        }
      } else {
        // No popup open
        if (e.key === "ArrowLeft") {
          setDiscarded((prev) => [...prev, currentJob]);
          setLastAction({ type: "discard", job: currentJob });
          setCurrentIndex((idx) => (idx + 1 < remainingJobs.length ? idx + 1 : 0));
          return;
        }
        if (e.key === "ArrowRight") {
          setSelectedJob(currentJob);
          return;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentJob, selectedJob, remainingJobs]);

  useEffect(() => {
    if (cardRef.current) cardRef.current.focus();
  }, [currentJob, selectedJob, viewMode]);

  // Undo last action
  const undoLastAction = () => {
    if (!lastAction) return;
    const { type, job } = lastAction;
    if (type === "save") {
      setSaved((prev) => prev.filter((j) => j.id !== job.id));
    } else if (type === "discard") {
      setDiscarded((prev) => prev.filter((j) => j.id !== job.id));
    }
    setLastAction(null);
    setSelectedJob(null);
    setCurrentIndex(0);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <SideBar />

      {/* Left discarded stack */}
      <div className="w-40 p-6 mx-20 flex flex-col items-center space-y-2">
        <h3 className="text-sm text-gray-400 mb-2">Discarded</h3>
        {discarded.map((job) => (
          <div
            key={job.id}
            className="w-28 h-16 bg-gray-300 dark:bg-gray-700 text-xs rounded-full shadow-md mb-2 p-2 truncate animate-pulse border border-gray-400 dark:border-gray-600 flex items-center justify-center"
          >
            {job.title}
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <main
        tabIndex={0}
        ref={cardRef}
        className="flex-grow flex flex-col items-center px-6 py-12 max-w-lg mx-auto focus:outline-none"
        aria-label="Job card area"
      >
        {/* Filters + View Mode toggle */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 w-full items-center justify-between">
          <div className="flex gap-4 flex-wrap w-full sm:w-auto">
            <select
              className="p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
              value={jobTypeFilter}
              onChange={(e) => setJobTypeFilter(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="Part-time">Part-time</option>
              <option value="Full-time">Full-time</option>
              <option value="Internship">Internship</option>
            </select>

            <input
              type="text"
              placeholder="Search location"
              className="p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            />

            <button
              onClick={resetAll}
              className="px-4 py-2 rounded bg-gray-500 hover:bg-gray-700 text-white transition"
            >
              Reset Filters
            </button>

            <button
              onClick={() =>
                setViewMode((prev) => (prev === "swipe" ? "list" : "swipe"))
              }
              className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-800 text-white transition"
            >
              {viewMode === "swipe" ? "View All Jobs" : "Tinder Mode"}
            </button>
          </div>
        </div>

        {/* Content: Swipe Mode or List/Grid Mode */}
        {viewMode === "swipe" ? (
          <>
            {remainingJobs.length === 0 ? (
              <p className="text-gray-400 mt-20 text-lg font-semibold animate-pulse">
                🎉 No jobs left! Great job hunting! 🎉
              </p>
            ) : (
              <div className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 text-gray-900 dark:text-gray-100 transition-transform duration-300">
                <h3 className="text-2xl font-semibold mb-2">{remainingJobs[currentIndex]?.title}</h3>
                <p className="italic mb-1">{remainingJobs[currentIndex]?.company}</p>
                <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                  {remainingJobs[currentIndex]?.type} — {remainingJobs[currentIndex]?.location}
                </p>
                <p className="mt-16 text-center text-gray-400 dark:text-gray-500">
                  → View Details, ← Discard
                </p>
              </div>
            )}
          </>
        ) : (
          // List/Grid Mode
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {JOBS.map((job) => (
              <button
                key={job.id}
                onClick={() => setSelectedJob(job)}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 text-left hover:shadow-xl transition"
              >
                <h3 className="text-xl font-semibold mb-1">{job.title}</h3>
                <p className="italic mb-1">{job.company}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {job.type} — {job.location}
                </p>
              </button>
            ))}
          </div>
        )}
      </main>

      {/* Side pop-up panel for details */}
      {selectedJob && (
        <aside className="w-96 bg-white dark:bg-gray-800 shadow-xl rounded-l-3xl p-6 text-gray-900 dark:text-gray-100 fixed right-0 top-0 bottom-0 overflow-auto z-50 flex flex-col">
          <button
            onClick={() => setSelectedJob(null)}
            className="self-end mb-4 text-gray-500 hover:text-gray-900 dark:hover:text-gray-300"
            aria-label="Close details panel"
          >
            ✕
          </button>
          <h3 className="text-3xl font-bold mb-2">{selectedJob.title}</h3>
          <p className="italic text-sm mb-1">{selectedJob.company}</p>
          <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
            {selectedJob.type} — {selectedJob.location}
          </p>
          <p className="mb-6">{selectedJob.description}</p>
          <a
            href={selectedJob.applyLink}
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
          >
            Apply Now →
          </a>
          <p className="text-xs text-gray-500 mt-4">Press ↓ or ✕ to close, → again to save</p>
        </aside>
      )}

      {/* Undo Button */}
      <button
        disabled={!lastAction}
        onClick={undoLastAction}
        className={`fixed bottom-6 right-6 z-60 px-4 py-2 rounded-full border transition
          ${lastAction ? "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white" : "border-gray-300 text-gray-300 cursor-not-allowed"}`}
      >
        Undo Last Action
      </button>

      {/* Saved Stack */}
      <div className="w-40 p-6 mx-10 flex flex-col items-center space-y-2">
        <h3 className="text-sm text-gray-400 mb-2">Saved</h3>
        {saved.map((job) => (
          <button
            key={job.id}
            onClick={() => setSelectedJob(job)}
            className="w-28 h-16 bg-green-300 dark:bg-green-700 text-xs text-center rounded-full shadow-md mb-2 p-2 truncate animate-pulse border border-green-500 hover:bg-green-400 dark:hover:bg-green-600"
          >
            {job.title}
          </button>
        ))}
      </div>
    </div>
  );
}
