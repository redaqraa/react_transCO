
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-9xl font-heading font-bold text-transco-gold mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-heading mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          Sorry, the page you are looking for doesn't exist, has been moved, or was deleted.
        </p>
        <div className="flex justify-center">
          <Link to="/">
            <Button className="bg-transco-gold hover:bg-transco-gold-dark text-white transition-all duration-300">
              Return to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
