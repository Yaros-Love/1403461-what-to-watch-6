import {Months} from '../const/const';

export const formatRunTime = function (time) {
  if (time / 60 > 0) {
    const hours = Math.trunc(time / 60);
    const minutes = ((time / 60 - hours) * 60).toFixed(0);
    return `${hours}h ${minutes}m`;
  } else {
    return `0h ${time}m`;
  }
};

export const formatDate = (dateFromReview) => {
  const date = new Date(dateFromReview);
  const month = Months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const formatedDate = `${month} ${day}, ${year}`;
  return formatedDate;
};

export const filmAdapter = (film) => {
  const newFilm = {};
  const filmKeys = Object.keys(film);
  const filmValues = Object.values(film);
  filmKeys.map((key, index) => {
    newFilm[key.replace(/_\w/g, (m) => m[1].toUpperCase())] = filmValues[index];
  });

  return newFilm;
};

export const filmsAdapter = (films) => {
  const adaptedFilms = [];
  films.map((film) => {
    adaptedFilms.push(filmAdapter(film));
  });
  return adaptedFilms;
};

export const userInfoAdapter = (authInfo) => {
  const newInfo = {};
  const infoKeys = Object.keys(authInfo);
  const infoValues = Object.values(authInfo);
  infoKeys.map((key, index) => {
    newInfo[key.replace(/_\w/g, (m) => m[1].toUpperCase())] = infoValues[index];
  });
  return newInfo;
};
