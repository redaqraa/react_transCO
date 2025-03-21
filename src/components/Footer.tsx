import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const socialMediaLinks = {
    facebook: "https://facebook.com/transco",
    instagram: "https://instagram.com/transco",
    twitter: "https://twitter.com/transco"
  };

  return <>
      <div className="bg-transco-gold py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-medium text-white mb-4 tracking-tight text-shadow-sm">
            Get Ready for an Unforgettable Journey. Remember Us!
          </h2>
          <Link to="/booking">
            <button className="mt-6 px-8 py-3 bg-white text-transco-gold rounded-full font-medium transition-all duration-300 hover:bg-transco-darkteal hover:text-white hover:shadow-md">
              Book Now
            </button>
          </Link>
        </div>
      </div>
      <footer className="bg-transco-darkteal text-white pt-16 pb-8 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <h3 className="text-xl font-heading font-medium mb-6">Trans<span className="text-transco-gold">CO</span></h3>
              <p className="text-white/80 mb-6">Our company has been a leader in travel and tourism since 2010, providing unique travel experiences at competitive prices.</p>
              <div className="flex space-x-4">
                <a href={socialMediaLinks.facebook} target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href={socialMediaLinks.instagram} target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href={socialMediaLinks.twitter} target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li><Link to="/" className="footer-link hover:text-transco-gold transition-colors">Home</Link></li>
                <li>
                  <a 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('destinations');
                    }}
                    className="footer-link hover:text-transco-gold transition-colors cursor-pointer"
                  >
                    Destinations
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('packages');
                    }}
                    className="footer-link hover:text-transco-gold transition-colors cursor-pointer"
                  >
                    Packages
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('gallery');
                    }}
                    className="footer-link hover:text-transco-gold transition-colors cursor-pointer"
                  >
                    Gallery
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('about');
                    }}
                    className="footer-link hover:text-transco-gold transition-colors cursor-pointer"
                  >
                    About Us
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-6">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 mt-1 mr-3 text-transco-gold" />
                  <span className="text-white/80">ISTA NTIC, GUELMIM, Morroco</span>
                </li>
                <li className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-transco-gold" />
                  <span className="text-white/80">+212 12 345 6789</span>
                </li>
                <li className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-transco-gold" />
                  <span className="text-white/80">contact@transco.com</span>
                </li>
              </ul>
            </div>
            
            
          </div>
          
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/60 text-sm">
            <p>© {new Date().getFullYear()} TransCO. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>;
};
export default Footer;
