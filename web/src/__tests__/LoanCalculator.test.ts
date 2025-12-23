import * as React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { LoanCalculator } from '../components/LoanCalculator'

describe('LoanCalculator', () => {
  it('shows the estimated interest for the provided inputs', () => {
    render(React.createElement(LoanCalculator, { principal: 10000, rate: 5, months: 12 }))
    expect(screen.getByText('Estimated interest: UGX 6,000')).toBeInTheDocument()
  })
})
