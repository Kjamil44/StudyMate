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
import NotesIndexPage from './pages/notes/Index';
import CreateNote from './pages/notes/CreateNote';
import EditNote from './pages/notes/EditNote';
import Note from './pages/notes/Note';



const notes = [
  {
    Id: 1,
    Title: 'Note #1',
    Description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut arcu nec turpis convallis pretium. Fusce egestas sagittis justo non eleifend. Etiam eget mi risus. Proin lacus metus, pretium vel elit non, iaculis dapibus eros.',
    BelongsId: 1,
  },
  {
    Id: 2,
    Title: 'Note #1',
    Description:
      'Lorem ipsum dolor sit amet. Quisque ut arcu nec turpis convallis pretium. Fusce egestas sagittis justo non eleifend. Etiam eget mi risus. Proin lacus metus, pretium vel elit non, iaculis dapibus eros.',
    BelongsId: 1,
  },
  {
    Id: 3,
    Title: 'Note #1',
    Description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut arcu nec turpis convallis pretium. Fusce egestas sagittis justo non eleifend. Etiam eget mi risus. Proin lacus metus, pretium vel elit non, iaculis dapibus eros.',
    BelongsId: 2,
  },
  {
    Id: 4,
    Title: 'Note #1',
    Description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut arcu nec turpis convallis pretium. Fusce egestas sagittis justo non eleifend. Etiam eget mi risus. Proin lacus metus, pretium vel elit non, iaculis dapibus eros.',
    BelongsId: 2,
  },
];

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'subjects', element: <SubjectIndexPage /> },
      { path: 'subjects/create', element: <CreateSubject /> },
      { path: 'subjects/:subject/edit', element: <EditSubject /> },
      { path: 'subjects/:subject/tasks', element: <SubjectTasks /> },
      { path: 'subjects/:subject/tasks/create', element: <CreateTask /> },
      { path: 'subjects/:subject/tasks/:task/edit', element: <EditTask /> },
      { path: 'subjects/:subject', element: <ShowSubject /> },
      { path: 'notes', element: <NotesIndexPage notes={notes} /> },
      { path: 'notes/create', element: <CreateNote /> },
      { path: 'notes/edit/:id', element: <EditNote isModal={false} /> },
      // { path: 'notes/:subject', element: <Note subject={subjects[0]} /> },
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
