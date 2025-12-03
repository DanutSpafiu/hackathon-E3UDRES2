import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SelectedSeat {
  id: string;
  section: string;
  price: number;
}

interface SelectedSeatsSidebarProps {
  showTitle: string;
  showDate: string;
  selectedSeats: SelectedSeat[];
  onRemoveSeat: (seatId: string) => void;
  onCheckout: () => void;
}

export default function SelectedSeatsSidebar({
  showTitle,
  showDate,
  selectedSeats,
  onRemoveSeat,
  onCheckout,
}: SelectedSeatsSidebarProps) {
  const total = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 sticky top-8">
      <div className="flex items-center space-x-3 mb-6">
        <ShoppingCart className="w-6 h-6 text-[#d4af37]" />
        <h3 className="text-xl font-serif font-bold text-gray-900">Your Selection</h3>
      </div>

      <div className="mb-6 pb-6 border-b border-gray-200">
        <p className="text-sm text-gray-600 mb-1">Performance</p>
        <p className="font-semibold text-gray-900">{showTitle}</p>
        <p className="text-sm text-gray-600 mt-2">
          {new Date(showDate).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      <div className="mb-6">
        <p className="text-sm font-semibold text-gray-700 mb-3">
          Selected Seats ({selectedSeats.length})
        </p>

        {selectedSeats.length === 0 ? (
          <p className="text-sm text-gray-500 italic">No seats selected yet</p>
        ) : (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            <AnimatePresence>
              {selectedSeats.map((seat) => (
                <motion.div
                  key={seat.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">{seat.id}</p>
                    <p className="text-xs text-gray-600">{seat.section}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <p className="text-sm font-semibold text-gray-900">
                      €{seat.price}
                    </p>
                    <button
                      onClick={() => onRemoveSeat(seat.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <div className="mb-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold text-gray-900">€{total}</span>
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600">Service Fee</span>
          <span className="font-semibold text-gray-900">€{(total * 0.05).toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between text-lg font-bold pt-2 border-t border-gray-200">
          <span className="text-gray-900">Total</span>
          <span className="text-[#d4af37]">€{(total * 1.05).toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={onCheckout}
        disabled={selectedSeats.length === 0}
        className={`w-full py-4 rounded-md font-medium tracking-wide flex items-center justify-center space-x-2 group transition-all duration-300 ${
          selectedSeats.length === 0
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-black text-white hover:bg-[#d4af37] hover:text-black'
        }`}
      >
        <span>PROCEED TO CHECKOUT</span>
        {selectedSeats.length > 0 && (
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        )}
      </button>

      <div className="mt-4 space-y-2">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-300 rounded border border-gray-400" />
          <span className="text-xs text-gray-600">Available</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded border border-green-600" />
          <span className="text-xs text-gray-600">Selected</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-500 rounded border border-red-600" />
          <span className="text-xs text-gray-600">Reserved</span>
        </div>
      </div>
    </div>
  );
}
