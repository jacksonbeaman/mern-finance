import { useState } from 'react';
import Button from '../components/button/Button';
import portfolio from '../portfolio';

const SellScreen = ({
  onGetQuote,
  quote: { symbol, companyName, price },
  error,
}) => {
  const [inputSymbol, setInputSymbol] = useState('');
  const [inputShares, setInputShares] = useState('');

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
              <option defaultValue={''}>Symbol</option>
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
