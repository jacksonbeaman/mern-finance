import { useState } from 'react';
import Button from '../components/button/Button';

const QuoteScreen = ({ userToken }) => {
  const [inputSymbol, setInputSymbol] = useState('');
  const [{ symbol, companyName, price }, setQuote] = useState({
    symbol: null,
    companyName: null,
    price: null,
  });

  const submitHandler = (e) => {
    e.preventDefault();
    setInputSymbol(inputSymbol.trim());
    onGetQuote(inputSymbol);
    setInputSymbol('');
  };
  return (
    <>
      <div className={`container + formScreen`}>
        <div className='formContainer'>
          <h1>Lookup Symbol</h1>
          <form onSubmit={submitHandler}>
            <input
              type='text'
              placeholder='Enter symbol'
              value={inputSymbol}
              onChange={(e) => setInputSymbol(e.target.value)}
            ></input>
            <Button type='submit' text='Get Quote' />
          </form>
          {symbol && (
            <span>{`A share of ${companyName} (${symbol}) costs $${price}`}</span>
          )}
        </div>
      </div>
    </>
  );
};

export default QuoteScreen;
