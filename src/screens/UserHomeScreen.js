import { useState, useEffect } from 'react';
import DashboardHeader from '../components/dashboardHeader/DashboardHeader.js';
import PositionsGrid from '../components/positionsGrid/PositionsGrid.js';
import { useStateValue } from '../state/index.js';
import { getQuote } from '../utils/fetches.js';

const UserHomeScreen = () => {
  const [{ currentUser, userToken, cash, positions }, dispatch] =
    useStateValue();
  const [positionMetadata, setPositionMetadata] = useState({});
  const [totalAccountValue, setTotalAccountValue] = useState(0);

  useEffect(() => {
    const getPositionMetadata = () => {
      for (const symbol in positions) {
        let shares = positions[symbol];
        (async () => {
          try {
            const { latestPrice, companyName, change, changePercent } =
              await getQuote(symbol, userToken);

            setPositionMetadata((positionMetadata) => ({
              ...positionMetadata,
              [symbol]: {
                positionValue: latestPrice * shares,
                companyName,
                change,
                changePercent,
              },
            }));
          } catch (error) {
            console.error(error);
          }
        })();
      }
    };

    positions && cash && getPositionMetadata();
  }, [currentUser, userToken, positions, cash, dispatch]);

  return (
    <>
      <div className={`container tableScreen`}>
        <div className='tableContainer'>
          <DashboardHeader totalAccountValue={totalAccountValue} />
          <PositionsGrid
            positions={positions}
            positionMetadata={positionMetadata}
            cash={cash}
            setTotalAccountValue={setTotalAccountValue}
            totalAccountValue={totalAccountValue}
          />
        </div>
      </div>
    </>
  );
};

export default UserHomeScreen;
