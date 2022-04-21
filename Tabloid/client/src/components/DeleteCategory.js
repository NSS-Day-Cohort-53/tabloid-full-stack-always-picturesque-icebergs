import { useState, useEffect } from "react";
import { deleteCategory } from "../modules/CategoryManager";
import { getCategoryById } from "../modules/CategoryManager";
import { useParams } from "react-router-dom";
import { Link, useHistory } from "react-router-dom";

export const DeleteCategoryForm = () => {
  const [category, updateCategory] = useState({});

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    getCategoryById(id).then((res) => updateCategory(res));
  }, []);

  const delCat = (evt) => {
    evt.preventDefault();
    deleteCategory(category?.id).then(() => history.push("/category"));
  };

  return (
    <>
      <h1>Are you sure you want to delete?</h1>
      <h2>cat: {category.name}</h2>
      <button onClick={delCat}>DELETE</button>
      <Link to={`/category`}>Cancel</Link>
    </>
  );
};
