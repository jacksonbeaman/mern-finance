import Button from '../button/Button';
import styles from './header.module.css';
import { useEffect, useState } from 'react';
import { Link as LinkScroll, animateScroll as scroll } from 'react-scroll';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const [navActive, setNavActive] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();

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

  const handleSignIn = () => {
    navigate('/login');
    // navigate instead of history.push('/login') with v6 of react-router;
  };

  return (
    <header
      className={
        !navActive && pathname === '/'
          ? styles.navTransparent
          : pathname === '/'
          ? styles.headerTransition
          : ''
      }
    >
      <nav className={`${styles.navbar} + ' ' + container`}>
        {pathname === '/' ? (
          <div className={styles.brand} onClick={() => scroll.scrollToTop()}>
            <span className={styles.navLogo}>MERN</span> Finance
          </div>
        ) : (
          <div className={styles.brand} onClick={() => scroll.scrollToTop()}>
            <Link
              className={`${styles.logoLinkContainer} + ' ' + linkContainer`}
              to='/'
            >
              <span className={styles.navLogo}>MERN</span> Finance
            </Link>
          </div>
        )}
        {pathname === '/' && (
          <div className={styles.navMenu}>
            <ul>
              <li>
                <LinkScroll
                  to='about'
                  smooth={true}
                  duration={500}
                  spy={true}
                  isDynamic={true}
                  ignoreCancelEvents={true}
                  offset={-80}
                  activeClass={styles.active}
                >
                  About
                </LinkScroll>
              </li>
              <li>
                <LinkScroll
                  to='discover'
                  smooth={true}
                  duration={500}
                  spy={true}
                  isDynamic={true}
                  ignoreCancelEvents={true}
                  offset={-80}
                  activeClass={styles.active}
                >
                  Discover
                </LinkScroll>
              </li>
              <li>
                <LinkScroll
                  to='services'
                  smooth={true}
                  duration={500}
                  spy={true}
                  isDynamic={true}
                  ignoreCancelEvents={true}
                  offset={-80}
                  activeClass={styles.active}
                >
                  Services
                </LinkScroll>
              </li>
              <li>
                <LinkScroll
                  to='signUp'
                  smooth={true}
                  duration={500}
                  spy={true}
                  offset={-80}
                  isDynamic={true}
                  ignoreCancelEvents={true}
                  activeClass={styles.active}
                >
                  Sign up
                </LinkScroll>
              </li>
            </ul>
          </div>
        )}
        <div className={styles.navButtonContainer}>
          <Button text='Sign In' onClick={() => handleSignIn()} />
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
                    <LinkScroll
                      to='about'
                      smooth={true}
                      duration={500}
                      spy={true}
                      isDynamic={true}
                      ignoreCancelEvents={true}
                      offset={-80}
                      activeClass={styles.active}
                    >
                      About
                    </LinkScroll>
                  </li>
                  <li>
                    <LinkScroll
                      to='discover'
                      smooth={true}
                      duration={500}
                      spy={true}
                      isDynamic={true}
                      ignoreCancelEvents={true}
                      offset={-80}
                      activeClass={styles.active}
                    >
                      Discover
                    </LinkScroll>
                  </li>
                  <li>
                    <LinkScroll
                      to='services'
                      smooth={true}
                      duration={500}
                      spy={true}
                      isDynamic={true}
                      ignoreCancelEvents={true}
                      offset={-80}
                      activeClass={styles.active}
                    >
                      Services
                    </LinkScroll>
                  </li>
                  <li>
                    <LinkScroll
                      to='signUp'
                      smooth={true}
                      duration={500}
                      spy={true}
                      offset={-80}
                      isDynamic={true}
                      ignoreCancelEvents={true}
                      activeClass={styles.active}
                    >
                      Sign up
                    </LinkScroll>
                  </li>
                </ul>
                <Button
                  text='Sign In'
                  fontSize='1.5rem'
                  onClick={() => handleSignIn()}
                />
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
