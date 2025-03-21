import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';
import { toast } from 'sonner';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { handleAuthenticatedAction, isAuthenticated } = useAuthRedirect();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine if we're on a page that needs dark text on transparent background
  const isDarkTextPage = location.pathname.includes('/booking') || 
                         location.pathname.includes('/payment');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBookNow = () => {
    handleAuthenticatedAction(() => {
      navigate('/booking');
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    toast.success('Logged out successfully');
    navigate('/');
  };

  const scrollToSection = (sectionId: string) => {
    // Close the mobile menu if it's open
    setIsMenuOpen(false);
    
    // If we're not on the homepage, navigate there first then scroll
    if (location.pathname !== '/') {
      navigate('/');
      // We need to wait for navigation to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // If we're already on the homepage, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Define link color styles based on scroll state and current page
  const linkClass = isScrolled 
    ? "text-sm font-medium transition-colors hover:text-transco-gold text-transco-charcoal" 
    : isDarkTextPage
      ? "text-sm font-medium transition-colors hover:text-transco-gold text-transco-charcoal" 
      : "text-sm font-medium transition-colors hover:text-transco-gold text-white";

  // Define mobile menu link colors
  const mobileLinkClass = "text-sm font-medium transition-colors hover:text-transco-gold text-transco-charcoal";

  return <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : isDarkTextPage ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className={`text-xl font-bold ${isScrolled || isDarkTextPage ? 'text-transco-charcoal' : 'text-white'}`}>
              Trans<span className="text-transco-gold">CO</span>
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className={linkClass}>
              Home
            </Link>
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('destinations');
              }}
              className={linkClass}
            >
              Destinations
            </a>
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('packages');
              }}
              className={linkClass}
            >
              Packages
            </a>
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('gallery');
              }}
              className={linkClass}
            >
              Gallery
            </a>
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('about');
              }}
              className={linkClass}
            >
              About Us
            </a>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            {!isAuthenticated() ? (
              <Link to="/login">
                <Button 
                  variant="outline" 
                  className={`border-transco-gold ${isScrolled || isDarkTextPage ? 'text-transco-gold' : 'text-transco-gold'} hover:bg-transco-gold hover:text-white transition-all duration-300`}
                >
                  Login
                </Button>
              </Link>
            ) : (
              <Button 
                variant="outline" 
                className={`border-transco-gold ${isScrolled || isDarkTextPage ? 'text-transco-gold' : 'text-transco-gold'} hover:bg-transco-gold hover:text-white transition-all duration-300`}
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            )}
            <Button 
              onClick={handleBookNow}
              className="bg-transco-gold hover:bg-transco-gold-dark text-white transition-all duration-300"
            >
              Book Now
            </Button>
          </div>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="md:hidden focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {isMenuOpen ? (
              <X className={`h-6 w-6 ${isScrolled || isDarkTextPage ? 'text-transco-charcoal' : 'text-white'}`} />
            ) : (
              <Menu className={`h-6 w-6 ${isScrolled || isDarkTextPage ? 'text-transco-charcoal' : 'text-white'}`} />
            )}
          </button>
        </div>
        
        {isMenuOpen && <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md py-4 px-4 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className={mobileLinkClass} onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('destinations');
                }}
                className={mobileLinkClass}
              >
                Destinations
              </a>
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('packages');
                }}
                className={mobileLinkClass}
              >
                Packages
              </a>
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('gallery');
                }}
                className={mobileLinkClass}
              >
                Gallery
              </a>
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('about');
                }}
                className={mobileLinkClass}
              >
                About Us
              </a>
              <div className="flex flex-col space-y-2 pt-2 border-t border-gray-100">
                {!isAuthenticated() ? (
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full border-transco-gold text-transco-gold">
                      Login
                    </Button>
                  </Link>
                ) : (
                  <Button 
                    variant="outline" 
                    className="w-full border-transco-gold text-transco-gold"
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                )}
                <Link to="/booking" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-transco-gold hover:bg-transco-gold-dark text-white">
                    Book Now
                  </Button>
                </Link>
              </div>
            </nav>
          </div>}
      </div>
    </header>;
};

export default Navbar;
