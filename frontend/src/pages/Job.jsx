import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Job = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get('https://blog-ung5.onrender.com/jobs'); 
        setJobs(data);
      } catch (error) {
        console.error('Error fetching job data:', error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div>
      <h1>Government Jobs</h1>
      <ul>
        {jobs.map((job, index) => (
          <li key={index}>
            <a href={job.link} target="_blank" rel="noopener noreferrer">
              {job.title} - {job.date}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Job;
