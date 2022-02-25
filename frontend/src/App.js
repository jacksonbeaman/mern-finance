import { useState } from 'react';
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
  const [res, setQuote] = useState({
    symbol: null,
    companyName: null,
    price: null,
  });
  const [error, setError] = useState({ message: null });

  Amplify.configure(amplifyConfig);

  const signUp = async ({ username, password }) => {
    try {
      const { user } = await Auth.signUp({
        username,
        password,
      });
      console.log(user);
    } catch (error) {
      console.error('error signing up:', error);
    }
  };

  const signIn = async ({ username, password }) => {
    try {
      const user = await Auth.signIn(username, password);
      console.log(user);
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
        baseURL: 'https://c5un9qkyu2.execute-api.us-west-2.amazonaws.com/prod',
        method: 'get',
        timeout: 0,
        headers: {
          Authorization: user.userToken,
        },
      };
      const { data } = await axios(settings);
      console.log(data);
      setQuote({
        symbol: data.symbol,
        companyName: data.companyName,
        price: data.price,
      });
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  console.log(user);

  // You can get the current config object
  const currentConfig = Auth.configure();
  console.log(currentConfig);

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
                <LoginScreen onSignIn={signIn} />
              ) : (
                <QuoteScreen onGetQuote={getQuote} res={res} error={error} />
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
