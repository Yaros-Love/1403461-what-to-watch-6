import {loadFilms, loadFilmInfo, setErrorLoading, getUserInfo, requireAuthorization, redirectToRoute, setBadRequest, setErrorUploadComment, setUploadCommentStatus, loadFilmReviews, getMoreLikeThisFilms} from '../store/action';
import {AuthorizationStatus, AppRoute, APIRoute} from '../const/const';
import {dataAdapter, filmsAdapter} from '../utils/film';

export const fetchFilms = () => (dispatch, _getState, api) => {
  return api.get(APIRoute.FILMS).
    then(({data}) => filmsAdapter(data)).
    then((data) => dispatch(loadFilms(data))).
    catch((error) => dispatch(setErrorLoading(error)));
};

export const fetchFilmInfo = (id) => (dispatch, _getState, api) => {
  return api.get(`${APIRoute.FILMS}/${id}`).
    then(({data}) => dataAdapter(data)).
    then((data) => {
      dispatch(loadFilmInfo(data));
      dispatch(getMoreLikeThisFilms());
    }).
    catch(() => dispatch(redirectToRoute(AppRoute.ERROR)));
};

export const fetchFilmReviews = (id) => (dispatch, _getState, api) => {
  return api.get(`${APIRoute.COMMENTS}${id}`).
    then(({data}) => dispatch(loadFilmReviews(data))).
    catch(() => dispatch(redirectToRoute(AppRoute.ERROR)));
};

export const checkAuth = () => (dispatch, _getState, api) => {
  return api.get(APIRoute.LOGIN).
    then(({data}) => dispatch(getUserInfo(dataAdapter(data)))).
    then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH))).
    catch(() => {});
};

export const login = ({email, password}) => (dispatch, _getState, api) => {
  return api.post(APIRoute.LOGIN, {email, password}).
    then(({data}) => {
      dispatch(getUserInfo(dataAdapter(data)));
      dispatch(redirectToRoute(AppRoute.ROOT));
      dispatch(requireAuthorization(AuthorizationStatus.AUTH));
    }).
    catch(() => {
      dispatch(setBadRequest(true));
    });
};

export const postComment = ({rating, comment}, id) => (dispatch, _getState, api) => {
  return api.post((`${APIRoute.COMMENTS}${id}`), {rating, comment}).
    then(() => {
      dispatch(setUploadCommentStatus(false));
      dispatch(redirectToRoute(`${AppRoute.FILM_DETAILS}${id}`));
    }).
    catch(() => {
      dispatch(setErrorUploadComment(true));
      dispatch(setUploadCommentStatus(false));
    });
};

export const toggleFavoriteFilm = (id, status) => (dispatch, _getState, api) => {
  return api.post(`${APIRoute.FAVORITE}${id}/${status}`).
    then(() => {
      dispatch(fetchFilms());
      dispatch(fetchFilmInfo(id));
    });
};

export const fakeToggleFavoriteFilm = (id, status) => (dispatch, _getState, api) => {
  return api.post(`${APIRoute.FAVORITE}${id}/${status}`).
    then(() => {
      dispatch(fetchFilms);
      dispatch(fetchFilmInfo);
    });
};
