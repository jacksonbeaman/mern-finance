import styles from './input.module.css';
import PropTypes from 'prop-types';

const Input = ({
  label,
  type,
  name,
  placeholder,
  handleInputValidation,
  handleInputChange,
  inputValue,
  inputError,
}) => {
  return (
    <div className={styles.inputContainer}>
      <label>{label}</label>
      <input
        className={inputError.length !== 0 ? styles.inputError : ''}
        type={type}
        name={name}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onKeyUp={handleInputValidation}
      ></input>
      <p>{inputError}</p>
    </div>
  );
};

Input.defaultProps = {
  inputLabel: 'Input Label',
  placeholder: 'Input field',
  inputError: '',
};

Input.propTypes = {
  inputField: PropTypes.string,
  inputError: PropTypes.string,
};

export default Input;
