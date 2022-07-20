import styles from './button.module.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Button = ({ text, chevron, fontSize, onClick, type, disabled }) => {
  const chevronClasses = classNames([
    'fas',
    'fa-chevron-right',
    styles.chevron,
  ]);

  const arrowClasses = classNames(['fas', 'fa-arrow-right', styles.arrow]);
  return (
    <button
      className={styles.button}
      style={{ fontSize: `${fontSize}` }}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {text}
      {chevron && (
        <>
          <span>&nbsp;&nbsp;</span>
          <i className={chevronClasses}></i>
          <i className={arrowClasses}></i>
        </>
      )}
    </button>
  );
};

Button.defaultProps = {
  text: 'Button',
  fontSize: '1rem',
  chevron: false,
  disabled: false,
};

Button.propTypes = {
  text: PropTypes.string,
  fontSize: PropTypes.string,
  chevron: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Button;
