import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import HomePage from './pages/HomePage';
import Login from './pages/login/Login';
import SubjectIndexPage from './pages/subject/Index';

const subjects = [
  {
    subjectId: 1,
    title: 'Mathematics',
    description: 'The study of numbers, quantities, and shapes.'
  },
  {
    subjectId: 2,
    title: 'Science',
    description: 'The study of the natural world, including physics, chemistry, and biology. The study of the natural world, including physics, chemistry, and biology. The study of the natural world, including physics, chemistry, and biology. The study of the natural world, including physics, chemistry, and biology.'
  },
  {
    subjectId: 3,
    title: 'History',
    description: 'The study of past events and their significance.'
  },
  {
    subjectId: 4,
    title: 'English',
    description: 'The study of language, literature, and writing.'
  }
];

import ErrorPage from './pages/ErrorPage';
import RegisterPage from './pages/RegisterPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'subjects', element: <SubjectIndexPage subjects={subjects} /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
