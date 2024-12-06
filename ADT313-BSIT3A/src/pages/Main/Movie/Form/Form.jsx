import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Form.css';

const Form = () => {
  const [query, setQuery] = useState('');
  const [searchedMovieList, setSearchedMovieList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(undefined);
  const [movie, setMovie] = useState(undefined);
  const [tab, setTab] = useState('castAndCrew');
  const [castAndCrew, setCastAndCrew] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  let { movieId } = useParams();

  const apiToken = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZTkxYjA4OGJjMDY4ZDRmMTRmNTViNjc0ZmExNzQ2MCIsIm5iZiI6MTczMzM3MTIzMS44MjcwMDAxLCJzdWIiOiI2NzUxMjU1ZjkwYWEwMjZiOWRhZWRhNTEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.oy_Yn2SHhQUwlAfiqQR4JB2LxVAN3VDokZYnSlxLp_s'; // Add your full token here

  const fetchTabData = useCallback(async () => {
    const currentMovieId = selectedMovie?.id || movieId;
    if (!currentMovieId) return;

    try {
      switch (tab) {
        case 'castAndCrew':
          const castAndCrewResponse = await axios.get(
            `https://api.themoviedb.org/3/movie/${currentMovieId}/credits`,
            {
              headers: { Authorization: apiToken },
            }
          );
          setCastAndCrew(castAndCrewResponse.data);
          break;

        case 'photos':
          const photosResponse = await axios.get(
            `https://api.themoviedb.org/3/movie/${currentMovieId}/images`,
            {
              headers: { Authorization: apiToken },
            }
          );
          setPhotos(photosResponse.data.backdrops);
          break;

        case 'videos':
          const videosResponse = await axios.get(
            `https://api.themoviedb.org/3/movie/${currentMovieId}/videos`,
            {
              headers: { Authorization: apiToken },
            }
          );
          setVideos(videosResponse.data.results);
          break;

        default:
          break;
      }
    } catch (error) {
      console.error('Error fetching tab data:', error);
    }
  }, [tab, apiToken, selectedMovie, movieId]);

  useEffect(() => {
    fetchTabData();
  }, [fetchTabData]);

  useEffect(() => {
    if (movieId) {
      axios
        .get(`/movies/${movieId}`, {
          headers: { Authorization: apiToken },
        })
        .then((response) => {
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
  }, [movieId, apiToken]);

  const handleSearch = useCallback(() => {
    axios({
      method: 'get',
      url: `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
      headers: {
        Accept: 'application/json',
        Authorization: apiToken,
      },
    }).then((response) => {
      setSearchedMovieList(response.data.results);
    });
  }, [query, apiToken]);

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
  };

  const renderTabContent = () => {
    switch (tab) {
      case 'castAndCrew':
        return (
          <div className="cast-and-crew">
            <h3>Cast</h3>
            <div className="cast-grid">
              {castAndCrew.cast?.map((member) => (
                <div key={member.id} className="cast-card">
                  <img
                    src={`https://image.tmdb.org/t/p/w185${member.profile_path}`}
                    alt={member.name}
                    onError={(e) => {
                      e.target.src = '/default-avatar.png';
                    }}
                  />
                  <p className="name">{member.name}</p>
                  <p className="character">{member.character}</p>
                </div>
              ))}
            </div>
            <h3>Crew</h3>
            <div className="crew-grid">
              {castAndCrew.crew?.map((member) => (
                <div key={member.id} className="crew-card">
                  <p className="name">{member.name}</p>
                  <p className="job">{member.job}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'photos':
        return (
          <div className="photos">
            <h3>Photos</h3>
            <div className="photos-grid">
              {photos.map((photo, index) => (
                <div key={index} className="photo-card">
                  <img
                    src={`https://image.tmdb.org/t/p/original/${photo.file_path}`}
                    alt="Movie scene"
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case 'videos':
        return (
          <div className="videos">
            <h3>Videos</h3>
            <div className="videos-list">
              {videos.map((video) => (
                <div key={video.id} className="video-card">
                  <a
                    href={`https://www.youtube.com/watch?v=${video.key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                      alt={video.name}
                    />
                    <p>{video.name}</p>
                  </a>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <h1>{movieId !== undefined ? 'Edit ' : 'Create '} Movie</h1>
      {selectedMovie && (
        <>
          <div className="tabs">
            <button
              className={tab === 'castAndCrew' ? 'active' : ''}
              onClick={() => setTab('castAndCrew')}
            >
              Cast & Crew
            </button>
            <button
              className={tab === 'photos' ? 'active' : ''}
              onClick={() => setTab('photos')}
            >
              Photos
            </button>
            <button
              className={tab === 'videos' ? 'active' : ''}
              onClick={() => setTab('videos')}
            >
              Videos
            </button>
          </div>
          <div className="tab-content">{renderTabContent()}</div>
        </>
      )}
    </>
  );
};

export default Form;
