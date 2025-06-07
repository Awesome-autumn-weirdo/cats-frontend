import React, { useState } from 'react';

const CatForm = ({ onAddCat }) => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [status, setStatus] = useState('published');
  const [category, setCategory] = useState('ищут хозяина');
  const [owner, setOwner] = useState('');
  const [tags, setTags] = useState([]);

  const [errors, setErrors] = useState({});

  const allTags = ['мальчики', 'девочки', 'котоязык', 'котоменю'];

  // Регулярное выражение для проверки слага: латиница, цифры, дефисы, подчёркивания
  const slugRegex = /^[a-z0-9-_]+$/;

  const validate = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = 'Введите название';
    } else if (title.trim().length < 4) {
      newErrors.title = 'Название должно быть не менее 4 символов';
    }

    if (!slug.trim()) {
      newErrors.slug = 'Введите слаг';
    } else if (!slugRegex.test(slug.trim())) {
      newErrors.slug = 'Слаг должен содержать только латиницу, цифры, дефисы и подчёркивания';
    }

    if (!content.trim()) {
      newErrors.content = 'Введите описание';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onAddCat({
      title: title.trim(),
      slug: slug.trim(),
      content: content.trim(),
      image: image.trim(),
      status,
      category,
      owner: owner.trim(),
      tags,
    });

    // Очистка
    setTitle('');
    setSlug('');
    setContent('');
    setImage('');
    setStatus('published');
    setCategory('ищут хозяина');
    setOwner('');
    setTags([]);
    setErrors({});
  };

  const handleTagToggle = (tag) => {
    setTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <form className="cat-form" onSubmit={handleSubmit}>
      <div className={`form-group ${errors.title ? 'error' : ''}`}>
        <label>Название кота:</label>
        <input value={title} onChange={e => setTitle(e.target.value)} />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>

      <div className={`form-group ${errors.slug ? 'error' : ''}`}>
        <label>Слаг (URL):</label>
        <input value={slug} onChange={e => setSlug(e.target.value)} />
        {errors.slug && <span className="error-message">{errors.slug}</span>}
      </div>

      <div className={`form-group ${errors.content ? 'error' : ''}`}>
        <label>Описание:</label>
        <textarea value={content} onChange={e => setContent(e.target.value)} />
        {errors.content && <span className="error-message">{errors.content}</span>}
      </div>

      <div className="form-group">
        <label>URL изображения:</label>
        <input value={image} onChange={e => setImage(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Статус:</label>
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option value="published">Опубликовано</option>
          <option value="draft">Черновик</option>
        </select>
      </div>

      <div className="form-group">
        <label>Категория:</label>
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="ищут хозяина">Ищут хозяина</option>
          <option value="мемные коты">Мемные коты</option>
          <option value="нашли хозяина">Нашли хозяина</option>
        </select>
      </div>

      <div className="form-group">
        <label>Владелец:</label>
        <input
          placeholder="Если отсутствует — оставить пустым"
          value={owner}
          onChange={e => setOwner(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Теги:</label>
        <div className="tag-options">
          {allTags.map(tag => (
            <label key={tag} className="tag-checkbox">
              <span>{tag}</span>
              <input
                type="checkbox"
                checked={tags.includes(tag)}
                onChange={() => handleTagToggle(tag)}
              />
            </label>
          ))}
        </div>
      </div>

      <button className="form-button" type="submit">Добавить кота</button>
    </form>
  );
};

export default CatForm;
