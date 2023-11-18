import { Link } from 'react-router-dom'
import { isYouTubeVideo, getYouTubeEmbedURL } from '../utils/utils';

const Card = ({ id, category, timeAgo, image, title, likeCount }) => {

    const handleImageError = (e) => {
        e.target.src = './Journova.png';
    };

    return (
        <div className="card">
            <Link to={`/view/${id}`}>
                {isYouTubeVideo(image) ? (
                    <iframe
                        src={getYouTubeEmbedURL(image)}
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title='{title}'
                        className="video"
                    ></iframe>
                ) : (
                    <img src={image} alt={title} onError={handleImageError} />
                )}

                <div className="overlay">
                    <p className="category">{category}</p>
                    <p className="timeAgo"> {timeAgo}</p>
                    <p className="likeCount">🤍 {likeCount}</p>
                    <p className="title">{title}</p>
                </div>
            </Link>
        </div>
    );
};

export default Card;