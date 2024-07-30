import React, { useState, useEffect } from 'react';
import EnrolledCourses from './EnrolledCourses';
import styled from 'styled-components';

const ParentComponent = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Simulate data fetching
    const fetchCourses = async () => {
      try {
        // Replace with your API endpoint or data source
        const response = await fetch(' http://localhost:3001/courses');
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
        // Handle error gracefully
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <h1 style={{backgroundColor:"#1eb2a6",height:"90px",color:"white",padding:20}}>My Courses</h1>
      <EnrolledCourses courses={courses} />
    </div>
  );
};

export default ParentComponent;
