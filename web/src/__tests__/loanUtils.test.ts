import { calculateLoanStatus, categorizeLoanPayments } from '../utils/loanUtils'
import { Loan } from '../models/Loan'

describe('calculateLoanStatus', () => {
  it('returns Unpaid when no payment date is provided', () => {
    expect(calculateLoanStatus('2025-03-01', null)).toBe('Unpaid')
  })

  it('returns On Time for payments within 5 days after due date', () => {
    expect(calculateLoanStatus('2025-03-01', '2025-03-04')).toBe('On Time')
  })

  it('returns Late for payments 6-30 days after due date', () => {
    expect(calculateLoanStatus('2025-03-01', '2025-03-15')).toBe('Late')
  })

  it('returns Defaulted for payments more than 30 days after due date', () => {
    expect(calculateLoanStatus('2025-03-01', '2025-04-05')).toBe('Defaulted')
  })
})

describe('categorizeLoanPayments', () => {
  it('returns Unpaid when a loan has no payments', () => {
    const loan: Loan = {
      id: '1',
      name: 'Test Loan',
      interestRate: 5,
      principal: 10000,
      dueDate: '2025-03-01',
      termMonths: 12,
      payments: [],
      status: 'Unpaid',
    }

    const result = categorizeLoanPayments(loan)
    expect(result).toHaveLength(1)
    expect(result[0].status).toBe('Unpaid')
  })

  it('categorizes payments based on due date', () => {
    const loan: Loan = {
      id: '2',
      name: 'Timed Loan',
      interestRate: 5,
      principal: 10000,
      dueDate: '2025-03-01',
      termMonths: 12,
      payments: [
        { id: 'p1', paymentDate: '2025-03-04', amount: 500 },
        { id: 'p2', paymentDate: '2025-03-20', amount: 500 },
        { id: 'p3', paymentDate: '2025-04-10', amount: 500 },
      ],
      status: 'Late',
    }

    const result = categorizeLoanPayments(loan)
    expect(result[0].status).toBe('On Time')
    expect(result[1].status).toBe('Late')
    expect(result[2].status).toBe('Defaulted')
  })
})
