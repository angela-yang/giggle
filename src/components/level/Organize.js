import React, { useState } from "react";
import SideBar from "../SideBar";

const initialJobs = [
  { id: 1, title: "Barista", company: "Cafe Delight", status: "Not Applied" },
  { id: 2, title: "Software Intern", company: "Tech Corp", status: "Applied" },
  { id: 3, title: "Retail Associate", company: "ShopSmart", status: "Interview" },
];

export default function Organize() {
  const [jobs, setJobs] = useState(initialJobs);

  const updateStatus = (id, newStatus) => {
    setJobs(jobs.map((job) => (job.id === id ? { ...job, status: newStatus } : job)));
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <SideBar />
      <main className="flex-grow p-8">
        <h1 className="text-2xl mx-20 font-bold text-gray-900 dark:text-white mb-6">Organize Your Saved Jobs</h1>
        <div className="mx-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border dark:border-gray-700"
            >
              <h2 className="text-lg font-semibold mb-1 dark:text-white">{job.title}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{job.company}</p>
              <select
                value={job.status}
                onChange={(e) => updateStatus(job.id, e.target.value)}
                className="w-full p-2 mt-2 rounded bg-gray-100 dark:bg-gray-700 text-sm text-gray-800 dark:text-gray-200"
              >
                <option value="Not Applied">Not Applied</option>
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
