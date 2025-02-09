import { LucideProps } from 'lucide-react';
import React from 'react';
import { Card, CardContent } from './ui/card';
import { CountAnimation } from './ui/count-animation';

type StatCardProps = {
  value: number;
  description: string;
  Icon: React.ComponentType<LucideProps>;
};

const StatCard = ({ value, Icon, description }: StatCardProps) => {
  return (
    <Card className='relative'>
      <Icon className='absolute top-4 right-4' />

      <CardContent className='pt-5'>
        <CountAnimation number={value} className='text-4xl' />
        <p className='text-sm text-muted-foreground'>{description}</p>
      </CardContent>
    </Card>
  );
};

export default StatCard;
