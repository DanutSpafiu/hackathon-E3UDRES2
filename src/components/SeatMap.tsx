import { motion } from 'framer-motion';
import Seat from './Seat';

interface SeatData {
  id: string;
  status: 'available' | 'selected' | 'reserved';
}

interface Section {
  id: string;
  name: string;
  price: number;
  rows?: { row: string; seats: number }[];
  boxes?: { box: string; seats: number }[];
  reserved: string[];
}

interface SeatMapProps {
  sections: Section[];
  selectedSeats: string[];
  onSeatClick: (seatId: string, section: Section) => void;
}

export default function SeatMap({ sections, selectedSeats, onSeatClick }: SeatMapProps) {
  const getSeatStatus = (seatId: string, reserved: string[]): 'available' | 'selected' | 'reserved' => {
    if (selectedSeats.includes(seatId)) return 'selected';
    if (reserved.includes(seatId)) return 'reserved';
    return 'available';
  };

  const renderSection = (section: Section) => {
    if (section.rows) {
      return (
        <div className="mb-8">
          <div className="text-center mb-4">
            <h3 className="text-lg font-serif font-bold text-gray-900">{section.name}</h3>
            <p className="text-sm text-[#d4af37]">€{section.price} per seat</p>
          </div>
          <div className="space-y-2">
            {section.rows.map((row) => (
              <div key={`${section.id}-${row.row}`} className="flex items-center justify-center space-x-1">
                <span className="w-8 text-xs font-semibold text-gray-600 text-right mr-2">
                  {row.row}
                </span>
                <div className="flex space-x-1">
                  {Array.from({ length: row.seats }, (_, i) => {
                    const seatId = `${row.row}${i + 1}`;
                    const status = getSeatStatus(seatId, section.reserved);
                    return (
                      <Seat
                        key={seatId}
                        id={seatId}
                        status={status}
                        onClick={() => onSeatClick(seatId, section)}
                      />
                    );
                  })}
                </div>
                <span className="w-8 text-xs font-semibold text-gray-600 text-left ml-2">
                  {row.row}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (section.boxes) {
      return (
        <div className="mb-8">
          <div className="text-center mb-4">
            <h3 className="text-lg font-serif font-bold text-gray-900">{section.name}</h3>
            <p className="text-sm text-[#d4af37]">€{section.price} per seat</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {section.boxes.map((box) => (
              <div
                key={`${section.id}-Box${box.box}`}
                className="border-2 border-gray-300 rounded-lg p-4"
              >
                <p className="text-xs font-semibold text-gray-700 mb-2 text-center">
                  Box {box.box}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {Array.from({ length: box.seats }, (_, i) => {
                    const seatId = `Box${box.box}-Seat${i + 1}`;
                    const status = getSeatStatus(seatId, section.reserved);
                    return (
                      <Seat
                        key={seatId}
                        id={seatId}
                        status={status}
                        onClick={() => onSeatClick(seatId, section)}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  const parterre = sections.find((s) => s.id === 'parterre');
  const balkon1 = sections.find((s) => s.id === 'balkon1');
  const balkon2 = sections.find((s) => s.id === 'balkon2');
  const logeLeft = sections.find((s) => s.id === 'loge-left');
  const logeRight = sections.find((s) => s.id === 'loge-right');
  const galerie = sections.find((s) => s.id === 'galerie');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-lg shadow-xl p-8"
    >
      <div className="mb-8 text-center">
        <div className="inline-block bg-gradient-to-b from-gray-800 to-gray-900 text-white px-16 py-3 rounded-lg shadow-lg mb-2">
          <span className="text-sm font-semibold tracking-wider">STAGE</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto space-y-12">
        {galerie && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-50 rounded-lg p-6"
          >
            {renderSection(galerie)}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {logeLeft && (
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg p-6">
              {renderSection(logeLeft)}
            </div>
          )}

          <div className="lg:col-span-1">
            {balkon2 && (
              <div className="bg-blue-50 rounded-lg p-6 mb-8">
                {renderSection(balkon2)}
              </div>
            )}
            {balkon1 && (
              <div className="bg-blue-50 rounded-lg p-6">
                {renderSection(balkon1)}
              </div>
            )}
          </div>

          {logeRight && (
            <div className="bg-gradient-to-bl from-amber-50 to-yellow-50 rounded-lg p-6">
              {renderSection(logeRight)}
            </div>
          )}
        </motion.div>

        {parterre && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-b from-red-50 to-rose-50 rounded-lg p-6"
          >
            {renderSection(parterre)}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
