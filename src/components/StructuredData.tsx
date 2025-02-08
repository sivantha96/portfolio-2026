import { about, contact } from '@/assets/content';
import type { Person, WithContext } from 'schema-dts';

export const StructuredData = () => {
  const personData: WithContext<Person> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: contact.name,
    jobTitle: contact.designation,
    url: contact.social.website,
    sameAs: [
      contact.social.website,
      contact.social.github,
      contact.social.linkedin,
      contact.social.dev,
    ],
    image: `${contact.social.website}/profile.png`,
    description: about.meta,
    knowsAbout: [
      'Web Development',
      'Full Stack Development',
      'Full Stack Engineering',
      'Development',
      'Engineering',
      'React',
      'React Native',
      'Node.js',
      'JavaScript',
      'TypeScript',
      'AWS',
    ],
  };

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personData) }}
    />
  );
};
