import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import Login from './pages/login/Login';
import CreateNote from './pages/notes/CreateNote';
import EditNote from './pages/notes/EditNote';
import NotesIndexPage from './pages/notes/Index';
import RegisterPage from './pages/RegisterPage';
import RootLayout from './pages/RootLayout';
import CreateSubject from './pages/subject/Create';
import EditSubject from './pages/subject/Edit';
import SubjectIndexPage from './pages/subject/Index';
import ShowSubject from './pages/subject/Show';
import CreateTask from './pages/task/Create';
import EditTask from './pages/task/Edit';
import SubjectTasks from './pages/task/Index';
import { Suspense } from 'react';
import UserIndexPage from './pages/user-profile';

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
      { path: 'notes', element: <NotesIndexPage /> },
      { path: 'notes/create', element: <CreateNote /> },
      { path: 'notes/edit/:id', element: <EditNote isModal={false} /> },
      // { path: 'notes/:subject', element: <Note subject={subjects[0]} /> },
      { path: 'profile', element: <UserIndexPage /> },
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
  return (
    <Suspense>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
