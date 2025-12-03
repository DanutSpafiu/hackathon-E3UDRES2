import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, User, Mail, Lock, ArrowLeft } from 'lucide-react';

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
}

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const state = location.state as LocationState;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  if (!state) {
    navigate('/');
    return null;
  }

  const { show, selectedSeats, total } = state;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/show/${id}/success`, {
      state: {
        show,
        selectedSeats,
        total,
        customerName: `${formData.firstName} ${formData.lastName}`,
      },
    });
  };

  const formattedDate = new Date(show.date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate(`/show/${id}/seats`)}
          className="flex items-center space-x-2 text-gray-600 hover:text-[#d4af37] transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Seat Selection</span>
        </button>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-serif font-bold text-gray-900 mb-8"
        >
          Complete Your Purchase
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <User className="w-6 h-6 text-[#d4af37]" />
                  <h2 className="text-2xl font-serif font-bold text-gray-900">
                    Personal Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <CreditCard className="w-6 h-6 text-[#d4af37]" />
                  <h2 className="text-2xl font-serif font-bold text-gray-900">
                    Payment Details
                  </h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      required
                      maxLength={19}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        required
                        maxLength={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV *
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          required
                          maxLength={3}
                          className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-4 rounded-md hover:bg-[#d4af37] hover:text-black transition-all duration-300 font-medium tracking-wide text-lg"
              >
                CONFIRM PURCHASE
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white rounded-lg shadow-lg p-8 sticky top-8">
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">
                Order Summary
              </h3>

              <div className="mb-6 pb-6 border-b border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Performance</p>
                <p className="font-semibold text-gray-900 mb-2">{show.title}</p>
                <p className="text-sm text-gray-600">{formattedDate}</p>
                <p className="text-sm text-gray-600">{show.time}</p>
              </div>

              <div className="mb-6 pb-6 border-b border-gray-200">
                <p className="text-sm font-semibold text-gray-700 mb-3">
                  Selected Seats ({selectedSeats.length})
                </p>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {selectedSeats.map((seat) => (
                    <div key={seat.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">{seat.id}</span>
                      <span className="font-medium text-gray-900">€{seat.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">
                    €{selectedSeats.reduce((sum, seat) => sum + seat.price, 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Service Fee (5%)</span>
                  <span className="font-medium">
                    €{(selectedSeats.reduce((sum, seat) => sum + seat.price, 0) * 0.05).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-3 border-t border-gray-200">
                  <span className="text-gray-900">Total</span>
                  <span className="text-[#d4af37]">€{total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  Your payment is secure and encrypted
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
