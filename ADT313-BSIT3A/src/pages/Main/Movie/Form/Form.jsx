import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import './Form.css';

const Form = () => {
  const [query, setQuery] = useState('');
  const [searchedMovieList, setSearchedMovieList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(undefined);
  const [movie, setMovie] = useState(undefined);
  const navigate = useNavigate();
  let { movieId } = useParams();

  const handleSearch = useCallback(() => {
    axios({
      method: 'get',
      url: `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OTczMjllNjdmOTA0Mzk1Yjc5NTkyYTNjMjQ1MzE0YiIsIm5iZiI6MTczMTA2MzMwOC41MDEsInN1YiI6IjY3MmRlZTBjMmQ3NjgxMzFmOWE2NGJlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XzNTWEmA_qlIOARyn213LoakygZaUGwh8tJEiKI3M6E',
      },
    }).then((response) => {
      setSearchedMovieList(response.data.results);
    });
  }, [query]);

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
  };

  const handleSave = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!selectedMovie) {
      alert('Please search and select a movie.');
      return;
    }
    const data = {
      tmdbId: selectedMovie.id,
      title: selectedMovie.original_title,
      overview: selectedMovie.overview,
      popularity: selectedMovie.popularity,
      releaseDate: selectedMovie.release_date,
      voteAverage: selectedMovie.vote_average,
      backdropPath: `https://image.tmdb.org/t/p/original/${selectedMovie.backdrop_path}`,
      posterPath: `https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`,
      isFeatured: 0,
    };

    axios({
      method: 'post',
      url: '/movies',
      data,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(() => {
        alert('Movie saved successfully!');
      })
      .catch((error) => console.error('Error saving movie:', error));
  };

  useEffect(() => {
    if (movieId) {
      axios({
        method: 'get',
        url: `/movies/${movieId}`,
        headers: {
          Authorization: `Bearer <Your_Server_Bearer_Token>`,
        },
      }).then((response) => {
        setMovie(response.data);
        const tempData = {
          id: response.data.tmdbId,
          original_title: response.data.title,
          overview: response.data.overview,
          popularity: response.data.popularity,
          poster_path: response.data.posterPath,
          release_date: response.data.releaseDate,
          vote_average: response.data.voteAverage,
        };
        setSelectedMovie(tempData);
      });
    }
  }, [movieId]);

  return (
    <div className="form-container">
      <h1>{movieId ? 'Edit Movie' : 'Create Movie'}</h1>

      {movieId === undefined && (
        <div className="search-container">
          <label>Search Movie:</label>
          <input
            type="text"
            placeholder="Type a movie name..."
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="button" onClick={handleSearch}>
            Search
          </button>
          <div className="searched-movie-list">
            {searchedMovieList.map((movie) => (
              <p key={movie.id} onClick={() => handleSelectMovie(movie)}>
                {movie.original_title}
              </p>
            ))}
          </div>
        </div>
      )}

      <form>
        {selectedMovie && (
          <img
            className="poster-image"
            src={`https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`}
            alt={selectedMovie.original_title}
          />
        )}

        <div className="field">
          <label>Title:</label>
          <input
            type="text"
            value={selectedMovie ? selectedMovie.original_title : ''}
            readOnly
          />
        </div>

        <div className="field">
          <label>Overview:</label>
          <textarea
            rows={4}
            value={selectedMovie ? selectedMovie.overview : ''}
            readOnly
          />
        </div>

        <div className="field">
          <label>Popularity:</label>
          <input
            type="text"
            value={selectedMovie ? selectedMovie.popularity : ''}
            readOnly
          />
        </div>

        <div className="field">
          <label>Release Date:</label>
          <input
            type="text"
            value={selectedMovie ? selectedMovie.release_date : ''}
            readOnly
          />
        </div>

        <div className="field">
          <label>Vote Average:</label>
          <input
            type="text"
            value={selectedMovie ? selectedMovie.vote_average : ''}
            readOnly
          />
        </div>

        <button type="button" onClick={handleSave}>
          Save
        </button>
      </form>

      {movieId && selectedMovie && (
        <div>
          <hr />
          <nav>
            <ul className="tabs">
              <li onClick={() => navigate(`/main/movies/form/${movieId}/cast-and-crews`)}>
                Cast & Crews
              </li>
              <li onClick={() => navigate(`/main/movies/form/${movieId}/videos`)}>
                Videos
              </li>
              <li onClick={() => navigate(`/main/movies/form/${movieId}/photos`)}>
                Photos
              </li>
            </ul>
          </nav>
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default Form;
