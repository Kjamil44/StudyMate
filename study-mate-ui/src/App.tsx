import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import HomePage from './pages/HomePage';
import Login from './pages/login/Login';
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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
