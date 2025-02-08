import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const ArticleSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <Skeleton className='h-6 w-3/4 mb-2' />
        <Skeleton className='h-4 w-full' />
      </CardHeader>
      <CardFooter>
        <Skeleton className='h-10 w-28' />
      </CardFooter>
    </Card>
  );
};
