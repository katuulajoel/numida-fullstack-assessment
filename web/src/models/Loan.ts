export type LoanStatus = 'On Time' | 'Late' | 'Defaulted' | 'Unpaid'

export interface ApiPayment {
  id: number
  paymentDate: string | null
  amount: number
}

export interface ApiLoan {
  id: number
  name: string
  interestRate: number
  principal: number
  dueDate: string
  termMonths: number
  payments: ApiPayment[]
}

export interface LoanPayment {
  id: string
  paymentDate: string | null
  amount: number
}

export interface Loan {
  id: string
  name: string
  interestRate: number
  principal: number
  dueDate: string
  termMonths: number
  payments: LoanPayment[]
  latestPaymentDate?: string | null
  status: LoanStatus
}
