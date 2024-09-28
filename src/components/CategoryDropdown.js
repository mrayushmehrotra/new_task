import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../Redux/actions/CategoryActions';

const CategoryDropdown = ({ onChange }) => {
    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.categoryData);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    return (
        <select onChange={(e) => onChange(e.target.value)}>
            <option value=''>All Categories</option>
            {categories && categories.map((category) => (
                <option key={category} value={category}>{category}</option>
            ))}
        </select>
    );
};

export default CategoryDropdown;
