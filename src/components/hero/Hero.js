import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './hero.module.css';
import Button from '../button/Button';

const Hero = ({ sectionId }) => {
  const [matches, setMatches] = useState(
    window.matchMedia('(max-width: 450px)').matches
  );

  const handleMatches = (e) => {
    setMatches(e.matches);
  };

  useEffect(() => {
    // useEffect cleans up event listener
    window
      .matchMedia('(max-width: 450px)')
      .addEventListener('change', handleMatches);
  }, []);

  // window
  //   .matchMedia('(max-width: 450px)')
  //   .addEventListener('change', handleMatches);

  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/register');
  };

  return (
    <div
      id={sectionId}
      className={styles.hero}
      style={
        matches
          ? { backgroundColor: '#000000' }
          : { backgroundColor: 'transparent' }
      }
    >
      {!matches && (
        <video className={styles.backgroundVideo} autoPlay loop muted>
          <source
            src='./videos/rotatingGlobeMdFull.mp4'
            type='video/mp4'
          ></source>
        </video>
      )}
      <div className={`${styles.heroContent} + ' ' + container`}>
        <div>
          <h1>Trading and portfolio management made easy</h1>
        </div>
        <div>
          <p>
            Sign up for a new account today and receive $10,000 in credit toward
            future trades.
          </p>
        </div>
        <div className={styles.buttonContainer}>
          <Button
            text={'Get Started'}
            chevron={true}
            onClick={() => handleSignUp()}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
