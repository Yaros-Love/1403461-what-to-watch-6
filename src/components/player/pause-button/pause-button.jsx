import React from 'react';
import PropTypes from 'prop-types';

const PauseButton = ({onHandlePauseClick}) => {
  return (
    <React.Fragment>
      <button
        onClick={onHandlePauseClick}
        type="button"
        className="player__play"
        data-testid="pause-button">
        <svg viewBox="0 0 14 21" width="14" height="21">
          <use xlinkHref="#pause"></use>
        </svg>
        <span>Pause</span>
      </button>
    </React.Fragment>
  );
};

PauseButton.propTypes = {
  onHandlePauseClick: PropTypes.func.isRequired,
};

export default PauseButton;
