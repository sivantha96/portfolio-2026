import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Project } from '@/types';
import Image from 'next/image';

interface ProjectDialogProps {
  project: Project;
  onClose: () => void;
}

export function ProjectDialog({ project, onClose }: ProjectDialogProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className='max-w-4xl h-[90vh]'>
        <DialogHeader>
          <DialogTitle>{project.title}</DialogTitle>
          <DialogDescription>{project.description}</DialogDescription>
        </DialogHeader>
        <ScrollArea className='h-full pr-4'>
          <div className='space-t-4'>
            <p className='mb-4'>{project.fullDescription.split('\n\n')[0]}</p>

            {project.images.length > 1 ? (
              <Carousel
                className='w-full mb-4 relative px-16'
                orientation='horizontal'>
                <CarouselContent>
                  {project.images.slice(1).map((img, index) => (
                    <CarouselItem
                      key={index}
                      className='sm:basis-1/1 md:basis-1/2 lg:basis-1/3'>
                      <div className='flex aspect-[16/12] items-center justify-center'>
                        <Image
                          width={700}
                          height={1200}
                          src={img || '/placeholder.svg'}
                          alt={`Project image ${index + 2}`}
                          className='w-full h-auto rounded-md'
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            ) : (
              project.images.length === 1 && (
                <Image
                  width={1600}
                  height={1200}
                  src={project.images[0] || '/placeholder.svg'}
                  alt='Project image 1'
                  className='w-full h-auto rounded-md'
                />
              )
            )}
            <div className='space-y-4'>
              {project.fullDescription
                .split('\n\n')
                .slice(1)
                .map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
