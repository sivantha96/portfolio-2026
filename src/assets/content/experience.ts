export interface Role {
  title: string;
  period: string;
  bullets: string[];
}

export interface Company {
  company: string;
  companyNote?: string;
  location: string;
  roles: Role[];
}

export const experience: Company[] = [
  {
    company: 'Dinetap',
    companyNote: 'formerly EatMe',
    location: 'Singapore · Remote',
    roles: [
      {
        title: 'Senior Software Engineer',
        period: 'Jul 2025 – Present',
        bullets: [
          'Led an engineering team of 8 across 5+ concurrent product streams — running regular 1:1s, annual performance reviews, and structured growth planning for every engineer in the organization.',
          'Built a company-wide culture of continuous learning and drove all engineering hiring: introduced knowledge-sharing sessions, embedded tracking of new tools and trends into team rituals, and designed structured onboarding programs with growth plans and knowledge transfer tracks for each new hire.',
          'Owned the full AWS cloud architecture using CDK — ECS Fargate, RDS/Aurora, VPC, API Gateway, SQS, Lambda, WAF, EventBridge, and CloudWatch — reducing monthly infrastructure costs by over 49% through a serverless architecture with auto-scaling services and databases.',
          'Drove the migration from a monolithic EC2 system to ECS Fargate microservices — eliminating platform-wide outages caused by database deadlocks and resource exhaustion, and achieving near-100% uptime with failures contained to individual services.',
          'Architected and led delivery of the Dinetap App (React Native Expo, team of 6) and EatMe Admin Panel (Next.js, team of 4) — flagship consumer dining app and the centralized operations dashboard for all Dinetap restaurants.',
          'Established an engineering quality program that eliminated manual release steps and enabled daily automated deployments: GitHub Actions CI/CD with AI code review, security scanning, and one-click deployment across all web, API, mobile, and microservice repositories.',
          'Partnered with product and business stakeholders to translate ambiguous goals into sequenced engineering plans, communicating trade-offs and managing delivery expectations across concurrent work streams.',
        ],
      },
      {
        title: 'Software Engineer',
        period: 'Jun 2022 – Jul 2025',
        bullets: [
          'Architected and led delivery of EatMe POS (React Native, team of 6) — an offline-first, cloud-synced point-of-sale system with multi-device conflict resolution and zero-downtime deployment.',
          'Designed and shipped EatMe BackOffice (React + Vite, team of 5) — restaurant operations portal covering inventory, staff management, financial reporting, and analytics dashboards.',
          'Drove technical decision-making across EatMe Consumer Web, Merchant App, and Kiosk — setting system architecture, API contracts, and data models for each platform end-to-end.',
          'Delivered Adyen and Stripe payment integrations with physical terminal support (team of 7), built a WooCommerce PHP payment plugin, and is currently leading the Airwallex integration — a payments platform now processing over SGD 13.5M per month.',
          'Established the foundational engineering conventions adopted across the whole organization — branching strategy, code review standards, deployment workflows, and incident response practices — that became the scaffolding for all later team and process scaling.',
          'Ran knowledge transfer sessions and mentored engineers on technical and professional growth; initiated and led internal tech talks on React, mobile architecture, and cloud patterns.',
        ],
      },
    ],
  },
  {
    company: 'EchonLabs',
    location: 'Sri Lanka · Part-time',
    roles: [
      {
        title: 'Software Engineer',
        period: 'May 2020 – Jun 2022',
        bullets: [
          "Designed and built BaseNeo — a MEAN stack ERP framework from scratch, directing a small team of engineers; the platform now underpins 20+ production applications across the company's portfolio.",
          'Served as tech lead across ArchivEL (document management with OCR and workflow automation), CredenEL (SSO/MFA/RBAC identity platform), LOLC Customer Portal (20K+ downloads on mobile), and Kelzey CMS — owning architecture, delivery, and direct client engagement on each.',
          'Conducted knowledge transfer sessions and hands-on mentoring for engineers on the team; managed full project lifecycle across multiple simultaneous client engagements.',
        ],
      },
    ],
  },
  {
    company: 'Axiata Digital Labs',
    location: 'Sri Lanka',
    roles: [
      {
        title: 'Software Engineer',
        period: 'Feb 2021 – Jun 2022',
        bullets: [
          "Contributed to XLife (React Native), XL Axiata Indonesia's employee super-app, within a cross-functional international team; ran knowledge transfer sessions on React concepts that up-skilled junior engineers.",
          'Built and shipped Writer Watch / ReaderScout (React Chrome extension) as sole developer — scoped, designed, and delivered independently.',
        ],
      },
      {
        title: 'Software Engineering Intern',
        period: 'Jul 2020 – Jan 2021',
        bullets: [
          'Built Angular SPAs for Ncell Gifting Platform, Ncell Payment Gateway, and Genie Admin Portal (Dialog Axiata) — operating across three enterprise client projects simultaneously.',
        ],
      },
    ],
  },
];
