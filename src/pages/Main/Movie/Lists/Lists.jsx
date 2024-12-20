import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import { useEffect, useContext, useCallback } from 'react';
import { AuthContext } from '../../../../utils/context/AuthContext';
import axios from 'axios';
import './Lists.css';

const Lists = () => {
    const navigate = useNavigate();
    const { lists } = useContext(AuthContext);
    const { setListDataMovie } = useContext(AuthContext);
    const { auth } = useContext(AuthContext);

    const getMovies = useCallback(() => {
        axios.get('/movies').then((response) => {
            setListDataMovie(response.data);
        });
    }, [setListDataMovie]);

    useEffect(() => {
        getMovies();
    }, [getMovies]);

    const handleDelete = (id) => {
        const isConfirm = window.confirm(
            'Are you sure that you want to delete this data?'
        );
        if (isConfirm) {
            axios
                .delete(`/movies/${id}`, {
                    headers: {
                        Authorization: `Bearer ${auth.accessToken}`,
                    },
                })
                .then(() => {
                    const tempLists = [...lists];
                    const index = lists.findIndex((movie) => movie.id === id);
                    if (index !== undefined || index !== -1) {
                        tempLists.splice(index, 1);
                        setListDataMovie(tempLists);
                    }
                }).catch((err) => {
                    console.log(err);
                });
        }
    };

    return (
        <div className="lists-container">
            <div className="top-context">
                <button
                    type="button"
                    className="btn-top btn-primary"
                    onClick={() => {
                        navigate('/main/movies/form');
                    }}
                >
                    Create new
                </button>
            </div>
            <div className="table-container">
                <table className="movie-lists">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lists.map((movie) => (
                            <tr key={movie.id}>
                                <td>{movie.id}</td>
                                <td>{movie.title}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="edit-button"
                                        onClick={() => {
                                            navigate(
                                                '/main/movies/form/' +
                                                movie.id +
                                                '/cast-and-crews/' + movie.tmdbId
                                            );
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        className="delete-movie-button"
                                        onClick={() => handleDelete(movie.tmdbId)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Lists;
=======
import './Lists.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
const Lists = () => {
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();
  const [lists, setLists] = useState([]);

  const getMovies = () => {
    //get the movies from the api or database
    axios.get('/movies').then((response) => {
      setLists(response.data);
    });
  };
  useEffect(() => {
    getMovies();
  }, []);

  const handleDelete = (id) => {
    const isConfirm = window.confirm(
      'Are you sure that you want to delete this data?'
    );
    if (isConfirm) {
      axios
        .delete(`/movies/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(() => {
          //update list by modifying the movie list array
          const tempLists = [...lists];
          const index = lists.findIndex((movie) => movie.id === id);
          if (index !== undefined || index !== -1) {
            tempLists.splice(index, 1);
            setLists(tempLists);
          }

          //update list by requesting again to api
          // getMovies();
        });
    }
  };

  return (
    <div className='lists-container'>
      <div className='create-container'>
        <button
          type='button'
          onClick={() => {
            navigate('/main/movies/form');
          }}
        >
          Create new
        </button>
      </div>
      <div className='table-container'>
        <table className='movie-lists'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {lists.map((movie) => (
              <tr>
                <td>{movie.id}</td>
                <td>{movie.title}</td>
                <td>
                  <button
                    type='button'
                    onClick={() => {
                      navigate('/main/movies/form/' + movie.id);
                    }}
                  >
                    Edit
                  </button>
                  <button type='button' onClick={() => handleDelete(movie.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Lists;
>>>>>>> 8af062c2114cfd4b949f1e5e99188f89825ff271
