import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Homepage from './pages/Homepage';
import ShowDetails from './pages/ShowDetails';
import SeatSelection from './pages/SeatSelection';
import Checkout from './pages/Checkout';
import Success from './pages/Success';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/show/:id" element={<ShowDetails />} />
            <Route path="/show/:id/seats" element={<SeatSelection />} />
            <Route path="/show/:id/checkout" element={<Checkout />} />
            <Route path="/show/:id/success" element={<Success />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
