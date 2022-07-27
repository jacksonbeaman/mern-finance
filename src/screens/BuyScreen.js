import { useState } from 'react';
import Button from '../components/button/Button';
import { useStateValue } from '../state';
import { SET_USER_DATA } from '../state/types';
import { buyStock, getQuote } from '../utils/fetches';

const BuyScreen = () => {
  const [
    { currentUser, userEmail, userToken, cash, positions, transactions },
    dispatch,
  ] = useStateValue();
  const [inputSymbol, setInputSymbol] = useState('');
  const [inputShares, setInputShares] = useState('');
  const [
    { symbol, companyName, shares, sharePrice, amount, updatedUserData },
    setQuote,
  ] = useState({
    symbol: null,
    companyName: null,
    shares: null,
    sharePrice: null,
    amount: null,
    updatedUserData: null,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    setQuote({
      symbol: null,
      companyName: null,
      shares: null,
      sharePrice: null,
      amount: null,
      updatedUserData: null,
    });
    setInputSymbol(inputSymbol.trim());

    const {
      symbol: updatedSymbol,
      companyName: updatedCompanyName,
      shares: updatedShares,
      sharePrice: updatedSharePrice,
      amount: updatedAmount,
      updatedUserData: updatedUserData,
    } = await buyStock(userEmail, userToken, inputSymbol, inputShares);

    setQuote({
      symbol: updatedSymbol,
      companyName: updatedCompanyName,
      shares: updatedShares,
      sharePrice: updatedSharePrice,
      amount: updatedAmount,
      updatedUserData: updatedUserData,
    });

    setInputSymbol('');
    setInputShares('');

    dispatch({ type: SET_USER_DATA, payload: updatedUserData });
  };
  return (
    <>
      <div className={`container + formScreen`}>
        <div className='formContainer'>
          <h1>Buy</h1>
          <form onSubmit={submitHandler}>
            <input
              type='text'
              placeholder='Symbol'
              value={inputSymbol}
              onChange={(e) => setInputSymbol(e.target.value)}
            ></input>
            <input
              type='number'
              min='1'
              placeholder='Shares'
              value={inputShares}
              onChange={(e) => setInputShares(e.target.value)}
            ></input>
            <Button type='submit' text='Buy' disabled={inputShares < 1} />
          </form>
          {symbol && (
            <span>
              {`You have purchased ${shares} shares of ${companyName} (${symbol}) at $${sharePrice} per share for a total of $${-amount}.`}
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default BuyScreen;
