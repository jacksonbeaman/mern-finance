import { useState } from 'react';
import Button from '../components/button/Button';
import { getQuote } from '../utils/fetches';
import { useStateValue } from '../state';

const SellScreen = () => {
  const [{ currentUser, userToken, cash, positions, transactions }, dispatch] =
    useStateValue();
  const [inputSymbol, setInputSymbol] = useState('');
  const [inputShares, setInputShares] = useState('');
  const [{ symbol, companyName, price }, setQuote] = useState({
    symbol: null,
    companyName: null,
    price: null,
  });
  const [transactedShares, setTransactedShares] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    setQuote({
      symbol: null,
      companyName: null,
      price: null,
    });
    setTransactedShares('');
    setInputSymbol(inputSymbol.trim());
    const fetchedQuote = await getQuote(inputSymbol, userToken);
    setQuote(fetchedQuote);
    setTransactedShares(inputShares);
    // setInputSymbol('');
    setInputShares('');
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
              {`You have sold ${transactedShares} shares of ${companyName} (${symbol}) at $${price} per share.`}
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default SellScreen;
