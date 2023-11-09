import React, { useState, useEffect } from 'react';
import { supabase } from '../../client'
import { useParams, useNavigate } from 'react-router-dom';
import PostForm from '../components/PostForm';


const EditPost = () => {

    const [feedback, setFeedback] = useState('');

    const [post, setPost] = useState({
        title: '',
        description: '',
        image: '',
        category: '',
        secretKey: '',
    });

    const [originalSecretKey, setOriginalSecretKey] = useState('');

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('Posts')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                setFeedback('Error feteching post: ' + error.message);
            } else if (data) {
                setPost({
                    title: data.title || '',
                    description: data.description || '',
                    image: data.image || '',
                    category: data.category || '',
                    secretKey: ''
                });
                setOriginalSecretKey(data.secret_key);
            } else {
                setFeedback('Post not found.');
            }
        };
        fetchPost();
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPost((prev) => ({ ...prev, [name]: value }));
    };

    const updatePost = async (event) => {
        event.preventDefault();

        // Check if the entered secret key matches the original one
        if (post.secretKey !== originalSecretKey) {
            setFeedback('Incorrect secret key. You are not authorized to edit this post.');
            return;
        }

        const { error } = await supabase
            .from('Posts')
            .update({
                title: post.title,
                description: post.description,
                image: post.image,
                category: post.category,
            })
            .eq('id', id);

        if (error) {
            setFeedback('Error updating post: ' + error.message);
            console.error('Error updating:', error);
        } else {
            setFeedback('Post updated successfully!');
            // Redirect to home after 2 seconds
            setTimeout(() => {
                // window.location = `/view/${id}`;
                navigate(`/view/${id}`);
            }, 2000); // 2000 milliseconds = 2 seconds
        }
    };


    const deletePost = async (event) => {
        event.preventDefault();

        if (!post.id) {
            setFeedback('No post to delete.');
            return;
        }

        // Check if the entered secret key matches the original one
        if (post.secretKey !== originalSecretKey) {
            setFeedback('Incorrect secret key. You are not authorized to delete this post.');
            return;
        }

        const { error } = await supabase
            .from('Posts')
            .delete()
            .eq('id', id);

        if (error) {
            setFeedback('Error deleting a post: ' + error.message);
            console.error('Error deleting:', error);
        } else {
            setFeedback('Post deleted successfully!');
            // Redirect to home after 2 seconds
            setTimeout(() => {
                navigate("/");
            }, 2000); // 2000 milliseconds = 2 seconds
        }
    };


    return (
        <div>
            <h1> Edit post </h1>
            <div className='form-container'>
                <PostForm data={post} onChange={handleInputChange} onSubmit={updatePost} />
                <button className="deleteButton" onClick={deletePost}>Delete</button>
            </div>

            {feedback && <p>{feedback}</p>}
        </div>
    )



};

export default EditPost;