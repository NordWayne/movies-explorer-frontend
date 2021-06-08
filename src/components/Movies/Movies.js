import React, { useState } from 'react';
import './Movies.css'
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Movies = ({movies, savedMovies, filteredMovies, handleSaveMovie, handleDeleteMovie, handleSearchSubmit, handleCheckbox, isLoading, countOfMovies, handleAddMovies}) => {
  return (
    <>
      <Header/>
      <section className='movies'>
        <SearchForm handleSearchSubmit={handleSearchSubmit} movies={movies} handleCheckbox={handleCheckbox}/>
        <MoviesCardList movies={filteredMovies}
                        handleSaveMovie={handleSaveMovie}
                        savedMovies={savedMovies}
                        handleDeleteMovie={handleDeleteMovie}
                        isLoading={isLoading}
                        countOfMovies={countOfMovies}
                        handleAddMovies={handleAddMovies}
        />
      </section>
      <Footer/>
    </>
  );
};

export default Movies;
