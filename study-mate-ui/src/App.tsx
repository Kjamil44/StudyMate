import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import HomePage from './pages/HomePage';
import Login from './pages/login/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { index: true, path: '/login', element: <Login /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
