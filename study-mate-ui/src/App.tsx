import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import Login from './pages/login/Login';
import RegisterPage from './pages/RegisterPage';
import RootLayout from './pages/RootLayout';
import SubjectIndexPage from './pages/subject/Index';
import CreateSubject from './pages/subject/Create';
import EditSubject from './pages/subject/Edit';

const subjects = [
  {
    subjectId: 1,
    title: 'Mathematics',
    description: 'The study of numbers, quantities, and shapes.',
  },
  {
    subjectId: 2,
    title: 'Science',
    description:
      'The study of the natural world, including physics, chemistry, and biology. The study of the natural world, including physics, chemistry, and biology. The study of the natural world, including physics, chemistry, and biology. The study of the natural world, including physics, chemistry, and biology.',
  },
  {
    subjectId: 3,
    title: 'History',
    description: 'The study of past events and their significance.',
  },
  {
    subjectId: 4,
    title: 'English',
    description: 'The study of language, literature, and writing.',
  },
];


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "subjects", element: <SubjectIndexPage subjects={subjects} /> },
      { path: "subjects/create", element: <CreateSubject /> },
      { path: "subjects/:subject/edit", element: <EditSubject /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
