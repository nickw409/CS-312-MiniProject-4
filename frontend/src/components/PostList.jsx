import React, { useEffect, useState } from "react";
import Card from "./Card";

function PostList() {
    /*const [posts, setPosts] = useState([{
        id:1,
        title:"hello",
        username:"nick",
        postText:"Whatever i want",
        date:"11/7/24"
    },
    {
        id:2,
        title:"hell",
        username:"nic",
        postText:"Whar i want",
        date:"11/7/2"
    }]);
    */
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("/posts", {
            method:'GET',
            headers: {
                'Content-Type':'application/json'
            },
        }).then(response => response.json()).then(data => {
            //console.log(data);
            data.forEach((post) => {
                let found = false;
                posts.forEach((tmpPost) => {
                    if (post.title === tmpPost.title && post.username === tmpPost.username) {
                        found = true;
                    }
                })
                if (!found) {
                    let tmpArray = posts;
                    tmpArray.push(post);
                    setPosts(tmpArray);
                }
            })
            //console.log(posts);
    
        }).catch(err => {
            console.log(`Error fetching posts ${err}`);
        });
    }, []);

    function createCard(post) {
        return <Card 
        key={post.id}
        title={post.title}
        username={post.username}
        postText={post.postText}
        date={post.date}
        />;
    }

    return (
        <div>
            {console.log(posts)}
            {posts.map(createCard)}
        </div>
    );
}

export default PostList