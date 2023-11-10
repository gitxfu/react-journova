import { useState, useEffect } from 'react';
import { useRoutes, Link } from 'react-router-dom';
import './App.css'
import LayoutWithNavBar from './pages/LayoutWithNavBar';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import ViewPost from './pages/ViewPost';
import EditPost from './pages/EditPost';

function App() {
  // Set up routes
  let elements = useRoutes([
    {
      path: "/",
      element: <LayoutWithNavBar />,
      children: [
        { index: true, element: <Home /> },
        { path: "create", element: <CreatePost /> },
        { path: "view/:id", element: <ViewPost /> },
        { path: "edit/:id", element: <EditPost /> },

      ],
    },
  ]);

  return elements;

}

export default App;