import { useState } from 'react';
import Button from '../components/button/Button';
import { getQuote } from '../utils/fetches';

const QuoteScreen = ({ userToken }) => {
  const [inputSymbol, setInputSymbol] = useState('');
  const [{ symbol, companyName, price }, setQuote] = useState({
    symbol: null,
    companyName: null,
    price: null,
  });
  const [quoteErrorMessage, setQuoteErrorMessage] = useState(undefined);

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      setQuoteErrorMessage(undefined);
      setInputSymbol(inputSymbol.trim());
      setQuote({
        symbol: null,
        companyName: null,
        price: null,
      });
      const fetchedQuote = await getQuote(inputSymbol, userToken);
      setQuote(fetchedQuote);
      setInputSymbol('');
    } catch (error) {
      // follows Axios catch block error handling logic - see Axios documentation
      setQuoteErrorMessage(
        error?.response?.data
          ? error?.response?.data
          : error?.response
          ? error?.response
          : error?.message
          ? error?.message
          : undefined
      );
      setInputSymbol('');
    }
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
          {quoteErrorMessage && <span>{quoteErrorMessage}</span>}
        </div>
      </div>
    </>
  );
};

export default QuoteScreen;
