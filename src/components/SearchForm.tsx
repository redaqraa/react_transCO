
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

const SearchForm = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [travelers, setTravelers] = useState(2);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log({
      location,
      date: selectedDate,
      travelers
    });
    
    // Navigate to booking page with initial parameters
    navigate(`/booking?destination=${location}&people=${travelers}`);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 grid grid-cols-1 md:grid-cols-5 gap-4 relative -mt-16 mx-4 z-10">
      <div className="md:col-span-2">
        <label className="block text-sm font-medium mb-1 text-gray-700">Where would you like to go?</label>
        <input
          type="text"
          placeholder="Enter destination"
          className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-transco-gold"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">When do you want to travel?</label>
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex w-full items-center justify-between px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-transco-gold">
                {selectedDate ? format(selectedDate, 'dd/MM/yyyy') : 'Select a date'}
                <Calendar className="h-4 w-4 text-gray-500" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent
                mode="single"
                locale={enUS}
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
                classNames={{
                  day_selected: "bg-transco-gold text-white",
                  day_today: "bg-transco-gold/20 text-transco-gold-dark",
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">Number of travelers</label>
        <select
          className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-transco-gold"
          value={travelers}
          onChange={(e) => setTravelers(Number(e.target.value))}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
            <option key={num} value={num}>
              {num} {num === 1 ? 'traveler' : 'travelers'}
            </option>
          ))}
        </select>
      </div>
      
      <div className="flex items-end">
        <Button 
          onClick={handleSearch}
          className="w-full bg-transco-gold hover:bg-transco-gold-dark text-white transition-all duration-300 px-4 py-3 h-auto"
        >
          Search Now
        </Button>
      </div>
    </div>
  );
};

export default SearchForm;
