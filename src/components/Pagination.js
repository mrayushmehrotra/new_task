import React from 'react';

const Pagination = ({ page, totalPages, onPageChange }) => {
    const handlePrevious = () => {
        if (page > 1) onPageChange(page - 1);
    };

    const handleNext = () => {
        if (page < totalPages) onPageChange(page + 1);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
            <button onClick={handlePrevious} disabled={page === 1}>
                Previous
            </button>
            <span style={{ margin: '0 10px' }}>
                Page {page} of {totalPages}
            </span>
            <button onClick={handleNext} disabled={page === totalPages}>
                Next
            </button>
        </div>
    );
};

export default Pagination;
