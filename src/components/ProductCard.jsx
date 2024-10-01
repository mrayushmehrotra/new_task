import React from "react";
const ProductList = ({ products }) => {
  return (
    <div className="w-full px-8 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="group border border-gray-200 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="w-full h-48 mb-4 overflow-hidden rounded-lg bg-gray-100">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                src={product.images[0]}
                alt={product.title}
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 truncate">
              {product.title}
            </h3>
            <p className="text-sm text-gray-500 line-clamp-2 mt-2">
              {product.description}
            </p>
            <div className="mt-4">
              <span className="text-xl font-bold text-indigo-600">
                ${product.price}
              </span>
            </div>
            <button className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-300">
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Uncomment and implement if you want to handle loading and pagination */}
      {/* 
      {loading && products.length > 0 && (
        <div className="w-full px-8 py-12 flex justify-center items-center">
          <p className="text-xl text-gray-500">Loading more products...</p>
        </div>
      )}
      
      {!hasMore && (
        <div className="w-full px-8 py-12 flex justify-center items-center">
          <p className="text-xl text-gray-500">No more products to load.</p>
        </div>
      )}
      */}
    </div>
  );
};

export default ProductList;
