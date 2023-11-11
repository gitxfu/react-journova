import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../client'

const Card = ({ id, likeCount, timeAgo, image, title }) => {
    return (
        <div className="card">
            <p className="timeAgo">Posted {timeAgo}</p>
            <Link to={`/view/${id}`}>
                <img src={image} alt={title} />
            </Link>
            <h2 className="title">{title}</h2>
            <h2 className="likeCount">🤍 {likeCount}</h2>

        </div>
    );
};

export default Card;