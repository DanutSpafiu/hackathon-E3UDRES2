import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SeatMap from '../components/SeatMap';
import SelectedSeatsSidebar from '../components/SelectedSeatsSidebar';
import showsData from '../data/shows.json';

interface SelectedSeat {
  id: string;
  section: string;
  price: number;
}

interface Section {
  id: string;
  name: string;
  price: number;
  rows?: { row: string; seats: number }[];
  boxes?: { box: string; seats: number }[];
  reserved: string[];
}

interface SeatData {
  showId: string;
  sections: Section[];
}

export default function SeatSelection() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [seatData, setSeatData] = useState<SeatData | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<SelectedSeat[]>([]);

  const show = showsData.find((s) => s.id === id);

  useEffect(() => {
    const loadSeatData = async () => {
      try {
        const data = await import(`../data/seats/${id}.json`);
        setSeatData(data.default);
      } catch (error) {
        console.error('Failed to load seat data:', error);
      }
    };

    loadSeatData();
  }, [id]);

  if (!show || !seatData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    );
  }

  const handleSeatClick = (seatId: string, section: Section) => {
    const fullSeatId = `${section.name}-${seatId}`;

    const existingIndex = selectedSeats.findIndex((seat) => seat.id === fullSeatId);

    if (existingIndex !== -1) {
      setSelectedSeats(selectedSeats.filter((_, index) => index !== existingIndex));
    } else {
      setSelectedSeats([
        ...selectedSeats,
        {
          id: fullSeatId,
          section: section.name,
          price: section.price,
        },
      ]);
    }
  };

  const handleRemoveSeat = (seatId: string) => {
    setSelectedSeats(selectedSeats.filter((seat) => seat.id !== seatId));
  };

  const handleCheckout = () => {
    navigate(`/show/${id}/checkout`, {
      state: {
        show,
        selectedSeats,
        total: selectedSeats.reduce((sum, seat) => sum + seat.price, 0) * 1.05,
      },
    });
  };

  const selectedSeatIds = selectedSeats.map((seat) => {
    const parts = seat.id.split('-');
    return parts.slice(1).join('-');
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate(`/show/${id}`)}
          className="flex items-center space-x-2 text-gray-600 hover:text-[#d4af37] transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Show Details</span>
        </button>

        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">
            Select Your Seats
          </h1>
          <p className="text-gray-600">{show.title}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <SeatMap
              sections={seatData.sections}
              selectedSeats={selectedSeatIds}
              onSeatClick={handleSeatClick}
            />
          </div>

          <div>
            <SelectedSeatsSidebar
              showTitle={show.title}
              showDate={show.date}
              selectedSeats={selectedSeats}
              onRemoveSeat={handleRemoveSeat}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
