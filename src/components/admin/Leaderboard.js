import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';
import './Leaderboard.css'; // Import the CSS file

// Sample data with 25 entries
const dummyData = Array.from({ length: 25 }, (_, index) => ({
  studentName: `Student ${index + 1}`,
  score: Math.floor(Math.random() * 100) + 1, // Random score between 1 and 100
  rank: index + 1,
  trophy: index === 0 ? 'Gold' : index === 1 ? 'Silver' : index === 2 ? 'Bronze' : 'None',
  stage: ['Beginner', 'Intermediate', 'Advanced'][Math.floor(Math.random() * 3)]
}));

const Leaderboard = () => {
  return (
    <div className="leaderboard-container">
      <Typography variant="h4" gutterBottom className="title">
        Student Leaderboard
      </Typography>
      <TableContainer component={Paper} className="table-container">
        <Table className="table">
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Trophy</TableCell>
              <TableCell>Stage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyData.map((row) => (
              <TableRow key={row.rank}>
                <TableCell>{row.rank}</TableCell>
                <TableCell>{row.studentName}</TableCell>
                <TableCell>{row.score}</TableCell>
                <TableCell>
                  {row.trophy === 'Gold' && <Star className="trophy-icon gold" />}
                  {row.trophy === 'Silver' && <Star className="trophy-icon silver" />}
                  {row.trophy === 'Bronze' && <Star className="trophy-icon bronze" />}
                  {row.trophy === 'None' && <StarBorder />}
                </TableCell>
                <TableCell>{row.stage}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Leaderboard;
