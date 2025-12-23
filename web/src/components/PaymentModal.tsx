import AddNewPayment from './AddNewPayment'

interface PaymentModalProps {
  loanId: string
  onClose: () => void
  onPaymentAdded: () => void
  maxAmount: number
}

const PaymentModal = ({ loanId, onClose, onPaymentAdded, maxAmount }: PaymentModalProps) => {
  return (
    <div className="modal">
      <div className="modal__backdrop" onClick={onClose} />
      <div className="modal__content" role="dialog" aria-modal="true">
        <div className="modal__header">
          <h3>Make Payment</h3>
          <button type="button" onClick={onClose}>
            Close
          </button>
        </div>
        <AddNewPayment
          defaultLoanId={loanId}
          onPaymentAdded={onPaymentAdded}
          onClose={onClose}
          maxAmount={maxAmount}
        />
      </div>
    </div>
  )
}

export default PaymentModal
