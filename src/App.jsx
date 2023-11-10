import { useState, useEffect } from 'react';
import { useRoutes, Link } from 'react-router-dom';
import './App.css'
import LayoutWithNavBar from './pages/LayoutWithNavBar';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import ViewPost from './pages/ViewPost';
import EditPost from './pages/EditPost';
import NotFound from './pages/NotFound';
import { generateUserID } from './utils/utils';

function App() {
  const [userID, setUserID] = useState(localStorage.getItem('userID') || generateUserID());

  // Set up routes
  let elements = useRoutes([
    {
      path: "/",
      element: <LayoutWithNavBar userID={userID} setUserID={setUserID} />,
      children: [
        { index: true, element: <Home /> },
        { path: "create", element: <CreatePost userID={userID} /> },
        { path: "view/:id", element: <ViewPost /> },
        { path: "edit/:id", element: <EditPost /> },

      ],
    },
    { path: "*", element: <NotFound /> },
  ]);

  return elements;

}

export default App;