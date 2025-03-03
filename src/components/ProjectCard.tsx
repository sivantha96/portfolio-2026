import { useImageLoadingStore } from '@/stores/imageLoadingStore';
import { Project } from '@/types';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';

type ProjectCardProps = {
  data: Project;
  onPress: () => void;
};

function ProjectCard({ data, onPress }: ProjectCardProps) {
  const [currentImage, setCurrentImage] = useState<string>('');
  const { registerWebP, unregisterWebP, allWebPLoaded } =
    useImageLoadingStore();
  const webpImage = data.images[0].replace('.svg', '.webp');
  const svgImage = data.images[0];

  useEffect(() => {
    // Register this WebP image
    registerWebP(webpImage);

    // Start with WebP image
    setCurrentImage(webpImage);

    // Create an image element to track WebP loading
    const webpLoader = new window.Image();
    webpLoader.src = webpImage;
    webpLoader.onload = () => {
      // Unregister this WebP image once loaded
      unregisterWebP(webpImage);

      // Only load SVG if all other WebP images are loaded
      if (allWebPLoaded) {
        const svgLoader = new window.Image();
        svgLoader.src = svgImage;
        svgLoader.onload = () => {
          setCurrentImage(svgImage);
        };
      }
    };

    return () => {
      // Cleanup: unregister the WebP image if component unmounts before loading
      unregisterWebP(webpImage);
    };
  }, [webpImage, svgImage, registerWebP, unregisterWebP, allWebPLoaded]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
        <CardDescription>{data.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='relative w-full aspect-[4/3]'>
          <Image
            src={currentImage || '/placeholder.svg'}
            alt={data.title}
            fill
            className='object-cover rounded-md transition-opacity duration-300'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onPress}>View Project</Button>
      </CardFooter>
    </Card>
  );
}

export default ProjectCard;
