import React, { useState } from 'react';
import CatCard from './CatCard';
import Pagination from './Pagination';

const CatList = ({ cats, currentPage, onPageChange, catsPerPage }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'мемные коты', 'ищут хозяина', 'нашли хозяина'];

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    onPageChange(1); // Сбрасываем на первую страницу при изменении категории
  };

  const filteredCats = selectedCategory === 'all'
    ? cats
    : cats.filter(cat => cat.category === selectedCategory);

  // Пагинация после фильтрации
  const totalPages = Math.ceil(filteredCats.length / catsPerPage);
  const paginatedCats = filteredCats.slice(
    (currentPage - 1) * catsPerPage,
    currentPage * catsPerPage
  );

  return (
    <div>
      <div className="cat-filter" style={{ marginBottom: '20px', textAlign: 'center' }}>
        <label htmlFor="category-select" style={{ marginRight: '10px' }}>
          Фильтр по категории:
        </label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={handleCategoryChange}
          style={{
            padding: '8px 12px',
            border: '2px solid #ffb6c1',
            borderRadius: '10px',
            fontSize: '1em'
          }}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="list-articles">
        {paginatedCats.map((cat) => (
          <CatCard key={cat.id} cat={cat} />
        ))}
      </div>

      {filteredCats.length > catsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default CatList;