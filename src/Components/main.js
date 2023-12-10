

import React, { useState, useEffect } from 'react';
import './Main.css';
import Basket from './Basket';

function Main() {
  const [searchTerm, setSearchTerm] = useState('');
  const [defaultMovies, setDefaultMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [listName, setListName] = useState('New List');
  const [movieList, setMovieList] = useState([]);

  const [movieData, setMovieData] = useState([]);

  const [showBasket, setShowBasket] = useState(false);

  useEffect(() => {
    fetchDefaultMovies();
  }, []);

  const handleShowBasket = () => {
    setShowBasket(true);
  };

  const fetchDefaultMovies = () => {
    fetch(`http://www.omdbapi.com/?s=avengers&apikey=da8fb669`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.Search) {
          setDefaultMovies(data.Search);
          setMovieData(data.Search);
        }
      })
      .catch(error => {
        console.error('Error fetching default movies:', error);
      });
  };

  const handleInputChange = event => {
            setSearchTerm(event.target.value);
          };
        
          const handleSubmit = event => {
            event.preventDefault();
            if (searchTerm.trim() !== '') {
              fetch(`http://www.omdbapi.com/?s=${encodeURIComponent(searchTerm)}&apikey=da8fb669`)
                .then(res => res.json())
                .then(data => {
                  if (data.Search) {
                    setMovies(data.Search);
                  } else {
                    setMovies([]);
                  }
                })
                .catch(error => {
                  console.error('Error fetching movies:', error);
                });
            }
          };
        
         const addToMovieList = movieTitle => {
            if (!movieList.includes(movieTitle)) {
              setMovieList(prevList => [...prevList, movieTitle]);
              
              fetch(`http://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=da8fb669`)
                .then(res => res.json())
                .then(data => {
                  if (data.Response === 'True') {
                    setMovieData(prevData => [...prevData, data]);
                  }
                })
                .catch(error => {
                  console.error('Error fetching movie details:', error);
                });
            } else {
        
            }
          };
        
          const openIMDbLink = (imdbID) => {
            window.open(`https://www.imdb.com/title/${imdbID}`, '_blank');
          };
          const removeFromMovieList = movieTitle => {
            setMovieList(prevList => prevList.filter(title => title !== movieTitle));
          };

  return (
    <div>
      {!showBasket ? (
        <div className="main">
             <header>
                <h1>MUSTSEE</h1>
              </header>
              <main>
                <div className="search">
                 <div className='search-input'>
                  <p>Search for a movie:</p>
                  <form id="searchForm" onSubmit={handleSubmit}>
                    <input
                    type="text"
                    id="searchInput"
                    placeholder="Enter your search term"
                    value={searchTerm}
                    onChange={handleInputChange}
                    
                  ></input>
                  <button type="submit">Search</button>
                </form>
                </div>
                <div className="movies-container">
                {movies.length > 0 ? (
                  movies.map(movie => (
                    <div key={movie.imdbID} className="movie">
                      <img src={movie.Poster} alt={movie.Title}></img>
                      <div className="about">
                        <p>{movie.Title}</p>
                        <button className="add" onClick={() => addToMovieList(movie.Title)}>Add to list</button>
                        <button className="details" onClick={() => openIMDbLink(movie.imdbID)}>Details</button>
                      </div>
                    </div>
                  ))
                ) : (
                  defaultMovies.map(movie => (
                    <div key={movie.imdbID} className="movie">
                      <img src={movie.Poster} alt={movie.Title}></img>
                      <div className="about">
                        <p>{movie.Title}</p>
                        <button className="add" onClick={() => addToMovieList(movie.Title)}>Add to list</button>
                        <button className="details"
                  onClick={() => openIMDbLink(movie.imdbID)}>Details</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
              </div>

          <div className="list">
          <form id="newForm">
                   <input
                    type="text"
                    id="newName"
                    value={listName}
                    onChange={e => setListName(e.target.value)}
                  ></input>
                </form>
            <div>
              {movieList.map((title, index) => (
                <p key={index}>
                  {title}
                  <img
                    className="delete"
                    src="https://cdn-icons-png.flaticon.com/512/458/458594.png"
                    alt="delete"
                    onClick={() => removeFromMovieList(title)}
                  ></img>
                </p>
              ))}
            </div>

            <div>
              <button className='basket' onClick={handleShowBasket}>Go to Basket</button>
            </div>
          </div>
          </main>
        </div>
      ) : (
        <Basket movieList={movieList}
        listName={listName}
        movieData={movieData}
        setShowBasket={setShowBasket} />
      )}
    </div>
  );
}

export default Main;
