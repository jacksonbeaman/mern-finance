import { useStateValue } from '../state';

const HistoryScreen = () => {
  const [{ transactions }, dispatch] = useStateValue();

  return (
    <>
      <div className={`container tableScreen`}>
        <div className='tableContainer'>
          <h1>Transaction History</h1>
          <table>
            <thead>
              <tr>
                <th>Transaction Type</th>
                <th>Symbol</th>
                <th>Name</th>
                <th>Shares</th>
                <th>Share Price</th>
                <th>Amount</th>
                <th>Transacted</th>
              </tr>
            </thead>
            <tbody>
              {transactions &&
                transactions.map((transaction, index) =>
                  transaction.symbol ? (
                    <tr key={`${index}-${transaction.transactionId}`}>
                      <td>{transaction.transactionType}</td>
                      <td>{transaction.symbol}</td>
                      <td>{transaction.companyName}</td>
                      <td>{transaction.shares}</td>
                      <td>${transaction.sharePrice}</td>
                      <td>
                        {parseInt(transaction.transactionAmount) < 0
                          ? `-$${-parseInt(transaction.transactionAmount)}`
                          : `+$${transaction.transactionAmount}`}
                      </td>
                      <td>
                        {transaction.transactionTimestamp
                          .slice(0, 19)
                          .replace('T', ' ')}
                      </td>
                    </tr>
                  ) : (
                    <tr key={`${index}-${transaction.transactionId}`}>
                      <td>{transaction.transactionType}</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        {parseInt(transaction.transactionAmount) < 0
                          ? `-$${-parseInt(transaction.transactionAmount)}`
                          : `+$${transaction.transactionAmount}`}
                      </td>
                      <td>
                        {transaction.transactionTimestamp
                          .slice(0, 19)
                          .replace('T', ' ')}
                      </td>
                    </tr>
                  )
                )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default HistoryScreen;
