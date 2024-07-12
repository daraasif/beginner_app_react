import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"


const EditPost = ({
    posts, handleEdit, editBody, setEditBody, editTitle, setEditTitle
}) => {
    const { id } = useParams();
    const post = posts.find((post) => post.id === id);
    useEffect(() => {
        if (post) {
            setEditBody(post.body);
            setEditTitle(post.title)
        }
    }, [post, setEditBody, setEditTitle]);
    return (
        <main className="NewPost">
            {editTitle &&
                <>
                    <h1>Edit Post</h1>

                    <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor="postTitle">Title</label>
                        <input
                            type="text"
                            name="postTitle"
                            id="postTitle"
                            value={editTitle}
                            onChange={e => setEditTitle(e.target.value)}
                        />
                        <label htmlFor="postBody">Post:</label>
                        <textarea
                            name="postBody"
                            id="postBody"
                            required
                            value={editBody}
                            onChange={e => setEditBody(e.target.value)}
                        ></textarea>
                        <button type="submit" onClick={() => handleEdit(post.id)}>Edit</button>
                    </form>

                </>
            }
            {
                !editTitle &&
                <>
                    <h1>Post not found</h1>
                    <Link to="/">Go back</Link>
                </>
            }
        </main>

    )
}

export default EditPost