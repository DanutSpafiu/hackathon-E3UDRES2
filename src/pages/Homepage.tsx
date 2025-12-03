import { motion } from 'framer-motion';
import ShowCard from '../components/ShowCard';
import showsData from '../data/shows.json';

export default function Homepage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-[500px] bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/7991300/pexels-photo-7991300.jpeg?auto=compress&cs=tinysrgb&w=1600)',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div>
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-7xl font-serif font-bold text-white mb-4"
            >
              Vienna State Opera
            </motion.h1>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl md:text-2xl text-[#d4af37] font-light tracking-wider"
            >
              Experience World-Class Performances
            </motion.p>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
            Upcoming Shows
          </h2>
          <div className="w-24 h-1 bg-[#d4af37] mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {showsData.map((show, index) => (
            <motion.div
              key={show.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
            >
              <ShowCard
                id={show.id}
                title={show.title}
                composer={show.composer}
                date={show.date}
                time={show.time}
                image={show.image}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
