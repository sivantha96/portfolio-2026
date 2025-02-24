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
  const webpImage = data.images[0].replace('.svg', '.webp');
  const svgImage = data.images[0];

  useEffect(() => {
    // Start with WebP image
    setCurrentImage(webpImage);

    // Preload SVG
    const svgLoader = new window.Image();
    svgLoader.src = svgImage;
    svgLoader.onload = () => {
      // Once SVG is loaded, switch to it
      setCurrentImage(svgImage);
    };
  }, [webpImage, svgImage]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
        <CardDescription>{data.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='relative w-full h-48'>
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
