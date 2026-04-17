'use client';

import { about, contact, cvSkills, experience } from '@/assets/content';
import { AppHeader } from '@/components/AppHeader';
import { StructuredData } from '@/components/StructuredData';
import { Button } from '@/components/ui/button';
import { Article } from '@/types';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import projectsData from '../../public/data/projects.json';

const ContactDialog = dynamic(
  () => import('@/components/ContactDialog').then((m) => m.ContactDialog),
  {
    ssr: false,
    loading: () => <Button variant='outline'>Send a Message</Button>,
  },
);

dayjs.extend(duration);

// ─── Inline data ────────────────────────────────────────────────────────────

const jp = (id: number) => projectsData.find((p) => p.id === id)!;

const FLAGSHIP_JSON_IDS = new Set([2, 3]);

const flagshipProjects = [
  {
    num: '01',
    category: 'Infrastructure · 2022–2025',
    title: 'AWS Microservices Migration',
    description:
      'Inherited a monolithic EC2 system where a single database deadlock could take the entire platform offline. Redesigned the full infrastructure using AWS CDK — migrating to ECS Fargate microservices with isolated service boundaries, eliminating platform-wide outages, achieving near-100% uptime, and cutting monthly cloud costs by 49%. Designed for distributed team workflows with infrastructure-as-code, automated rollbacks, and per-service observability via CloudWatch.',
    metrics: [
      { val: '49%', label: 'Cost Reduction' },
      { val: '~100%', label: 'Uptime' },
      { val: 'Solo', label: 'Architecture Owner' },
    ],
    image: '/images/Architecture.webp' as string | null,
    tags: [
      'AWS CDK',
      'ECS Fargate',
      'RDS/Aurora',
      'Lambda',
      'SQS',
      'CloudWatch',
      'EventBridge',
    ],
  },
  {
    num: '02',
    category: 'Payments Platform · 2022–Present',
    title: 'Dinetap Payments',
    description:
      'Architected and led a team of 7 engineers to build a payment platform now processing SGD 13.5M+ per month across card, digital wallet, and physical POS terminal surfaces. Engineered for high-concurrency reliability during restaurant peak hours — SQS-backed webhook processing ensures no payment event is lost under load. Covers Stripe, Adyen (with terminal support), WooCommerce, and Airwallex, with PCI-compliant data handling across all surfaces.',
    metrics: [
      { val: 'SGD 13.5M', label: 'Monthly Volume' },
      { val: '7', label: 'Engineers Led' },
      { val: '3', label: 'Providers' },
    ],
    image: jp(2).images[0] as string,
    tags: jp(2).technologies as string[],
  },
  {
    num: '03',
    category: 'Consumer Product · 2022–Present',
    title: jp(3).title,
    description:
      'Architected and led a cross-functional team of 6 engineers to deliver the flagship consumer dining app end-to-end. Set API contracts, data models, and release cadence from day one — with documentation-first workflows enabling async delivery across a distributed team. Covers restaurant discovery, real-time ordering, integrated payments, and a cashback rewards system, built on React Native Expo with AWS ECS Fargate for high availability.',
    metrics: [
      { val: '6', label: 'Engineers Led' },
      { val: 'E2E', label: 'Ownership' },
    ],
    image: jp(3).images[0] as string,
    tags: jp(3).technologies as string[],
  },
  {
    num: '04',
    category: 'Engineering Culture · 2023–Present',
    title: 'Engineering Quality Programme',
    description:
      'Built the engineering quality infrastructure to support a distributed team shipping across multiple product streams simultaneously. Eliminated all manual release steps, enabling daily autonomous deployments across every web, API, mobile, and microservice repository. Pipelines include AI-assisted code review, SonarQube security scanning, and automated regression checks — so engineers ship confidently without synchronous sign-off.',
    metrics: [
      { val: '0', label: 'Manual Release Steps' },
      { val: 'Daily', label: 'Deploy Cadence' },
    ],
    image: '/images/ci-cd.webp' as string | null,
    tags: ['GitHub Actions', 'SonarQube', 'Docker', 'Sentry', 'Expo EAS'],
  },
];

const gridProjects = projectsData
  .filter((p) => !FLAGSHIP_JSON_IDS.has(p.id))
  .map((p) => ({
    meta: `${p.technologies.slice(0, 2).join(' · ')} · ${p.year}`,
    title: p.title,
    desc: p.description,
  }));

const uniqueClients = [...new Set(projectsData.map((p) => p.client))];

const contactLinks = [
  {
    label: 'Email',
    value: contact.email.personal,
    href: `mailto:${contact.email.personal}`,
  },
  {
    label: 'LinkedIn',
    value: contact.social.linkedin.replace(/^https?:\/\/(www\.)?/, ''),
    href: contact.social.linkedin,
  },
  {
    label: 'GitHub',
    value: contact.social.github.replace(/^https?:\/\/(www\.)?/, ''),
    href: contact.social.github,
  },
  {
    label: 'Phone',
    value: contact.phone.mobile.replace(
      /(\+\d{2})(\d{2})(\d{3})(\d{4})/,
      '$1 $2 $3 $4',
    ),
    href: `tel:${contact.phone.mobile}`,
  },
];

// ─── SVG Diagrams ────────────────────────────────────────────────────────────

function AwsArchDiagram() {
  return (
    <svg
      viewBox='0 0 320 280'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='w-full max-w-[320px]'>
      <defs>
        <pattern id='grid' width='20' height='20' patternUnits='userSpaceOnUse'>
          <path
            d='M 20 0 L 0 0 0 20'
            fill='none'
            stroke='rgba(255,255,255,0.04)'
            strokeWidth={0.5}
          />
        </pattern>
      </defs>
      <rect width='320' height='280' fill='url(#grid)' />
      <rect
        x='120'
        y='10'
        width='80'
        height='36'
        rx='3'
        fill='rgba(232,255,71,0.1)'
        stroke='rgba(232,255,71,0.4)'
        strokeWidth={1}
      />
      <text
        x='160'
        y='32'
        fill='#e8ff47'
        fontFamily='monospace'
        fontSize={9}
        textAnchor='middle'>
        API Gateway
      </text>
      <line
        x1='160'
        y1='46'
        x2='160'
        y2='70'
        stroke='rgba(232,255,71,0.3)'
        strokeWidth={1}
      />
      <polygon points='156,66 160,74 164,66' fill='rgba(232,255,71,0.4)' />
      <rect
        x='20'
        y='74'
        width='280'
        height='160'
        rx='4'
        fill='rgba(255,255,255,0.02)'
        stroke='rgba(255,255,255,0.08)'
        strokeWidth={1}
        strokeDasharray='4,3'
      />
      <text
        x='30'
        y='90'
        fill='rgba(255,255,255,0.25)'
        fontFamily='monospace'
        fontSize={8}>
        VPC
      </text>
      <rect
        x='36'
        y='98'
        width='68'
        height='32'
        rx='3'
        fill='rgba(255,107,53,0.1)'
        stroke='rgba(255,107,53,0.35)'
        strokeWidth={1}
      />
      <text
        x='70'
        y='118'
        fill='#ff6b35'
        fontFamily='monospace'
        fontSize={8}
        textAnchor='middle'>
        Auth Svc
      </text>
      <rect
        x='126'
        y='98'
        width='68'
        height='32'
        rx='3'
        fill='rgba(255,107,53,0.1)'
        stroke='rgba(255,107,53,0.35)'
        strokeWidth={1}
      />
      <text
        x='160'
        y='118'
        fill='#ff6b35'
        fontFamily='monospace'
        fontSize={8}
        textAnchor='middle'>
        Order Svc
      </text>
      <rect
        x='216'
        y='98'
        width='68'
        height='32'
        rx='3'
        fill='rgba(255,107,53,0.1)'
        stroke='rgba(255,107,53,0.35)'
        strokeWidth={1}
      />
      <text
        x='250'
        y='118'
        fill='#ff6b35'
        fontFamily='monospace'
        fontSize={8}
        textAnchor='middle'>
        Payment Svc
      </text>
      <rect
        x='120'
        y='152'
        width='80'
        height='28'
        rx='3'
        fill='rgba(255,255,255,0.04)'
        stroke='rgba(255,255,255,0.12)'
        strokeWidth={1}
      />
      <text
        x='160'
        y='170'
        fill='rgba(255,255,255,0.5)'
        fontFamily='monospace'
        fontSize={8}
        textAnchor='middle'>
        SQS
      </text>
      <line
        x1='70'
        y1='130'
        x2='130'
        y2='152'
        stroke='rgba(255,255,255,0.1)'
        strokeWidth={1}
      />
      <line
        x1='160'
        y1='130'
        x2='160'
        y2='152'
        stroke='rgba(255,255,255,0.1)'
        strokeWidth={1}
      />
      <line
        x1='250'
        y1='130'
        x2='190'
        y2='152'
        stroke='rgba(255,255,255,0.1)'
        strokeWidth={1}
      />
      <rect
        x='90'
        y='200'
        width='68'
        height='28'
        rx='3'
        fill='rgba(255,255,255,0.04)'
        stroke='rgba(255,255,255,0.12)'
        strokeWidth={1}
      />
      <text
        x='124'
        y='218'
        fill='rgba(255,255,255,0.5)'
        fontFamily='monospace'
        fontSize={8}
        textAnchor='middle'>
        RDS/Aurora
      </text>
      <rect
        x='168'
        y='200'
        width='68'
        height='28'
        rx='3'
        fill='rgba(255,255,255,0.04)'
        stroke='rgba(255,255,255,0.12)'
        strokeWidth={1}
      />
      <text
        x='202'
        y='218'
        fill='rgba(255,255,255,0.5)'
        fontFamily='monospace'
        fontSize={8}
        textAnchor='middle'>
        CloudWatch
      </text>
      <text
        x='36'
        y='245'
        fill='rgba(232,255,71,0.3)'
        fontFamily='monospace'
        fontSize={7}>
        ECS FARGATE
      </text>
    </svg>
  );
}

function PaymentsDiagram() {
  return (
    <svg
      viewBox='0 0 280 220'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='w-full max-w-[280px]'>
      <defs>
        <linearGradient id='flowgrad' x1='0%' y1='0%' x2='100%' y2='100%'>
          <stop offset='0%' stopColor='rgba(232,255,71,0.15)' />
          <stop offset='100%' stopColor='rgba(232,255,71,0.03)' />
        </linearGradient>
      </defs>
      <rect
        x='10'
        y='20'
        width='120'
        height='70'
        rx='8'
        fill='url(#flowgrad)'
        stroke='rgba(232,255,71,0.25)'
        strokeWidth={1}
      />
      <text
        x='24'
        y='45'
        fill='rgba(232,255,71,0.6)'
        fontFamily='monospace'
        fontSize={7}>
        CARD
      </text>
      <text
        x='24'
        y='62'
        fill='rgba(255,255,255,0.5)'
        fontFamily='monospace'
        fontSize={9}
        letterSpacing={2}>
        {'•••• 4242'}
      </text>
      <rect
        x='24'
        y='72'
        width='32'
        height='10'
        rx='2'
        fill='rgba(232,255,71,0.15)'
      />
      <text
        x='28'
        y='80'
        fill='rgba(232,255,71,0.5)'
        fontFamily='monospace'
        fontSize={6}>
        03/28
      </text>
      <rect
        x='150'
        y='20'
        width='120'
        height='70'
        rx='8'
        fill='rgba(255,107,53,0.06)'
        stroke='rgba(255,107,53,0.2)'
        strokeWidth={1}
      />
      <text
        x='164'
        y='45'
        fill='rgba(255,107,53,0.6)'
        fontFamily='monospace'
        fontSize={7}>
        DIGITAL WALLET
      </text>
      <text
        x='164'
        y='65'
        fill='rgba(255,255,255,0.35)'
        fontFamily='monospace'
        fontSize={8}>
        Apple Pay / GPay
      </text>
      <line
        x1='70'
        y1='90'
        x2='70'
        y2='118'
        stroke='rgba(232,255,71,0.3)'
        strokeWidth={1}
      />
      <line
        x1='210'
        y1='90'
        x2='210'
        y2='118'
        stroke='rgba(255,107,53,0.3)'
        strokeWidth={1}
      />
      <polygon points='66,114 70,122 74,114' fill='rgba(232,255,71,0.4)' />
      <polygon points='206,114 210,122 214,114' fill='rgba(255,107,53,0.4)' />
      <rect
        x='80'
        y='122'
        width='120'
        height='36'
        rx='4'
        fill='rgba(255,255,255,0.05)'
        stroke='rgba(255,255,255,0.15)'
        strokeWidth={1}
      />
      <text
        x='140'
        y='144'
        fill='rgba(255,255,255,0.7)'
        fontFamily='monospace'
        fontSize={9}
        textAnchor='middle'>
        ADYEN GATEWAY
      </text>
      <line
        x1='140'
        y1='158'
        x2='140'
        y2='180'
        stroke='rgba(255,255,255,0.15)'
        strokeWidth={1}
      />
      <polygon points='136,176 140,184 144,176' fill='rgba(255,255,255,0.2)' />
      <rect
        x='60'
        y='184'
        width='80'
        height='28'
        rx='4'
        fill='rgba(255,255,255,0.03)'
        stroke='rgba(255,255,255,0.1)'
        strokeWidth={1}
      />
      <text
        x='100'
        y='202'
        fill='rgba(255,255,255,0.4)'
        fontFamily='monospace'
        fontSize={8}
        textAnchor='middle'>
        POS Terminal
      </text>
      <rect
        x='160'
        y='184'
        width='70'
        height='28'
        rx='4'
        fill='rgba(74,222,128,0.08)'
        stroke='rgba(74,222,128,0.25)'
        strokeWidth={1}
      />
      <text
        x='195'
        y='202'
        fill='#4ade80'
        fontFamily='monospace'
        fontSize={8}
        textAnchor='middle'>
        ✓ Settled
      </text>
    </svg>
  );
}

function PhoneMockup() {
  return (
    <svg
      viewBox='0 0 200 360'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='w-full max-w-[180px]'>
      <rect
        x='10'
        y='5'
        width='180'
        height='350'
        rx='24'
        fill='#111'
        stroke='rgba(255,255,255,0.1)'
        strokeWidth={1.5}
      />
      <rect x='22' y='18' width='156' height='324' rx='16' fill='#0a0a0a' />
      <rect x='75' y='22' width='50' height='10' rx='5' fill='#1a1a1a' />
      <rect x='22' y='40' width='156' height='50' fill='#141414' />
      <text
        x='36'
        y='60'
        fill='rgba(232,255,71,0.9)'
        fontFamily='sans-serif'
        fontSize={11}
        fontWeight={600}>
        Dinetap
      </text>
      <text
        x='36'
        y='76'
        fill='rgba(255,255,255,0.3)'
        fontFamily='sans-serif'
        fontSize={8}>
        Good evening, Sivantha
      </text>
      <rect x='30' y='96' width='140' height='24' rx='12' fill='#1a1a1a' />
      <text
        x='45'
        y='112'
        fill='rgba(255,255,255,0.2)'
        fontFamily='sans-serif'
        fontSize={8}>
        Search restaurants...
      </text>
      <rect x='30' y='130' width='65' height='80' rx='8' fill='#1a1a1a' />
      <rect x='30' y='130' width='65' height='45' rx='8' fill='#222' />
      <text
        x='37'
        y='188'
        fill='rgba(255,255,255,0.7)'
        fontFamily='sans-serif'
        fontSize={7}
        fontWeight={600}>
        Sushi Bar
      </text>
      <text
        x='37'
        y='200'
        fill='rgba(232,255,71,0.6)'
        fontFamily='sans-serif'
        fontSize={6}>
        ★ 4.8
      </text>
      <rect x='105' y='130' width='65' height='80' rx='8' fill='#1a1a1a' />
      <rect x='105' y='130' width='65' height='45' rx='8' fill='#1e1e1e' />
      <text
        x='112'
        y='188'
        fill='rgba(255,255,255,0.7)'
        fontFamily='sans-serif'
        fontSize={7}
        fontWeight={600}>
        Burger Co.
      </text>
      <text
        x='112'
        y='200'
        fill='rgba(232,255,71,0.6)'
        fontFamily='sans-serif'
        fontSize={6}>
        ★ 4.5
      </text>
      <rect x='22' y='300' width='156' height='42' fill='#111' />
      <text
        x='48'
        y='326'
        fill='rgba(232,255,71,0.8)'
        fontFamily='sans-serif'
        fontSize={16}
        textAnchor='middle'>
        ⌂
      </text>
      <text
        x='100'
        y='326'
        fill='rgba(255,255,255,0.3)'
        fontFamily='sans-serif'
        fontSize={14}
        textAnchor='middle'>
        🔍
      </text>
      <text
        x='152'
        y='326'
        fill='rgba(255,255,255,0.3)'
        fontFamily='sans-serif'
        fontSize={14}
        textAnchor='middle'>
        ♡
      </text>
    </svg>
  );
}

function CiCdDiagram() {
  return (
    <svg
      viewBox='0 0 300 200'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='w-full max-w-[300px]'>
      <defs>
        <marker
          id='arrow'
          markerWidth={6}
          markerHeight={6}
          refX={3}
          refY={3}
          orient='auto'>
          <path d='M0,0 L0,6 L6,3 z' fill='rgba(232,255,71,0.5)' />
        </marker>
      </defs>
      <rect
        x='10'
        y='80'
        width='52'
        height='40'
        rx='4'
        fill='rgba(232,255,71,0.08)'
        stroke='rgba(232,255,71,0.3)'
        strokeWidth={1}
      />
      <text
        x='36'
        y='98'
        fill='rgba(232,255,71,0.8)'
        fontFamily='monospace'
        fontSize={7}
        textAnchor='middle'>
        git
      </text>
      <text
        x='36'
        y='110'
        fill='rgba(232,255,71,0.8)'
        fontFamily='monospace'
        fontSize={7}
        textAnchor='middle'>
        push
      </text>
      <line
        x1='62'
        y1='100'
        x2='74'
        y2='100'
        stroke='rgba(232,255,71,0.4)'
        strokeWidth={1}
        markerEnd='url(#arrow)'
      />
      <rect
        x='74'
        y='80'
        width='52'
        height='40'
        rx='4'
        fill='rgba(255,255,255,0.04)'
        stroke='rgba(255,255,255,0.1)'
        strokeWidth={1}
      />
      <text
        x='100'
        y='98'
        fill='rgba(255,255,255,0.5)'
        fontFamily='monospace'
        fontSize={7}
        textAnchor='middle'>
        build
      </text>
      <text
        x='100'
        y='110'
        fill='rgba(255,255,255,0.5)'
        fontFamily='monospace'
        fontSize={7}
        textAnchor='middle'>
        {'& lint'}
      </text>
      <line
        x1='126'
        y1='100'
        x2='138'
        y2='100'
        stroke='rgba(232,255,71,0.4)'
        strokeWidth={1}
        markerEnd='url(#arrow)'
      />
      <rect
        x='138'
        y='80'
        width='52'
        height='40'
        rx='4'
        fill='rgba(255,255,255,0.04)'
        stroke='rgba(255,255,255,0.1)'
        strokeWidth={1}
      />
      <text
        x='164'
        y='98'
        fill='rgba(255,255,255,0.5)'
        fontFamily='monospace'
        fontSize={7}
        textAnchor='middle'>
        sonar
      </text>
      <text
        x='164'
        y='110'
        fill='rgba(255,255,255,0.5)'
        fontFamily='monospace'
        fontSize={7}
        textAnchor='middle'>
        + test
      </text>
      <line
        x1='190'
        y1='100'
        x2='202'
        y2='100'
        stroke='rgba(232,255,71,0.4)'
        strokeWidth={1}
        markerEnd='url(#arrow)'
      />
      <rect
        x='202'
        y='80'
        width='88'
        height='40'
        rx='4'
        fill='rgba(74,222,128,0.08)'
        stroke='rgba(74,222,128,0.3)'
        strokeWidth={1}
      />
      <text
        x='246'
        y='96'
        fill='#4ade80'
        fontFamily='monospace'
        fontSize={7}
        textAnchor='middle'>
        ✓ deployed
      </text>
      <text
        x='246'
        y='108'
        fill='rgba(74,222,128,0.6)'
        fontFamily='monospace'
        fontSize={6}
        textAnchor='middle'>
        ECS / Expo EAS
      </text>
      <rect
        x='74'
        y='135'
        width='116'
        height='24'
        rx='3'
        fill='rgba(232,255,71,0.05)'
        stroke='rgba(232,255,71,0.15)'
        strokeWidth={1}
        strokeDasharray='3,2'
      />
      <text
        x='132'
        y='150'
        fill='rgba(232,255,71,0.4)'
        fontFamily='monospace'
        fontSize={7}
        textAnchor='middle'>
        AI code review layer
      </text>
      <line
        x1='100'
        y1='120'
        x2='100'
        y2='135'
        stroke='rgba(232,255,71,0.15)'
        strokeWidth={1}
      />
      <line
        x1='164'
        y1='120'
        x2='164'
        y2='135'
        stroke='rgba(232,255,71,0.15)'
        strokeWidth={1}
      />
      <text
        x='246'
        y='148'
        fill='rgba(255,107,53,0.4)'
        fontFamily='monospace'
        fontSize={6.5}
        textAnchor='middle'>
        ↳ Sentry monitoring
      </text>
    </svg>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function SectionLabel({ label }: { label: string }) {
  return (
    <div className='flex items-center justify-center md:justify-start gap-4 font-mono text-[0.72rem] tracking-[0.2em] uppercase text-muted-foreground mb-4'>
      <span className='w-8 h-px bg-primary shrink-0' />
      {label}
    </div>
  );
}

function FlagshipImage({ webp, title }: { webp: string; title: string }) {
  const [src, setSrc] = useState(webp);

  const handleLoad = () => {
    if (src !== webp) return; // already on SVG
    const svg = webp.replace('.webp', '.svg');
    const img = new window.Image();
    img.src = svg;
    img.onload = () => setSrc(svg);
  };

  return (
    <Image
      src={src}
      alt={title}
      width={600}
      height={400}
      className='w-full h-full max-h-[420px] object-cover transition-opacity duration-300'
      onLoad={handleLoad}
    />
  );
}

function ProjectVisual({
  num,
  image,
  title,
}: {
  num: string;
  image: string | null;
  title: string;
}) {
  if (num === '01') {
    return image ? (
      <FlagshipImage webp={image} title={title} />
    ) : (
      <AwsArchDiagram />
    );
  }
  if (num === '04') {
    return image ? (
      <FlagshipImage webp={image} title={title} />
    ) : (
      <CiCdDiagram />
    );
  }
  if (num === '02') {
    return image ? (
      <FlagshipImage webp={image} title={title} />
    ) : (
      <PaymentsDiagram />
    );
  }
  if (num === '03') {
    return image ? (
      <FlagshipImage webp={image} title={title} />
    ) : (
      <PhoneMockup />
    );
  }
  return null;
}

// ─── Page ────────────────────────────────────────────────────────────────────

const roundUp5 = (n: number) => Math.ceil(n / 5) * 5;

const GRID_INITIAL = 6;

export default function Portfolio() {
  const yearsExp = dayjs().diff(dayjs(about.experience.start), 'year');
  const [showAllProjects, setShowAllProjects] = useState(false);
  const visibleProjects = showAllProjects
    ? gridProjects
    : gridProjects.slice(0, GRID_INITIAL);

  const { data: articles } = useQuery({
    queryKey: ['articles'],
    queryFn: () =>
      fetch('https://dev.to/api/articles?username=sivantha96').then(
        (r) => r.json() as Promise<Article[]>,
      ),
  });

  // Scroll-triggered fade-in
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal');
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.opacity = '1';
            (e.target as HTMLElement).style.transform = 'translateY(0)';
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.05 },
    );
    els.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div className='min-h-screen bg-background text-foreground'>
      {/* Radial glow: top-left */}
      <div
        aria-hidden='true'
        className='fixed pointer-events-none'
        style={{
          top: '-120px',
          left: '-80px',
          width: '600px',
          height: '600px',
          background:
            'radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 70%)',
          zIndex: 0,
        }}
      />
      <AppHeader />

      <main>
        {/* ── HERO ────────────────────────────────────────────── */}
        <section className='relative bg-grid grid grid-cols-1 md:grid-cols-2 items-center min-h-screen px-6 md:px-16 pt-28 pb-24 gap-16 md:gap-20'>
          {/* Grid fade: dissolves into background color toward the bottom */}
          <div
            aria-hidden='true'
            className='absolute inset-0 pointer-events-none z-0'
            style={{
              background:
                'linear-gradient(to bottom, transparent 40%, hsl(var(--background)) 100%)',
            }}
          />
          {/* Left: text */}
          <div className='relative z-10 text-center md:text-left'>
            <div className='fade-up fade-up-1 inline-flex items-center gap-2 font-mono text-[0.68rem] tracking-[0.12em] uppercase text-green-700 bg-green-500/10 border border-green-400/50 px-3 py-1.5 w-fit mb-8 mx-auto md:mx-0'>
              <span className='status-dot w-1.5 h-1.5 rounded-full bg-green-600 shrink-0' />
              Open to senior roles · Remote
            </div>

            <p className='fade-up fade-up-1 font-mono text-[0.78rem] tracking-[0.2em] uppercase text-muted-foreground mb-7'>
              <span className='block sm:inline'>{contact.name}</span>
              <span className='hidden sm:inline'> · </span>
              <span className='block sm:inline'>{contact.designation}</span>
            </p>

            <h1 className='fade-up fade-up-2 hero-title font-serif mb-8'>
              I build teams
              <br />
              that build
              <br />
              <em className='italic text-primary'>systems</em> that scale.
            </h1>

            <p className='fade-up fade-up-3 text-muted-foreground text-[1.05rem] leading-[1.85] max-w-xl mb-10 mx-auto md:mx-0'>
              {about.main}
            </p>

            <div className='fade-up fade-up-4 flex gap-4 items-center flex-wrap justify-center md:justify-start'>
              <a
                href='#projects'
                className='font-mono text-[0.78rem] tracking-[0.1em] uppercase px-8 py-3.5 bg-primary text-primary-foreground hover:bg-primary/90 transition-all'>
                View Work
              </a>
              <a
                href='#contact'
                className='font-mono text-[0.78rem] tracking-[0.1em] uppercase px-8 py-3.5 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all'>
                Get in Touch
              </a>
            </div>
          </div>

          {/* Right: stats block */}
          <div className='relative z-10 fade-up fade-up-3 flex justify-center md:justify-end'>
            <div className='grid grid-cols-2 gap-px bg-border border border-border w-full max-w-[380px]'>
              <div className='relative overflow-hidden bg-background p-8 group'>
                <span className='absolute bottom-0 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300' />
                <div className='font-serif text-[3rem] leading-none mb-2'>
                  3<span className='text-primary'>+</span>
                </div>
                <div className='font-mono text-[0.65rem] tracking-[0.15em] uppercase text-muted-foreground'>
                  Years Leading Teams
                </div>
              </div>
              <div className='relative overflow-hidden bg-background p-8 group'>
                <span className='absolute bottom-0 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300' />
                <div className='font-serif text-[3rem] leading-none mb-2'>
                  49<span className='text-primary'>%</span>
                </div>
                <div className='font-mono text-[0.65rem] tracking-[0.15em] uppercase text-muted-foreground'>
                  Infra Cost Reduction
                </div>
              </div>
              <div className='relative overflow-hidden bg-background p-8 group'>
                <span className='absolute bottom-0 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300' />
                <div
                  className='font-serif leading-none mb-2'
                  style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)' }}>
                  SGD
                  <br />
                  13.5M
                </div>
                <div className='font-mono text-[0.65rem] tracking-[0.15em] uppercase text-muted-foreground'>
                  Monthly Payment Volume
                </div>
              </div>
              <div className='relative overflow-hidden bg-background p-8 group'>
                <span className='absolute bottom-0 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300' />
                <div
                  className='font-serif leading-none mb-2'
                  style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)' }}>
                  100K<span className='text-primary'>+</span>
                </div>
                <div className='font-mono text-[0.65rem] tracking-[0.15em] uppercase text-muted-foreground'>
                  App Downloads
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── IMPACT BANNER ───────────────────────────────────── */}
        <div className='reveal border-t border-b border-border bg-secondary grid grid-cols-2 md:grid-cols-4'>
          {[
            {
              big: `${roundUp5(yearsExp)}+`,
              desc: 'Years of experience building and leading engineering teams',
            },
            {
              big: `${roundUp5(projectsData.length)}+`,
              desc: 'Projects delivered across organizations, from startups to enterprise',
            },
            {
              big: `${roundUp5(uniqueClients.length)}+`,
              desc: 'Client partnerships across Sri Lanka, Australia, USA, Singapore, Indonesia, and Nepal',
            },
            {
              big: '30+',
              desc: 'Open source contributions on GitHub',
            },
          ].map(({ big, desc }, i) => (
            <div
              key={i}
              className='px-8 py-10 border-r border-border last:border-r-0 [&:nth-child(2)]:border-r-0 md:[&:nth-child(2)]:border-r text-center md:text-left'>
              <div className='font-serif text-[2.6rem] text-primary leading-none mb-2'>
                {big}
              </div>
              <p className='text-[0.8rem] text-muted-foreground leading-[1.55]'>
                {desc}
              </p>
            </div>
          ))}
        </div>

        {/* ── 01 PROJECTS ─────────────────────────────────────── */}
        <section id='projects' className='px-6 md:px-16 py-32'>
          <div className='mb-16'>
            <SectionLabel label='01 · Projects' />
            <h2 className='section-title font-serif text-center md:text-left'>
              Flagship Work
            </h2>
          </div>

          {/* Featured 2-col split grid */}
          <div className='border-t border-b border-border'>
            {flagshipProjects.map((p, i) => (
              <div
                key={p.num}
                className='reveal grid grid-cols-1 md:grid-cols-2 border-b border-border last:border-b-0 transition-colors hover:bg-secondary/40'>
                {/* Info */}
                <div
                  className={`p-10 md:p-12 flex flex-col justify-between gap-8 ${
                    i % 2 === 1 ? 'md:order-last' : ''
                  }`}>
                  <div>
                    <div className='font-mono text-[0.68rem] tracking-[0.2em] uppercase text-primary mb-5 flex items-center gap-2'>
                      <span className='w-1.5 h-1.5 rounded-full bg-primary shrink-0' />
                      {p.category}
                    </div>
                    <h3
                      className='font-serif font-normal leading-tight mb-5'
                      style={{ fontSize: 'clamp(1.5rem,4vw,2.2rem)' }}>
                      {p.title}
                    </h3>
                    <p className='text-muted-foreground text-[0.87rem] leading-[1.8] mb-7'>
                      {p.description}
                    </p>
                    <div className='flex gap-8 flex-wrap'>
                      {p.metrics.map((m) => (
                        <div key={m.label}>
                          <div className='font-mono text-base font-medium text-primary mb-0.5'>
                            {m.val}
                          </div>
                          <div className='font-mono text-[0.63rem] uppercase tracking-[0.1em] text-muted-foreground'>
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className='flex gap-1.5 flex-wrap'>
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className='font-mono text-[0.63rem] tracking-[0.08em] uppercase px-2.5 py-1 border border-border text-muted-foreground hover:border-foreground hover:text-foreground transition-colors cursor-default'>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Visual */}
                <div
                  className={`${
                    i % 2 === 1 ? 'md:order-first' : ''
                  } flex items-center justify-center min-h-[300px] max-h-[420px] overflow-hidden`}>
                  <ProjectVisual num={p.num} image={p.image} title={p.title} />
                </div>
              </div>
            ))}
          </div>

          {/* More projects: 3-col card grid */}
          <div className='font-mono text-[0.72rem] tracking-[0.2em] uppercase text-muted-foreground mt-20 mb-4 text-center md:text-left'>
            More Projects
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border'>
            {visibleProjects.map((p, i, arr) => {
              const cols = 3;
              const remainder = arr.length % cols;
              const isInLastRow =
                i >= arr.length - (remainder === 0 ? cols : remainder);
              const lastRowCount = remainder === 0 ? cols : remainder;
              const posInLastRow = i - (arr.length - lastRowCount);
              const center = lastRowCount === 1 && isInLastRow;
              const spanTwo =
                lastRowCount === 2 && isInLastRow && posInLastRow === 0;
              const isNew = showAllProjects && i >= GRID_INITIAL;
              return (
                <div
                  key={p.title}
                  className={`reveal relative overflow-hidden bg-background p-8 hover:bg-secondary transition-colors group cursor-default${center ? ' lg:w-1/3 lg:mx-auto' : ''}`}
                  style={{
                    ...(center
                      ? { gridColumn: '1 / -1' }
                      : spanTwo
                        ? { gridColumn: 'span 2' }
                        : {}),
                    ...(isNew
                      ? {
                          animation: 'fadeUp 0.45s ease forwards',
                          animationDelay: `${(i - GRID_INITIAL) * 0.055}s`,
                          opacity: 0,
                        }
                      : {}),
                  }}>
                  <span className='absolute left-0 top-0 bottom-0 w-0.5 bg-primary origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300' />
                  <div className='font-mono text-[0.65rem] tracking-[0.15em] uppercase text-muted-foreground mb-3'>
                    {p.meta}
                  </div>
                  <div className='font-serif text-xl font-normal mb-3 leading-tight'>
                    {p.title}
                  </div>
                  <p className='text-[0.82rem] text-muted-foreground leading-[1.65]'>
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {!showAllProjects && gridProjects.length > GRID_INITIAL && (
            <div className='mt-px flex justify-center'>
              <button
                type='button'
                onClick={() => setShowAllProjects(true)}
                className='inline-flex items-center gap-2 font-mono text-[0.78rem] tracking-[0.1em] uppercase px-8 py-3.5 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all mt-10'>
                Show All Projects
                <span className='inline-block'>↓</span>
              </button>
            </div>
          )}
        </section>

        {/* ── 02 EXPERIENCE ───────────────────────────────────── */}
        <section id='experience' className='px-6 md:px-16 py-32 bg-secondary'>
          <div className='mb-20'>
            <SectionLabel label='02 · Experience' />
            <h2 className='section-title font-serif text-center md:text-left'>
              Journey
            </h2>
          </div>

          <div className='relative border-l border-border pl-6 md:pl-10'>
            {experience.map((company, ci) => (
              <div
                key={company.company}
                className='reveal mb-16 last:mb-0 relative'>
                <span
                  className={`absolute -left-[29px] md:-left-[45px] top-1 w-2.5 h-2.5 rounded-full border-2 bg-background${ci === 0 ? ' timeline-dot-pulse' : ''}`}
                  style={{ borderColor: 'hsl(var(--primary))' }}
                />
                <div className='font-mono text-[0.68rem] tracking-[0.15em] uppercase text-primary mb-1'>
                  {company.company}
                  {company.companyNote
                    ? ` (${company.companyNote})`
                    : ''} · {company.location}
                </div>
                {company.roles.map((role) => (
                  <div key={role.title} className='mb-8 last:mb-0'>
                    <div className='font-serif text-2xl font-normal mb-1'>
                      {role.title}
                    </div>
                    <div className='font-mono text-[0.65rem] text-muted-foreground tracking-[0.1em] mb-4'>
                      {role.period}
                    </div>
                    <ul className='space-y-2.5'>
                      {role.bullets.map((b, bi) => (
                        <li
                          key={bi}
                          className='text-[0.87rem] text-muted-foreground pl-5 relative leading-[1.7]'>
                          <span className='absolute left-0 text-primary text-xs top-px'>
                            →
                          </span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}

            {/* Education */}
            <div className='reveal mb-0 relative'>
              <span
                className='absolute -left-[29px] md:-left-[45px] top-1 w-2.5 h-2.5 rounded-full border-2 bg-background'
                style={{ borderColor: 'hsl(var(--primary))' }}
              />
              <div className='font-mono text-[0.68rem] tracking-[0.15em] uppercase text-primary mb-1'>
                University of Sri Jayewardenepura
              </div>
              <div className='font-serif text-2xl font-normal mb-1'>
                B.Sc. (Hons) Computer Science
              </div>
              <div className='font-mono text-[0.65rem] text-muted-foreground tracking-[0.1em]'>
                2016 – 2021 · Specialization: Computer Science, Mathematics
                &amp; Statistics
              </div>
            </div>
          </div>
        </section>

        {/* ── 03 SKILLS ───────────────────────────────────────── */}
        <section id='skills' className='px-6 md:px-16 py-32'>
          <div className='mb-20'>
            <SectionLabel label='03 · Skills' />
            <h2 className='section-title font-serif text-center md:text-left'>
              Stack &amp; Expertise
            </h2>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border'>
            {Object.entries(cvSkills).map(([group, skills]) => (
              <div key={group} className='reveal bg-background p-10'>
                <div className='font-mono text-[0.7rem] tracking-[0.2em] uppercase text-primary mb-5 pb-4 border-border'>
                  {group}
                </div>
                <ul className='space-y-2.5'>
                  {skills.map((skill) => (
                    <li
                      key={skill}
                      className='text-[0.85rem] text-muted-foreground flex items-center gap-2'>
                      <span className='w-1 h-1 rounded-full bg-primary shrink-0' />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── 04 WRITING ──────────────────────────────────────── */}
        <section id='articles' className='px-6 md:px-16 py-32 bg-secondary'>
          <div className='mb-16'>
            <SectionLabel label='04 · Writing' />
            <h2 className='section-title font-serif text-center md:text-left'>
              Articles
            </h2>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-px'>
            {articles?.slice(0, 6).map((article, i, arr) => {
              const isOdd = arr.length % 2 !== 0;
              const isLast = i === arr.length - 1;
              const center = isOdd && isLast;
              return (
                <a
                  key={article.id}
                  href={article.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={`reveal group block bg-background p-10 hover:bg-card transition-colors no-underline text-foreground${center ? ' sm:w-1/2 sm:mx-auto' : ''}`}
                  style={center ? { gridColumn: '1 / -1' } : undefined}>
                  <div className='font-mono text-[0.68rem] tracking-[0.1em] uppercase text-muted-foreground mb-4'>
                    {article.tag_list?.[0] ?? 'Article'}
                  </div>
                  <div className='font-serif text-[1.25rem] font-normal leading-[1.35] mb-3 group-hover:text-primary transition-colors'>
                    {article.title}
                  </div>
                  <p className='text-[0.82rem] text-muted-foreground leading-[1.65] mb-6'>
                    {article.description}
                  </p>
                  <span className='inline-flex items-center gap-1.5 font-mono text-[0.68rem] tracking-[0.12em] uppercase text-primary'>
                    Read on dev.to
                    <span className='group-hover:translate-x-1 transition-transform inline-block'>
                      →
                    </span>
                  </span>
                </a>
              );
            })}
          </div>

          <div className='mt-px flex justify-center'>
            <a
              href={contact.social.dev}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-2 font-mono text-[0.78rem] tracking-[0.1em] uppercase px-8 py-3.5 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all mt-10'>
              More on dev.to
              <span className='inline-block'>→</span>
            </a>
          </div>
        </section>
      </main>

      {/* ── 05 CONTACT ──────────────────────────────────────────── */}
      <div
        id='contact'
        className='px-6 md:px-16 py-32 bg-secondary dark:bg-[#0A0A0A]'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start'>
          {/* Left: heading + description + button */}
          <div className='text-center md:text-left'>
            <div className='flex items-center justify-center md:justify-start gap-4 font-mono text-[0.72rem] tracking-[0.2em] uppercase mb-6 text-muted-foreground'>
              <span className='w-8 h-px shrink-0 bg-primary/40' />
              05 · Contact
            </div>

            <h2 className='section-title font-serif text-center md:text-left mb-6 text-foreground'>
              Get in Touch
            </h2>

            <p className='text-lg leading-[1.85] mb-10 text-muted-foreground'>
              Open to Senior Engineering Lead and Staff Engineer roles.
              Currently based in Sri Lanka, open to working remotely across
              timezones.
            </p>

            <ContactDialog
              triggerLabel='SEND A MESSAGE'
              triggerClassName='font-mono text-[0.78rem] tracking-[0.1em] uppercase px-8 py-3.5 transition-all hover:opacity-80 bg-primary text-primary-foreground mx-auto md:mx-0 block w-fit'
            />
          </div>

          {/* Right: contact links */}
          <div className='border-t border-border'>
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={
                  link.href.startsWith('http')
                    ? 'noopener noreferrer'
                    : undefined
                }
                className='flex items-center gap-4 md:gap-8 py-5 text-sm no-underline border-b border-border text-muted-foreground hover:text-primary transition-colors'>
                <span className='font-mono text-[0.63rem] tracking-[0.15em] uppercase w-20 shrink-0 text-muted-foreground/50'>
                  {link.label}
                </span>
                {link.value}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <footer className='px-6 md:px-16 py-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-2 bg-background'>
        <p className='font-mono text-[0.65rem] text-muted-foreground tracking-[0.08em] text-center sm:text-left'>
          © {dayjs().year()} {contact.name} · {contact.designation}
        </p>
        <p className='font-mono text-[0.65rem] text-muted-foreground tracking-[0.08em] text-center sm:text-right'>
          {contact.city}, {contact.country} · Open to Remote
        </p>
      </footer>

      <StructuredData />
    </div>
  );
}
