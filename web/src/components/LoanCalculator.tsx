import { useMemo } from 'react'

// SECTION 4 Debugging & Code Refactoring
interface LoanCalculatorProps {
    principal: number
    rate: number
    months: number
    onMonthsChange?: (months: number) => void
    isEditable?: boolean
}

export const LoanCalculator = ({
    principal,
    rate,
    months,
    onMonthsChange,
    isEditable = true,
}: LoanCalculatorProps) => {
    const interest = useMemo(() => {
        if (principal <= 0 || rate <= 0 || months <= 0) return 0
        return Number(((principal * rate * months) / 100).toFixed(2))
    }, [principal, rate, months])

    return (
        <div className="loan-calculator">
            <div className="loan-calculator__row">
                <label htmlFor="loan-months">Months</label>
                <input
                    id="loan-months"
                    type="number"
                    min={1}
                    value={months}
                    onChange={(event) => {
                        const value = Number(event.target.value)
                        if (!Number.isNaN(value) && onMonthsChange) {
                            onMonthsChange(Math.max(1, value))
                        }
                    }}
                    disabled={!isEditable}
                />
            </div>
            <p className="loan-calculator__note">Interest uses a fixed monthly rate.</p>
            <div className="loan-calculator__result">Estimated interest: UGX {interest.toLocaleString()}</div>
        </div>
    )
}
