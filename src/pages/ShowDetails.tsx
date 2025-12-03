import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, Globe, Timer, ArrowRight } from 'lucide-react';
import showsData from '../data/shows.json';

export default function ShowDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const show = showsData.find((s) => s.id === id);

  if (!show) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xl text-gray-600">Show not found</p>
      </div>
    );
  }

  const formattedDate = new Date(show.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative h-[600px] bg-cover bg-center"
        style={{ backgroundImage: `url(${show.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="max-w-5xl mx-auto">
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-5xl md:text-7xl font-serif font-bold text-white mb-4"
            >
              {show.title}
            </motion.h1>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-2xl text-[#d4af37] font-light"
            >
              {show.composer}
            </motion.p>
          </div>
        </div>
      </motion.div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="lg:col-span-2"
          >
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
              About This Performance
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              {show.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start space-x-3">
                <Timer className="w-6 h-6 text-[#d4af37] mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Duration</h3>
                  <p className="text-gray-600">{show.duration}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Globe className="w-6 h-6 text-[#d4af37] mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Language</h3>
                  <p className="text-gray-600">{show.language}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="bg-white rounded-lg shadow-xl p-8 sticky top-8">
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">
                Performance Details
              </h3>

              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-[#d4af37] mt-1" />
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Date</p>
                    <p className="font-semibold text-gray-900">{formattedDate}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-[#d4af37] mt-1" />
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Start Time</p>
                    <p className="font-semibold text-gray-900">{show.time}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate(`/show/${id}/seats`)}
                className="w-full bg-black text-white py-4 rounded-md hover:bg-[#d4af37] hover:text-black transition-all duration-300 font-medium tracking-wide flex items-center justify-center space-x-2 group"
              >
                <span>SELECT SEATS</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Secure booking · Best price guarantee
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
