import React, { useState, useEffect } from 'react';
import { supabase } from '../../client'
import { useParams, Link } from 'react-router-dom';


const ViewPost = () => {
    const { id } = useParams();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('Posts')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) throw error;
                setPost({
                    id: data.id,
                    title: data.title || '',
                    description: data.description || '',
                    image: data.image || '',
                    category: data.category || '',
                });
            } catch (error) {
                setError('An error occurred while fetching the post.');
                console.error;
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!post) return <div>Post not found.</div>;

    return (
        <div>
            <img src={post.image} alt={post.title} />
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <p> comment </p>
            <Link to={`/edit/${post.id}`}><button>Edit</button></Link>
            <br />
        </div >
    );
};


export default ViewPost;