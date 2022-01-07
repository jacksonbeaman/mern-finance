import Button from '../button/Button';
import styles from './sectionBisectSvg.module.css';
import SecurityIcon from '../icons/SecurityIcon';

const SectionBisectSvg = ({
  spanText,
  h2Text,
  pText,
  buttonText,
  backgroundImage,
  theme,
  svgLeft,
}) => {
  return (
    <div
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
            <Button text={buttonText} />
          </div>
        </div>
      ) : (
        <div className={`container + ${styles.sectionBisect}`}>
          <div className={styles.sectionContent}>
            <span>{spanText}</span>
            <h2>{h2Text}</h2>
            <p>{pText}</p>
            <Button text={buttonText} />
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
