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
          'Lead an engineering team of 8 across 5+ concurrent product streams — conducting regular 1:1s, annual performance reviews, growth planning, and onboarding for all new engineers joining the organisation.',
          'Established a company-wide engineering culture of continuous learning: introduced structured knowledge-sharing sessions, encouraged adoption of new tools and trends, and embedded these practices into team rituals and hiring criteria.',
          'Conducted technical interviews and led the hiring process for multiple engineering roles; designed onboarding programmes with structured growth plans and knowledge transfer tracks for each new hire.',
          'Owned the full AWS cloud architecture using CDK — ECS Fargate microservices, RDS/Aurora, VPC, API Gateway, SQS, Lambda, WAF, EventBridge, Secrets Manager, and CloudWatch — reducing infrastructure costs by over 49%.',
          'Drove the migration from a monolithic EC2 system to a serverless ECS Fargate microservices architecture — eliminating platform-wide outages caused by database deadlocks and resource exhaustion, achieving near-100% uptime with failures isolated to individual services.',
          'Architected and led delivery of the Dinetap App (React Native Expo, team of 6) — flagship consumer product for restaurant discovery, table booking, ordering, and payments.',
          'Defined and shipped the EatMe Admin Panel (Next.js, team of 4) — centralised operations dashboard covering all Dinetap restaurants, user permissions, and real-time analytics.',
          'Built an engineering quality programme that cut release cycle time significantly: GitHub Actions CI/CD with automated AI code review, security scanning, and one-click deployment across all web, API, mobile, and microservice repositories.',
          'Partnered with product and business stakeholders to translate ambiguous goals into sequenced engineering plans, communicating trade-offs and managing delivery expectations across concurrent workstreams.',
        ],
      },
      {
        title: 'Software Engineer',
        period: 'Jun 2022 – Jul 2025',
        bullets: [
          'Architected and led delivery of EatMe POS (React Native, team of 6) — an offline-first, cloud-synced point-of-sale system with multi-device conflict resolution and zero-downtime deployment.',
          'Architected and led delivery of EatMe BackOffice (React + Vite, team of 5) — restaurant operations portal covering inventory, staff management, financial reporting, and analytics dashboards.',
          'Owned technical decision-making across EatMe Consumer Web, Merchant App, and Kiosk — defining system architecture, API contracts, and data models for each platform end-to-end.',
          'Owned and delivered Adyen and Stripe payment integrations with physical terminal support (team of 7); currently architecting Airwallex. Payment platforms now process over SGD 13.5M per month.',
          'Defined the foundational engineering conventions adopted across the whole organisation — branching strategy, code review standards, deployment workflows, and incident response practices.',
          'Conducted knowledge transfer and mentoring sessions across the engineering team; initiated and led internal tech talks on React, mobile architecture, and cloud patterns.',
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
        period: 'May 2020 – Mid 2022',
        bullets: [
          "Designed and built BaseNeo — a MEAN stack ERP framework from scratch, directing a small team of engineers; the platform now underpins 20+ production applications across the company's portfolio.",
          'Served as tech lead across ArchivEL (document management with OCR and workflow automation), CredenEL (SSO/MFA/RBAC identity platform), LOLC Customer Portal (25K+ downloads on mobile), and Kelzey CMS — owning architecture, delivery, and direct client engagement on each.',
          'Conducted knowledge transfer sessions and hands-on mentoring for engineers on the team; managed full project lifecycles across multiple simultaneous client engagements.',
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
          "Contributed to XLife (React Native), XL Axiata Indonesia's employee super-app, within a cross-functional international team; ran knowledge transfer sessions on React concepts that upskilled junior engineers.",
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
