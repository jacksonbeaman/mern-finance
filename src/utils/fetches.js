import axios from 'axios';
import { Auth } from 'aws-amplify';

export const signUp = async (username, password) => {
  try {
    await Auth.signUp({
      username,
      password,
    });

    const settings = {
      url: `/createUser?user=${username}`,
      baseURL: `${process.env.REACT_APP_AWS_API_GATEWAY_INVOKE_URL}`,
      method: 'post',
      timeout: 0,
    };
    await axios(settings);
  } catch (error) {
    console.error('error signing up:', error);
    return error;
  }
};

export const signIn = async (username, password) => {
  try {
    const user = await Auth.signIn(username, password);
    console.log(user);
    console.log(user.attributes.email);
    console.log(user.signInUserSession.idToken.jwtToken);
    return {
      currentUser: user.username,
      userEmail: user.attributes.email,
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
    return { currentUser: null, userEmail: null, userToken: null };
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

export const getUser = async (userEmail, userToken) => {
  try {
    const settings = {
      url: `/getUser?user=${userEmail}`,
      baseURL: `${process.env.REACT_APP_AWS_API_GATEWAY_INVOKE_URL}`,
      method: 'get',
      timeout: 0,
      headers: {
        Authorization: userToken,
      },
    };
    const { data } = await axios(settings);
    return {
      cash: data.cash,
      positions: data.positions,
      transactions: data.transactions,
    };
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const sellStock = async (userEmail, userToken, symbol, shares) => {
  try {
    const settings = {
      url: '/sell',
      baseURL: `${process.env.REACT_APP_AWS_API_GATEWAY_INVOKE_URL}`,
      method: 'post',
      timeout: 0,
      headers: {
        'Content-Type': 'application/json',
        Authorization: userToken,
      },
      data: { user: userEmail, symbol, shares },
    };

    const { data } = await axios(settings);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const buyStock = async (userEmail, userToken, symbol, shares) => {
  try {
    const settings = {
      url: '/buy',
      baseURL: `${process.env.REACT_APP_AWS_API_GATEWAY_INVOKE_URL}`,
      method: 'post',
      timeout: 0,
      headers: {
        'Content-Type': 'application/json',
        Authorization: userToken,
      },
      data: { user: userEmail, symbol, shares },
    };

    const { data } = await axios(settings);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
