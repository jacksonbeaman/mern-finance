import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Amplify, { Auth } from 'aws-amplify';
import axios from 'axios';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import UserHeader from './components/userHeader/UserHeader';
import QuoteScreen from './screens/QuoteScreen';
import BuyScreen from './screens/BuyScreen';
import SellScreen from './screens/SellScreen';

const amplifyConfig = {
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    // identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab',

    // REQUIRED - Amazon Cognito Region
    region: process.env.REACT_APP_AWS_COGNITO_REGION,

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID,

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId:
      process.env.REACT_APP_AWS_COGNITO_USER_POOL_WEB_CLIENT_ID,

    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: false,
  },
};

const App = () => {
  const [user, setUser] = useState({ currentUser: null, userToken: null });
  const [quote, setQuote] = useState({
    symbol: null,
    companyName: null,
    price: null,
  });
  const [error, setError] = useState({ message: null });

  Amplify.configure(amplifyConfig);

  useEffect(() => {
    (async () => {
      try {
        if (!user.currentUser) {
          const {
            username,
            signInUserSession: {
              idToken: { jwtToken },
            },
          } = await Auth.currentAuthenticatedUser();
          setUser({ currentUser: username, userToken: jwtToken });
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [user.currentUser]);

  const signUp = async ({ username, password }) => {
    try {
      await Auth.signUp({
        username,
        password,
      });
    } catch (error) {
      console.error('error signing up:', error);
    }
  };

  const signIn = async ({ username, password }) => {
    try {
      const user = await Auth.signIn(username, password);
      setUser({
        currentUser: user.username,
        userToken: user.signInUserSession.idToken.jwtToken,
      });
    } catch (error) {
      console.error('error signing in', error);
    }
  };

  const signOut = async () => {
    try {
      await Auth.signOut();
      setUser({ username: null, userToken: null });
    } catch (error) {
      console.error('error signing out: ', error);
    }
  };

  const getQuote = async (symbol) => {
    try {
      const settings = {
        url: `/quote?symbol=${symbol}`,
        baseURL: `${process.env.AWS_API_GATEWAY_INVOKE_URL}`,
        method: 'get',
        timeout: 0,
        headers: {
          Authorization: user.userToken,
        },
      };
      const { data } = await axios(settings);
      setQuote({
        symbol: data.symbol,
        companyName: data.companyName,
        price: data.latestPrice,
      });
    } catch (error) {
      console.log(error);
      setError({ message: error });
    }
  };

  // You can get the current config object
  // const currentConfig = Auth.configure();
  // console.log(currentConfig);

  return (
    <>
      <Router>
        {user.currentUser ? <UserHeader onSignOut={signOut} /> : <Header />}
        <Routes>
          <Route path='/' element={<HomeScreen />} />
          <Route path='/login' element={<LoginScreen onSignIn={signIn} />} />
          <Route
            path='/register'
            element={<RegisterScreen onSignUp={signUp} />}
          />
          <Route
            path='/quote'
            element={
              !user.currentUser ? (
                <LoginScreen onSignIn={signIn} quote={quote} error={error} />
              ) : (
                <QuoteScreen
                  onGetQuote={getQuote}
                  quote={quote}
                  error={error}
                />
              )
            }
          />
          <Route
            path='/buy'
            element={
              !user.currentUser ? (
                <LoginScreen onSignIn={signIn} />
              ) : (
                <BuyScreen onGetQuote={getQuote} quote={quote} error={error} />
              )
            }
          />
          <Route
            path='/sell'
            element={
              !user.currentUser ? (
                <LoginScreen onSignIn={signIn} />
              ) : (
                <SellScreen onGetQuote={getQuote} quote={quote} error={error} />
              )
            }
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
