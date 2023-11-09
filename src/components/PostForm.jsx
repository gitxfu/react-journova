const PostForm = ({ data, onChange, onSubmit }) => {
    const CATEGORIES = ['Blog', 'Question'];

    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="title">Title</label> <br />
            <input type="text" id="title" name="title" value={data.title} onChange={onChange} required/><br />
            <br />

            <label htmlFor="description">Description</label><br />
            <textarea rows="5" cols="50" id="description" name="description" value={data.description} onChange={onChange} required>
            </textarea>
            <br />

            <label htmlFor="image">Image</label><br />
            <input type="text" id="image" name="image" value={data.image} onChange={onChange} required/><br />
            <br />

            <div className="mini-container">
                <span>Post Category: </span>
                {CATEGORIES.map(option => (
                    <span key={option}>
                        <input
                            type="radio"
                            id={`category-${option}`}
                            name="category"
                            value={option}
                            checked={data.category == option}
                            onChange={onChange}
                            required
                        />
                        <label htmlFor={`category-${option}`}>{option}</label>
                    </span>
                ))}
            </div>

            <label htmlFor="secretKey">Secret Key</label><br />
            <input type="text" id="secretKey" name="secretKey" value={data.secretKey} onChange={onChange} required/><br />
            <br />

            <input type="submit" value="Save" />
        </form>
    )

};
export default PostForm;