'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Award, Briefcase, ChevronDown, ChevronUp, Rocket } from 'lucide-react';
import * as React from 'react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface TimelineEvent {
  id: number;
  title: string;
  date: string;
  description: string;
  type: 'work' | 'achievement' | 'project';
}

interface TimelineProps {
  events?: TimelineEvent[];
  className?: string;
}

interface GroupedEvents {
  [year: string]: TimelineEvent[];
}

const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [matches, query]);

  return matches;
};

interface TimelineItemProps {
  title: string;
  date: string;
  description: string;
  type: 'work' | 'achievement' | 'project';
  icon: React.ReactNode;
  isLeft: boolean;
}

const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(
  ({ title, date, description, type, icon, isLeft }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`mb-8 flex justify-between items-center w-full ${
          isLeft ? 'flex-row-reverse' : ''
        }`}>
        <div className={`w-full md:w-5/12 ml-5 md:ml-0`}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className='bg-card rounded-lg border shadow-md p-3'>
            <Card className='border-0 shadow-none'>
              <CardHeader className='p-2 pb-1'>
                <div className='flex justify-between items-start'>
                  <div>
                    <CardTitle className='text-base'>{title}</CardTitle>
                    <CardDescription className='text-xs'>
                      {date}
                    </CardDescription>
                  </div>
                  <Badge variant='secondary' className='ml-2 text-xs'>
                    {type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className='p-2 pt-1'>
                <p className='text-xs text-muted-foreground'>{description}</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        <div className='z-20 flex items-center justify-center bg-primary shadow-sm w-6 h-6 rounded-full -ml-3 md:ml-0'>
          <div className='text-primary-foreground'>{icon}</div>
        </div>
        <div className='hidden md:flex md:w-5/12'></div>
      </motion.div>
    );
  },
);
TimelineItem.displayName = 'TimelineItem';

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ events = [], className }, ref) => {
    const isDesktop = useMediaQuery('(min-width: 768px)');

    const groupedEvents: GroupedEvents = events.reduce((acc, event) => {
      const year = new Date(event.date).getFullYear().toString();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(event);
      return acc;
    }, {} as GroupedEvents);

    const sortedYears = Object.keys(groupedEvents).sort(
      (a, b) => Number.parseInt(b) - Number.parseInt(a),
    );

    const [expandedYears, setExpandedYears] = useState<string[]>([
      Object.keys(groupedEvents)[0],
    ]);

    const toggleYear = (year: string) => {
      setExpandedYears((prev) =>
        prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year],
      );
    };

    const getIcon = (type: string) => {
      switch (type) {
        case 'work':
          return <Briefcase size={12} />;
        case 'achievement':
          return <Award size={12} />;
        case 'project':
          return <Rocket size={12} />;
        default:
          return null;
      }
    };

    return (
      <div ref={ref} className={className}>
        <div className='container mx-auto w-full h-full'>
          <div className='relative wrap overflow-hidden p-4 h-full'>
            <div className='absolute h-full' style={{ left: '50%' }}></div>
            {sortedYears.map((year) => (
              <div key={year} className='mb-10 relative'>
                <Badge
                  onClick={() => toggleYear(year)}
                  variant='default'
                  className='-left-4 md:-translate-x-1/2 z-30 mb-8 relative transform-none md:left-1/2 text-xs rounded-full cursor-pointer'>
                  {year}{' '}
                  {expandedYears.includes(year) ? (
                    <ChevronUp size={16} className='ml-2' />
                  ) : (
                    <ChevronDown size={16} className='ml-2' />
                  )}
                </Badge>
                <AnimatePresence>
                  {expandedYears.includes(year) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className='mt-0'>
                      {groupedEvents[year].map((event, index) => (
                        <TimelineItem
                          key={event.id}
                          title={event.title}
                          date={event.date}
                          description={event.description}
                          type={event.type}
                          icon={getIcon(event.type)}
                          isLeft={isDesktop ? index % 2 === 0 : true}
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
);
Timeline.displayName = 'Timeline';

export { Timeline, type TimelineEvent, type TimelineProps };
