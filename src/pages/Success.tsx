import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Home, Download } from 'lucide-react';

interface SelectedSeat {
  id: string;
  section: string;
  price: number;
}

interface LocationState {
  show: {
    title: string;
    date: string;
    time: string;
  };
  selectedSeats: SelectedSeat[];
  total: number;
  customerName: string;
}

export default function Success() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;

  if (!state) {
    navigate('/');
    return null;
  }

  const { show, selectedSeats, total, customerName } = state;

  const formattedDate = new Date(show.date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const bookingRef = `VSO-${Date.now().toString().slice(-8)}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <CheckCircle className="w-24 h-24 text-green-500" />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute inset-0 bg-green-500/20 rounded-full"
              />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl font-serif font-bold text-center text-gray-900 mb-4"
          >
            Booking Confirmed!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center text-gray-600 mb-8"
          >
            Thank you for your purchase, {customerName}. Your tickets have been sent to your email.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 mb-8"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Booking Reference</p>
                <p className="text-2xl font-bold text-[#d4af37]">{bookingRef}</p>
              </div>
              <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-[#d4af37] transition-colors">
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>

            <div className="border-t border-gray-300 pt-4 mb-4">
              <p className="text-sm text-gray-600 mb-1">Performance</p>
              <p className="text-lg font-semibold text-gray-900">{show.title}</p>
              <p className="text-sm text-gray-600 mt-2">{formattedDate}</p>
              <p className="text-sm text-gray-600">{show.time}</p>
            </div>

            <div className="border-t border-gray-300 pt-4">
              <p className="text-sm font-semibold text-gray-700 mb-3">
                Your Seats ({selectedSeats.length})
              </p>
              <div className="grid grid-cols-2 gap-2">
                {selectedSeats.map((seat) => (
                  <div
                    key={seat.id}
                    className="bg-white rounded px-3 py-2 text-sm font-medium text-gray-900"
                  >
                    {seat.id}
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-300 mt-4 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Total Paid</span>
                <span className="text-2xl font-bold text-[#d4af37]">€{total.toFixed(2)}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-4"
          >
            <button
              onClick={() => navigate('/')}
              className="w-full bg-black text-white py-4 rounded-md hover:bg-[#d4af37] hover:text-black transition-all duration-300 font-medium tracking-wide flex items-center justify-center space-x-2"
            >
              <Home className="w-5 h-5" />
              <span>BACK TO HOME</span>
            </button>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                <strong>Important:</strong> Please arrive at least 30 minutes before the
                performance starts. Your booking reference and a valid ID will be required at the
                entrance.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-gray-500 text-sm mt-8"
        >
          Need help? Contact us at <span className="text-[#d4af37]">+43 1 514 44 2250</span>
        </motion.p>
      </motion.div>
    </div>
  );
}
