import { useState, useEffect } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";

export default function Form() {
  // State for storing the category data
  const [categories, setCategories] = useState([]);

  // useEffect to fetch the categories
  useEffect(() => {
    async function getCategories() {
      const response = await fetch(
        "https://react-full-stack-app-server-5bod.onrender.com/getCategories"
      );
      const data = await response.json();
      setCategories(data);
    }
    getCategories();
  }, [categories]);

  // we need state to save the form data
  // formData = {key: value, key: value}
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category_id: "1",
  });

  // a handle submit function
  function handleSubmit(e) {
    e.preventDefault(); // prevent default form submission
    fetch(
      "https://react-full-stack-app-server-5bod.onrender.com/postFormData",
      {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  // function handleChange
  // we need to add the values from the initial state
  // we need to set the properties for the new object
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const navigate = useNavigate();
  const location = useLocation();

  const handleLinkClick = (e) => {
    // Prevent default link behavior
    e.preventDefault();
    // Check if the current pathname matches the link's target
    if (location.pathname === "/form/new-category") {
      // Navigate back or to a different route
      navigate(-1); // Go back to the previous page
      // Or navigate('/some-other-route'); to go to a specific route
    } else {
      // Proceed to the link's target
      navigate("/form/new-category");
    }
  };

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
      <Link to="/form/new-category" onClick={handleLinkClick}>
        New Category
      </Link>
      <Outlet />
      <button type="submit">Submit</button>
      <p>{JSON.stringify(formData)}</p>
    </form>
  );
}
