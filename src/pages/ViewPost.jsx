import React, { useState, useEffect } from 'react';
import { supabase } from '../../client'
import { useParams, Link } from 'react-router-dom';


const ViewPost = ({ posts }) => {
    const { id } = useParams();

    // If post is initialized as {}, then post.title, post.author, and post.description will all be undefined, but they won't cause the program to crash.
    const [post, setPost] = useState({});


    useEffect(() => {
        const fetchedPost = posts.find(item => item.id.toString() === id);
        // const fetchedPost = posts.filter(item => item.id.toString() === id)[0];
        //  finds the first post in posts where item.id is strictly equal to id and assigns that to fetchedPost
        setPost(fetchedPost);
    }, [posts, id]);
    // Anytime posts or id changes, useEffect will run again.


    return (
        post ? (
            <div>
                <img src={post.image} alt={post.title} />
                <h2>{post.title}</h2>
                <p>{post.description}</p>
                <p> comment </p>
                <Link to={`/edit/${post.id}`}><button>Edit</button></Link>
                <br />
            </div >
        ) : <div>Loading...</div>
    );
};


export default ViewPost;