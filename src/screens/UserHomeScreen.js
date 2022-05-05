import { useState, useEffect } from 'react';
import portfolio from '../portfolio.js';
import { getQuote } from '../utils/fetches.js';

const UserHomeScreen = ({ userToken }) => {
  const [positionValues, setPositionValues] = useState({});

  useEffect(() => {
    const getPositionValues = () => {
      portfolio.positions.forEach(async ({ symbol, shares }) => {
        try {
          const { price } = await getQuote(symbol, userToken);

          setPositionValues((positionValues) => ({
            ...positionValues,
            [symbol]: price * shares,
          }));
        } catch (error) {
          console.error(error);
        }
      });
    };
    getPositionValues();
  }, [userToken]);

  return (
    <>
      <div className={`container tableScreen`}>
        <div className='tableContainer'>
          <h1>Portfolio</h1>
          <table className='portfolioTable'>
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
                  <td>
                    $
                    {positionValues[position.symbol] &&
                      positionValues[position.symbol]
                        .toFixed(2)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </td>
                </tr>
              ))}
              <tr>
                <td>CASH</td>
                <td></td>
                <td></td>
                <td>
                  $
                  {portfolio.cash
                    .toFixed(2)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  $
                  {positionValues &&
                    Object.values(positionValues)
                      .reduce(
                        (acc, positionValue) => acc + positionValue,
                        portfolio.cash
                      )
                      .toFixed(2)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserHomeScreen;
