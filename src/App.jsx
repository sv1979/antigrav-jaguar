import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import FinanceCalculator from './components/FinanceCalculator';

function App() {
  return (
    <div>
      <Header />
      <main>
        <FinanceCalculator />
      </main>
      <div class="disclaimer_wrap">
        <div className="container">
          <p><strong>Disclaimer:</strong></p>
          <p>Your repayments have been calculated at the estimated interest rate of 10.45% p.a.
            However, if you apply for a loan and your application is successful, your interest rate and
            repayment amount may be different to those shown above. An establishment fee of $280 and $7.39 PPSR fee
            applies to each loan, the repayment amount shown above includes repayment of that.</p>

          <p>The repayments have been calculated on the base standard retail purchase price of the Jaguar model
            selected and excludes on road cost. We endeavour to ensure that all information on this website is accurate at
            the time of upload to the website. However product features, models, illustrations, representations,
            specifications and prices are subject to change without notice. For more information please contact your local Jaguar dealer.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
