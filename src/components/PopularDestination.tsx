
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { ArrowRight } from 'lucide-react';
import ImageWithLoading from './ImageWithLoading';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';

interface PopularDestinationProps {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  price: number;
}

const PopularDestination = ({ id, name, location, image, rating, price }: PopularDestinationProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { handleAuthenticatedAction } = useAuthRedirect();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const handleBooking = () => {
    // Get today's date for check-in
    const today = new Date();
    const checkin = today.toISOString().split('T')[0];
    
    // Get date 7 days from now for check-out
    const checkout = new Date(today);
    checkout.setDate(today.getDate() + 7);
    const checkoutStr = checkout.toISOString().split('T')[0];
    
    handleAuthenticatedAction(() => {
      // Go directly to payment with destination info and default dates
      navigate(`/payment?destination=${id}&people=1&checkin=${checkin}&checkout=${checkoutStr}`);
    });
  };
  
  // Using one of your uploaded travel images as fallback
  const fallbackImage = "/images/popular-2.jpg";
  
  return (
    <div 
      ref={ref}
      className={`destination-card ${inView ? 'animate-scale-in' : 'opacity-0'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-t-lg" style={{ height: '230px' }}>
        <ImageWithLoading
          src={image}
          alt={name}
          className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
          fallbackSrc={fallbackImage}
        />
        
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-full">
          ★ {rating}
        </div>
        
        <div 
          className={`absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : ''
          }`}
        >
          <button 
            onClick={handleBooking}
            className="px-6 py-2 bg-transco-gold text-white rounded-full transform transition-all duration-300 hover:bg-transco-gold-dark"
          >
            Book Now
          </button>
        </div>
      </div>
      <div className="p-4 bg-white rounded-b-lg shadow-sm">
        <h3 className="font-heading font-medium text-lg mb-1">{name}</h3>
        <div className="flex justify-between items-center">
          <p className="text-gray-500 text-sm">{location}</p>
          <p className="text-transco-gold font-medium">${price}</p>
        </div>
      </div>
    </div>
  );
};

export default PopularDestination;
