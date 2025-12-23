export interface LoanPayment {
    dueDate: string;
    paymentDate?: string | null;
    amount: number;
    // Add other relevant fields from your GraphQL schema
}

export interface CategorizedPayment extends LoanPayment {
    status: 'On Time' | 'Late' | 'Defaulted' | 'Unpaid';
    statusColor: string;
}

export function categorizePayment(payment: LoanPayment): CategorizedPayment {
    if (!payment.paymentDate) {
        return {
            ...payment,
            status: 'Unpaid',
            statusColor: 'grey',
        };
    }

    const dueDate = new Date(payment.dueDate);
    const paidDate = new Date(payment.paymentDate);

    // Calculate difference in days
    const diffTime = paidDate.getTime() - dueDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) {
        return {
            ...payment,
            status: 'On Time',
            statusColor: 'green',
        };
    } else if (diffDays <= 5) {
        return {
            ...payment,
            status: 'On Time',
            statusColor: 'green',
        };
    } else if (diffDays <= 30) {
        return {
            ...payment,
            status: 'Late',
            statusColor: 'orange',
        };
    } else {
        return {
            ...payment,
            status: 'Defaulted',
            statusColor: 'red',
        };
    }
}

export function categorizeLoanPayments(payments: LoanPayment[]): CategorizedPayment[] {
    return payments.map(payment => categorizePayment(payment));
}
