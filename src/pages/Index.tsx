import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchForm from '@/components/SearchForm';
import PopularDestination from '@/components/PopularDestination';
import PackageCard from '@/components/PackageCard';
import ImageWithLoading from '@/components/ImageWithLoading';
import GalleryGrid from '@/components/GalleryGrid';
import { Button } from '@/components/ui/button';

// Use the hero banner from uploads
const HERO_IMAGE = "/images/hero-banner.jpg";
const FALLBACK_IMAGE = "/images/893830d5-1e17-4bbd-a400-1a98b9e486d1.png";
const destinations = [{
  id: 'paris',
  name: 'Eiffel Tower',
  location: 'Paris, France',
  image: '/images/img9.jpg',
  rating: 4.8,
  price: 120
}, {
  id: 'dubai',
  name: 'Dubai Skyline',
  location: 'Dubai, UAE',
  image: '/images/popular-2.jpg',
  rating: 4.9,
  price: 180
}, {
  id: 'venice',
  name: 'Grand Canal',
  location: 'Venice, Italy',
  image: '/images/popular-1.jpg',
  rating: 4.7,
  price: 150
}];
const packages = [{
  id: 'winter-holiday',
  title: 'Enjoy an Amazing Holiday in Snowy Weather',
  description: 'Discover the magic of winter in the most beautiful mountainous regions with skiing activities and snow adventures. The package includes luxury accommodation, meals, and recreational activities.',
  location: 'Swiss Alps, Switzerland',
  image: '/images/packege-1.jpg',
  rating: 4.9,
  duration: '7 days',
  maxPeople: 6,
  price: 750
}, {
  id: 'london-river',
  title: 'Summer Holiday on the London River',
  description: 'Explore the amazing landmarks in London with special river trips on the Thames. The package includes guided tours and museum entry tickets.',
  location: 'London, United Kingdom',
  image: '/images/packege-2.jpg',
  rating: 4.7,
  duration: '5 days',
  maxPeople: 8,
  price: 520
}, {
  id: 'hawaii-weekend',
  title: 'Weekend Getaway in Hawaii',
  description: 'Spend an amazing weekend in the tropical islands of Hawaii. Enjoy white sandy beaches, turquoise waters, diving activities, and relaxation.',
  location: 'Hawaii, USA',
  image: '/images/packege-3.jpg',
  rating: 4.8,
  duration: '3 days',
  maxPeople: 4,
  price: 660
}];
const galleryImages = [{
  id: 'gallery-1',
  src: '/images/gallery-5.jpg',
  alt: 'Lake and Mountain View'
}, {
  id: 'gallery-2',
  src: '/images/gallery-2.jpg',
  alt: 'Eiffel Tower in Paris'
}, {
  id: 'gallery-3',
  src: '/images/gallery-3.jpg',
  alt: 'Mountain Hiking'
}, {
  id: 'gallery-4',
  src: '/images/gallery-4.jpg',
  alt: 'Mountain View with Snow'
}, {
  id: 'gallery-5',
  src: '/images/gallery-1.jpg',
  alt: 'Hiking with a View'
}, {
  id: 'gallery-6',
  src: '/images/popular-3.jpg',
  alt: 'Beach Paradise'
}, {
  id: 'gallery-7',
  src: '/images/img8.jpg',
  alt: 'Tropical Island'
}, ];
const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);
  useEffect(() => {
    const img = new Image();
    img.src = HERO_IMAGE;
    img.onload = () => {
      setHeroImageLoaded(true);
      setIsLoaded(true);
    };
    img.onerror = () => {
      console.log("Failed to load hero image, using fallback");
      setIsLoaded(true);
    };
    const timeout = setTimeout(() => {
      setIsLoaded(true);
    }, 3000);
    return () => {
      clearTimeout(timeout);
      img.onload = null;
      img.onerror = null;
    };
  }, []);
  const heroImageStyle = {
    backgroundImage: `url('${HERO_IMAGE}')`,
    opacity: heroImageLoaded ? 0.6 : 0,
    transition: 'opacity 1s ease-in-out'
  };
  return <div className="min-h-screen bg-gray-50 overflow-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden bg-transco-darkteal">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={heroImageStyle} />
        
        <div className={`absolute inset-0 bg-gradient-to-b from-black/50 to-black/20 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} />
        
        <div className="container mx-auto px-4 relative z-10 staggered-animation">
          <h1 className={`text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6 text-shadow-lg max-w-4xl mx-auto text-center opacity-0 animate-fade-in`} style={{
          animationDelay: '0.2s'
        }}>
            A Journey to Explore the World
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto text-center mb-10 text-shadow-sm opacity-0 animate-fade-in" style={{
          animationDelay: '0.4s'
        }}>
            Discover amazing tourist destinations and enjoy unforgettable travel experiences with our exceptional services
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 opacity-0 animate-fade-in" style={{
          animationDelay: '0.6s'
        }}>
            <a href="#destinations">
              <Button size="lg" className="bg-transco-gold hover:bg-transco-gold-dark text-white transition-all duration-300 text-base px-8">
                Explore Destinations
              </Button>
            </a>
            <a href="#about">
              <Button variant="outline" size="lg" className="border-white text-transco-gold hover:bg-white transition-all duration-300 text-base px-8">
                About Us
              </Button>
            </a>
          </div>
          
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 opacity-0 animate-fade-in" style={{
          animationDelay: '1s'
        }}>
            
          </div>
        </div>
      </section>
      
      {/* Search Section */}
      <section id="search" className="relative">
        <div className="container mx-auto">
          <SearchForm />
        </div>
      </section>
      
      {/* Popular Destinations */}
      <section id="destinations" className="section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Popular Destinations</h2>
            <p className="section-subtitle">Discover the most visited cities and landmarks around the world</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map(destination => <PopularDestination key={destination.id} {...destination} />)}
          </div>
          
          <div className="mt-12 text-center">
            
          </div>
        </div>
      </section>
      
      {/* Packages Section */}
      <section id="packages" className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Browse Our Packages</h2>
            <p className="section-subtitle">Choose from our best travel offers and packages</p>
          </div>
          
          <div className="space-y-6">
            {packages.map(pkg => <PackageCard key={pkg.id} {...pkg} />)}
          </div>
          
          <div className="mt-12 text-center">
            
          </div>
        </div>
      </section>
      
      {/* Gallery Section */}
      <section id="gallery" className="section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Photos from Travelers</h2>
            <p className="section-subtitle">See special moments from our clients' trips around the world</p>
          </div>
          
          <GalleryGrid images={galleryImages} />
          
          <div className="mt-12 text-center">
            
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">About Us</h2>
            <p className="section-subtitle">Learn more about our travel company and our mission</p>
          </div>
          
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gray-600 mb-6">
              TransCO is a premier travel agency dedicated to providing exceptional travel experiences. 
              With years of experience in the tourism industry, we specialize in creating unique and 
              memorable journeys for our clients around the world.
            </p>
            <p className="text-gray-600 mb-6">
              Our team of expert travel consultants is passionate about travel and committed to 
              ensuring that every aspect of your trip is perfect, from accommodation and transportation 
              to activities and dining experiences.
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>;
};
export default Index;