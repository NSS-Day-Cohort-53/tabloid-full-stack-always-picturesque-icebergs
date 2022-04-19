import { getAllCategories } from "../modules/CategoryManager";
import { useState, useEffect } from "react";

export const AllCategories = () => {
  const [categories, updateCategories] = useState([]);

  useEffect(() => {
    getAllCategories().then((categories) => updateCategories(categories));
  }, []);

  return (
    <>
      <h1>Categories: </h1>
      <ul>
        {categories.map((c) => {
          return <li>{c.name}</li>;
        })}
      </ul>
    </>
  );
};
