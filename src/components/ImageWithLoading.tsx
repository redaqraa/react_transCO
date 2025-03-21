
import { useState, useEffect } from 'react';

interface ImageWithLoadingProps {
  src: string;
  alt: string;
  className?: string;
  placeholderClassName?: string;
  fallbackSrc?: string;
}

const ImageWithLoading: React.FC<ImageWithLoadingProps> = ({ 
  src, 
  alt,
  className = "", 
  placeholderClassName = "bg-gray-200 animate-pulse",
  fallbackSrc = "/images/hero-banner.jpg"
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    setImgSrc(src);
    setError(false);
    setImageLoaded(false);
    
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setImageLoaded(true);
    };
    
    img.onerror = () => {
      console.log(`Failed to load image: ${src}`);
      setError(true);
      setImgSrc(fallbackSrc);
    };
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, fallbackSrc]);
  
  return (
    <div className={`blur-load relative ${imageLoaded && !error ? 'loaded' : ''} ${placeholderClassName}`}>
      <img 
        src={imgSrc} 
        alt={alt} 
        className={`transition-opacity duration-500 ${className}`}
        onLoad={() => setImageLoaded(true)}
        onError={() => {
          if (!error) {
            setError(true);
            setImgSrc(fallbackSrc);
          }
        }}
      />
    </div>
  );
};

export default ImageWithLoading;
