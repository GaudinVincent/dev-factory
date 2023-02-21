import React from "react";



function Post(props) {
  return (
    <div>
    <h1>{props.Publication}</h1>
    <p>{props.input}</p>
    <small>Publié le {props.date}</small>
    </div>
  
)};

export default Post;
