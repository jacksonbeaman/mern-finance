import { useState, useEffect, useCallback } from 'react';
import portfolio from '../portfolio.js';

const UserHomeScreen = ({ onGetQuote, quote, error }) => {
  const [prices, setPrices] = useState([]);

  // const getFakePrice = async (index) => {
  //   try {
  //     const settings = {
  //       url: `/users/1/albums`,
  //       baseURL: 'https://jsonplaceholder.typicode.com/',
  //       method: 'get',
  //       timeout: 0,
  //     };
  //     const { data } = await axios(settings);

  //     return data[index];
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const getId = async (index) => {
  //   try {
  //     const { id } = await getFakePrice(index);
  //     return id;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const getPrices = useCallback(
  //   () => portfolio.positions.map(({ symbol }, index) => symbol),
  //   []
  // );

  // const getIds = () =>
  //   portfolio.positions.map(async (position, index) => {
  //     try {
  //       const newId = await getId(index);
  //       console.log(newId);
  //       return newId;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   });

  // useEffect(() => {
  //   const calcPrices = getPrices();
  //   console.log(getId(5));
  //   console.log(calcPrices);
  //   setPrices(calcPrices);
  //   console.log(getIds());
  // }, [getPrices]);

  const getPrices = useCallback(
    () =>
      portfolio.positions.map(async ({ symbol, shares }) => {
        const { price } = await onGetQuote(symbol);
        return price * shares;
      }),
    [onGetQuote]
  );

  useEffect(() => {
    (async () => {
      try {
        const calcPrices = await getPrices();
        console.log(calcPrices);
        setPrices(calcPrices);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [getPrices]);

  return (
    <>
      <div className={`container tableScreen`}>
        <div className='tableContainer'>
          <h1>Portfolio</h1>
          <table>
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Name</th>
                <th>Shares</th>
                <th>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.positions.map((position, index) => (
                <tr key={`${index}-${position.symbol}`}>
                  <td>{position.symbol}</td>
                  <td>{position.companyName}</td>
                  <td>{position.shares}</td>
                  <td>{prices[index]}</td>
                </tr>
              ))}
              <tr>
                <td>CASH</td>
                <td></td>
                <td></td>
                <td>Reduce() Total</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserHomeScreen;
