
import React, { useState, useEffect } from 'react';
import { supabase } from '../../client'
import { formatDistanceToNow } from 'date-fns';
import Card from '../components/Card';

const Home = () => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('Posts')
                    .select()
                    .order('created_at', { ascending: false });

                if (error) throw error;

                const formattedPosts = data.map(post => ({
                    ...post,
                    timeAgo: formatDistanceToNow(new Date(post.created_at), { addSuffix: true })
                }));

                setPosts(formattedPosts);
            } catch (error) {
                setError('An error occurred while fetching posts. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);  // runs once when component mounts

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (posts.length === 0) return <h2>{'No Post Yet 😞'}</h2>

    return (
        <div className="card-container">
            {
                posts.map((post) =>
                    <Card key={post.id}
                        id={post.id}
                        timeAgo={post.timeAgo}
                        title={post.title}
                        image={post.image}
                        likeCount={post.like_count}
                    />)
            }
        </div>
    );


}

export default Home;