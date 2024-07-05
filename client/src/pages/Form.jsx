import { useState, useEffect } from "react";

export default function Form() {
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

  // we need state to save the form data
  // formData = {key: value, key: value}
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category_id: "1",
  });

  // a handle submit function
  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:8008/postFormData", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  // function handleSubmit() {
  //prevent default
  //fetch post to the endpoint
  //     fetch("url", {method: "POST", body: JSON.stringify(formData), headers: {"Content-Type": "application/json"}})
  // }
  // a handle change function
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  // function handleChange(e) {
  // we need to add the values from the initial state
  // we need to set the properties for the new object
  // setFormData({...formData, [e.target.name]: e.target.value})
  return (
    <form onChange={handleChange} onSubmit={handleSubmit}>
      <h2>New post</h2>
      {/* you need to have a form here with two events: one to submit, one to track changes */}
      {/* remember to be consistent with how you name the name attribute!!!!
  the name attribute in your input should be the same as the database column where you are storing the data  */}
      <label htmlFor="title">Title</label>
      <input type="text" id="title" name="title" required />
      <label htmlFor="content">Content</label>
      <textarea id="content" name="content" required />
      <label htmlFor="category_id">Category</label>
      <select id="category_id" name="category_id" required>
        {categories.map((category, index) => {
          return (
            <option key={index} value={category.id}>
              {category.name}
            </option>
          );
        })}
      </select>
      <button type="submit">Submit</button>
      <p>{JSON.stringify(formData)}</p>
    </form>
  );
}
