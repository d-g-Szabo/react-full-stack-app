import { useState } from "react";

export default function NewCategory() {
  const [newCategory, setNewCategory] = useState("");

  function onAddCategory(e) {
    e.preventDefault();
    const categoryName = newCategory;
    console.log(categoryName);
    fetch("http://localhost:8008/addCategory", {
      method: "POST",
      body: JSON.stringify({ name: categoryName }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  return (
    <div>
      <h2>Add new category</h2>
      <label htmlFor="category-name"> Name:</label>
      {/* Add an onChange event to the input element to update the state of the newCategory variable when the user types in the input field*/}
      <input
        type="text"
        name="category-name"
        onChange={(e) => {
          setNewCategory(e.target.value);
        }}
      />
      <button type="submit" onClick={onAddCategory}>
        Add
      </button>
    </div>
  );
}
