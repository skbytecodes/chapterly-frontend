import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { selectedCategory } from "../redux/actions";

function CategoryList({ categories }) {
  const dispatch = useDispatch();
  const gotToCategoryPage = (category) => {
    dispatch(selectedCategory(category));
  };

  return (
    <div className="category_list h-32  md:h-40  flex justify-center bg-gray-100">
      <ul className="cat_container  flex items-center overflow-x-scroll  ">
        {categories?.data.map((category) => (
          <Link
            to={`/category/${category.categoryName}`}
            className="category_link mx-4"
            key={category.categoryName}
          >
            <li
              id={category.categoryName}
              key={category.categoryName}
              onClick={() => gotToCategoryPage(category.categoryName)}
              className="flex flex-col justify-center items-center "
            >
              <img
                className="home_cat_img h-9 md:h-16"
                src={category.imageUrl}
              />
              <p className="text-sm text-center">{category.categoryName}</p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default CategoryList;
