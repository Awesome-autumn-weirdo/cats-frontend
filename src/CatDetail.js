import React from 'react';
import { useParams } from 'react-router-dom';

const CatDetail = ({ cats }) => {
  const { id } = useParams();
  const cat = cats.find(c => c.id.toString() === id);

  if (!cat) {
    return <h2>Кот не найден</h2>;
  }

  return (
    <div className="article-panel">
      <h2>{cat.title}</h2>

      {cat.slug && <p><strong>Слаг:</strong> {cat.slug}</p>}

      {cat.image && (
        <img
          src={cat.image}
          alt={cat.title}
          className="img-article-left"
        />
      )}

      <div className="article-text">
        {cat.content.split('\n').map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      <div className="article-meta">
        <p><strong>Дата добавления:</strong> {new Date(cat.time_create).toLocaleDateString()}</p>
        <p><strong>Статус:</strong> {cat.status === 'published' ? 'Опубликовано' : 'Черновик'}</p>
        <p><strong>Категория:</strong> {cat.category}</p>
        <p><strong>Владелец:</strong> {cat.owner || 'Отсутствует'}</p>
        {cat.tags?.length > 0 && (
          <p><strong>Теги:</strong> {cat.tags.join(', ')}</p>
        )}
      </div>
    </div>
  );
};

export default CatDetail;
