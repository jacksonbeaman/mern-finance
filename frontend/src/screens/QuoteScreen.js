import { useState } from 'react';
import Button from '../components/button/Button';

const QuoteScreen = () => {
  const [symbol, setSymbol] = useState('');
  const [quote, setQuote] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();
    setSymbol(symbol.trim());
    alert(symbol);
    setSymbol('');
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
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
            ></input>
            <Button type='submit' text='Get Quote' />
          </form>
          {quote && (
            <span>{`A share of this company (symbol) costs $${quote}`}</span>
          )}
        </div>
      </div>
    </>
  );
};

export default QuoteScreen;
