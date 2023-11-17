import { Link } from 'react-router-dom'
import { isYouTubeVideo, getYouTubeEmbedURL } from '../utils/utils';

const Card = ({ id, category, timeAgo, image, title, likeCount }) => {
    return (
        <div className="card">
            <p className="timeAgo">Posted {timeAgo}</p>
            <p className="Category"> {category} </p>
            {isYouTubeVideo(image) ? (
                <iframe
                    src={getYouTubeEmbedURL(image)}
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={title}
                    className="video"
                ></iframe>
            ) : (
                <img src={image} alt={title} />
            )}
            <Link to={`/view/${id}`}> <h2 className="title">{title}</h2> </Link>

            <h2 className="likeCount">🤍 {likeCount}</h2>
        </div>
    );
};

export default Card;