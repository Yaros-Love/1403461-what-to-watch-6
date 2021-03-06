import React from 'react';
import GenresList from './genres-list/genres-list';
import ShowMoreButton from './show-more-button/show-more-button';
import FilmsList from '../common/films-list/films-list';
import Footer from '../common/footer/footer';
import {useSelector} from 'react-redux';

const PageContent = () => {
  const countShowingFilms = useSelector((state) => state.FILMS.countShowingFilms);
  const filmListByGenre = useSelector((state) => state.FILMS.filmListByGenre);

  return (
    <React.Fragment>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList/>

          <FilmsList filmsForRender={filmListByGenre.slice(0, countShowingFilms)}/>

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
