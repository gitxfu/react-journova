import { useState, useEffect } from 'react';
import { useRoutes, Link } from 'react-router-dom';
import { supabase } from '../client'
import { formatDistanceToNow } from 'date-fns';
import './App.css'
import LayoutWithNavBar from './pages/LayoutWithNavBar';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import ViewPost from './pages/ViewPost';
import EditPost from './pages/EditPost';

function App() {

  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('Posts')
      .select()
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
    } else {
      // console.log(data);
      const newPosts = data.map(post => {
        // console.log(formatDistanceToNow(new Date(post.created_at)));
        return { ...post, timeAgo: formatDistanceToNow(new Date(post.created_at)) }
        // console.log(post);
      });
      setPosts(newPosts);
      // console.log(newPosts);
    }
  };


  useEffect(() => {
    fetchPosts();
  }, []);  // runs once when component mounts

  // Set up routes
  let elements = useRoutes([
    {
      path: "/",
      element: <LayoutWithNavBar />,
      children: [
        { index: true, element: <Home posts={posts} /> },
        { path: "create", element: <CreatePost /> },
        { path: "view/:id", element: <ViewPost posts={posts} /> },
        { path: "edit/:id", element: <EditPost /> },

      ],
    },
  ]);

  return elements;

}

export default App;