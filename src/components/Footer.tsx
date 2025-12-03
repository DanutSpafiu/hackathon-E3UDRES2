import { Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-[#d4af37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-serif font-bold mb-4 text-[#d4af37]">
              Vienna State Opera
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              One of the world's leading opera houses, renowned for its exceptional
              acoustics and world-class performances since 1869.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-serif font-bold mb-4 text-[#d4af37]">
              Contact
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-[#d4af37]" />
                <span>Opernring 2, 1010 Wien, Austria</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-400">
                <Phone className="w-4 h-4 text-[#d4af37]" />
                <span>+43 1 514 44 2250</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-400">
                <Mail className="w-4 h-4 text-[#d4af37]" />
                <span>info@wiener-staatsoper.at</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-serif font-bold mb-4 text-[#d4af37]">
              Opening Hours
            </h3>
            <div className="space-y-2 text-sm text-gray-400">
              <p>Box Office: Mon-Fri 9:00-18:00</p>
              <p>Performance Days: Until start of show</p>
              <p>Guided Tours: Daily at 14:00</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>&copy; 2025 Vienna State Opera. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
