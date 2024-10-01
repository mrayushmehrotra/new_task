import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import useDebounce from "./UseDebounce"; // Assuming you're still using the debounce hook
import "./CSS/Search.css";
import { fetchCategories, selectCategories } from "../Redux/CategorySlice";
import { useDispatch, useSelector } from "react-redux";

const Search = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const [search, setSearch] = useState(""); // For the search input
  const [category, setCategory] = useState(""); // For the selected category
  const [data, setData] = useState(null); // Products data from API
  const debouncedSearch = useDebounce(search, 900); // Debounced search

  // Fetch categories on component mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Fetch products by category or search
  useEffect(() => {
    let url;

    if (category) {
      url = `https://dummyjson.com/products/category/${category}`;
    } else if (debouncedSearch) {
      url = `https://dummyjson.com/products/search?q=${debouncedSearch}`;
    } else {
      setData(null); // Clear data if no category or search term
      return;
    }

    axios
      .get(url)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching products", error);
      });
  }, [category, debouncedSearch]);

  // Update URL with search and category
  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.append("search", debouncedSearch);
    if (category) params.append("category", category);

    window.history.pushState({}, "", `?${params.toString()}`);
  }, [debouncedSearch, category]);

  return (
    <center className="mt-10 ">
      <form className="form m-5" onSubmit={(e) => e.preventDefault()}>
        <button type="submit">
          <svg
            width="17"
            height="16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-labelledby="search"
          >
            <path
              d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
              stroke="currentColor"
              strokeWidth="1.333"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </button>
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          className="border border-stone-200 text-gray-500 p-2 rounded input"
          placeholder="Search..."
        />
        <button onClick={() => setSearch("")} className="reset" type="reset">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </form>

      {/* Category Dropdown */}
      <select
        onChange={(e) => setCategory(e.target.value)}
        className="border-2 bg-gray-200 text-black border-stone-200 p-2 rounded ml-4"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat.slug} value={cat.slug}>
            {cat.name}
          </option>
        ))}
      </select>

      {/* Product Display */}
      <div className="mt-4">
        {data && data.products && <ProductCard products={data.products} />}
      </div>
    </center>
  );
};

export default Search;
