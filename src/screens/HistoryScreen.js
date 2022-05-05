import portfolio from '../portfolio';

const HistoryScreen = () => {
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
              {portfolio.transactions.map((transaction, index) => (
                <tr key={`${index}-${transaction.id}`}>
                  <td>{transaction.shares < 0 ? 'Sale' : 'Purchase'}</td>
                  <td>{transaction.symbol}</td>
                  <td>{transaction.companyName}</td>
                  <td>{transaction.shares}</td>
                  <td>${transaction.sharePrice}</td>
                  <td>
                    {transaction.amount > 0
                      ? `+$${transaction.amount}`
                      : `-$${-transaction.amount}`}
                  </td>
                  <td>
                    {transaction.transactedAt.slice(0, 19).replace('T', ' ')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default HistoryScreen;
