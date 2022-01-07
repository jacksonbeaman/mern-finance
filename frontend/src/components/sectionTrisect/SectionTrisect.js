import ServicesIcon from '../icons/ServicesIcon';
import WorldIcon from '../icons/WorldIcon';
import InsightsIcon from '../icons/InsightsIcon';
import styles from './sectionTrisect.module.css';

const SectionTrisect = () => {
  return (
    <div className={`container + ' ' + ${styles.sectionTrisect}`}>
      <div className={styles.headingContainer}>
        <h2>Our Services</h2>
      </div>
      <div className={styles.cardContainer}>
        <div className={styles.iconCard}>
          <ServicesIcon />
          <div className={styles.cardContent}>
            <h4>Our Services</h4>
            <p>We help reduce your fees and increase your overall revenue.</p>
          </div>
        </div>
        <div className={styles.iconCard}>
          <WorldIcon />
          <div className={styles.cardContent}>
            <h4>Virtual Offices</h4>
            <p>
              You can access our platform online from anywhere in the world.
            </p>
          </div>
        </div>
        <div className={styles.iconCard}>
          <InsightsIcon />
          <div className={styles.cardContent}>
            <h4>Premium Benefits</h4>
            <p>Access important insights from our expert financial analysts.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionTrisect;
