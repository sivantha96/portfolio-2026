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
          "Own the full engineering architecture of Dinetap's platform. Designed and provisioned the entire AWS infrastructure from scratch using CDK, including ECS Fargate microservices, VPC networking, RDS/Aurora, API Gateway, SQS event queues, Lambda functions, WAF, and CloudWatch observability.",
          'Led the strategic migration from a monolithic architecture to microservices. Planned the decomposition, established service boundaries, and guided the team through a zero-downtime cutover.',
          'Led end-to-end architecture and delivery of the Dinetap App (React Native Expo). The flagship consumer product defining technical direction, reviewing code, unblocking the team, and coordinating releases.',
          'Led end-to-end architecture and delivery of Dinetap BackOffice (React + Vite) and Dinetap Admin Panel (Next.js). Two high-complexity internal platforms serving restaurant operators and Dinetap administrators.',
          'Led end-to-end architecture and delivery of Dinetap POS (React Native). An offline-first, cloud-synced point-of-sale system requiring careful resilience and conflict-resolution design.',
          'Established the engineering quality baseline for the entire organisation: set up GitHub Actions CI/CD across all repositories, Sentry for error tracking, SonarQube for quality gates, Playwright/Cypress/Maestro/Jest for test coverage, and Mixpanel for product analytics.',
          'Partnered with product and business stakeholders to scope, sequence, and communicate technical trade-offs, translating ambiguous product goals into actionable engineering plans.',
        ],
      },
      {
        title: 'Software Engineer',
        period: 'Jun 2022 – Jul 2025',
        bullets: [
          'Delivered Dinetap Consumer Web, Merchant App, and Kiosk as sole full-stack engineer on each. End-to-end from database schema through API design to frontend UX.',
          "Designed and implemented Stripe payment integration with physical terminal support; built a WooCommerce PHP payment plugin; led Adyen integration as the platform's payment footprint expanded.",
          'Established early engineering conventions (branching strategy, code review process, deployment workflows) that became the foundation for later team scaling.',
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
        period: 'May 2020 – Feb 2021',
        bullets: [
          "Designed and built BaseNeo. A MEAN stack ERP application framework from scratch that became the company's core product platform, now underpinning 20+ live production applications.",
          'Led the architecture and full-stack delivery of ArchivEL (document management with OCR, versioning, and workflow automation) and CredenEL (SSO, MFA, RBAC identity platform). Both integrated into the BaseNeo ecosystem.',
          'Served as tech lead on LOLC Customer Portal, Kelzey CMS, and Janashakthi Protech. Coordinating frontend and backend delivery, setting technical standards, and engaging directly with clients.',
          'Delivered multiple React Native applications as the sole mobile engineer: Janashakthi InsureConnect, e-Assessor (offline-first), Janashakthi Life, and a facial recognition–based kiosk greeting system.',
          'Managed full project lifecycle across multiple simultaneous engagements - scoping, architecture, delivery, and client handover.',
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
          "Worked as a React Native engineer on XLife - XL Axiata Indonesia's employee super-app. contributing features within a cross-functional international team; conducted knowledge transfer sessions on React concepts for team members.",
          'Built Writer Watch / ReaderScout as sole developer. A React Chrome extension for real-time Amazon book performance monitoring, delivered independently from scoping to release.',
        ],
      },
      {
        title: 'Software Engineering Intern',
        period: 'Jul 2020 – Jan 2021',
        bullets: [
          'Built Angular SPAs across three enterprise client platforms: Ncell Gifting Platform, Ncell Payment Gateway, and Genie Admin Portal (Dialog Axiata). Engaged directly with foreign clients and operated across multiple simultaneous project streams.',
        ],
      },
    ],
  },
];
