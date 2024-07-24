import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClientRegistrationStepper from './RegistrationFlows/ClientRegistrationFlow/ClientRegistrationStepper';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style.css'
import VendorRegistrationStepper from './RegistrationFlows/VendorRegistrationFlow/VendorRegistrationStepper';
import VendorDecisionMakers from './RegistrationFlows/VendorRegistrationFlow/VendorDecisionMakers';
import DeveloperRegistrationStepper from './RegistrationFlows/DeveloperRegistrationFlow/DeveloperRegistrationStepper';
// import 'react-date-range/dist/styles.css';
// import 'react-date-range/dist/theme/default.css';
// import 'react-calendar/dist/Calendar.css'; 
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<ClientRegistrationStepper/>} />
          <Route path="/vendor-registration" element={<VendorRegistrationStepper/>} />
          <Route path="/developer-registration" element={<DeveloperRegistrationStepper/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
