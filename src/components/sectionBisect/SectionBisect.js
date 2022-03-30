import Button from '../button/Button';
import styles from './sectionBisect.module.css';
import { useNavigate } from 'react-router-dom';

const SectionBisect = ({
  sectionId,
  spanText,
  h2Text,
  pText,
  buttonText,
  backgroundImage,
  theme,
  imageLeft,
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
      {imageLeft ? (
        <div className={`container + ${styles.sectionBisect}`}>
          <div
            className={styles.sectionImage}
            style={{ backgroundImage: `url(${backgroundImage})` }}
          ></div>
          <div
            className={styles.sectionContentRight}
            // style={{ paddingLeft: '2.5rem', paddingRight: '0' }}
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
          <div
            className={styles.sectionImage}
            style={{ backgroundImage: `url(${backgroundImage})` }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default SectionBisect;
