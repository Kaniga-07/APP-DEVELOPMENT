import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Back from "../common/back/Back";
import CoursesCard from "./CoursesCard";
import OnlineCourses from "./OnlineCourses";
import Chatbot from "../chatbot/chatbot";

const CourseHome = () => {
  const navigate = useNavigate(); // Initialize navigate

  return (
    <>
      <Back title='Explore Courses' />
      <button 
        className="enrolled-btn" 
        style={{
          position: 'absolute', // Fixed position to place the button globally
          top: '20px', // Distance from the top
          right: '20px', // Distance from the right
          padding: '8px 12px', // Reduced padding for smaller size
          fontSize: '12px', // Smaller font size
          backgroundColor: '#1eb2a6',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          transition: 'background-color 0.3s, transform 0.3s',
          width: '150px', // Set a fixed width to reduce the button length
          textAlign: 'center' // Center text inside the button
        }} 
        onClick={() => navigate('/enrolled')} // Use navigate instead of Navigate
      >
        Courses Enrolled
      </button>
      <Chatbot/>
      <CoursesCard />
      <OnlineCourses />
    </>
  );
}

export default CourseHome;
