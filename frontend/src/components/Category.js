import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Category() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/categories/${slug}/`)
      .then(response => {
        setCategory(response.data);
        setLoading(false);
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          navigate('/'); // Редирект на главную, если категория не найдена
        } else {
          setError('Ошибка при загрузке категории');
        }
        setLoading(false);
      });
  }, [slug, navigate]);

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!category) return null;

  return (
    <div className="category">
      <div className="category-header">
        <Link to="/" className="back-link">← Назад к категориям</Link>
        <h1>{category.name}</h1>
        <p className="category-description">{category.description}</p>
      </div>

      <div className="recipes-grid">
        {category.recipes.length > 0 ? (
          category.recipes.map(recipe => (
            <Link to={`/recipe/${recipe.slug}`} key={recipe.id}>
              <div className="recipe-card">
                <h3>{recipe.title}</h3>
                <div className="recipe-meta">
                  <span>⏱ {recipe.cooking_time} минут</span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="no-recipes">В этой категории пока нет рецептов</p>
        )}
      </div>
    </div>
  );
}

export default Category;
