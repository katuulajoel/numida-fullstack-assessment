import './App.css'
import { Routes, Route } from 'react-router-dom'
import logo from './assets/logo.numida.png';
import LoansPage from './pages/LoansPage'
import LoanDetailPage from './pages/LoanDetailPage'

const App = () => {
  return (
    <div className="app">
      <header className="app__header">
        <div>
          <h1>Loan Payment Dashboard</h1>
          <p className="app__subtitle">
            Track loan statuses, payment timing, and outstanding balances in one view.
          </p>
        </div>
        <div className="app__logo" aria-hidden="true">
          <img src={logo} alt="Numida Logo" className="logo-image" />
        </div>
      </header>

      <Routes>
        <Route path="/" element={<LoansPage />} />
        <Route path="/loans/:id" element={<LoanDetailPage />} />
      </Routes>
    </div>
  )
}

export default App
