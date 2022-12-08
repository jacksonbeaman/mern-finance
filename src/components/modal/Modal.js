import { useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import { useStateValue } from '../../state';
import { SET_USER_DATA } from '../../state/types';
import { fundAccount, withdrawAccount } from '../../utils/fetches';
import Button from '../button/Button';
import styles from './modal.module.css';

const Modal = ({ onClick }) => {
  const [
    { currentUser, userEmail, userToken, cash, positions, transactions },
    dispatch,
  ] = useStateValue();
  const [transactionType, setTransactionType] = useState('fund');
  const [cashToTransact, setCashToTransact] = useState(0.0);
  const [transactionErrorMessage, setTransactionErrorMessage] =
    useState(undefined);

  const submitHandler = async (e) => {
    try {
      e.preventDefault();

      let payload;
      if (transactionType === 'fund') {
        const { updatedUserData } = await fundAccount(
          userEmail,
          userToken,
          cashToTransact
        );
        payload = updatedUserData;
      } else {
        // ensure cashToWithdraw is a negative number
        const cashToWithdraw = -cashToTransact;
        const { updatedUserData } = await withdrawAccount(
          userEmail,
          userToken,
          cashToWithdraw
        );
        payload = updatedUserData;
      }

      setTransactionType('fund');
      setCashToTransact(0.0);

      dispatch({ type: SET_USER_DATA, payload });
      onClick();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className={styles.darkBackground} onClick={onClick}></div>
      <div className={styles.modal}>
        <div className={styles.buttonClose}>
          <Button onClick={onClick} text={''} close={true} />
        </div>
        <div className={styles.headingContainer}>
          <h3>Deposit / Transfer</h3>
        </div>
        <div className={styles.modalFormContainer}>
          <form onSubmit={submitHandler}>
            <select onChange={(e) => setTransactionType(e.target.value)}>
              <option defaultValue={'fund'} value={'fund'}>
                Deposit
              </option>
              <option value={'withdraw'}>Transfer</option>
            </select>
            <CurrencyInput
              value={cashToTransact}
              name='input-name'
              placeholder='Please enter amount'
              defaultValue={1000}
              decimalsLimit={2}
              onValueChange={(value, name) => setCashToTransact(value)}
            />

            <Button type='submit' text='Submit' />
          </form>
        </div>
      </div>
    </>
  );
};

export default Modal;
