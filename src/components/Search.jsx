import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import useDebounce from "./UseDebounce"; // Assuming you're still using the debounce hook

const Search = () => {
  const [search, setSearch] = useState(""); // For the search input
  const [category, setCategory] = useState(""); // For the selected category
  const [categories, setCategories] = useState([]); // Categories fetched from API
  const [data, setData] = useState(null); // Products data from API
  const debouncedSearch = useDebounce(search, 900); // Debounced search

  // Fetch categories on component mount
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/categories")
      .then((res) => {
        setCategories(res.data); // Store categories as array of objects with 'slug', 'name', and 'url'
      })
      .catch((error) => {
        console.error("Error fetching categories", error);
      });
  }, []);

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

  return (
    <>
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        className="border p-2 rounded"
      />

      {/* Category Dropdown */}
      <select
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 rounded ml-4"
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
    </>
  );
};

export default Search;
