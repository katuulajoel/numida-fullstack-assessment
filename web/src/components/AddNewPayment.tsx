import { FormEvent, useState } from 'react'
import env from '../config/env'

interface AddNewPaymentProps {
  onPaymentAdded: () => void
  defaultLoanId?: string
  onClose?: () => void
  maxAmount?: number
}

const AddNewPayment = ({ onPaymentAdded, defaultLoanId, onClose, maxAmount }: AddNewPaymentProps) => {
  const [loanId, setLoanId] = useState(defaultLoanId ?? '')
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const submitPayment = async (event: FormEvent) => {
    event.preventDefault()
    setError(null)
    setSuccess(null)

    if (!loanId.trim()) {
      setError('Loan ID is required.')
      return
    }

    const parsedAmount = Number(amount)
    if (!amount.trim() || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Payment amount must be greater than 0.')
      return
    }

    if (typeof maxAmount === 'number' && parsedAmount > maxAmount) {
      setError(`Payment amount cannot exceed UGX ${maxAmount.toLocaleString()}.`)
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`${env.apiUrl}/api/payments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ loanId, paymentAmount: parsedAmount }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Failed to add payment.')
      }

      setSuccess('Payment recorded successfully.')
      setLoanId('')
      setAmount('')
      onPaymentAdded()
      if (onClose) {
        onClose()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add payment.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card">
      <div className="card__header">
        <h2>Add New Payment</h2>
      </div>
      <div className="card__body">
        {error && <div className="alert alert--error">{error}</div>}
        {success && <div className="alert alert--success">{success}</div>}
        <form onSubmit={submitPayment} className="form">
          <label className="form__field">
            <span>Loan ID</span>
            <input
              type="number"
              value={loanId}
              onChange={(event) => setLoanId(event.target.value)}
              placeholder="Enter Loan ID"
              min={1}
              disabled={Boolean(defaultLoanId)}
            />
          </label>
          <label className="form__field">
            <span>Payment Amount</span>
            <input
              type="number"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              placeholder="0.00"
              min={0}
              max={typeof maxAmount === 'number' ? maxAmount : undefined}
              step="0.01"
            />
          </label>
          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Add Payment'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddNewPayment
