import React, { useReducer, useState } from "react";
import PostList from "./PostList";

function BlogPostForm() {
    const [username, setUserName] = useState("");
    const [title, setTitle] = useState("");
    const [postText, setPostText] = useState("");
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    function handleSubmit(event) {
        event.preventDefault();
        setUserName(username);
        setTitle(title);
        setPostText(postText);
        let post = {
            username:username,
            title:title,
            postText:postText
        };

        fetch("/create", {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify(post)
        }).then(response => response.json()).then(data => {
            setUserName("");
            setTitle("");
            setPostText("");
            forceUpdate();
            console.log(data);
        }).catch(err => {
            console.log(`Error creating post ${err}`);
        });
    }

    return (
        <div>
            <div className="m-3">
                <h5 className="text-center">Create Post</h5>
                <form onSubmit={handleSubmit}>
                    <div className="mb-2 w-25 mx-auto">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Username"
                            value={username}
                            onChange={e=>setUserName(e.target.value)}
                        />
                    </div>
                    <div className="mb-2 w-25 mx-auto">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Post Title"
                            value={title}
                            onChange={e=>setTitle(e.target.value)}
                        />
                    </div>
                    <div className="mb-2 w-25 mx-auto">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Post here..."
                            value={postText}
                            onChange={e=>setPostText(e.target.value)}
                        />
                    </div>
                    <div className="d-flex justify-content-center">
                        <input className="btn btn-primary" type="submit" value="Post" />
                    </div>
                </form>
            </div>
            <div className="m-3">
                <PostList />
            </div>
        </div>
    )
}

export default BlogPostForm