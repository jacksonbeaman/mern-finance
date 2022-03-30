import Button from '../button/Button';
import styles from './userHeader.module.css';
import { useState } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import { Link, useNavigate } from 'react-router-dom';

const UserHeader = ({ onSignOut }) => {
  const [toggleSidebar, setToggleSidebar] = useState(false);

  const navigate = useNavigate();

  const toggle = () => {
    setToggleSidebar(!toggleSidebar);
  };

  const handleSignOut = () => {
    onSignOut();
    alert('Signed Out');
    navigate('/');
  };

  return (
    <header>
      <nav className={`${styles.navbar} container`}>
        <div className={styles.brand} onClick={() => scroll.scrollToTop()}>
          <Link className={`${styles.logoLinkContainer} linkContainer`} to='/'>
            <span className={styles.navLogo}>MERN</span> Finance
          </Link>
        </div>
        <div className={styles.navMenu}>
          <ul>
            <li>
              <Link to='/quote'>Quote</Link>
            </li>
            <li>
              <Link to='/buy'>Buy</Link>
            </li>
            <li>
              <Link to='/sell'>Sell</Link>
            </li>
            <li>History</li>
          </ul>
        </div>
        <div className={styles.navButtonContainer}>
          <Button text='Sign Out' onClick={() => handleSignOut()} />
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
                  <li>
                    <Link to='/quote'>Quote</Link>
                  </li>
                  <li>
                    <Link to='/buy'>Buy</Link>
                  </li>
                  <li>
                    <Link to='/sell'>Sell</Link>
                  </li>
                  <li>History</li>
                </ul>
                <Button
                  text='Sign Out'
                  fontSize='1.5rem'
                  onClick={() => handleSignOut()}
                />
              </div>
            </div>
          ) : (
            <i
              className={`fas fa-bars ${styles.toggleIcon}`}
              onClick={() => toggle()}
            ></i>
          )}
        </div>
      </nav>
    </header>
  );
};

export default UserHeader;
