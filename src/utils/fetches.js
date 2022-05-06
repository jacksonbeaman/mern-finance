import axios from 'axios';
import { Auth } from 'aws-amplify';

export const signUp = async (username, password) => {
  try {
    await Auth.signUp({
      username,
      password,
    });
  } catch (error) {
    console.error('error signing up:', error);
    return error;
  }
};

export const signIn = async (username, password) => {
  try {
    const user = await Auth.signIn(username, password);
    console.log(user);
    console.log(user.signInUserSession.idToken.jwtToken);
    return {
      currentUser: user.username,
      userToken: user.signInUserSession.idToken.jwtToken,
    };
  } catch (error) {
    console.error('error signing in', error);
    return error;
  }
};

export const signOut = async () => {
  try {
    await Auth.signOut();
    return { username: null, userToken: null };
  } catch (error) {
    console.error('error signing out: ', error);
    return error;
  }
};

export const getQuote = async (symbol, userToken) => {
  try {
    const settings = {
      url: `/quote?symbol=${symbol}`,
      baseURL: `${process.env.REACT_APP_AWS_API_GATEWAY_INVOKE_URL}`,
      method: 'get',
      timeout: 0,
      headers: {
        Authorization: userToken,
      },
    };
    const { data } = await axios(settings);
    return {
      symbol: data.symbol,
      companyName: data.companyName,
      price: data.latestPrice,
    };
  } catch (error) {
    console.log(error);
    return error;
  }
};
