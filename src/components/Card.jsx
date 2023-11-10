import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../client'

const Card = ({ id, likeCount, timeAgo, image, title }) => {

    const [count, setCount] = useState(likeCount);
    const [isUpdating, setIsUpdating] = useState(false);

    const updateCount = async () => {
        setIsUpdating(true);

        const newCount = count + 1;
        setCount(newCount); // Optimistic update


        const { error } = await supabase
            .from('Posts')
            .update({ like_count: newCount })
            .eq('id', id)

        if (error) {
            console.error('Error updating:', error);
            setCount(count); // Revert to the old count on error
        }

        setIsUpdating(false);
    }

    return (
        <div className="card">
            <p className="timeAgo">Posted {timeAgo}</p>
            <Link to={`/view/${id}`}>
                <img src={image} alt={title} />
            </Link>
            <h2 className="title">{title}</h2>
            <button className="likeButton" onClick={updateCount} disabled={isUpdating}>
                like: {count}
            </button>
        </div>
    );
};

export default Card;