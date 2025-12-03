import { Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface ShowCardProps {
  id: string;
  title: string;
  composer: string;
  date: string;
  time: string;
  image: string;
}

export default function ShowCard({ id, title, composer, date, time, image }: ShowCardProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-serif font-bold mb-2 text-gray-900 group-hover:text-[#d4af37] transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-600 mb-4">{composer}</p>

        <div className="space-y-2 mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-700">
            <Calendar className="w-4 h-4 text-[#d4af37]" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-700">
            <Clock className="w-4 h-4 text-[#d4af37]" />
            <span>{time}</span>
          </div>
        </div>

        <Link
          to={`/show/${id}`}
          className="block w-full text-center bg-black text-white py-3 rounded-md hover:bg-[#d4af37] hover:text-black transition-colors font-medium tracking-wide"
        >
          BUY TICKETS
        </Link>
      </div>
    </motion.div>
  );
}
