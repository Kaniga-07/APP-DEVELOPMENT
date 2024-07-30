import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './Assessment.css'; // Import the CSS file

// Register the required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const dummyData = [
  { studentName: 'Alice Johnson', course: 'Math 101', score: 95, grade: 'A' },
  { studentName: 'Bob Smith', course: 'History 202', score: 88, grade: 'B+' },
  { studentName: 'Charlie', course: 'Science 303', score: 76, grade: 'B' },
  { studentName: 'Johnson', course: 'Math 101', score: 90, grade: 'A' },
  { studentName: 'Smith', course: 'History 202', score: 85, grade: 'B+' },
  { studentName: 'Browny', course: 'Science 303', score: 70, grade: 'B' },
  { studentName: 'Andrason', course: 'Math 101', score: 30, grade: 'F' },
  { studentName: 'Robin', course: 'History 202', score: 50, grade: 'C' },
  { studentName: 'Downey', course: 'Science 303', score: 100, grade: 'A+' },
  // Add more student data here
];

// Chart data
const barChartData = {
  labels: dummyData.map(data => data.studentName),
  datasets: [
    {
      label: 'Scores',
      data: dummyData.map(data => data.score),
      backgroundColor: '#1eb2a6',
      borderColor: '#1eb2a6',
      borderWidth: 1,
    },
  ],
};

const lineChartData = {
  labels: dummyData.map(data => data.studentName),
  datasets: [
    {
      label: 'Scores',
      data: dummyData.map(data => data.score),
      fill: false,
      backgroundColor: '#1eb2a6',
      borderColor: '#1eb2a6',
      tension: 0.1,
    },
  ],
};

const Assessment = () => {
  return (
    <div className="assessment-container">
      <Typography variant="h4" gutterBottom className="title">
        Students' Performance
      </Typography>
      <div className="chart-container">
        <div className="chart">
          <Typography variant="h6" gutterBottom>Scores by Student (Bar Chart)</Typography>
          <Bar data={barChartData} />
        </div>
        <div className="chart">
          <Typography variant="h6" gutterBottom>Scores by Student (Line Chart)</Typography>
          <Line data={lineChartData} />
        </div>
      </div>
      <TableContainer component={Paper} className="table-container">
        <Table className="table">
          <TableHead>
            <TableRow>
              <TableCell>Student Name</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Grade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.studentName}</TableCell>
                <TableCell>{row.course}</TableCell>
                <TableCell>{row.score}</TableCell>
                <TableCell>{row.grade}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
    </div>
  );
};

export default Assessment;
