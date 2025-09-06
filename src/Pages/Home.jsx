import { useState, useEffect } from 'react';
import Moviecard from '../components/Moviecard';
import '../css/Home.css';
import { searchMovies, getPopularMovies } from '../services/api';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        console.log('Popular Movies Response:', popularMovies); // Log the full response
        setMovies(
          popularMovies.map((m) => ({ ...m, Title: m.title || m.Title })),
        ); // Normalize
      } catch (err) {
        console.log('Popular Movies Error:', err);
        setError('Failed to Load Movies ....');
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);

  const handle = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;
    setLoading(true);
    try {
      const searchResult = await searchMovies(searchQuery);
      console.log('Search Movies Response:', searchResult); // Log the full response
      setMovies(searchResult.map((m) => ({ ...m, Title: m.title || m.Title }))); // Normalize
      setError(null);
    } catch (err) {
      console.log('Search Error:', err);
      setError('Failed to search Movies');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <form onSubmit={handle} className="search-form">
        <input
          type="text"
          placeholder="Search for a movie..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">loading..</div>
      ) : (
        <div className="movie-list">
          <div className="movies-grid">
            {movies.map((movie, index) => {
              if (!movie || !movie.Title) {
                console.warn('Invalid movie data:', movie);
                return null;
              }
              return (
                <Moviecard
                  key={movie.id || index}
                  movie={movie}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;