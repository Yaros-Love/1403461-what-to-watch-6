import React, {useState} from 'react';
import FilmCard from '../film-card/film-card';
import {filmsPropTypes} from '../../prop-types/prop-types';


const FilmsList = (props) => {
  const [currentFilmCard, setCurrentFilmCard] = useState({});
  const {films} = props;

  return (
    <React.Fragment>
      <div className="catalog__movies-list">
        {films.map((film) => <FilmCard key={film.id} name={film.name} poster_image={film.poster_image} setCurrentFilmCard={() => {setCurrentFilmCard(film)}} />)}
      </div>
    </React.Fragment>
  )
};

FilmsList.propTypes = filmsPropTypes;

export default FilmsList;