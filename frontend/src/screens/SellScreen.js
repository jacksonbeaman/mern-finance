import { useState } from 'react';
import Button from '../components/button/Button';

const SellScreen = ({
  onGetQuote,
  quote: { symbol, companyName, price },
  error,
}) => {
  const [inputSymbol, setInputSymbol] = useState('');
  const [inputShares, setInputShares] = useState('');

  const portfolio = {
    positions: [
      {
        id: 1,
        symbol: 'MSFT',
        companyName: 'Microsoft Corporation',
        price: 294.95,
        shares: 20,
      },
      {
        id: 2,
        symbol: 'AAPL',
        companyName: 'Apple Inc',
        price: 163.2,
        shares: 20,
      },
    ],
    cash: 5000,
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setInputSymbol(inputSymbol.trim());
    onGetQuote(inputSymbol);
    alert(`${inputSymbol} and ${inputShares}`);
    setInputSymbol('');
    setInputShares('');
  };

  return (
    <>
      <div className={`container + formScreen`}>
        <div className='formContainer'>
          <h1>Sell</h1>
          <form onSubmit={submitHandler}>
            <select onChange={(e) => setInputSymbol(e.target.value)}>
              <option selected>Symbol</option>
              {portfolio.positions.map(({ symbol }, index) => (
                <option key={`${index}-${symbol}`} value={symbol}>
                  {symbol}
                </option>
              ))}
            </select>
            <input
              type='number'
              min='1'
              max={
                portfolio.positions.find(({ symbol }) => symbol === inputSymbol)
                  ?.shares
              }
              placeholder='Shares'
              value={inputShares}
              onChange={(e) => setInputShares(e.target.value)}
            ></input>
            <Button type='submit' text='Sell' />
          </form>
        </div>
      </div>
    </>
  );
};

export default SellScreen;
