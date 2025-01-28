import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jobpic from "../assets/job.jpeg";
const Job = () => {
  const [jobs, setJobs] = useState([]); // All jobs
  const [visibleJobs, setVisibleJobs] = useState([]); // Jobs visible on the screen
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const ITEMS_PER_PAGE = 20;

  // Array of random company logos (replace with actual logo URLs)
  

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("http://localhost:5000/jobs"); // Update with your API endpoint
        setJobs(data);
        console.log(data+"hello")
        setVisibleJobs(data.slice(0, 30)); // Load the first set of jobs
        setLoading(false);
        console.log(jobs)
      } catch (error) {
        console.error("Error fetching job data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const loadMoreJobs = () => {
    const nextJobs = jobs.slice(
      visibleJobs.length,
      visibleJobs.length + ITEMS_PER_PAGE
    );
    setVisibleJobs([...visibleJobs, ...nextJobs]);
  };

  // Function to get a random logo from the companyLogos array
  const getRandomLogo = () => {
    return companyLogos[Math.floor(Math.random() * companyLogos.length)];
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-8 mt-8">
        Government Jobs Section
      </h1>

      {error ? (
        <p className="text-red-500 text-center">
          Error fetching job data: {error}
        </p>
      ) : loading ? (
        <p className="text-center text-gray-500">Loading jobs...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {visibleJobs.map((job, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Use a random company logo as the image */}
                <img
                  src={jobpic}
                 
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h2 className="font-bold text-base ">{job.title}</h2>
                  <p className="text-sm text-gray-500">
                    Posted Date: {job.date || "N/A"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Last Date:{" "}
                    {`2025-02-${Math.floor(Math.random() * 20) + 10}`}
                  </p>
                  <a
                    href={job.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline mt-2 block"
                  >
                    View Details
                  </a>
                </div>
              </div>
            ))}
          </div>

          {visibleJobs.length < jobs.length && (
            <div className="text-center mt-6">
              <button
                onClick={loadMoreJobs}
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded shadow hover:bg-blue-600"
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Job;
