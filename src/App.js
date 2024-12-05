import { useEffect, useState } from 'react';
import './App.css';
import SearchIcon from './search.svg';

// 46556790
const API_URL = `http://www.omdbapi.com/?apikey=46556790&s=`; 

const searchMovies = async (title) => {
  try {
    const response = await fetch(`${API_URL}${encodeURIComponent(title)}`); 
    if (!response.ok) {
      const message = `An error occurred: ${response.status}`;
      throw new Error(message);
    }
    const data = await response.json();
    // Display the array in the console
    console.log("Movie Data:", data.Search); 
    return data.Search; // Return the Search array
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return null;
  }
};

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false); // State for dark mode

  useEffect(() => {
    // Initial search on component mount
    searchMovies('Action').then(data => setMovies(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const searchResults = await searchMovies(searchTerm);
    setMovies(searchResults);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}> {/* Apply dark mode class */}
      <header>
        <div className="logo">
          <h1>MOVIE LAND</h1>
        </div>
        <nav>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Movies</a>
            </li>
            <li>
              <a href="#">TV Series</a>
            </li>
            <li>
              <a href="#">Genres</a>
            </li>
          </ul>
        </nav>
        <div className="search-container">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">
              <img src={SearchIcon} alt="search" />
            </button>
          </form>
          <button className="login-button">Login</button>
          <button onClick={toggleDarkMode} className="dark-mode-toggle">
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button> {/* Dark mode toggle button */}
        </div>
      </header>

      <main>
        <h2>Latest Movies</h2>
        <div className="movie-container">
          {movies.map((movie) => (
            <div className="movie-card" key={movie.imdbID}>
              <img src={movie.Poster} alt={movie.Title} />
              <div className="movie-info">
                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
      <footer>
        <p>&copy; @2024Rehema</p>
      </footer>
    </div>
  );
};

export default App;