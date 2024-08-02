// routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './Components/Homepage';
import LoginPage from './Components/LoginPage';
import GameInstructorPage from './Components/GameInstructorPage';
import CreateRoomPage from './Components/CreateRoomPage';
import ChooseTokenPage from './Components/ChooseTokenPage';
import GameBoard from './Components/GameBoard';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Homepage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/instructor" element={<GameInstructorPage />} />
    <Route path="/create-room" element={<CreateRoomPage />} />
    <Route path="/choose-token" element={<ChooseTokenPage />} />
    <Route path="/game" element={<GameBoard />} />
  </Routes>
);

export default AppRoutes;
