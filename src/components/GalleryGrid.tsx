
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import ImageWithLoading from './ImageWithLoading';

interface GalleryGridProps {
  images: {
    id: string;
    src: string;
    alt: string;
  }[];
}

const GalleryGrid = ({ images }: GalleryGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {images.map((image, index) => (
        <GalleryItem key={image.id} image={image} index={index} />
      ))}
    </div>
  );
};

interface GalleryItemProps {
  image: {
    id: string;
    src: string;
    alt: string;
  };
  index: number;
}

const GalleryItem = ({ image, index }: GalleryItemProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [isHovered, setIsHovered] = useState(false);

  // Determine if item should span
  const isSpanRow = index === 0;
  const isSpanCol = index === 3;
  
  return (
    <div
      ref={ref}
      className={`
        ${inView ? 'animate-scale-in' : 'opacity-0'}
        ${isSpanRow ? 'md:row-span-2' : ''}
        ${isSpanCol ? 'md:col-span-2' : ''}
        overflow-hidden rounded-lg relative group
      `}
      style={{ 
        animationDelay: `${index * 100}ms`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ImageWithLoading
        src={image.src}
        alt={image.alt}
        className={`w-full h-full object-cover aspect-square transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
        fallbackSrc="/images/hero-banner.jpg"
      />
      
      <div 
        className={`absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : ''
        }`}
      >
        <div className="text-white text-center px-4">
          <h3 className="font-medium text-lg">{image.alt}</h3>
        </div>
      </div>
    </div>
  );
};

export default GalleryGrid;
