import { about, contact } from '@/assets/content';
import type { ItemList, Person, WebSite, WithContext } from 'schema-dts';

const BASE_URL = 'https://www.sivantha.com';

export const StructuredData = () => {
  const personSchema: WithContext<Person> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${BASE_URL}/#person`,
    name: contact.name,
    givenName: 'Sivantha',
    familyName: 'Paranavithana',
    jobTitle: contact.designation,
    url: BASE_URL,
    email: contact.email.personal,
    telephone: contact.phone.mobile,
    image: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/profile.png`,
      width: '400',
      height: '400',
    } as unknown as string,
    description: about.summary,
    sameAs: [
      BASE_URL,
      contact.social.github,
      contact.social.linkedin,
      contact.social.dev,
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: contact.city,
      addressCountry: 'LK',
    } as unknown as string,
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'University of Sri Jayewardenepura',
      url: 'https://www.sjp.ac.lk',
    } as unknown as string,
    worksFor: {
      '@type': 'Organization',
      name: 'Dinetap',
      url: 'https://www.dinetap.com',
    } as unknown as string,
    knowsAbout: [
      'Software Engineering',
      'Engineering Team Leadership',
      'Full Stack Development',
      'Cloud Architecture',
      'AWS',
      'AWS CDK',
      'ECS Fargate',
      'Microservices Architecture',
      'React',
      'React Native',
      'Node.js',
      'TypeScript',
      'JavaScript',
      'DevOps',
      'CI/CD',
      'Payment Systems',
      'Adyen',
      'Stripe',
    ] as unknown as string,
    hasOccupation: {
      '@type': 'Occupation',
      name: contact.designation,
      description: about.main,
      skills: about.leadership.join(', '),
      occupationLocation: { '@type': 'Country', name: 'Sri Lanka' },
    } as unknown as never,
  };

  const websiteSchema: WithContext<WebSite> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    url: BASE_URL,
    name: `${contact.name} | Portfolio`,
    description: about.meta,
    inLanguage: 'en-US',
    author: {
      '@type': 'Person',
      '@id': `${BASE_URL}/#person`,
    } as unknown as string,
  };

  const projectsSchema: WithContext<ItemList> = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Notable Projects by ${contact.name}`,
    description: `Key engineering projects designed, architected, and led by ${contact.name}`,
    itemListElement: about.notable.map((p, i) => ({
      '@type': 'ListItem' as const,
      position: i + 1,
      name: p.name,
      description: p.desc,
    })),
  };

  // ProfilePage: helps search engines and AI assistants understand this is a portfolio/profile
  const profilePageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${BASE_URL}/#profilepage`,
    url: BASE_URL,
    name: `${contact.name} | ${contact.designation}`,
    description: about.meta,
    inLanguage: 'en-US',
    dateModified: new Date().toISOString().split('T')[0],
    mainEntity: { '@id': `${BASE_URL}/#person` },
    author: { '@id': `${BASE_URL}/#person` },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      ],
    },
  };

  const schemas = [
    personSchema,
    websiteSchema,
    projectsSchema,
    profilePageSchema,
  ];

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
};
