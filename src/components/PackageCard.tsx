
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { Star, Clock, User } from 'lucide-react';
import ImageWithLoading from './ImageWithLoading';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';

interface PackageCardProps {
  id: string;
  title: string;
  description: string;
  location: string;
  image: string;
  rating: number;
  duration: string;
  maxPeople: number;
  price: number;
}

const PackageCard = ({
  id,
  title,
  description,
  location,
  image,
  rating,
  duration,
  maxPeople,
  price,
}: PackageCardProps) => {
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
    
    // Get date based on duration (assuming format like "7 days")
    const durationDays = parseInt(duration.split(' ')[0]) || 7;
    const checkout = new Date(today);
    checkout.setDate(today.getDate() + durationDays);
    const checkoutStr = checkout.toISOString().split('T')[0];
    
    handleAuthenticatedAction(() => {
      // Go directly to payment with package info, max people, and calculated dates
      navigate(`/payment?destination=${id}&people=${maxPeople}&checkin=${checkin}&checkout=${checkoutStr}`);
    });
  };

  return (
    <div
      ref={ref}
      className={`package-card ${inView ? 'animate-slide-up' : 'opacity-0'}`}
    >
      <div className="md:w-1/3">
        <ImageWithLoading
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6 md:w-2/3 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-heading text-xl font-medium mb-2">{title}</h3>
              <p className="text-sm text-gray-500 mb-3">{location}</p>
            </div>
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  fill={i < Math.floor(rating) ? 'currentColor' : 'none'}
                  className="h-4 w-4"
                />
              ))}
              <span className="ml-1 text-sm text-gray-700">{rating}</span>
            </div>
          </div>
          <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-transco-gold" />
              <span className="text-sm text-gray-600">{duration}</span>
            </div>
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2 text-transco-gold" />
              <span className="text-sm text-gray-600"> {maxPeople} people</span>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="text-2xl font-heading font-medium text-transco-gold">
            ${price}
            <span className="text-sm text-gray-500 font-normal">/ per person</span>
          </div>
          <button onClick={handleBooking} className="btn-primary">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
