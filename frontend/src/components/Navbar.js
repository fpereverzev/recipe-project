import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Книга рецептов
        </Link>
        <div className="navbar-links">
          <Link to="/" className="nav-link">Главная</Link>
          <a
            href="http://localhost:8000/swagger/"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
          >
            API Docs
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
