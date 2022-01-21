import Button from '../button/Button';
import styles from './sectionBisectSvg.module.css';
import SecurityIcon from '../icons/SecurityIcon';
import { useNavigate } from 'react-router-dom';

const SectionBisectSvg = ({
  sectionId,
  spanText,
  h2Text,
  pText,
  buttonText,
  backgroundImage,
  theme,
  svgLeft,
}) => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/register');
  };
  return (
    <div
      id={sectionId}
      className={
        theme === 'dark'
          ? `${styles.section} + ' ' + ${styles.dark}`
          : styles.section
      }
    >
      {svgLeft ? (
        <div className={`container + ${styles.sectionBisect}`}>
          <div className={styles.sectionSvg}>
            <SecurityIcon />
          </div>
          <div
            className={styles.sectionContent}
            style={{ paddingLeft: '3rem', paddingRight: '0' }}
          >
            <span>{spanText}</span>
            <h2>{h2Text}</h2>
            <p>{pText}</p>
            <Button text={buttonText} onClick={() => handleSignUp()} />
          </div>
        </div>
      ) : (
        <div className={`container + ${styles.sectionBisect}`}>
          <div className={styles.sectionContent}>
            <span>{spanText}</span>
            <h2>{h2Text}</h2>
            <p>{pText}</p>
            <Button text={buttonText} onClick={() => handleSignUp()} />
          </div>
          <div className={styles.sectionSvg}>
            <SecurityIcon />
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionBisectSvg;
