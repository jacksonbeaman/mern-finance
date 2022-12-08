import { SET_USER_CREDENTIALS, SET_USER_DATA } from './types';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_USER_CREDENTIALS:
      const { currentUser, userEmail, userToken } = action.payload;
      return {
        ...state,
        currentUser,
        userEmail,
        userToken,
      };
    case SET_USER_DATA:
      const { cash, positions, transactions } = action.payload;
      return {
        ...state,
        cash,
        positions,
        transactions,
      };
    default:
      return state;
  }
};

export default reducer;
