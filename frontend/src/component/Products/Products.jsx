import React, { useEffect, useState } from "react";
import Footer from "../../Footer";
import Header from "../Home/Header";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../more/Loader";
import ProductCard from "./ProductCard";
import { clearErrors, getProduct } from "../../actions/ProductActions";
import Pagination from "react-js-pagination";
import "./Product.css";
import Typography from "@material-ui/core/Typography";
import MetaData from "../../more/Metadata";
import BottomTab from "../../more/BottomTab";

const categories = [
  "Fresh Produce",
  "Dairy & Eggs",
  "Bakery & Breads",
  "Snacks & Packaged Foods",
  "Beverages",
  "Grains, Pulses & Flours",
  "Health & Diet Essentials",
  "Others"
];

const Products = ({ match }) => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
  } = useSelector((state) => state.products);

  const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, category));
  }, [dispatch, keyword, currentPage, category, error]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title="Products" />
          <Header />
          <div className="products-container">
            {products.length === 0 ? (
              ""
            ) : (
              <div className="products-header">
                <h2 className="products-title">
                  {category ? `${category}` : "Featured Products"}
                </h2>
                <div className="products-divider"></div>
              </div>
            )}

            <div className="category-dropdown">
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setCurrentPage(1); // also reset here for safety
                }}
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="products-content">
              {products.length === 0 ? (
                <div className="no-products">
                  <div className="no-products-icon">🛍️</div>
                  <h3>No Products Found</h3>
                  <p>
                    Try adjusting your search criteria or browse different
                    categories
                  </p>
                </div>
              ) : (
                <div className="products-grid">
                  {products &&
                    products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                </div>
              )}
            </div>

            {products.length > 0 && (
              <div className="pagination-container">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resultPerPage}
                  totalItemsCount={productsCount}
                  onChange={setCurrentPageNo}
                  nextPageText="Next"
                  prevPageText="Prev"
                  firstPageText="First"
                  lastPageText="Last"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageItemActive"
                  activeLinkClass="pageLinkActive"
                />
              </div>
            )}
          </div>
          <Footer />
          <BottomTab />
        </>
      )}
    </>
  );
};

export default Products;
