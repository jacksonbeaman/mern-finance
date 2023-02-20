import React, { useEffect, useState } from 'react';
import { useStateValue } from '../../state';
import { weatherCodes } from '../../utils/constants';
import { getWeatherData } from '../../utils/fetches';
import styles from './dashboardHeader.module.css';

const setCoords = async (coords, setUserLocationInfo) => {
  try {
    const data = await getWeatherData(
      coords.latitude.toFixed(4),
      coords.longitude.toFixed(4)
    );
    setUserLocationInfo(data);
  } catch (error) {
    console.log(error);
  }
};

const DashboardHeader = ({ totalAccountValue }) => {
  const [{ userEmail, cash, positions }, dispatch] = useStateValue();

  const [userLocationInfo, setUserLocationInfo] = useState({});
  const [userLocalDateTime, setUserLocalDateTime] = useState(
    new Date().toLocaleString()
  );

  useEffect(() => {
    setInterval(() => setUserLocalDateTime(new Date().toLocaleString()), 500);
    const success = async ({ coords }) =>
      setCoords(coords, setUserLocationInfo);
    navigator.geolocation.getCurrentPosition(success);
  }, []);
  return (
    <div className={styles.dashboardHeader}>
      <div className={styles.headerLeft}>
        <h3>{`Hello ${userEmail}`}</h3>
        <hr className={styles.userUnderline} />
        <h5 className={styles.geoInfo}>{`Looks like today's weather will have ${
          weatherCodes?.[userLocationInfo?.current_weather?.weathercode]
        }`}</h5>
        <h5 className={styles.geoInfo}>{userLocalDateTime}</h5>
      </div>
      <div className={styles.headerRight}>
        <hr className={styles.totalsGeometric} />
        <h4
          className={styles.totalAccountValue}
        >{`Total account value $${totalAccountValue}`}</h4>
        <h4
          className={styles.totalCashValue}
        >{`Total available cash $${cash}`}</h4>
      </div>
    </div>
  );
};

export default DashboardHeader;
