// Here I will fetch the posts from the server, which is getting the posts from the database

import { useEffect } from "react";
import { useState } from "react";
import "./Posts.css";

export default function Posts() {
  // we need state to save the values of posts
  const [posts, setPosts] = useState([]);
  // we need useEffect to fetch the data

  useEffect(() => {
    async function getPosts() {
      const response = await fetch("http://localhost:8008/getFormData");
      const data = await response.json();
      setPosts(data);
    }

    getPosts();
  }, [posts]);

  // useEffect to fetch the posts to the server if the posts state changes eg. if a post got a like

  // useEffect(() => {
  //we need a function to get the posts
  // this function is async and uses fetch
  // once you fetch the data, you will set the state variable to be the posts data
  // }, [])
  // DECESION: you can have a separate function to get the posts, and call the function in the useEffect hookl or you can write the function directly in the useEffect hook

  // function to delete a post on the click of a button
  function deletePost(id) {
    // fetch to the server to delete the post on id
    fetch(`http://localhost:8008/deleteFormData/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // function to like a post on the click of a button
  function likePost(id) {
    // Unary Plus ("+" works like: "parseInt()") Operator to convert the string to a number
    let like = 0;
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].id === id) {
        like = +posts[i].likes + 1;
      }
    }
    console.log(posts);

    let post = `{"likes": "${like}"}`;
    // const post = `{"title":"${posts[id].title}","content":"${posts[id].content}","likes":${like},"category_id":${posts[id].id}}`;
    console.log(post);
    fetch(`http://localhost:8008/updateLikes/${id}`, {
      method: "PUT",
      body: post,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(posts);
  }

  return (
    <div>
      <h2>Posts</h2>
      {/* I will fetch the posts here */}
      {/* I will map over the posts and display them here */}
      {/* Conditional rendering idea: you can have a list of titles and the user clicks on them to see the full post  */}
      {posts.map((post, index) => {
        return (
          <div className="post-container" key={index}>
            <div>
              <div>
                <h3>{post.title}</h3>
                <p>{post.category}</p>
              </div>
              <div>
                <p>{post.content}</p>
              </div>
              <p>{post.likes}</p>
            </div>
            <div className="post-buttons">
              <button
                onClick={() => {
                  likePost(post.id);
                }}
              >
                Like
              </button>
              <button
                onClick={() => {
                  deletePost(post.id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
