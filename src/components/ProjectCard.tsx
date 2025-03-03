import { useImageLoadingStore } from '@/stores/imageLoadingStore';
import { Project } from '@/types';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';
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
  const webpImage = useMemo(() => data.images[0], [data.images]);
  const svgImage = useMemo(
    () => data.images[0].replace('.webp', '.svg'),
    [data.images],
  );

  useEffect(() => {
    // Register this WebP image
    registerWebP(webpImage);

    // Start with WebP image
    setCurrentImage(webpImage);

    return () => {
      // Cleanup: unregister the WebP image if component unmounts before loading
      unregisterWebP(webpImage);
    };
  }, [registerWebP, unregisterWebP, webpImage]);

  useEffect(() => {
    // Only load SVG if all other WebP images are loaded
    if (allWebPLoaded) {
      const svgLoader = new window.Image();
      svgLoader.src = svgImage;
      svgLoader.onload = () => {
        setCurrentImage(svgImage);
      };
    }
  }, [allWebPLoaded, svgImage]);

  const handleOnLoad = useCallback(() => {
    // Unregister this WebP image once loaded
    unregisterWebP(webpImage);
  }, [unregisterWebP, webpImage]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
        <CardDescription>{data.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='relative w-full aspect-4/3'>
          <Image
            src={currentImage || '/placeholder.svg'}
            alt={data.title}
            fill
            priority
            onLoad={handleOnLoad}
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
