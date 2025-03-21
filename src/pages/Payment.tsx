
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Wallet, CreditCard, CalendarDays, AlertCircle, PlaneIcon } from 'lucide-react';
import { toast } from 'sonner';
import { generateTripSummary } from '@/utils/tripSummary';

// Define a map for destination/package IDs to their prices
const priceMap: Record<string, number> = {
  'san-miguel': 120,
  'burj-khalifa': 180,
  'kyoto-temple': 150,
  'winter-holiday': 750,
  'london-river': 520,
  'hawaii-weekend': 660,
  // Add more mappings as needed
  'rome': 400, // Default from original code
  'dubai': 400,
  'kyoto': 400,
  'london': 400,
  'hawaii': 400,
  'paris': 400,
  'cairo': 400,
  'sydney': 400
};

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  const destination = searchParams.get('destination') || '';
  const people = parseInt(searchParams.get('people') || '1');
  const checkin = searchParams.get('checkin') || '';
  const checkout = searchParams.get('checkout') || '';
  
  const [paymentMethod, setPaymentMethod] = useState('visa');
  const [formData, setFormData] = useState({
    fullName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  
  // Get the price per person from the priceMap or use a default
  const pricePerPerson = priceMap[destination] || 400;
  
  // Calculate price based on the actual price per person
  const basePrice = people * pricePerPerson;
  const additionalFee = 10;
  const discount = 10;
  const totalPrice = basePrice + additionalFee - discount;
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save booking data (in a real app, this would go to a database)
    const bookingDetails = {
      destination,
      destinationName: getDestinationName(destination),
      people,
      checkin,
      checkout,
      totalPrice,
      fullName: formData.fullName
    };
    
    // Store booking in localStorage
    const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    existingBookings.push({
      ...bookingDetails,
      id: Date.now(),
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('bookings', JSON.stringify(existingBookings));
    
    // Generate the trip summary
    generateTripSummary(bookingDetails);
    
    // Show success toast
    toast.success('Payment completed successfully!', {
      description: 'Your booking has been confirmed and a trip summary has been downloaded.'
    });
    
    // Navigate back to home after delay
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };
  
  // Get human-readable destination name
  const getDestinationName = (id: string) => {
    const destinations: Record<string, string> = {
      'rome': 'Rome, Italy',
      'dubai': 'Dubai, UAE',
      'kyoto': 'Kyoto, Japan',
      'london': 'London, UK',
      'hawaii': 'Hawaii, USA',
      'paris': 'Paris, France',
      'cairo': 'Cairo, Egypt',
      'sydney': 'Sydney, Australia',
      // Add the new destinations from index.tsx
      'san-miguel': 'San Miguel, Rome, Italy',
      'burj-khalifa': 'Burj Khalifa, Dubai, UAE',
      'kyoto-temple': 'Kyoto Temple, Japan',
      // Add packages
      'winter-holiday': 'Winter Holiday, Swiss Alps',
      'london-river': 'London River Tour, UK',
      'hawaii-weekend': 'Hawaii Weekend Getaway, USA'
    };
    
    return destinations[id] || id;
  };
  
  // Format date strings for display
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    try {
      return format(new Date(dateStr), 'MMM dd, yyyy');
    } catch (error) {
      return dateStr;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Left Side - Order Summary */}
                <div className="bg-gray-50 p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="bg-transco-gold rounded-full p-2">
                      <PlaneIcon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h2 className="font-heading font-medium text-lg">Order Summary</h2>
                      <p className="text-sm text-gray-500">Your payment details are safe with us</p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-5 mb-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-transco-gold/10 text-transco-gold rounded-full p-2 mr-3">
                        <PlaneIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Start your journey</p>
                        <p className="text-xl font-bold">${basePrice}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Additional fee</span>
                        <span>${additionalFee}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Discount</span>
                        <span className="text-green-600">-${discount}</span>
                      </div>
                      <div className="border-t border-gray-200 my-2 pt-2"></div>
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>${totalPrice}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-5">
                    <h3 className="font-medium mb-3">Booking Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Destination:</span>
                        <span className="font-medium">{getDestinationName(destination)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Number of people:</span>
                        <span className="font-medium">{people}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Check-in:</span>
                        <span className="font-medium">{formatDate(checkin)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Check-out:</span>
                        <span className="font-medium">{formatDate(checkout)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Right Side - Payment Form */}
                <div className="p-8">
                  <h1 className="text-2xl font-heading font-medium mb-6">Payment Details</h1>
                  
                  {/* Payment Method Selection */}
                  <div className="mb-6">
                    <fieldset className="grid grid-cols-4 gap-3">
                      <div>
                        <input 
                          type="radio" 
                          id="method-visa" 
                          name="paymentMethod" 
                          value="visa"
                          className="sr-only"
                          checked={paymentMethod === 'visa'}
                          onChange={() => setPaymentMethod('visa')}
                        />
                        <label 
                          htmlFor="method-visa"
                          className={`flex items-center justify-center border rounded-md p-3 cursor-pointer transition-all ${
                            paymentMethod === 'visa' 
                              ? 'border-transco-gold bg-transco-gold/5' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" 
                               alt="Visa" 
                               className="h-6 object-contain" />
                        </label>
                      </div>
                      
                      <div>
                        <input 
                          type="radio" 
                          id="method-mastercard" 
                          name="paymentMethod" 
                          value="mastercard"
                          className="sr-only"
                          checked={paymentMethod === 'mastercard'}
                          onChange={() => setPaymentMethod('mastercard')}
                        />
                        <label 
                          htmlFor="method-mastercard"
                          className={`flex items-center justify-center border rounded-md p-3 cursor-pointer transition-all ${
                            paymentMethod === 'mastercard' 
                              ? 'border-transco-gold bg-transco-gold/5' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" 
                               alt="Mastercard" 
                               className="h-6 object-contain" />
                        </label>
                      </div>
                      
                      <div>
                        <input 
                          type="radio" 
                          id="method-paypal" 
                          name="paymentMethod" 
                          value="paypal"
                          className="sr-only"
                          checked={paymentMethod === 'paypal'}
                          onChange={() => setPaymentMethod('paypal')}
                        />
                        <label 
                          htmlFor="method-paypal"
                          className={`flex items-center justify-center border rounded-md p-3 cursor-pointer transition-all ${
                            paymentMethod === 'paypal' 
                              ? 'border-transco-gold bg-transco-gold/5' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png" 
                               alt="PayPal" 
                               className="h-6 object-contain" />
                        </label>
                      </div>
                      
                      <div>
                        <input 
                          type="radio" 
                          id="method-stripe" 
                          name="paymentMethod" 
                          value="stripe"
                          className="sr-only"
                          checked={paymentMethod === 'stripe'}
                          onChange={() => setPaymentMethod('stripe')}
                        />
                        <label 
                          htmlFor="method-stripe"
                          className={`flex items-center justify-center border rounded-md p-3 cursor-pointer transition-all ${
                            paymentMethod === 'stripe' 
                              ? 'border-transco-gold bg-transco-gold/5' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/2560px-Stripe_Logo%2C_revised_2016.svg.png" 
                               alt="Stripe" 
                               className="h-6 object-contain" />
                        </label>
                      </div>
                    </fieldset>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <div className="relative">
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          required
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                        />
                        <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <div className="relative">
                          <Input
                            id="expiryDate"
                            name="expiryDate"
                            type="text"
                            placeholder="MM/YY"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            required
                            maxLength={5}
                          />
                          <CalendarDays className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          name="cvv"
                          type="text"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          required
                          maxLength={4}
                        />
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full mt-6 bg-transco-gold hover:bg-transco-gold-dark text-white py-3 h-auto text-base"
                    >
                      <Wallet className="mr-2 h-5 w-5" /> Pay ${totalPrice}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PaymentPage;
