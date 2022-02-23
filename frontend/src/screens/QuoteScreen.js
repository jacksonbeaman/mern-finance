import { useState } from 'react';
import Button from '../components/button/Button';
import PropTypes from 'prop-types';

const QuoteScreen = ({
  onGetQuote,
  res: { symbol, companyName, price },
  error,
}) => {
  const [inputSymbol, setInputSymbol] = useState('');

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
            <span>{`A share of ${companyName} [${symbol}] costs $${price}`}</span>
          )}
        </div>
      </div>
    </>
  );
};

QuoteScreen.defaultProps = {
  res: null,
  error: null,
};

QuoteScreen.proptype = {
  onGetQuote: PropTypes.func.isRequired,
  res: PropTypes.shape({
    symbol: PropTypes.string,
    companyName: PropTypes.string,
    price: PropTypes.string,
  }),
  error: PropTypes.object,
};

export default QuoteScreen;
