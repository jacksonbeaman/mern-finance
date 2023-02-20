import axios from 'axios';
import { Auth } from 'aws-amplify';

export const signUp = async (username, password) => {
  try {
    await Auth.signUp({
      username,
      password,
    });

    const settings = {
      url: `/user?user=${username}`,
      baseURL: `${process.env.REACT_APP_AWS_API_GATEWAY_INVOKE_URL}`,
      method: 'post',
      timeout: 0,
    };
    await axios(settings);
  } catch (error) {
    console.error('error signing up:', error);
    throw error;
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
    throw error;
  }
};

export const signOut = async () => {
  try {
    await Auth.signOut();
    return { currentUser: null, userEmail: null, userToken: null };
  } catch (error) {
    console.error('error signing out: ', error);
    throw error;
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
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUser = async (userEmail, userToken) => {
  try {
    const settings = {
      url: `/user?user=${userEmail}`,
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
    throw error;
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
    throw error;
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
    throw error;
  }
};

export const fundAccount = async (userEmail, userToken, amount) => {
  try {
    const settings = {
      url: '/fund',
      baseURL: `${process.env.REACT_APP_AWS_API_GATEWAY_INVOKE_URL}`,
      method: 'post',
      timeout: 0,
      headers: {
        'Content-Type': 'application/json',
        Authorization: userToken,
      },
      data: { user: userEmail, cashToDeposit: amount },
    };

    const { data } = await axios(settings);
    return data;
  } catch (error) {
    throw error;
  }
};

export const withdrawAccount = async (userEmail, userToken, amount) => {
  try {
    const settings = {
      url: '/withdraw',
      baseURL: `${process.env.REACT_APP_AWS_API_GATEWAY_INVOKE_URL}`,
      method: 'post',
      timeout: 0,
      headers: {
        'Content-Type': 'application/json',
        Authorization: userToken,
      },
      data: { user: userEmail, cashToWithdraw: amount },
    };

    const { data } = await axios(settings);
    return data;
  } catch (error) {
    throw error;
  }
};
