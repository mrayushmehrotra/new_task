import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./components/ProductCard";
import {
  incrementPage,
  decrementPage,
  fetchProducts,
} from "./Redux/paginationSlice";
import Search from "./components/Search";
import "./components/CSS/Loader.css";
import Logo from "../public/bannerNavbar.jpg";

function App() {
  const dispatch = useDispatch();
  const { page, products, loading } = useSelector((state) => state.pagination);
  const previous = "<";
  const next = ">";
  // Fetch products when page number changes
  useEffect(() => {
    dispatch(fetchProducts(page));
  }, [dispatch, page]);

  // Update URL query string when page changes
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("page", page);
    const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
    window.history.pushState(null, "", newUrl);
  }, [page]);

  return (
    <>
      <img
        className="h-[20vh]  top-0 w-full opacity-25 absolute z-[-2]"
        src={Logo}
        alt="banner"
      />

      <Search />

      {loading ? (
        <div className="loader"></div>
      ) : (
        <div className="p-16">
          {products && <ProductCard products={products} />}
        </div>
      )}
      <center>
        <div className="flex p-12 items-center space-x-4 justify-center mt-4">
          <button
            onClick={() => dispatch(decrementPage())}
            disabled={page === 1}
            className={`px-4 py-2 text-white rounded-md ${
              page === 1
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {previous}
          </button>

          <span className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md">
            Page {page}
          </span>

          <button
            onClick={() => dispatch(incrementPage())}
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            {next}
          </button>
        </div>
      </center>
    </>
  );
}

export default App;
