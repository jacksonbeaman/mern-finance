import Header from '../components/header/Header';
import Hero from '../components/hero/Hero';
import SectionBisect from '../components/sectionBisect/SectionBisect';
import SectionBisectSvg from '../components/sectionBisectSvg/SectionBisectSvg';
import SectionTrisect from '../components/sectionTrisect/SectionTrisect';
import Footer from '../components/footer/Footer';

const HomeScreen = () => {
  return (
    <>
      <Header />
      <Hero />
      <SectionBisect
        sectionId='about'
        spanText={'Premium Financial Services'}
        h2Text={'Unlimited transactions with zero fees'}
        pText={
          'Get access to our exclusive app that allows you to make unlimited trades without getting charged transaction fees'
        }
        buttonText={'Get Started'}
        backgroundImage={'/images/city-1.jpg'}
      />
      <SectionBisect
        sectionId='discover'
        spanText={'Unlimited Access'}
        h2Text={'Log into your account at any time'}
        pText={
          "Your account is accessible no matter where you are located. An internet connection and a mobile device or computer is all that's required"
        }
        buttonText={'Learn More'}
        backgroundImage={'./images/aurora-1.jpg'}
        theme={'dark'}
        imageLeft={true}
      />
      <SectionTrisect sectionId='services' />
      <SectionBisectSvg
        sectionId='signUp'
        spanText={'Join our team'}
        h2Text={'Creating an account is extremely easy'}
        pText={
          "Have everything set up and ready in just minutes. Add your information and you're ready to begin trading"
        }
        buttonText={'Start Now'}
        theme={'dark'}
      />
      <Footer />
    </>
  );
};

export default HomeScreen;
