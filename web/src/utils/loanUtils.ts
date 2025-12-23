import { ApiLoan, Loan, LoanPayment, LoanStatus } from '../models/Loan'

const DAY_MS = 1000 * 60 * 60 * 24

export const statusBadgeClasses: Record<LoanStatus, string> = {
  'On Time': 'status status-on-time',
  Late: 'status status-late',
  Defaulted: 'status status-defaulted',
  Unpaid: 'status status-unpaid',
}

export interface CategorizedPayment {
  id: string
  dueDate: string
  paymentDate: string | null
  amount: number
  status: LoanStatus
}

export const calculateLoanStatus = (
  dueDate: string,
  paymentDate?: string | null
): LoanStatus => {
  if (!paymentDate) return 'Unpaid'

  const due = new Date(dueDate)
  const paid = new Date(paymentDate)
  if (Number.isNaN(due.getTime()) || Number.isNaN(paid.getTime())) {
    return 'Unpaid'
  }

  const diffDays = Math.floor((paid.getTime() - due.getTime()) / DAY_MS)
  if (diffDays <= 5) return 'On Time'
  if (diffDays <= 30) return 'Late'
  return 'Defaulted'
}

export const getLatestPaymentDate = (payments: LoanPayment[]): string | null => {
  const validPayments = payments.filter((payment) => payment.paymentDate)
  if (!validPayments.length) return null
  return validPayments.reduce((latest, payment) => {
    return new Date(payment.paymentDate as string) > new Date(latest.paymentDate as string)
      ? payment
      : latest
  }).paymentDate as string
}

export const mapApiLoan = (loan: ApiLoan): Loan => {
  const payments: LoanPayment[] = loan.payments.map((payment) => ({
    id: String(payment.id),
    paymentDate: payment.paymentDate,
    amount: payment.amount,
  }))

  const latestPaymentDate = getLatestPaymentDate(payments)
  const status = calculateLoanStatus(loan.dueDate, latestPaymentDate)

  return {
    id: String(loan.id),
    name: loan.name,
    interestRate: loan.interestRate,
    principal: loan.principal,
    dueDate: loan.dueDate,
    termMonths: loan.termMonths,
    payments,
    latestPaymentDate,
    status,
  }
}

export const categorizeLoanPayments = (loan: Loan): CategorizedPayment[] => {
  if (!loan.payments.length) {
    return [
      {
        id: `${loan.id}-unpaid`,
        dueDate: loan.dueDate,
        paymentDate: null,
        amount: 0,
        status: 'Unpaid',
      },
    ]
  }

  return loan.payments.map((payment) => ({
    id: payment.id,
    dueDate: loan.dueDate,
    paymentDate: payment.paymentDate,
    amount: payment.amount,
    status: calculateLoanStatus(loan.dueDate, payment.paymentDate),
  }))
}

export const formatDate = (value?: string | null): string | null => {
  if (!value) return null
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null
  return date.toISOString().split('T')[0]
}
