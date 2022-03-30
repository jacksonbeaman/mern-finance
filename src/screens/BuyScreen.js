import { useState } from 'react';
import Button from '../components/button/Button';
import PropTypes from 'prop-types';

const BuyScreen = ({
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
    setInputSymbol('');
    if (symbol) {
      alert(
        `You have purchased ${inputShares} shares of ${companyName} (${symbol} at $${price}) per share.`
      );
    }
    // setInputShares('');
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
            <Button type='submit' text='Buy' />
          </form>
        </div>
      </div>
    </>
  );
};

BuyScreen.defaultProps = {
  quote: null,
  error: null,
};

BuyScreen.proptype = {
  onGetQuote: PropTypes.func.isRequired,
  quote: PropTypes.shape({
    symbol: PropTypes.string,
    companyName: PropTypes.string,
    price: PropTypes.string,
  }),
  buy: PropTypes.shape(
    { sharesRequested: PropTypes.number },
    { sharesBought: PropTypes.number }
  ),
  error: PropTypes.object,
};

export default BuyScreen;
