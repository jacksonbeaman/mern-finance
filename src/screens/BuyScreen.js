import { useState } from 'react';
import Button from '../components/button/Button';
import { getQuote } from '../utils/fetches';

const BuyScreen = () => {
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
    setInputSymbol('');
    setInputShares('');
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
              {`You have purchased ${transactedShares} shares of ${companyName} (${symbol}) at $${price} per share.`}
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default BuyScreen;
