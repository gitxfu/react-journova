import React, { useState, useEffect } from 'react';
import { supabase } from '../../client'
import { useParams, Link } from 'react-router-dom';
import { isYouTubeVideo, getYouTubeEmbedURL } from '../utils/utils';
import "./ViewPost.css"
import LoadingAnimation from '../components/LoadingAnimation';

const ViewPost = ({ userID }) => {
    const { id } = useParams();

    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isUpdatingPostLike, setIsUpdatingPostLike] = useState(false);
    const [isUpdatingCommentLike, setIsUpdatingCommentLike] = useState(false);
    const [newComment, setNewComment] = useState('');

    const handleImageError = (e) => {
        e.target.src = '../Journova.png';
        // './Journova.png' didn't work because http://localhost:5173/view/Journova.png 
    };


    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                // Fetch the post
                const { data, error } = await supabase
                    .from('Posts')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) {
                    throw error;
                }

                setPost({
                    id: data.id,
                    title: data.title || '',
                    description: data.description || '',
                    image: data.image || '',
                    category: data.category || '',
                    likeCount: data.like_count || 0,
                });
            } catch (error) {
                setError('An error occurred while fetching the post.');
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            };
        };

        fetchPost();
    }, [id]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const { data, error } = await supabase
                    .from('Comments')
                    .select('*')
                    .eq('post_id', id)
                    .order('created_at', { ascending: true });

                if (error) throw error;
                setComments(data);
            } catch (error) {
                setError('An error occurred while fetching the comments.');
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, [id, post]); // Comments should only be fetched after successfully fetching the post

    // Function to handle changes to the comment input
    const handleInputChange = (event) => {
        setNewComment(event.target.value);
    };

    const createComment = async (event) => {
        event.preventDefault();
        const newCommentObj = {
            post_id: id,
            user_id: userID,
            comment_text: newComment,
            like_count: 0
        };

        try {
            const { data, error } = await supabase
                .from('Comments')
                .insert(newCommentObj)
                .select();

            if (error) throw error;

            // Update the comments state to we don't need to refresh the page to see the new comment
            setComments(comments => [...comments, data[0]]);

            setNewComment('');

        } catch (error) {
            console.error('Error inserting comment:', error);
        }
    };

    const updatePostLike = async () => {
        setIsUpdatingPostLike(true);

        const newCount = post.likeCount + 1;
        setPost((prev) => ({ ...prev, likeCount: newCount }));

        const { error } = await supabase
            .from('Posts')
            .update({ like_count: newCount })
            .eq('id', id)

        if (error) {
            console.error('Error updating post like count:', error);
            // Revert to the old count on error
            setPost((prev) => ({ ...prev, likeCount: post.likeCount }));
        }

        setIsUpdatingPostLike(false);
    }

    const updateCommentLike = async (commentId) => {
        setIsUpdatingCommentLike(true);

        const updatedComments = comments.map(comment => {
            if (comment.comment_id === commentId) {
                return { ...comment, like_count: comment.like_count + 1 }
            }
            return comment;
        });

        setComments(updatedComments);

        const updatedComment = updatedComments.find(comment => comment.comment_id === commentId);

        const { error } = await supabase
            .from('Comments')
            .update({ like_count: updatedComment.like_count })
            .eq('comment_id', commentId)

        if (error) {
            console.error('Error updating comment like count:', error);
        }

        setIsUpdatingCommentLike(false);
    }

    if (loading) return <LoadingAnimation />;
    if (error) return <div>Error: {error}</div>;
    if (!post) return <div>Post not found.</div>;

    return (
        <div className='detail-page'>
            <div className="media-container">
                {isYouTubeVideo(post.image) ? (
                    <iframe
                        src={getYouTubeEmbedURL(post.image)}
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={post.title}
                        className="video"
                    ></iframe>
                ) : (
                    <img src={post.image} alt={post.title} onError={handleImageError} className="post-image" />
                )}
            </div>

            <div className="content-container">
                <h2 className="post-title">{post.title}</h2>
                <p className="post-description">{post.description}</p>
                <Link to={`/edit/${post.id}`} className="edit-link"><button className="edit-button"> Edit Post </button></Link>
                <div className="comments-section">
                    <h3 className="comment-title"> Comments </h3>
                    {comments.map(comment => (
                        <div key={comment.comment_id} className="comment">
                            <span className="comment-user"> {comment.user_id}</span>
                            <p className="comment-text">{comment.comment_text}</p>
                            <button className="likeButton" onClick={() => updateCommentLike(comment.comment_id)} disabled={isUpdatingCommentLike}>
                                🤍 {comment.like_count}
                            </button>
                        </div>
                    ))}
                </div>

                <hr className="comment-divider" />

                <div className="post-like">
                    <h3> What do you think? </h3>
                    <button className="post-like-button" onClick={updatePostLike} disabled={isUpdatingPostLike}>
                        🤍 {post.likeCount}
                    </button>
                </div>

                <form onSubmit={createComment} className="comment-form">
                    <textarea
                        id="commentText"
                        name="commentText"
                        className="comment-textarea"
                        value={newComment}
                        placeholder="Add a comment ..."
                        onChange={handleInputChange}
                        required
                    ></textarea>
                    <button type="submit" className="post-comment-button">Post Comment</button>
                </form>
            </div>
        </div>
    );
};


export default ViewPost;