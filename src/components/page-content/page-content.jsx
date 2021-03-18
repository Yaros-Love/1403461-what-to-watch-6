import React from 'react';
import GenresList from './genres-list';
import ShowMoreButton from './show-more-button';
import FilmsList from './films-list';
import Footer from '../footer/footer';
import {useSelector} from 'react-redux';

const PageContent = () => {
  const {films, countShowingFilms, filmListByGenre} = useSelector((state) => state.FILMS);

  return (
    <React.Fragment>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList></GenresList>

          <FilmsList films={films}></FilmsList>

          <div className="catalog__more">

            {(filmListByGenre.length > countShowingFilms) && <ShowMoreButton />}
          </div>
        </section>

        <Footer />
      </div>
    </React.Fragment>
  );
};

export default PageContent;
