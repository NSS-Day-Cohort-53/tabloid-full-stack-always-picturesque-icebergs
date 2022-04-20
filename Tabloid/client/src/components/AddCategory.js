import { useState, useEffect } from "react";
import { addCategory } from "../modules/CategoryManager";

export const AddCategoryForm = () => {
  const [category, updateCategory] = useState({ Name: "" });

  const handleCategory = (event) => {
    updateCategory({ Name: event.target.value });
  };

  const submitCategory = () => {};

  return (
    <>
      <h1>Create new category</h1>
      <p>Enter a category name</p>
      <input type="text" onChange={handleCategory}></input>
      <button>Save</button>
    </>
  );
};
