import React from 'react';
import './App.css';
import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import HomePage from './pages/HomePage';
import { RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {index: true, element: <HomePage />}
    ]
  }
]);

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
