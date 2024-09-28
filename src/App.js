import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './Redux/actions/ProductActions';
import { fetchCategories } from './Redux/actions/CategoryActions';
import CategoryDropdown from './components/CategoryDropdown';
import ProductList from './components/ProductList';
import Pagination from './components/Pagination';
import SearchBar from './components/SearchBar';

const App = () => {
    const dispatch = useDispatch();
    const [category, setCategory] = useState('');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    const productData = useSelector((state) => state.productData);
    const { products, total } = productData;

    useEffect(() => {
        dispatch(fetchProducts(category, search, page));
    }, [dispatch, category, search, page]);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const totalPages = Math.ceil(total / 10);

    return (
        <div>
            <h1>Product List</h1>
            <CategoryDropdown onChange={setCategory} />
            <SearchBar onSearch={setSearch} />
            <ProductList />
            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
    );
};

export default App;
