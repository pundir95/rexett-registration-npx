import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClientRegistrationStepper from './RegistrationFlows/ClientRegistrationFlow/ClientRegistrationStepper';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style.css'
import VendorRegistrationStepper from './RegistrationFlows/VendorRegistrationFlow/VendorRegistrationStepper';
import VendorDecisionMakers from './RegistrationFlows/VendorRegistrationFlow/VendorDecisionMakers';
import DeveloperRegistrationStepper from './RegistrationFlows/DeveloperRegistrationFlow/DeveloperRegistrationStepper';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import HomeSection from './Home/HomeSection';

function App() {
  return (
    <>
      <ToastContainer
        className="custom-toast-container"
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomeSection/>}/>
          <Route path="/client-registration" element={<ClientRegistrationStepper/>} />
          <Route path="/partner-registration" element={<VendorRegistrationStepper/>} />
          <Route path="/talent-registration" element={<DeveloperRegistrationStepper/>} />
        </Routes>
      </Router>
    </div>
    </>
  );
}

export default App;
