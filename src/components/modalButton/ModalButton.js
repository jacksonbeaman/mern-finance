import React from 'react';
import Button from '../button/Button';
import PropTypes from 'prop-types';
import styles from './modalButton.module.css';
import classNames from 'classnames';

const ModalButton = ({ currentUser, onClick }) => {
  const modalButtonClasses = classNames(styles.modalButton, {
    [styles.hidden]: !currentUser,
  });

  return (
    <div className={modalButtonClasses}>
      <Button onClick={onClick} text={'deposit / transfer'} />
    </div>
  );
};

ModalButton.defaultProps = {
  currentUser: null,
};

ModalButton.propTypes = {
  currentUser: PropTypes.string,
};

export default ModalButton;
