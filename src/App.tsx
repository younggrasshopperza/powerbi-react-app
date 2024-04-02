import React from 'react';
import './App.css';
import PowerBIReport from './components/PowerBIReport';

const App: React.FC = () => {
  const reportId = 'your_powerbi_report_id';

  return (
    <div className="App">
      <header className="App-header">
        <h1>Power BI Report</h1>
        <PowerBIReport reportId={reportId} />
      </header>
    </div>
  );
};

export default App;
