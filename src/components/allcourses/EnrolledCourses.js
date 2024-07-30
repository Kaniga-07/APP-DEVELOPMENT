import React, { useState } from 'react';
import './EnrolledCourses.css';
import { Pie, Bar, Line, Radar } from 'react-chartjs-2';
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale
} from 'chart.js';

// Register Chart.js components
Chart.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale
);

// Dummy data for visualization
const dummyData = {
  students: 10000,
  certificates: 5329,
  quizzes: 3089,
  newRegistrations: 1235,
  averageGrade: 85,
  gradesDistribution: [10, 20, 30, 25, 15],
  enrolledCourses: 5,
  attendedExams: 3,
  neoScore: 15770,
  neoScoreTotal: 35000,
  questions: {
    total: 4980,
    solved: 3721,
    easy: { attended: 2220, solved: 1783 },
    medium: { attended: 2073, solved: 1456 },
    hard: { attended: 687, solved: 482 }
  },
  coding: {
    attended: 1374,
    solved: 1235,
    score: 12818,
    accuracy: 93.29
  },
  mcq: {
    attended: 3587,
    solved: 2472,
    score: 2474,
    accuracy: 68.98
  },
  projects: {
    major: 1,
    minor: 19,
    score: 478
  }
};

const EnrolledCourses = ({ courses }) => {
  const [activeSection, setActiveSection] = useState('courses');

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const pieChartData = {
    labels: ['High', 'Medium', 'Low'],
    datasets: [
      {
        data: dummyData.gradesDistribution,
        backgroundColor: ['#4caf50', '#ffeb3b', '#ff9800']
      }
    ]
  };

  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Scores',
        backgroundColor: '#3e95cd',
        data: [20, 40, 60, 80, 100]
      }
    ]
  };

  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Performance',
        fill: false,
        borderColor: '#42a5f5',
        data: [10, 20, 50, 30, 60, 80]
      }
    ]
  };

  const radarChartData = {
    labels: ['Category1', 'Category2', 'Category3'],
    datasets: [
      {
        label: 'Scores',
        backgroundColor: 'rgba(179,181,198,0.2)',
        borderColor: 'rgba(179,181,198,1)',
        pointBackgroundColor: 'rgba(179,181,198,1)',
        data: [30, 70, 45]
      }
    ]
  };

  return (
    <div className="con">
      <header className="header">

      </header>
      <aside className="sidebar">
        <ul>
          <li>
            <a href="#" onClick={() => handleSectionChange('courses')}>
              <span className="icon">📚</span>
              Courses
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleSectionChange('assignments')}>
              <span className="icon">📝</span>
              Assignments
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleSectionChange('discussion-forums')}>
              <span className="icon">💬</span>
              Discussion Forums
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleSectionChange('settings')}>
              <span className="icon">⚙️</span>
              Settings
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleSectionChange('performance')}>
              <span className="icon">📊</span>
              Performance
            </a>
          </li>
        </ul>
      </aside>
      <main className="main-contents">
        {activeSection === 'courses' && (
          <section className="enrolledCourses">
            <h2>Enrolled Courses</h2>
            {courses.length > 0 ? (
              <ul className="courses-list">
                {courses.map((course) => (
                  <li key={course.id}>
                    <h3>{course.title}</h3>
                    <div className="pie-chart">
                      <Pie data={pieChartData} />
                    </div>
                    <p>Completion: {course.completion}%</p>
                    <p>Grade: {course.grade !== null ? course.grade : 'Not graded yet'}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No courses available.</p>
            )}
          </section>
        )}

        {activeSection === 'assignments' && (
          <section className="assignments">
            <h2>Assignments</h2>
            <form>
              <input type="file" />
              <textarea
                rows="6"
                placeholder="Write comments or instructions for the assignment..."
              ></textarea>
              <button type="submit">Submit Assignment</button>
            </form>
            <div className="upload-status">
              <div className="status-message">
                <span className="status-icon">✓</span> Your file has been successfully uploaded.
              </div>
              <div className="uploaded-files">
                <p>Uploaded Files:</p>
                <ul>
                  <li>
                    <a href="#">Assignment1.pdf</a>
                  </li>
                  <li>
                    <a href="#">Assignment2.docx</a>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'discussion-forums' && (
          <section className="discussion-forums">
            <h2>Discussion Forums</h2>
            <div className="forum-container">
              <div className="forum-thread">
                <h3>Thread Title</h3>
                <p>Thread content goes here...</p>
                <div className="comments-section">
                  <h4>Comments</h4>
                  <div className="comment">
                    <p>Comment content goes here...</p>
                    <div className="comment-actions">
                      <a href="#">Reply</a>
                      <a href="#">Edit</a>
                      <a href="#">Delete</a>
                    </div>
                  </div>
                  <div className="comment-form">
                    <textarea rows="3" placeholder="Write a comment..."></textarea>
                    <button type="submit">Post Comment</button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'settings' && (
          <section className="settings">
            <h2>Settings</h2>
            <form>
              <label htmlFor="username">Username:</label>
              <input type="text" id="username" />
              <label htmlFor="email">Email:</label>
              <input type="text" id="Email" />
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" />
              <button type="submit">Save Changes</button>
            </form>
          </section>
        )}

        {activeSection === 'performance' && (
          <section className="performance">
            <h2>Performance</h2>
            <div className="charts">
              <div className="chart">
                <h3>Pie Chart</h3>
                <Pie data={pieChartData} />
              </div>
              <div className="chart">
                <h3>Bar Chart</h3>
                <Bar data={barChartData} />
              </div>
              <div className="chart">
                <h3>Line Chart</h3>
                <Line data={lineChartData} />
              </div>
              <div className="chart">
                <h3>Radar Chart</h3>
                <Radar data={radarChartData} />
              </div>
            </div>
            <div className="performance-summary">
              <h2>Performance Summary</h2>
              <div className="summary-cards">
                <div className="summary-card">
                  <h3>Total Students</h3>
                  <p>{dummyData.students}</p>
                </div>
                <div className="summary-card">
                  <h3>Certificates</h3>
                  <p>{dummyData.certificates}</p>
                </div>
                <div className="summary-card">
                  <h3>Quizzes Attempted</h3>
                  <p>{dummyData.quizzes}</p>
                </div>
                <div className="summary-card">
                  <h3>New Registrations</h3>
                  <p>{dummyData.newRegistrations}</p>
                </div>
                <div className="summary-card">
                  <h3>Average Grade</h3>
                  <p>{dummyData.averageGrade}</p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default EnrolledCourses;
