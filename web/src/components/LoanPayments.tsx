import React from 'react';
import { CategorizedPayment } from '../utils/loanUtils';

interface LoanPaymentsProps {
    payments: CategorizedPayment[];
    loanName: string;
}

export const LoanPayments: React.FC<LoanPaymentsProps> = ({ payments, loanName }) => {
    if (!payments || payments.length === 0) {
        return <div>No payment history available</div>;
    }

    return (
        <div className="loan-payments">
            <h3>Payment History: {loanName}</h3>
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
                        {payments.map((payment, index) => (
                            <tr key={index}>
                                <td>{new Date(payment.dueDate).toLocaleDateString()}</td>
                                <td>{payment.paymentDate ? new Date(payment.paymentDate).toLocaleDateString() : 'N/A'}</td>
                                <td>${payment.amount.toFixed(2)}</td>
                                <td>
                                    <span style={{
                                        color: 'white',
                                        backgroundColor: payment.statusColor,
                                        padding: '2px 8px',
                                        borderRadius: '4px',
                                        fontSize: '0.8em',
                                    }}>
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
