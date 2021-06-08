import React, {useState, useEffect} from 'react';
import {
  Switch,
  Route,
  useHistory, useLocation,
} from "react-router-dom";
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import Login from '../Login/Login';
import Registration from '../Registration/Registration';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import UserContext from '../../contexts/UserContext';
import mainApi from '../../utils/mainApi';
import moviesApi from '../../utils/moviesApi';
import {SHORT_FILM_DURATION, COUNTOFMOVIES} from '../../utils/config';

const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState();
  const [isLoading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('');
  const location = useLocation();
  const history = useHistory();
  const getCurrentUser = () => {
    const jwt = localStorage.getItem('token');
    console.log(jwt.length)
    if (jwt.length < 1) return
    mainApi
      .getUser(jwt)
      .then(res => {
        setCurrentUser(res.data);
        console.log(res.data)
      })
      .catch(err => {console.log(err)})
  }
  const handleLogin = (email, password) => {
    mainApi
      .login(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          getCurrentUser();
          setIsLoggedIn(true);
          history.push('/movies')
          setErrorMessage('')
        }
      })
      .catch(err => {
        setErrorMessage('Не удалось войти')
        console.log(err)
      })
  }
  const handleRegister = (name, email, password) => {
    mainApi
      .register(name, email, password)
      .then(res => {
        handleLogin(email, password)
        setErrorMessage('');
      })
      .catch(err => {
        setErrorMessage('Не удалось зарегистрироваться')
        console.log(err)
      })
  }
  const handleSignOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    history.push("/");
    setErrorMessage('')
  }
  const getSavedMovies = () => {
    setLoading(true)
    const jwt = localStorage.getItem('token');
    const filteredSavedMovies = JSON.parse(localStorage.getItem('filteredSavedMovies'));
    if (!filteredSavedMovies){
      mainApi
        .getMovies(jwt)
        .then(res => {
          localStorage.setItem('saved-movies', JSON.stringify(res))
          setSavedMovies(res)
          setFilteredSavedMovies(res);
        })
        .catch(err=> console.log(err))
    }
    else {
      setSavedMovies(filteredSavedMovies)
      setFilteredSavedMovies(filteredSavedMovies);
    }

  }
  const getMovies = () => {
    setLoading(true)
    const allMovies = JSON.parse(localStorage.getItem('movies'));
    const filteredMovies = JSON.parse(localStorage.getItem('filteredMovies'));
    if(!allMovies) {
      moviesApi
        .getMovies()
        .then(res => {
          localStorage.setItem('movies', JSON.stringify(res))
          setMovies(res)
        })
        .catch((err) => console.log(err))
        .finally(()=> setLoading(false))
    }
    if (!filteredMovies) {
      setFilteredMovies(allMovies);
    }
    setFilteredMovies(filteredMovies)
    setMovies(allMovies);
    setLoading(false)
  }
  const [checkbox, setCheckbox] = useState(false);
  const handleCheckbox = () => {
    setCheckbox(true)
  }
  const filterMovies = (movies, query) => {
    const filteredMovies = movies.filter((item) => {
      const nameRu = item.nameRU.toLowerCase().trim();
      if (item.nameEN){
        const nameEn = item.nameEN.toLowerCase().trim();
        return nameRu.indexOf(query) !== -1 || nameEn.indexOf(query) !== -1
      }
      else return nameRu.indexOf(query) !== -1
    });
    if(checkbox) {
      setCheckbox(false);
      return handleShortFilms(filteredMovies);
    }
    return filteredMovies;
  }
  const handleShortFilms = (movies) => {
    return movies.filter((movie) => {
      return movie.duration <= SHORT_FILM_DURATION;
    });
  }
  const handleSearchSubmit = (cards, query) => {
    console.log(1)
    const movies = filterMovies(cards, query.toLowerCase().trim());
    localStorage.setItem('filteredMovies', JSON.stringify(movies));
    setFilteredMovies(movies)
  }
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);
  const handleSearchSaveSubmit = (cards, query) => {
      const movies = filterMovies(cards, query.toLowerCase().trim());
      localStorage.setItem('filteredSavedMovies', JSON.stringify(movies));
      setFilteredSavedMovies(movies)
  }
  const handleEditUser = (name, email) => {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      mainApi
        .editUser(jwt,{name, email})
        .then ((newUser) => {
          setCurrentUser(newUser);
        })
        .catch(err => {
          console.log(err)
          setErrorMessage('Не удалось обновить пользователя')
        })
    }
  }
  const handleSaveMovie = (movie) => {
    const jwt = localStorage.getItem('token');
    console.log(movie.image);
    if (movie.nameRU !== savedMovies.some((item) => item.nameRU)) {
      mainApi.addMovie(movie, jwt)
        .then((saveMovie) => {
          setSavedMovies([...savedMovies, saveMovie.data]);
          setFilteredSavedMovies([...savedMovies, saveMovie.data])
        })
        .catch((err) => console.log(err));
    }

  }
  const handleDeleteMovie = (movie) => {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      mainApi.deleteMovie(movie._id, jwt)
        .then(() => {
          const newMovieList = savedMovies.filter((item) => item._id !== movie._id);
          setSavedMovies(newMovieList);
          setFilteredSavedMovies(newMovieList);
        })
        .catch((err) => console.log(err));
    }
  }
  const [countOfMovies, setCountOfMovies] = React.useState();
  const [countOfAddedMovies, setCountOfAddedMovies] = React.useState()
  const [windowWidth, setWindowWidth] = useState();
  const handleAddMovies = () => {
    setCountOfMovies(countOfMovies + countOfAddedMovies);
  }
  useEffect(() => {
    function handleResize() {
      if ( window.innerWidth !== windowWidth){
        setWindowWidth(window.innerWidth);
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [windowWidth]);

  useEffect(() => {
    if (windowWidth >= 1500){
      setCountOfMovies(COUNTOFMOVIES.wideDesktop.movies);
      setCountOfAddedMovies(COUNTOFMOVIES.wideDesktop.addMovies);
    }
    if (windowWidth >= 1000 && windowWidth < 1500) {
      setCountOfMovies(COUNTOFMOVIES.desktop.movies);
      setCountOfAddedMovies(COUNTOFMOVIES.desktop.addMovies);
    }
    if (windowWidth >= 500 && windowWidth < 1000) {
      setCountOfMovies(COUNTOFMOVIES.laptop.movies);
      setCountOfAddedMovies(COUNTOFMOVIES.laptop.addMovies);
    }
    if (windowWidth < 500) {
      setCountOfMovies(COUNTOFMOVIES.mobile.movies);
      setCountOfAddedMovies(COUNTOFMOVIES.mobile.addMovies);
    }
  }, [windowWidth])


  useEffect(() => {
    getSavedMovies()
    getMovies();
  }, [])

  useEffect(() => {
    const jwt = localStorage.getItem('token');
    const path = location.pathname;
    if (jwt) {
      mainApi
        .checkToken(jwt)
        .then (()=> {
          setIsLoggedIn(true);
          getCurrentUser();
          history.push(path)

        })
        .catch(err => {
          console.log('ошибка проверки токена',err)
        })
    }
  }, [])
  return (
    <UserContext.Provider value={currentUser}>
      <div className='page'>
        <Switch>
          <Route exact path='/'>
            <Header/>
            <Main/>
            <Footer/>
          </Route>
          <Route exact path='/signin'>
            <Login handleLogin={handleLogin} errorMessage={errorMessage}/>
          </Route>
          <Route exact path='/signup'>
            <Registration handleRegister={handleRegister} errorMessage={errorMessage}/>
          </Route>
          <ProtectedRoute
            exact path='/movies'
            component={Movies}
            isLoggedIn={isLoggedIn}
            movies={movies}
            savedMovies={savedMovies}
            filteredMovies={filteredMovies}
            handleSaveMovie={handleSaveMovie}
            handleDeleteMovie={handleDeleteMovie}
            handleSearchSubmit={handleSearchSubmit}
            handleCheckbox={handleCheckbox}
            isLoading={isLoading}
            countOfMovies={countOfMovies}
            handleAddMovies={handleAddMovies}
          />
          <ProtectedRoute
            exact path='/saved-movies'
            component={Movies}
            isLoggedIn={isLoggedIn}
            movies={savedMovies}
            savedMovies={savedMovies}
            filteredMovies={filteredSavedMovies}
            handleDeleteMovie={handleDeleteMovie}
            handleSearchSubmit={handleSearchSaveSubmit}
            handleCheckbox={handleCheckbox}
            isLoading={isLoading}
          />
          <ProtectedRoute
            exact path='/profile'
            component={Profile}
            isLoggedIn={isLoggedIn}
            handleEditUser={handleEditUser}
            handleSignOut={handleSignOut}
            errorMessage={errorMessage}
          />
          <Route path='*'>
            <NotFound/>
          </Route>
        </Switch>
      </div>
    </UserContext.Provider>
  );
};

export default App;
