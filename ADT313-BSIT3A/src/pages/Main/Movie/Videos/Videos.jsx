// src/pages/Main/Movie/Form/Videos.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Videos = ({ movieId }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    if (movieId) {
      axios
        .get(`https://api.themoviedb.org/3/movie/${movieId}/videos`, {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OTczMjllNjdmOTA0Mzk1Yjc5NTkyYTNjMjQ1MzE0YiIsIm5iZiI6MTczMTA2MzMwOC41MDEsInN1YiI6IjY3MmRlZTBjMmQ3NjgxMzFmOWE2NGJlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XzNTWEmA_qlIOARyn213LoakygZaUGwh8tJEiKI3M6E',
          },
        })
        .then((response) => {
          setVideos(response.data.results);
        });
    }
  }, [movieId]);

  return (
    <div>
      <h2>Videos</h2>
      <div className="video-gallery">
        {videos.map((video) => (
          <div key={video.id}>
            <h3>{video.name}</h3>
            <iframe
              title={video.name}
              width="100%"
              height="400px"
              src={`https://www.youtube.com/embed/${video.key}`}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Videos;
