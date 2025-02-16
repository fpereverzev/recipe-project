import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Recipe() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/recipes/${slug}/`)
      .then(response => {
        setRecipe(response.data);
        setLoading(false);
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          navigate('/');
        } else {
          setError('Ошибка при загрузке рецепта');
        }
        setLoading(false);
      });
  }, [slug, navigate]);

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!recipe) return null;

  return (
    <div className="recipe">
      <Link
        to={`/category/${recipe.category}`}
        className="back-link"
      >
        ← Назад к категории
      </Link>

      <article className="recipe-content">
        <header className="recipe-header">
          <h1>{recipe.title}</h1>
          <div className="recipe-meta">
            <span>⏱ Время приготовления: {recipe.cooking_time} минут</span>
          </div>
        </header>

        <section className="recipe-section">
          <h2>Ингредиенты</h2>
          <div className="ingredients">
            {recipe.ingredients.split('\n').map((ingredient, index) => (
              <p key={index}>{ingredient}</p>
            ))}
          </div>
        </section>

        <section className="recipe-section">
          <h2>Инструкция приготовления</h2>
          <div className="instructions">
            {recipe.instructions.split('\n').map((step, index) => (
              <p key={index}>{step}</p>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}

export default Recipe;
