import React, { useState, Fragment } from "react";
import BottomTab from "../../more/BottomTab";
import MetaData from "../../more/Metadata";
import "./Search.css";

const Search = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push("/products");
    }
  };

  const handleBackButton = () => {
    history.goBack();
  };
 
  return (
    <Fragment>
      <MetaData title="Search" />
      <div className="searchContainer">
        <button className="backButton" onClick={handleBackButton}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-arrow-left"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
            />
          </svg>
          Back
        </button>
        
        <form className="searchBox" onSubmit={searchSubmitHandler}>
          <div className="searchInputWrapper">
            <input
              type="text"
              placeholder="Search for items ..."
              onChange={(e) => setKeyword(e.target.value)}
              value={keyword}
            />
            <button type="submit" className="searchButton" id="searby">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </button>
          </div>
        </form>
      </div>
      <BottomTab />
    </Fragment>
  );
};

export default Search;