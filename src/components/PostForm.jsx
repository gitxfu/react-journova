import "./PostForm.css"

const PostForm = ({ data, onChange, onSubmit, error }) => {
    const CATEGORIES = ['Blog', 'Question'];

    return (
        <form className="post-form" onSubmit={onSubmit}>
            <div className="post-form__category">
                <label className="post-form__label">Post Category:</label>
                <div className="post-form__category-options">
                    {CATEGORIES.map(option => (
                        <label key={option} className="post-form__category-option">
                            <input
                                type="radio"
                                id={`category-${option}`}
                                name="category"
                                value={option}
                                checked={data.category === option}
                                onChange={onChange}
                                required
                            />
                            {option}
                        </label>
                    ))}
                </div>
            </div>

            <div className="post-form__field">
                <label htmlFor="title" className="post-form__label">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={data.title}
                    onChange={onChange}
                    className="post-form__input"
                    required
                />
            </div>

            <div className="post-form__field">
                <label htmlFor="description" className="post-form__label">Description</label>
                <textarea
                    // rows="5"
                    // cols="50"
                    id="description"
                    name="description"
                    value={data.description}
                    onChange={onChange}
                    className="post-form__textarea"
                    required
                />
            </div>

            <div className="post-form__field">
                <label htmlFor="image" className="post-form__label">Image or Video Link</label>
                <input
                    type="text"
                    id="image"
                    name="image"
                    value={data.image}
                    onChange={onChange}
                    className="post-form__input"
                />
            </div>

            <div className="post-form__field">
                <label htmlFor="secretKey" className="post-form__label">Secret Key</label>
                <input
                    type="text"
                    id="secretKey"
                    name="secretKey"
                    value={data.secretKey}
                    onChange={onChange}
                    className="post-form__input"
                    required
                />
            </div>

            <input type="submit" value="Save" disabled={!!error} className="post-form__submit-button" />
        </form>
    );
};

export default PostForm;