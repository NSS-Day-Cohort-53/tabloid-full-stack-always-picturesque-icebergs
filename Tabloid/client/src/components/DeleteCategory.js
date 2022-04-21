import { useState, useEffect } from "react";
import { deleteCategory } from "../modules/CategoryManager";
import { getAllCategories } from "../modules/CategoryManager";
import { useParams } from "react-router-dom";

export const DeleteCategoryForm = () => {
  const [categories, updateCategories] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    getAllCategories().then((categories) => updateCategories(categories));
  }, []);

  return (
    <>
      <h1>Are you sure you want to delete?</h1>
      <h2>{`category name: ${id}`}</h2>
      <h2>{id}</h2>
    </>
  );
};
