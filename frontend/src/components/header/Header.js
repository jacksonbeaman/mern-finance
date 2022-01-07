import Button from '../button/Button';
import styles from './header.module.css';
import { useEffect, useState } from 'react';

const Header = () => {
  const [navActive, setNavActive] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  useEffect(() => {
    handleScroll();
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 80) {
      setNavActive(true);
    } else {
      setNavActive(false);
    }
  };

  window.addEventListener('scroll', handleScroll);

  const toggle = () => {
    setToggleSidebar(!toggleSidebar);
  };

  return (
    <header className={!navActive ? styles.navTransparent : ''}>
      <nav className={`${styles.navbar} + ' ' + container`}>
        <div className={styles.brand}>
          <span className={styles.navLogo}>MERN</span> Finance
        </div>
        <div className={styles.navMenu}>
          <ul>
            <li>About</li>
            <li>Discover</li>
            <li>Services</li>
            <li>Sign up</li>
          </ul>
        </div>
        <div className={styles.navButtonContainer}>
          <Button text='Sign In' />
        </div>
        <div className={styles.sidebarContainer}>
          {toggleSidebar ? (
            <div className={styles.sidebarMenu}>
              <div className={styles.closeIconContainer}>
                <i
                  onClick={() => toggle()}
                  className={`fas fa-times + ' ' + ${styles.closeIcon}`}
                ></i>
              </div>
              <div className={styles.sidebarItemsContainer}>
                <ul>
                  <li>About</li>
                  <li>Discover</li>
                  <li>Services</li>
                  <li>Sign up</li>
                </ul>
                <Button text='Sign In' fontSize='1.5rem' />
              </div>
            </div>
          ) : (
            <i
              className={`fas fa-bars + ' ' + ${styles.toggleIcon}`}
              onClick={() => toggle()}
            ></i>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
