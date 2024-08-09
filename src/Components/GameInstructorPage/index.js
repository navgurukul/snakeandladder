// GameInstructorPage.js
import React from 'react';
import { Link } from 'react-router-dom';

function GameInstructorPage() {
  return (
    <div>
      <h1>Game Instructor</h1>
      <p>Information about Fate Junc, points system, etc.</p>
      <Link to="/create-room">Create Room</Link>
      
    </div>
  );
}

export default GameInstructorPage;

