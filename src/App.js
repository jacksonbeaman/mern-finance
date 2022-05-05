import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Amplify, { Auth } from 'aws-amplify';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import UserHeader from './components/userHeader/UserHeader';
import QuoteScreen from './screens/QuoteScreen';
import BuyScreen from './screens/BuyScreen';
import SellScreen from './screens/SellScreen';
import UserHomeScreen from './screens/UserHomeScreen';
import { signIn, signOut } from './utils/fetches';

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

  const onSignIn = async ({ username, password }) => {
    setUser(await signIn(username, password));
  };

  const onSignOut = async () => setUser(await signOut());

  // You can get the current config object
  // const currentConfig = Auth.configure();
  // console.log(currentConfig);

  return (
    <>
      <Router>
        {user.currentUser ? <UserHeader onSignOut={onSignOut} /> : <Header />}
        <Routes>
          <Route
            path='/'
            element={
              user.currentUser ? (
                <UserHomeScreen userToken={user.userToken} />
              ) : (
                <HomeScreen />
              )
            }
          />
          <Route path='/login' element={<LoginScreen onSignIn={onSignIn} />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route
            path='/quote'
            element={
              !user.currentUser ? (
                <LoginScreen onSignIn={onSignIn} />
              ) : (
                <QuoteScreen userToken={user.userToken} />
              )
            }
          />
          <Route
            path='/buy'
            element={
              !user.currentUser ? (
                <LoginScreen onSignIn={onSignIn} />
              ) : (
                <BuyScreen userToken={user.userToken} />
              )
            }
          />
          <Route
            path='/sell'
            element={
              !user.currentUser ? (
                <LoginScreen onSignIn={onSignIn} />
              ) : (
                <SellScreen userToken={user.userToken} />
              )
            }
          />
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
