import { useState, useEffect } from "react";
import { addCategory } from "../modules/CategoryManager";
import { useHistory } from "react-router-dom";

export const AddCategoryForm = () => {
  const [category, updateCategory] = useState({ name: "" });
  const history = useHistory();

  const handleCategory = (event) => {
    updateCategory({ name: event.target.value });
  };

  const submit = (evt) => {
    evt.preventDefault();
    addCategory(category).then(() => history.push("/category"));
  };

  return (
    <>
      <h1>Create new category</h1>
      <p>Enter a category name</p>
      <input onChange={handleCategory} />
      <button onClick={submit}>save</button>
    </>
  );
};
