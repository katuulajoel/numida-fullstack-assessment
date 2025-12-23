import { useMemo } from 'react'
import { useQuery } from '@apollo/client'
import LoanList from '../components/LoanList'
import { GET_LOANS } from '../graphql/queries'
import { ApiLoan } from '../models/Loan'
import { mapApiLoan } from '../utils/loanUtils'

interface LoansQueryData {
  loans: ApiLoan[]
}

const LoansPage = () => {
  const { data, loading, error, refetch } = useQuery<LoansQueryData>(GET_LOANS)

  const loans = useMemo(() => {
    return (data?.loans ?? []).map(mapApiLoan)
  }, [data])

  return (
    <div className="app__grid app__grid--single">
      {loading && <div className="card">Loading loans...</div>}
      {error && (
        <div className="card">
          <div className="alert alert--error">
            Failed to load loans. {error.message}
          </div>
          <button type="button" onClick={() => refetch()}>
            Try Again
          </button>
        </div>
      )}
      {!loading && !error && <LoanList loans={loans} />}
    </div>
  )
}

export default LoansPage
