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
          <div className='space-y-4'>
            <p>{project.fullDescription.split('\n\n')[0]}</p>
            <div className='grid grid-cols-2 gap-4'>
              {project.images.slice(0, 2).map((img, index) => (
                <Image
                  width={400}
                  height={200}
                  key={index}
                  src={img || '/placeholder.svg'}
                  alt={`Project image ${index + 1}`}
                  className='w-full h-auto rounded-md'
                />
              ))}
            </div>
            <p>{project.fullDescription.split('\n\n')[1]}</p>
            {project.codeSnippet && (
              <pre className='bg-muted p-4 rounded-md overflow-x-auto'>
                <code>{project.codeSnippet}</code>
              </pre>
            )}
            <p>{project.fullDescription.split('\n\n')[2]}</p>
            {project.images[2] && (
              <Image
                width={400}
                height={200}
                src={project.images[2] || '/placeholder.svg'}
                alt='Project image 3'
                className='w-full h-auto rounded-md'
              />
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
