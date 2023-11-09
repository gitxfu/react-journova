
import Card from '../components/Card';

const Home = ({ posts }) => {
    return (
        <div className="card-container">
            {
                posts && posts.length > 0 ?
                    posts.map((post, index) =>
                        <Card key={index}
                            id={post.id}
                            timeAgo={post.timeAgo}
                            title={post.title}
                            image={post.image}
                            likeCount={post.like_count}
                        />
                    ) : <h2>{'No Post Yet 😞'}</h2>
            }
        </div>
    );


}

export default Home;