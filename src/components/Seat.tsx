import { motion } from 'framer-motion';

interface SeatProps {
  id: string;
  status: 'available' | 'selected' | 'reserved';
  onClick: () => void;
}

export default function Seat({ id, status, onClick }: SeatProps) {
  const getColors = () => {
    switch (status) {
      case 'selected':
        return 'bg-green-500 hover:bg-green-600 border-green-600';
      case 'reserved':
        return 'bg-red-500 cursor-not-allowed border-red-600';
      case 'available':
      default:
        return 'bg-gray-300 hover:bg-gray-400 border-gray-400';
    }
  };

  const handleClick = () => {
    if (status !== 'reserved') {
      onClick();
    }
  };

  return (
    <motion.button
      whileHover={status !== 'reserved' ? { scale: 1.1 } : {}}
      whileTap={status !== 'reserved' ? { scale: 0.95 } : {}}
      onClick={handleClick}
      disabled={status === 'reserved'}
      className={`w-6 h-6 rounded-t-lg border-2 transition-all duration-200 ${getColors()}`}
      title={id}
    />
  );
}
