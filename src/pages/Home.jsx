
import React, { useState, useEffect } from 'react';
import { supabase } from '../../client'
import { formatDistanceToNow } from 'date-fns';
import Card from '../components/Card';

const Home = () => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchInput, setSearchInput] = useState('');
    const [sortCriteria, setSortCriteria] = useState('created_at'); // 'created_at' or 'like_count'
    const [filterCategory, setFilterCategory] = useState(''); // '', 'question', 'blog'


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

    const getSelectedPosts = () => {
        let selectedPosts = posts;

        if (filterCategory) {
            selectedPosts = selectedPosts.filter(item => item.category === filterCategory)
        }

        if (sortCriteria === 'like_count') {
            selectedPosts.sort((a, b) => b.like_count - a.like_count);
        } else {
            selectedPosts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        }

        if (searchInput) {
            selectedPosts = selectedPosts.filter(item =>
                item.title.toLowerCase().includes(searchInput.toLowerCase()));
        }

        return selectedPosts;
    };

    const seletedPosts = getSelectedPosts();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (posts.length === 0) return <h2>{'No Post Yet 😞'}</h2>



    return (
        <>
            <div>
                <input
                    name="search"
                    type="text"
                    placeholder="Search..."
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <select onChange={(e) => setSortCriteria(e.target.value)}>
                    <option value="created_at">Sort by Time</option>
                    <option value="like_count">Sort by Likes</option>
                </select>
                <select onChange={(e) => setFilterCategory(e.target.value)}>
                    <option value="">All Categories</option>
                    <option value="Question">Questions</option>
                    <option value="Blog">Blogs</option>
                </select>
            </div>
            <div className="card-container">
                {seletedPosts && seletedPosts.length > 0 ? seletedPosts.map((post) => (
                    <Card key={post.id}
                        id={post.id}
                        category={post.category}
                        timeAgo={post.timeAgo}
                        title={post.title}
                        image={post.image}
                        likeCount={post.like_count}
                    />)
                ) : <h1> No Post Found</h1>

                }
            </div>
        </>

    );


}

export default Home;