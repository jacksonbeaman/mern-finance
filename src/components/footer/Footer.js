import styles from './footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.brand}>
        <span className={styles.footerLogo}>MERN</span> Finance
      </div>
      <div className={styles.copyright}>
        <p>MERNFinance &copy; 2022 All rights reserved.</p>
      </div>
      <div className={styles.attribution}>
        <div>
          Data provided for free by{' '}
          <a href='https://iextrading.com/developer'>IEX</a>.{' '}
        </div>
        <div>
          View{' '}
          <a href='https://iextrading.com/api-exhibit-a/'>IEX’s Terms of Use</a>
          .
        </div>
      </div>
      <div className={styles.follow}>
        <a href='https://facebook.com'>
          <i className={`fab fa-facebook + ' ' + ${styles.footerIcon}`}></i>
        </a>
        <a href='https://instagram.com'>
          <i className={`fab fa-instagram + ' ' + ${styles.footerIcon}`}></i>
        </a>
        <a href='https://youtube.com'>
          <i className={`fab fa-youtube + ' ' + ${styles.footerIcon}`}></i>
        </a>
        <a href='https://twitter.com'>
          <i className={`fab fa-twitter + ' ' + ${styles.footerIcon}`}></i>
        </a>
        <a href='https://linkedin.com'>
          <i className={`fab fa-linkedin + ' ' + ${styles.footerIcon}`}></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
