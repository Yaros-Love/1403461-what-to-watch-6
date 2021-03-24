import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import FilmsList from '../page-content/films-list';
import UserHeader from '../header/user-header';
import GuestHeader from '../header/guest-header';
import Footer from '../footer/footer';
import FilmTabs from './film-tabs';
import LoadingScreen from '../loading-screen/loading-screen';
import {filmInfoPagePropTypes} from '../../prop-types/prop-types';
import {useSelector, useDispatch} from 'react-redux';
import {AuthorizationStatus} from '../../const/const';
import {fetchFilmInfo} from '../../store/api-actions';

const FilmInfoPage = ({id, films}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFilmInfo(id));
  }, [])
  
  const {authorizationStatus} = useSelector((state) => state.LOGIN);
  const {filmInfo} = useSelector((state) => state.FILMS);

  if (filmInfo.id !== id) {
    return <LoadingScreen/>
  }

  return (
    <React.Fragment>
      <section className="movie-card movie-card--full" style={{backgroundColor: filmInfo.backgroundColor}}>
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={filmInfo.backgroundImage} alt={filmInfo.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          {authorizationStatus === AuthorizationStatus.AUTH ? <UserHeader/> : <GuestHeader/>}

          <div className="movie-card__wrap">
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{filmInfo.name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{filmInfo.genre}</span>
                <span className="movie-card__year">{filmInfo.released}</span>
              </p>

              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
                <Link to={`/films/` + filmInfo.id + `/review`} className="btn movie-card__button">Add review</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <div className="movie-card__poster movie-card__poster--big">
              <img src={filmInfo.posterImage} alt={filmInfo.name + `poster`} width="218" height="327" />
            </div>

            <FilmTabs film={filmInfo}/>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <FilmsList filmsForRender={films}></FilmsList>

        </section>
        <Footer />
      </div>
    </React.Fragment>
  );
};

FilmInfoPage.propTypes = filmInfoPagePropTypes;

export default FilmInfoPage;
