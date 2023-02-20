import styles from './positionsGrid.module.css';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const PositionsGrid = ({
  positions,
  positionMetadata,
  cash,
  setTotalAccountValue,
  totalAccountValue,
}) => {
  const [positionPercentages, setPositionPercentages] = useState({});
  useEffect(() => {
    const getTotalAcountValue = () => {
      return +Object.values(positionMetadata)
        .reduce((acc, { positionValue }) => acc + positionValue, cash)
        .toFixed(2);
    };

    positionMetadata &&
      positions &&
      Object.keys(positionMetadata).length === Object.keys(positions).length &&
      setTotalAccountValue(getTotalAcountValue());

    const getPositionPercentages = () => {
      Object.keys(positionMetadata).map((symbol, index) => {
        let positionPercentage = +(
          (positionMetadata[symbol]?.positionValue * 100) /
          totalAccountValue
        ).toFixed(2);

        setPositionPercentages((positionPercentages) => ({
          ...positionPercentages,
          [symbol]: positionPercentage,
        }));
      });
    };

    totalAccountValue > 0 && getPositionPercentages();
  }, [positions, positionMetadata, totalAccountValue]);
  return (
    <div className={styles.positionsGrid}>
      {positions &&
        Object.keys(positions).map((symbol, index) => (
          <div className={styles.positionCard} key={`${index}-${symbol}`}>
            <div className={styles.gridItemsLeft}>
              <h3>{symbol}</h3>
              <p
                className={
                  positionMetadata[symbol]?.change >= 0
                    ? styles.positive
                    : styles.negative
                }
              >
                $
                {`${Math.abs(positionMetadata[symbol]?.change)} (${
                  positionMetadata[symbol]?.changePercent
                }%)`}
              </p>
              <p>
                $
                {positionMetadata[symbol]?.positionValue &&
                  positionMetadata[symbol]?.positionValue
                    .toFixed(2)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </p>
              <p>
                {positionMetadata[symbol]?.companyName &&
                  positionMetadata[symbol]?.companyName}
              </p>
            </div>
            <div className={styles.gridItemsRight}>
              {Object.keys(positionPercentages).length > 0 && (
                <svg height='20' width='20' viewBox='0 0 20 20'>
                  <circle cx='10' cy='10' r='10' fill='#ced4da' />
                  <circle
                    cx='10'
                    cy='10'
                    r='5'
                    fill='transparent'
                    stroke='#4c6ef5'
                    strokeWidth='10'
                    strokeDasharray={((posPer) =>
                      `${(posPer / 100) * 31.42} 31.42`)(
                      positionPercentages[symbol]
                    )}
                    transform='rotate(-90) translate(-20)'
                  />
                </svg>
              )}
              {Object.keys(positionPercentages).length > 0 && (
                <p>
                  {positionPercentages[symbol]}% of<br></br>your portfolio
                </p>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

PositionsGrid.defaultProps = {
  positions: null,
  positionMetadata: null,
  cash: null,
  totalAccountValue: 0,
};

PositionsGrid.propTypes = {
  positions: PropTypes.object,
  positionMetadata: PropTypes.shape({
    positionValue: PropTypes.number,
    companyName: PropTypes.string,
    change: PropTypes.number,
    changePercent: PropTypes.number,
  }),
  cash: PropTypes.number,
  totalAccountValue: PropTypes.number,
  setTotalAccountValue: PropTypes.func,
};
export default PositionsGrid;
