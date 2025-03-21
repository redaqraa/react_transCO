
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { AlertTriangle, Calendar as CalendarIcon } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const destinations = [
  { id: 'rome', name: 'Rome, Italy' },
  { id: 'dubai', name: 'Dubai, UAE' },
  { id: 'kyoto', name: 'Kyoto, Japan' },
  { id: 'london', name: 'London, UK' },
  { id: 'hawaii', name: 'Hawaii, USA' },
  { id: 'paris', name: 'Paris, France' },
  { id: 'cairo', name: 'Cairo, Egypt' },
  { id: 'sydney', name: 'Sydney, Australia' },
];

const BookingPage = () => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState<string[]>([]);
  
  const [bookingDetails, setBookingDetails] = useState({
    destination: '',
    people: 2,
    checkIn: null as Date | null,
    checkOut: null as Date | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBookingDetails(prev => ({
      ...prev,
      [name]: name === 'people' ? parseInt(value) : value
    }));
  };

  const handleDateSelect = (field: 'checkIn' | 'checkOut', date: Date | null) => {
    setBookingDetails(prev => ({
      ...prev,
      [field]: date
    }));
  };

  const validateForm = () => {
    const errors = [];
    if (!bookingDetails.destination) errors.push('Please select a destination');
    if (!bookingDetails.checkIn) errors.push('Please select a check-in date');
    if (!bookingDetails.checkOut) errors.push('Please select a check-out date');
    
    if (bookingDetails.checkIn && bookingDetails.checkOut && 
        bookingDetails.checkIn >= bookingDetails.checkOut) {
      errors.push('Check-out date must be after check-in date');
    }
    
    setFormErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Format dates for URL
      const checkInStr = bookingDetails.checkIn ? format(bookingDetails.checkIn, 'yyyy-MM-dd') : '';
      const checkOutStr = bookingDetails.checkOut ? format(bookingDetails.checkOut, 'yyyy-MM-dd') : '';
      
      // Navigate to payment page with booking details
      navigate(`/payment?destination=${bookingDetails.destination}&people=${bookingDetails.people}&checkin=${checkInStr}&checkout=${checkOutStr}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8">
            <h1 className="text-3xl font-heading font-medium mb-6 text-center">Book Your Trip</h1>
            
            {formErrors.length > 0 && (
              <Alert className="mb-6 border-red-200 text-red-800 bg-red-50">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <ul className="list-disc pl-5">
                    {formErrors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="destination">Destination</Label>
                <select 
                  id="destination"
                  name="destination"
                  value={bookingDetails.destination}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-transco-gold"
                  required
                >
                  <option value="">Select a destination</option>
                  {destinations.map((dest) => (
                    <option key={dest.id} value={dest.id}>{dest.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="people">Number of People</Label>
                <select
                  id="people"
                  name="people"
                  value={bookingDetails.people}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-transco-gold"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'person' : 'people'}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="checkin">Check-in Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="checkin"
                        className={`w-full justify-start text-left font-normal ${!bookingDetails.checkIn && 'text-muted-foreground'}`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {bookingDetails.checkIn ? format(bookingDetails.checkIn, 'PPP') : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={bookingDetails.checkIn || undefined}
                        onSelect={(date) => handleDateSelect('checkIn', date)}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="checkout">Check-out Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="checkout"
                        className={`w-full justify-start text-left font-normal ${!bookingDetails.checkOut && 'text-muted-foreground'}`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {bookingDetails.checkOut ? format(bookingDetails.checkOut, 'PPP') : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={bookingDetails.checkOut || undefined}
                        onSelect={(date) => handleDateSelect('checkOut', date)}
                        initialFocus
                        disabled={(date) => 
                          date < new Date() || 
                          (bookingDetails.checkIn ? date <= bookingDetails.checkIn : false)
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full bg-transco-gold hover:bg-transco-gold-dark text-white py-3 h-auto text-base"
                >
                  Proceed to Payment
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BookingPage;
