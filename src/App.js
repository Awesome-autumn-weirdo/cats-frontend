import React, { useState, useEffect } from 'react';
import './App.css';
import CatList from './CatList';
import CatForm from './CatForm';
import { initialCats } from './data';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CatDetail from './CatDetail';
import CatEdit from './CatEdit';

function App() {
  const [cats, setCats] = useState(() => {
    const savedCats = localStorage.getItem('cats');
    return savedCats ? JSON.parse(savedCats) : initialCats;
  });

  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const catsPerPage = 3;

  // Сохраняем в localStorage при каждом изменении котов
  useEffect(() => {
    localStorage.setItem('cats', JSON.stringify(cats));
  }, [cats]);

  const addCat = (newCat) => {
    setCats(prev => [
      ...prev,
      {
        ...newCat,
        id: Date.now(),
        time_create: new Date().toISOString(),
        is_published: true
      }
    ]);
    setCurrentPage(1);
  };

  const sortedCats = [...cats].sort((a, b) => {
    if (sortBy === 'name') return a.title.localeCompare(b.title);
    if (sortBy === 'date') return new Date(b.time_create) - new Date(a.time_create);
    return 0;
  });

  const updateCat = (updatedCat) => {
    setCats(prevCats => {
      const newCats = prevCats.map(cat => cat.id === updatedCat.id ? updatedCat : cat);
      localStorage.setItem('cats', JSON.stringify(newCats));
      return newCats;
    });
  };

  return (
    <Router>
      <div className="App">
        <h1 className="title-kotofeynik">Котофейник</h1>
        <Routes>
          <Route
              path="/"
              element={
                <>
                  <div className="controls">
                    <button
                      className={`sort-button ${sortBy === 'name' ? 'active' : ''}`}
                      onClick={() => setSortBy('name')}
                    >
                      Сортировать по имени
                    </button>
                    <button
                      className={`sort-button ${sortBy === 'date' ? 'active' : ''}`}
                      onClick={() => setSortBy('date')}
                    >
                      Сортировать по дате
                    </button>
                  </div>
                  <CatForm onAddCat={addCat} />
                  <CatList
                    cats={sortedCats}  // Передаем всех отсортированных котов
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                    catsPerPage={catsPerPage}
                  />
                </>
              }
            />
          <Route path="/cat/:id" element={<CatDetail cats={cats} />} />
          <Route path="/edit/:id" element={<CatEdit cats={cats} updateCat={updateCat} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
