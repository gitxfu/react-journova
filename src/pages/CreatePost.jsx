import React, { useState } from 'react';
import { supabase } from '../../client'
import PostForm from '../components/PostForm';

const CreatePost = () => {

    const [feedback, setFeedback] = useState('');
    const [post, setPost] = useState({
        title: '',
        description: '',
        image: '',
        category: '',
        userId: '',
        secretKey: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPost((prev) => ({ ...prev, [name]: value }));
    };

    const createPost = async (event) => {
        event.preventDefault();
        const { data, error } = await supabase
            .from('Posts')
            .insert({
                title: post.title,
                description: post.description,
                image: post.image,
                category: post.category,
                user_id: post.userId,
                secret_key: post.secretKey
            })
            .select();

        if (error) {
            setFeedback('Error creating post: ' + error.message);
            console.error('Error inserting:', error);
        } else {
            setFeedback('Post created successfully!');
            setPost({ title: '', description: '', image: '', category: '', secretKey: '' }); // Reset the form
            console.log('Insert:', data);
            // Redirect after 2 seconds
            setTimeout(() => {
                window.location = "/";
            }, 2000); // 2000 milliseconds = 2 seconds
        }


    };

    return (
        <div>
            <h1> Create a new post </h1>
            <div className='form-container'>
                <PostForm data={post} onChange={handleInputChange} onSubmit={createPost} />
            </div>

            {feedback && <p>{feedback}</p>}
        </div>
    )



};

export default CreatePost;