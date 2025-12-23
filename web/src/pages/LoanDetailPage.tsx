import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_LOANS } from '../graphql/queries'
import { ApiLoan, Loan } from '../models/Loan'
import { categorizeLoanPayments, mapApiLoan, statusBadgeClasses } from '../utils/loanUtils'
import { LoanCalculator } from '../components/LoanCalculator'
import { LoanPayments } from '../components/LoanPayments'
import PaymentModal from '../components/PaymentModal'

interface LoansQueryData {
  loans: ApiLoan[]
}

const LoanDetailPage = () => {
  const { id } = useParams()
  const { data, loading, error, refetch } = useQuery<LoansQueryData>(GET_LOANS)
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  const loan = useMemo<Loan | null>(() => {
    const loanId = Number(id)
    if (!loanId) return null
    const match = data?.loans.find((item) => item.id === loanId)
    return match ? mapApiLoan(match) : null
  }, [data, id])

  const paymentSummary = useMemo(() => {
    if (!loan) {
      return { totalDue: 0, totalPaid: 0, remaining: 0 }
    }
    const totalPaid = loan.payments.reduce((sum, payment) => sum + payment.amount, 0)
    const totalDue =
      loan.principal + (loan.principal * loan.interestRate * loan.termMonths) / 100
    const remaining = Math.max(0, totalDue - totalPaid)
    return { totalDue, totalPaid, remaining }
  }, [loan])

  const isPaidInFull = paymentSummary.remaining <= 0

  return (
    <div className="loan-detail">
      <div className="loan-detail__header">
        <div>
          <Link className="link-button" to="/">
            ← Back to loans
          </Link>
          <h2>Loan Details</h2>
        </div>
        {!isPaidInFull && loan && (
          <button type="button" onClick={() => setShowPaymentModal(true)}>
            Make Payment
          </button>
        )}
      </div>

      {loading && <div className="card">Loading loan...</div>}
      {error && (
        <div className="card">
          <div className="alert alert--error">Failed to load loan. {error.message}</div>
        </div>
      )}
      {!loading && !error && !loan && (
        <div className="card">Loan not found.</div>
      )}

      {loan && (
        <div className="loan-detail__content">
          <div className="card">
            <div className="details-grid">
              <div>
                <div className="detail-label">Loan Name</div>
                <div>{loan.name}</div>
              </div>
              <div>
                <div className="detail-label">Principal</div>
                <div>UGX {loan.principal.toLocaleString()}</div>
              </div>
              <div>
                <div className="detail-label">Interest Rate</div>
                <div>{loan.interestRate}%</div>
              </div>
              <div>
                <div className="detail-label">Due Date</div>
                <div>{loan.dueDate}</div>
              </div>
              <div>
                <div className="detail-label">Status</div>
                <span className={statusBadgeClasses[loan.status]}>{loan.status}</span>
              </div>
            </div>
          </div>

          <div className="card">
            <h3>Loan Calculator</h3>
            <LoanCalculator
              principal={loan.principal}
              rate={loan.interestRate}
              months={loan.termMonths}
              isEditable={false}
            />
            <div className="summary">
              <div>
                <div className="detail-label">Total Due (principal + fixed interest)</div>
                <div>UGX {paymentSummary.totalDue.toLocaleString()}</div>
              </div>
              <div>
                <div className="detail-label">Total Paid</div>
                <div>UGX {paymentSummary.totalPaid.toLocaleString()}</div>
              </div>
              <div>
                <div className="detail-label">Remaining Balance</div>
                <div>UGX {paymentSummary.remaining.toLocaleString()}</div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3>Payment History</h3>
            <LoanPayments payments={categorizeLoanPayments(loan)} />
          </div>
        </div>
      )}

      {showPaymentModal && loan && (
        <PaymentModal
          loanId={loan.id}
          onClose={() => setShowPaymentModal(false)}
          onPaymentAdded={refetch}
          maxAmount={paymentSummary.remaining}
        />
      )}
    </div>
  )
}

export default LoanDetailPage
