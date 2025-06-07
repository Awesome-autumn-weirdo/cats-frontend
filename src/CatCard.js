// src/CatCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const CatCard = ({ cat }) => {
  const previewLength = 50;
  const previewText =
    cat.content.length > previewLength
      ? cat.content.slice(0, previewLength) + '...'
      : cat.content;

  return (
    <div className="article-panel" id={`cat-${cat.id}`}>
      <div className="article-content">
        <h2>{cat.title}</h2>
        {cat.image && (
          <img
            src={cat.image}
            alt={cat.title}
            className="img-article-left thumb"
          />
        )}
        <div className="article-text">
          <p>{previewText}</p>
        </div>
        <div className="article-meta">
          <span>Добавлено: {new Date(cat.time_create).toLocaleDateString()}</span>
        </div>
        <p className="link-read-post">
          <Link to={`/cat/${cat.id}`}>Читать подробнее →</Link>
        </p>
        <p className="link-edit-post">
        <Link to={`/edit/${cat.id}`} className="edit-link">Редактировать</Link>
      </p>
      </div>
    </div>
  );
};

export default CatCard;
