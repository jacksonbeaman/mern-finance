import { useState, useEffect } from 'react';
import portfolio from '../portfolio.js';
import { useStateValue } from '../state/index.js';
import { SET_USER_DATA } from '../state/types.js';
import { getQuote, getUser } from '../utils/fetches.js';

const UserHomeScreen = () => {
  const [{ currentUser, userToken, cash, positions, transactions }, dispatch] =
    useStateValue();
  const [positionValues, setPositionValues] = useState({});

  useEffect(() => {
    // TODO const {positions, positions} = getUser();

    const getUserData = async () => {
      try {
        const userData = await getUser(currentUser, userToken);
        dispatch({ type: SET_USER_DATA, payload: userData });
      } catch (error) {
        console.error(error);
      }
    };

    const getPositionValues = () => {
      for (const symbol in positions) {
        let shares = positions[symbol];
        (async () => {
          try {
            // TODO fetch companyName
            const { price } = await getQuote(symbol, userToken);

            setPositionValues((positionValues) => ({
              ...positionValues,
              [symbol]: price * shares,
            }));
          } catch (error) {
            console.error(error);
          }
        })();
      }
    };

    // getPositionValues with static data
    // const getPositionValues = () => {
    //   portfolio.positions.forEach(async ({ symbol, shares }) => {
    //     try {
    //       const { price } = await getQuote(symbol, userToken);

    //       setPositionValues((positionValues) => ({
    //         ...positionValues,
    //         [symbol]: price * shares,
    //       }));
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   });
    // };
    positions && getPositionValues();

    // TODO rewrite positions data for object instead of array
  }, [currentUser, userToken, positions, dispatch]);

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
                  {Object.keys(positionValues).length ===
                    portfolio.positions.length &&
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
