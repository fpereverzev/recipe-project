import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Category from './components/Category';
import Recipe from './components/Recipe';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:slug" element={<Category />} />
            <Route path="/recipe/:slug" element={<Recipe />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
