import { useEffect, useState } from 'react';
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
import HistoryScreen from './screens/HistoryScreen';
import { signIn, signOut } from './utils/fetches';
import reducer from './state/reducers';
import { initialState, StateProvider } from './state';
import router from './router';
import AppRouter from './router';

const App = () => {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <AppRouter />
    </StateProvider>
  );
};

export default App;
