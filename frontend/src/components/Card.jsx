import React from "react";

function Card(props) {
    function handleEdit(event) {

    }

    function handleDelete(event) {
        event.preventDefault();
        let post = {
            username:props.username,
            title:props.title,
            postText:props.postText
        };

        fetch("/delete", {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify(post)
        }).then(response => response.json()).then(data => {
            console.log(data);
        }).catch(err => {
            console.log(`Error deleting post ${err}`);
        });
    }

    return (
        <div className="card text-bg-dark m-3 mx-auto" style={{width: "50rem"}}>
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">By: {props.username}</h6>
                <p className="card-text">{props.postText}</p>
                <p className="card-text">{props.date}</p>
                <div className="d-flex justify-content-center">
                    <div className="col-md-auto m-1">
                        <button className="btn btn-success" type="submit" onClick={handleEdit}>Edit</button>
                    </div>
                    <div className="col-md-auto m-1">
                        <button className="btn btn-danger" type="submit" onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card