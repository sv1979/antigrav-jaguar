import React from 'react';
import Header from './components/Header';
import FinanceCalculator from './components/FinanceCalculator';

function App() {
  return (
    <div>
      <Header />
      <main>
        <FinanceCalculator />
      </main>
      <footer style={{ padding: '40px 0', borderTop: '1px solid #eee', marginTop: '50px' }}>
        <div className="container" style={{ fontSize: '0.9rem', color: '#666' }}>
          <p><strong>Disclaimer:</strong></p>
          <p>Your repayments have been calculated at the estimated interest rate...</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
