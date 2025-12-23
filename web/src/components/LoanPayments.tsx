import { CategorizedPayment, formatDate, statusBadgeClasses } from '../utils/loanUtils'

interface LoanPaymentsProps {
    payments: CategorizedPayment[];
}

export const LoanPayments = ({ payments }: LoanPaymentsProps) => {
    if (!payments || payments.length === 0) {
        return <div>No payment history available</div>;
    }

    return (
        <div className="loan-payments">
            <div className="payments-table">
                <table>
                    <thead>
                        <tr>
                            <th>Due Date</th>
                            <th>Payment Date</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment) => (
                            <tr key={payment.id}>
                                <td>{formatDate(payment.dueDate) ?? 'N/A'}</td>
                                <td>{formatDate(payment.paymentDate) ?? 'N/A'}</td>
                                <td>UGX {payment.amount.toLocaleString()}</td>
                                <td>
                                    <span className={statusBadgeClasses[payment.status]}>
                                        {payment.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
