'use client';

import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';

import { about, contact } from '@/assets/content';
import { AppHeader } from '@/components/AppHeader';
import { ArticleSkeleton } from '@/components/ArticleSkeleton';
import { ProjectSkeleton } from '@/components/ProjectSkeleton';
import { SkillSkeleton } from '@/components/SkillSkeleton';
import StatCard from '@/components/StatCard';
import { StructuredData } from '@/components/StructuredData';
import { Avatar } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Timeline, TimelineEvent } from '@/components/ui/timeline';
import { Images } from '@/theme';
import { Article, Project, Skill } from '@/types';
import { makePhoneCall, openWebUrl, sendEmail } from '@/utils';
import { groupBy } from 'lodash';
import {
  ExternalLink,
  FileDown,
  GitBranch,
  Github,
  Handshake,
  Lightbulb,
  Linkedin,
  Mail,
  PhoneCall,
  Trophy,
} from 'lucide-react';
import Image from 'next/image';

const ContactDialog = dynamic(
  () => import('@/components/ContactDialog').then((mod) => mod.ContactDialog),
  {
    ssr: false,
    loading: () => <Button>Contact Me</Button>,
  },
);

const ProjectDialog = dynamic(
  () => import('@/components/ProjectDialog').then((mod) => mod.ProjectDialog),
  {
    ssr: false,
    loading: () => null,
  },
);

dayjs.extend(duration);

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<Project>();

  const { isPending: isLoadingProjects, data: projects } = useQuery({
    queryKey: ['projects'],
    queryFn: () =>
      fetch('/data/projects.json').then(
        (res) => res.json() as Promise<Project[]>,
      ),
  });

  const { isPending: isLoadingSkills, data: skills } = useQuery({
    queryKey: ['skills'],
    queryFn: () =>
      fetch('/data/skills.json').then((res) => res.json() as Promise<Skill[]>),
  });

  const { isPending: isLoadingTimeline, data: timelineEvents } = useQuery({
    queryKey: ['timeline'],
    queryFn: () =>
      fetch('/data/timeline.json').then(
        (res) => res.json() as Promise<TimelineEvent[]>,
      ),
  });

  const { isPending: isLoadingArticles, data: articles } = useQuery({
    queryKey: ['articles'],
    queryFn: () =>
      fetch('https://dev.to/api/articles?username=sivantha96').then(
        (res) => res.json() as Promise<Article[]>,
      ),
  });

  const clients = useMemo(
    () => Object.keys(groupBy(projects, 'client')),
    [projects],
  );

  return (
    <div className='min-h-screen bg-background text-foreground'>
      <AppHeader />

      <main className='container mx-auto px-6 py-8'>
        <section id='about' className='mb-12 scroll-mt-[100px]'>
          <div className='flex flex-col md:flex-row items-center mb-6'>
            <Avatar className='h-24 w-24 mb-4 md:mb-0 md:mr-6'>
              <Image
                src={Images.Profile}
                alt='Sivantha Paranavithana'
                width={100}
                height={100}
                className='rounded-full'
                priority
                loading='eager'
              />
            </Avatar>

            <div className='flex flex-col items-center md:items-start'>
              <h2 className='text-3xl font-bold mb-2'>
                Sivantha Paranavithana
              </h2>
              <p className='text-muted-foreground text-center md:text-left mb-4'>
                {about.main}
              </p>
              <div className='flex flex-wrap gap-4'>
                <ContactDialog />
                <Button variant='outline' asChild>
                  <a href='/data/sivantha-paranavithana-cv.pdf' download>
                    <FileDown className='mr-2 h-4 w-4' /> Download CV
                  </a>
                </Button>
              </div>
            </div>
          </div>
          <div className='flex gap-4 justify-center md:justify-start'>
            <Button
              variant='outline'
              size='icon'
              aria-label='Visit GitHub Profile'
              onClick={() => {
                openWebUrl(contact.social.github);
              }}>
              <Github className='h-4 w-4' />
            </Button>
            <Button
              variant='outline'
              size='icon'
              aria-label='Visit LinkedIn Profile'
              onClick={() => {
                openWebUrl(contact.social.linkedin);
              }}>
              <Linkedin className='h-4 w-4' />
            </Button>
            <Button
              variant='outline'
              size='icon'
              aria-label='Send Email'
              onClick={() =>
                sendEmail(
                  contact.email.personal,
                  'Professional Inquiry - [Your Name]',
                )
              }>
              <Mail className='h-4 w-4' />
            </Button>
            <Button
              variant='outline'
              size='icon'
              aria-label='Call Phone Number'
              onClick={() => {
                makePhoneCall(contact.phone.mobile);
              }}>
              <PhoneCall className='h-4 w-4' />
            </Button>
          </div>
        </section>

        <section className='mb-12'>
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
            <StatCard
              value={dayjs().diff(dayjs(about.experience.start), 'year')}
              description='Years of Experience'
              Icon={Lightbulb}
            />
            <StatCard
              value={projects?.length ?? 0}
              description='Completed Projects'
              Icon={Trophy}
            />
            <StatCard
              value={clients.length}
              description='Client Partnerships'
              Icon={Handshake}
            />
            <StatCard
              value={30}
              description='Open Source Contributions'
              Icon={GitBranch}
            />
          </div>
        </section>

        <section id='projects' className='mb-12 scroll-mt-[60px]'>
          <h2 className='text-3xl font-bold mb-6'>My Projects</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {isLoadingProjects
              ? Array(3)
                  .fill(0)
                  .map((_, index) => <ProjectSkeleton key={index} />)
              : projects?.map((project) => (
                  <Card key={project.id}>
                    <CardHeader>
                      <CardTitle>{project.title}</CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src={project.images[0] || '/placeholder.svg'}
                        alt={project.title}
                        width={400}
                        height={200}
                        className='w-full h-48 object-cover rounded-md'
                      />
                    </CardContent>
                    <CardFooter>
                      <Button onClick={() => setSelectedProject(project)}>
                        View Project
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
          </div>
        </section>

        <section id='timeline' className='mb-12 scroll-mt-[60px]'>
          <h2 className='text-3xl font-bold mb-6'>My Journey</h2>
          {isLoadingTimeline ? (
            <div className='space-y-4'>
              {Array(3)
                .fill(0)
                .map((_, index) => (
                  <Skeleton key={index} className='h-32 w-full' />
                ))}
            </div>
          ) : (
            <div className='relative'>
              <div className='absolute left-4 top-0 bottom-0 w-[2px] bg-primary -translate-x-1/2 md:left-1/2'></div>
              <Timeline events={timelineEvents} />
            </div>
          )}
        </section>

        <section id='skills' className='mb-12 scroll-mt-[60px]'>
          <h2 className='text-3xl font-bold mb-6'>Skills & Technologies</h2>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
            {isLoadingSkills
              ? Array(10)
                  .fill(0)
                  .map((_, index) => <SkillSkeleton key={index} />)
              : skills?.map((skill) => (
                  <div
                    key={skill.id}
                    className='flex flex-col items-center p-4 bg-muted rounded-[calc(var(--radius)*1rem)]'>
                    <Image
                      src={skill.icon || '/placeholder.svg'}
                      alt={skill.name}
                      width={48}
                      height={48}
                      className='mb-2'
                    />
                    <span className='text-sm font-medium'>{skill.name}</span>
                  </div>
                ))}
          </div>
        </section>

        <section id='articles' className='mb-12 scroll-mt-[60px]'>
          <h2 className='text-3xl font-bold mb-6'>My Articles</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {isLoadingArticles
              ? Array(3)
                  .fill(0)
                  .map((_, index) => <ArticleSkeleton key={index} />)
              : articles?.map((article) => (
                  <Card key={article.id}>
                    <CardHeader>
                      <CardTitle>{article.title}</CardTitle>
                      <CardDescription>{article.description}</CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button asChild onClick={() => openWebUrl(article.url)}>
                        <span className='cursor-pointer'>
                          Read More <ExternalLink className='ml-2 h-4 w-4' />
                        </span>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
          </div>
        </section>
      </main>

      <footer className='border-t p-6 text-center text-muted-foreground'>
        <p>&copy; 2025 Sivantha Paranavithana. All rights reserved.</p>
      </footer>

      {selectedProject && (
        <ProjectDialog
          project={selectedProject}
          onClose={() => setSelectedProject(undefined)}
        />
      )}

      <StructuredData />
    </div>
  );
}
