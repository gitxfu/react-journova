import React, { useState, useEffect } from 'react';
import { supabase } from '../../client'
import { useParams, Link } from 'react-router-dom';


const ViewPost = ({ userID }) => {
    const { id } = useParams();

    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [newComment, setNewComment] = useState('');

    const updateCount = async () => {
        setIsUpdating(true);

        const newCount = post.likeCount + 1;
        setPost((prev) => ({ ...prev, likeCount: newCount }));

        const { error } = await supabase
            .from('Posts')
            .update({ like_count: newCount })
            .eq('id', id)

        if (error) {
            console.error('Error updating like count:', error);
            // Revert to the old count on error
            setPost((prev) => ({ ...prev, likeCount: post.likeCount }));
        }

        setIsUpdating(false);
    }

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                // Fetch the post
                const { data: postData, error: postError } = await supabase
                    .from('Posts')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (postError) throw postError;

                setPost({
                    id: postData.id,
                    title: postData.title || '',
                    description: postData.description || '',
                    image: postData.image || '',
                    category: postData.category || '',
                    likeCount: postData.like_count || 0,
                });

                // Comments should only be fetched after successfully fetching the post
                const { data: commentsData, error: commentsError } = await supabase
                    .from('Comments')
                    .select('*')
                    .eq('post_id', id)
                    .order('created_at', { ascending: true });

                // console.log(commentsData)

                if (commentsError) throw commentsError;
                setComments(commentsData);
            } catch (error) {
                setError('An error occurred while fetching the post.');
                console.error('Error fetching:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    // Function to handle changes to the comment input
    const handleInputChange = (event) => {
        setNewComment(event.target.value);
    };

    const createComment = async (event) => {
        event.preventDefault();
        const { data, error } = await supabase
            .from('Comments')
            .insert({
                post_id: id,
                user_id: userID,
                comment_text: newComment,
                like_count: 0
            })
            .select();

        if (error) {
            console.error('Error inserting comment:', error);
        }
        setNewComment('');
    };


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!post) return <div>Post not found.</div>;

    return (
        <div>
            <img src={post.image} alt={post.title} />
            <button className="likeButton" onClick={updateCount} disabled={isUpdating}>
                🤍: {post.likeCount}
            </button>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <Link to={`/edit/${post.id}`}><button>Edit</button></Link>

            <div className="comments-section">
                {comments.map(comment => (
                    <div key={comment.comment_id} className="comment">
                        <p>{comment.comment_text}</p>
                        <span>Posted by: {comment.user_id}</span>
                        <span>Likes: {comment.like_count}</span>
                    </div>

                )
                )}

            </div>
            <br />
            <form onSubmit={createComment}>
                <textarea rows="1" cols="20" id="commentText" name="commentText" value={newComment} onChange={handleInputChange} required >
                </textarea>
                <button type="submit">Post Comment</button>
            </form>

        </div >
    );
};


export default ViewPost;