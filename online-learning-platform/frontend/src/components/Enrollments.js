import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Enrollments = () => {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await axios.get('http://localhost:3000/enrollments');
        setEnrollments(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEnrollments();
  }, []);

  return (
    <div className="container">
      <h2>Enrollments</h2>
      <ul>
        {enrollments.map(enrollment => (
          <li key={enrollment.id}>User ID: {enrollment.userId}, Course ID: {enrollment.courseId}</li>
        ))}
      </ul>
    </div>
  );
};

export default Enrollments;
