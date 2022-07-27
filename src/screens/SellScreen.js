import { useState } from 'react';
import Button from '../components/button/Button';
import { getQuote, sellStock } from '../utils/fetches';
import { useStateValue } from '../state';
import { SET_USER_DATA } from '../state/types';

const SellScreen = () => {
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
    } = await sellStock(userEmail, userToken, inputSymbol, inputShares);

    setInputShares('');
    setInputSymbol('');

    setQuote({
      symbol: updatedSymbol,
      companyName: updatedCompanyName,
      shares: updatedShares,
      sharePrice: updatedSharePrice,
      amount: updatedAmount,
      updatedUserData: updatedUserData,
    });

    dispatch({ type: SET_USER_DATA, payload: updatedUserData });
  };

  return (
    <>
      <div className={`container + formScreen`}>
        <div className='formContainer'>
          <h1>Sell</h1>
          <form onSubmit={submitHandler}>
            <select onChange={(e) => setInputSymbol(e.target.value)}>
              <option defaultValue={''}>Symbol</option>
              {positions &&
                Object.keys(positions).map((symbol, index) => (
                  <option key={`${index}-${symbol}`} value={symbol}>
                    {symbol}
                  </option>
                ))}
            </select>
            <input
              type='number'
              min='1'
              max={inputSymbol.length > 0 ? positions[inputSymbol] : 1}
              placeholder='Shares'
              value={inputShares}
              onChange={(e) => setInputShares(e.target.value)}
            ></input>
            <Button type='submit' text='Sell' />
          </form>
          {symbol && (
            <span>
              {`You have sold ${-shares} shares of ${companyName} (${symbol}) at $${sharePrice} per share for a total of $${amount}.`}
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default SellScreen;
