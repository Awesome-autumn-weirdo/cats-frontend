import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CatEdit = ({ cats, updateCat }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const cat = cats.find(c => c.id === +id);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [slug, setSlug] = useState('');
  const [status, setStatus] = useState('published');
  const [category, setCategory] = useState('ищут хозяина');
  const [owner, setOwner] = useState('');
  const [tags, setTags] = useState([]);

  const tagOptions = ['мальчики', 'девочки', 'котоязык', 'котоменю'];

  useEffect(() => {
    if (cat) {
      setTitle(cat.title);
      setContent(cat.content);
      setImage(cat.image || '');
      setSlug(cat.slug || '');
      setStatus(cat.status || 'published');
      setCategory(cat.category || 'ищут хозяина');
      setOwner(cat.owner || '');
      setTags(cat.tags || []);
    }
  }, [cat]);

  const handleTagChange = (tag) => {
    setTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('Введите название и содержание!');
      return;
    }

    updateCat({
      ...cat,
      title,
      content,
      image,
      slug,
      status,
      category,
      owner,
      tags,
      time_create: new Date().toISOString()
    });

    navigate(`/cat/${cat.id}`);
  };

  if (!cat) return <p>Кот не найден</p>;

  return (
    <div className="cat-form">
      <h2>Редактировать кота</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Название:</label>
          <input
            className="form-input"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Слаг (адрес):</label>
          <input
            className="form-input"
            value={slug}
            onChange={e => setSlug(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Текст:</label>
          <textarea
            className="form-input"
            rows="5"
            value={content}
            onChange={e => setContent(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>URL изображения:</label>
          <input
            className="form-input"
            value={image}
            onChange={e => setImage(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Статус:</label>
          <select
            className="form-input"
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            <option value="published">Опубликовано</option>
            <option value="draft">Черновик</option>
          </select>
        </div>

        <div className="form-group">
          <label>Категория:</label>
          <select
            className="form-input"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option value="ищут хозяина">Ищут хозяина</option>
            <option value="мемные коты">Мемные коты</option>
            <option value="нашли хозяина">Нашли хозяина</option>
          </select>
        </div>

        <div className="form-group">
          <label>Владелец (ФИО или "отсутствует"):</label>
          <input
            className="form-input"
            value={owner}
            onChange={e => setOwner(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Теги:</label>
          <div className="tag-options">
            {tagOptions.map(tag => (
              <label key={tag} className="tag-checkbox">
              <span>{tag}</span>
                <input
                  type="checkbox"
                  checked={tags.includes(tag)}
                  onChange={() => handleTagChange(tag)}
                />
              </label>
            ))}
          </div>
        </div>


        <button type="submit" className="form-button">Сохранить</button>
      </form>
    </div>
  );
};

export default CatEdit;
