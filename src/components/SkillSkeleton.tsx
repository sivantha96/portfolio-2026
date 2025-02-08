import { Skeleton } from '@/components/ui/skeleton';

export const SkillSkeleton = () => {
  return (
    <div className='flex flex-col items-center p-4 bg-muted rounded-lg'>
      <Skeleton className='h-12 w-12 rounded-full mb-2' />
      <Skeleton className='h-4 w-20' />
    </div>
  );
};
