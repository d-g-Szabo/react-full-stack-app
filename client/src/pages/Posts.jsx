import { useEffect } from "react";
import { useState } from "react";
import "./Posts.css";
import { useSearchParams } from "react-router-dom";

export default function Posts() {
  // we need state to save the values of posts
  const [posts, setPosts] = useState([]);

  // searchParams is an array of key-value pairs from the URL query string (e.g. ?filter=category)
  const [searchParams, setSearchParam] = useSearchParams();
  // we need to get the filter from the URL
  const filter = searchParams.get("filter");

  // we need useEffect to fetch the data from the server
  useEffect(() => {
    async function getPosts() {
      const response = await fetch("http://localhost:8008/getFormData");
      const data = await response.json();
      setPosts(data);
    }

    getPosts();
  }, [posts]);

  // State for storing the category data
  const [categories, setCategories] = useState([]);

  // useEffect to fetch the categories
  useEffect(() => {
    async function getCategories() {
      const response = await fetch("http://localhost:8008/getCategories");
      const data = await response.json();
      setCategories(data);
    }
    getCategories();
  }, []);

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
    // loop through the posts to find the post with the id
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].id === id) {
        // if the id matches
        // increment the likes by 1
        like = +posts[i].likes + 1;
      }
    }

    // post request to update the likes
    let post = `{"likes": "${like}"}`;
    console.log(post);
    fetch(`http://localhost:8008/updateLikes/${id}`, {
      method: "PUT",
      body: post,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // function to handle the change of the select
  const handleChange = (event) => {
    // setSearchParam() is a function that updates the URL query string
    setSearchParam({ filter: event.target.value });
  };

  return (
    <div>
      <h2>Posts</h2>
      {/* I will map over the posts and display them here */}
      <p>Filter: {filter}</p>
      <select onChange={handleChange} value={filter || ""}>
        <option value="">Select</option>
        {categories.map((category, index) => {
          // map over the categories
          // return an option for each category
          return (
            <option key={index} value={category.name}>
              {category.name}
            </option>
          );
        })}
      </select>
      {posts.map((post, index) => {
        // map over the posts
        // return a div for each post
        // if the category of the post matches the filter or there is no filter, display the post
        return post.category === filter || !filter ? (
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
        ) : null;
      })}
    </div>
  );
}
