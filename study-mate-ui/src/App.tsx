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
import SubjectTasks from './pages/task/Index';
import ShowSubject from './pages/subject/Show';
import CreateTask from './pages/task/Create';
import EditTask from './pages/task/Edit';

const subjects = [
  {
    subjectId: 1,
    name: 'Mathematics',
    description: 'The study of numbers, quantities, and shapes.',
    start_date: new Date,
    grade: 5,
    end_date: new Date,
    status: '',
  },
  {
    subjectId: 2,
    name: 'Science',
    description:
      'The study of the natural world, including physics, chemistry, and biology. The study of the natural world, including physics, chemistry, and biology. The study of the natural world, including physics, chemistry, and biology. The study of the natural world, including physics, chemistry, and biology.',
    start_date: new Date,
    grade: 5,
    end_date: new Date,
    status: '',
  },
  {
    subjectId: 3,
    name: 'History',
    description: 'The study of past events and their significance.',
    start_date: new Date,
    grade: 5,
    end_date: new Date,
    status: '',
  },
  {
    subjectId: 4,
    name: 'English',
    description: 'The study of language, literature, and writing.',
    start_date: new Date,
    grade: 5,
    end_date: new Date,
    status: '',
  },
];

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'subjects', element: <SubjectIndexPage subjects={subjects} /> },
      { path: 'subjects/create', element: <CreateSubject /> },
      { path: 'subjects/:subject/edit', element: <EditSubject /> },
      { path: 'subjects/:subject/tasks', element: <SubjectTasks /> },
      { path: 'subjects/:subject/tasks/create', element: <CreateTask /> },
      { path: 'subjects/:subject/tasks/:task/edit', element: <EditTask /> },
      { path: 'subjects/:subject', element: <ShowSubject subject={subjects[0]} /> },
    ],
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
