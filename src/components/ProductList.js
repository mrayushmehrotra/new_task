import React from 'react';
import { useSelector } from 'react-redux';

const ProductList = () => {
    const { products } = useSelector((state) => state.productData);

    return (
        <div>
            {products.map((product) => (
                <div key={product.id}>
                    <h3>{product.title}</h3>
                    <p>{product.description}</p>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
