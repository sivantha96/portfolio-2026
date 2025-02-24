import { Project } from '@/types';
import Image from 'next/image';
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
  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
        <CardDescription>{data.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Image
          src={data.images[0] || '/placeholder.svg'}
          alt={data.title}
          width={400}
          height={200}
          className='w-full h-48 object-cover rounded-md'
        />
      </CardContent>
      <CardFooter>
        <Button onClick={onPress}>View Project</Button>
      </CardFooter>
    </Card>
  );
}

export default ProjectCard;
