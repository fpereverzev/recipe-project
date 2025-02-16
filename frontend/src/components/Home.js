import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
    axios.get('http://localhost:8000/api/categories/')
      .then(response => {
        console.log('API Response:', response.data); // Добавьте эту строку
        setCategories(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('API Error:', error); // И эту строку
        setError('Ошибка при загрузке категорий');
        setLoading(false);
      });
  }, []);
  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="home">
      <h1>Категории рецептов</h1>
      <div className="categories-grid">
        {categories.map(category => (
          <Link to={`/category/${category.slug}`} key={category.id}>
            <div className="category-card">
              <div className="category-image">
                <img
                  src={category.image_url || '/default-category.jpg'}
                  alt={category.name}
                  onError={(e) => {
                    e.target.onerror = null; // Предотвращаем бесконечный цикл
                    e.target.src = '/default-category.jpg';
                  }}
                />
              </div>
              <div className="category-content">
                <h2>{category.name}</h2>
                <p className="category-description">
                  {category.description || 'Описание отсутствует'}
                </p>
                <div className="category-meta">
                  <span className="recipes-count">
                    {category.recipes_count} {' '}
                    {category.recipes_count === 1 ? 'рецепт' :
                     category.recipes_count >= 2 && category.recipes_count <= 4 ? 'рецепта' :
                     'рецептов'}
                  </span>
                  {category.cooking_time_avg > 0 && (
                    <span className="cooking-time">
                      <span className="icon">⏱</span>
                      {category.cooking_time_avg} мин
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
