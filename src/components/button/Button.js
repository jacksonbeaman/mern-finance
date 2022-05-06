import styles from './button.module.css';
import PropTypes from 'prop-types';

const Button = ({ text, chevron, fontSize, onClick, type }) => {
  return (
    <button
      className={styles.button}
      style={{ fontSize: `${fontSize}` }}
      onClick={onClick}
      type={type}
    >
      {text}
      {chevron && (
        <>
          <span>&nbsp;&nbsp;</span>
          <i className={`fas fa-chevron-right + ' ' + ${styles.chevron}`}></i>
          <i className={`fas fa-arrow-right + ' ' + ${styles.arrow}`}></i>
        </>
      )}
    </button>
  );
};

Button.defaultProps = {
  text: 'Button',
  fontSize: '1rem',
  chevron: false,
};

Button.propTypes = {
  text: PropTypes.string,
  fontSize: PropTypes.string,
  chevron: PropTypes.bool,
};

export default Button;
