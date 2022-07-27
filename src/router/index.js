import { useEffect, useState } from 'react';
import Amplify, { Auth } from 'aws-amplify';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import UserHeader from '../components/userHeader/UserHeader';
import BuyScreen from '../screens/BuyScreen';
import HistoryScreen from '../screens/HistoryScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import QuoteScreen from '../screens/QuoteScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SellScreen from '../screens/SellScreen';
import UserHomeScreen from '../screens/UserHomeScreen';
import { getUser, signIn, signOut } from '../utils/fetches';
import { useStateValue } from '../state';
import { SET_USER_CREDENTIALS, SET_USER_DATA } from '../state/types';

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

const AppRouter = () => {
  const [
    { currentUser, userEmail, userToken, cash, positions, transactions },
    dispatch,
  ] = useStateValue();
  const [error, setError] = useState({ message: null });

  Amplify.configure(amplifyConfig);

  useEffect(() => {
    (async () => {
      try {
        if (!currentUser) {
          const {
            username,
            attributes: { email },
            signInUserSession: {
              idToken: { jwtToken },
            },
          } = await Auth.currentAuthenticatedUser();
          dispatch({
            type: SET_USER_CREDENTIALS,
            payload: {
              currentUser: username,
              userEmail: email,
              userToken: jwtToken,
            },
          });
        }
      } catch (error) {
        console.error(error);
      }
    })();

    (async () => {
      try {
        if (currentUser && !positions) {
          const { cash, positions, transactions } = await getUser(
            userEmail,
            userToken
          );

          dispatch({
            type: SET_USER_DATA,
            payload: { cash, positions, transactions },
          });
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [currentUser, userToken, cash, positions, transactions]);

  const onSignIn = async ({ username, password }) => {
    const userCredentials = await signIn(username, password);
    dispatch({ type: SET_USER_CREDENTIALS, payload: userCredentials });
    // TODO fetch user data from dynamo
    // TODO push to local state
  };

  const onSignOut = async () => {
    const userCredentials = await signOut();
    dispatch({ type: SET_USER_CREDENTIALS, payload: userCredentials });
    dispatch({
      type: SET_USER_DATA,
      payload: { cash: null, positions: null, transactions: null },
    });
  };

  // You can get the current config object
  // const currentConfig = Auth.configure();
  // console.log(currentConfig);
  return (
    <Router>
      {currentUser ? <UserHeader onSignOut={onSignOut} /> : <Header />}
      <Routes>
        <Route
          path='/'
          element={currentUser ? <UserHomeScreen /> : <HomeScreen />}
        />
        <Route path='/login' element={<LoginScreen onSignIn={onSignIn} />} />
        <Route path='/register' element={<RegisterScreen />} />
        <Route
          path='/quote'
          element={
            !currentUser ? (
              <LoginScreen onSignIn={onSignIn} />
            ) : (
              <QuoteScreen userToken={userToken} />
            )
          }
        />
        <Route
          path='/buy'
          element={
            !currentUser ? (
              <LoginScreen onSignIn={onSignIn} />
            ) : (
              <BuyScreen userToken={userToken} />
            )
          }
        />
        <Route
          path='/sell'
          element={
            !currentUser ? <LoginScreen onSignIn={onSignIn} /> : <SellScreen />
          }
        />
        <Route
          path='/history'
          element={
            !currentUser ? (
              <LoginScreen onSignIn={onSignIn} />
            ) : (
              <HistoryScreen />
            )
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRouter;
