import { getAllCategories } from "../modules/CategoryManager";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export const AllCategories = () => {
  const [categories, updateCategories] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getAllCategories().then((categories) => updateCategories(categories));
  }, []);

  const goToNewCategory = (evt) => {
    evt.preventDefault();
    history.push("category/new");
  };

  return (
    <>
      <h1>Categories: </h1>
      <ul>
        {categories.map((c) => {
          return <li>{c.name}</li>;
        })}
      </ul>
      <button onClick={goToNewCategory}>Add Category</button>
    </>
  );
};
