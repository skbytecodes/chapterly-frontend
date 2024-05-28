import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

function FeaturedAuthors() {
  const { isLoading, data, isError, error } = useQuery(
    "fetch-featured-authors",
    () => {
      return axios.get("http://localhost:8080/api/v1/featuredAuthors/5");
    }
  );

  return (
    <div className="featured_authors  h-52 flex flex-col justify-evenly bg-gray-100 mt-10">
      <div className="auth_title_container  flex items-center justify-center text-lg ">
        <p id="feat_authors">Featured Authors</p>
      </div>
      <div className="flex justify-center">
      <ul className="authors_list  flex h-32 overflow-x-scroll items-center">
        {data?.data.map((author) => (
          <Link to={`/author/${author.name}`}>
          <li className="auth_img_div h-28 min-w-[5em] mx-4 flex flex-col justify-between items-center text-center">
            <img
              className="auth_img h-[3em] rounded-full"
              src={author.imageUrl}
            />
            <div className="h-12 flex justify-center items-center text-sm">
              <p>{author.name}</p>
            </div>
          </li>
          </Link>
        ))}
      </ul>
      </div>
    </div>
  );
}

export default FeaturedAuthors;
