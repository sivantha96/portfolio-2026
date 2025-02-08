import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const ProjectSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <Skeleton className='h-6 w-3/4 mb-2' />
        <Skeleton className='h-4 w-full' />
      </CardHeader>
      <CardContent>
        <Skeleton className='h-48 w-full' />
      </CardContent>
      <CardFooter>
        <Skeleton className='h-10 w-28' />
      </CardFooter>
    </Card>
  );
};
