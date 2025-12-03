import { Link } from 'react-router-dom';
import { Music2 } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-black text-white border-b border-[#d4af37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <Music2 className="w-8 h-8 text-[#d4af37] group-hover:scale-110 transition-transform" />
            <div>
              <h1 className="text-xl font-serif font-bold tracking-wide">
                Vienna State Opera
              </h1>
              <p className="text-xs text-gray-400 tracking-widest">WIENER STAATSOPER</p>
            </div>
          </Link>

          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className="text-sm tracking-wide hover:text-[#d4af37] transition-colors"
            >
              SHOWS
            </Link>
            <a
              href="#"
              className="text-sm tracking-wide hover:text-[#d4af37] transition-colors"
            >
              ABOUT
            </a>
            <a
              href="#"
              className="text-sm tracking-wide hover:text-[#d4af37] transition-colors"
            >
              CONTACT
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
