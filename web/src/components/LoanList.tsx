import { Link } from 'react-router-dom'
import { Loan } from '../models/Loan'
import { statusBadgeClasses } from '../utils/loanUtils'

interface LoanListProps {
  loans: Loan[]
}

const LoanList = ({ loans }: LoanListProps) => {
  return (
    <div className="card">
      <div className="card__header">
        <h2>Existing Loans & Payments</h2>
      </div>
      <div className="card__body">
        <table className="table">
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>Loan Name</th>
              <th>Principal Amount</th>
              <th>Interest Rate</th>
              <th>Due Date</th>
              <th>Payment Date</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {loans.length === 0 ? (
              <tr>
                <td colSpan={8}>No loans available.</td>
              </tr>
            ) : (
              loans.map((loan) => (
                <tr key={loan.id} className="table__row">
                  <td>{loan.id}</td>
                  <td>{loan.name}</td>
                  <td>UGX {loan.principal.toLocaleString()}</td>
                  <td>{loan.interestRate}%</td>
                  <td>{loan.dueDate}</td>
                  <td>{loan.latestPaymentDate ?? '-'}</td>
                  <td>
                    <span className={statusBadgeClasses[loan.status]}>{loan.status}</span>
                  </td>
                  <td>
                    <Link className="link-button" to={`/loans/${loan.id}`}>
                      View details
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default LoanList
