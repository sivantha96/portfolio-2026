'use client';

import {
  about,
  contact,
  cvSkills,
  education,
  experience,
} from '@/assets/content';
import { forwardRef } from 'react';

const styles = `
  .cv-shell {
    font-family: var(--font-dm-sans), Arial, Helvetica, sans-serif;
    background: hsl(var(--muted));
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 20px 60px;
  }

  .cv-page {
    width: 100%;
    max-width: 920px;
    background: hsl(var(--background));
    display: grid;
    grid-template-columns: 236px 1fr;
    box-shadow: 0 6px 48px rgba(0,0,0,.10);
    border-radius: 14px;
    overflow: hidden;
  }

  .cv-sb {
    background: hsl(var(--primary));
    color: hsl(var(--primary-foreground));
    padding: 36px 20px 48px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .sb-name {
    font-family: var(--font-lora), Georgia, serif;
    font-size: 23px;
    font-weight: 600;
    line-height: 1.25;
    color: hsl(var(--primary-foreground));
  }
  .sb-title {
    font-size: 10px;
    font-weight: 500;
    letter-spacing: .09em;
    text-transform: uppercase;
    color: hsl(var(--primary-foreground) / 0.6);
    margin-top: 7px;
    line-height: 1.65;
  }

  .sb-divider { height: 1px; background: hsl(var(--primary-foreground) / 0.12); }

  .sb-label {
    font-size: 9px;
    font-weight: 600;
    letter-spacing: .18em;
    text-transform: uppercase;
    color: hsl(var(--primary-foreground) / 0.55);
    margin-bottom: 11px;
  }

  .ci {
    display: flex;
    align-items: flex-start;
    gap: 7px;
    font-size: 10.5px;
    color: hsl(var(--primary-foreground) / 0.85);
    margin-bottom: 7px;
    line-height: 1.45;
    word-break: break-all;
  }
  .ci svg { width: 12px; height: 12px; flex-shrink: 0; margin-top: 1px; opacity: .5; }

  .lc-list { display: flex; flex-direction: column; gap: 5px; }
  .lc-item {
    font-size: 11.5px;
    color: hsl(var(--primary-foreground) / 0.9);
    padding: 5px 10px;
    background: hsl(var(--primary-foreground) / 0.07);
    border-radius: 5px;
    line-height: 1.3;
  }

  .sg { margin-bottom: 13px; }
  .sg-title {
    font-size: 10px;
    font-weight: 500;
    color: hsl(var(--primary-foreground) / 0.55);
    margin-bottom: 6px;
  }
  .sg-tags { display: flex; flex-wrap: wrap; gap: 4px; }
  .sg-tag {
    font-size: 10.5px;
    background: hsl(var(--primary-foreground) / 0.09);
    color: hsl(var(--primary-foreground) / 0.85);
    border-radius: 4px;
    padding: 2px 7px;
    line-height: 1.5;
  }

  .cv-main {
    padding: 36px 38px 48px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    min-width: 0;
    background: hsl(var(--background));
  }

  .summary {
    font-size: 12.5px;
    line-height: 1.82;
    color: hsl(var(--muted-foreground));
    border-left: 3px solid hsl(var(--primary));
    padding-left: 14px;
  }

  .sh {
    font-size: 9px;
    font-weight: 600;
    letter-spacing: .18em;
    text-transform: uppercase;
    color: hsl(var(--muted-foreground));
    margin-bottom: 17px;
    padding-bottom: 6px;
    border-bottom: 1px solid hsl(var(--border));
  }

  .co-block { margin-bottom: 22px; }
  .co-block:last-child { margin-bottom: 0; }

  .co-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 11px;
  }
  .co-name { font-size: 13.5px; font-weight: 600; color: hsl(var(--foreground)); }
  .co-note { font-size: 11.5px; color: hsl(var(--muted-foreground)); font-weight: 400; margin-left: 5px; }
  .co-loc { font-size: 11px; color: hsl(var(--muted-foreground)); flex-shrink: 0; margin-left: 10px; }

  .roles { display: flex; flex-direction: column; gap: 14px; }

  .cv-role {
    padding-left: 13px;
    border-left: 2px solid hsl(var(--border));
  }
  .role-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 7px;
  }
  .role-title { font-size: 12.5px; font-weight: 500; color: hsl(var(--foreground)); }
  .role-period { font-size: 10.5px; color: hsl(var(--muted-foreground)); white-space: nowrap; flex-shrink: 0; margin-left: 10px; }

  .cv-blist { list-style: none; display: flex; flex-direction: column; gap: 4px; }
  .cv-blist li {
    font-size: 11.5px;
    color: hsl(var(--muted-foreground));
    line-height: 1.68;
    padding-left: 13px;
    position: relative;
  }
  .cv-blist li::before {
    content: '–';
    position: absolute;
    left: 0;
    color: hsl(var(--border));
    top: 0;
  }

  .edu-row { display: flex; justify-content: space-between; align-items: flex-start; }
  .edu-deg { font-size: 13px; font-weight: 500; color: hsl(var(--foreground)); }
  .edu-inst { font-size: 12px; color: hsl(var(--muted-foreground)); margin-top: 3px; }
  .edu-det { font-size: 11px; color: hsl(var(--muted-foreground)); margin-top: 2px; }
  .edu-yr { font-size: 11px; color: hsl(var(--muted-foreground)); white-space: nowrap; flex-shrink: 0; margin-left: 14px; margin-top: 2px; }

  @media print {
    .cv-shell { background: white; padding: 0; min-height: unset; }
    .cv-page {
      max-width: 100%;
      width: 100%;
      box-shadow: none;
      border-radius: 0;
      overflow: visible;
    }
    .cv-sb { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  }
`;

const ICONS = {
  pin: 'M8 1a4 4 0 014 4c0 3.5-4 9.5-4 9.5S4 8.5 4 5a4 4 0 014-4zm0 3.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z',
  email: 'M1.5 3.5h13v9h-13zM1.5 3.5l6.5 5 6.5-5',
  phone:
    'M3 2h3l1 4-2 1a9 9 0 004 4l1-2 4 1v3a1 1 0 01-1 1C6 14 2 10 2 3a1 1 0 011-1z',
  globe:
    'M8 2a6 6 0 100 12A6 6 0 008 2zM2 8h12M8 2c-1.5 2-2.5 3.8-2.5 6S6.5 14 8 14c1.5 0 2.5-1.8 2.5-6S9.5 2 8 2z',
  link: 'M6.5 9.5a3.5 3.5 0 005 0l2-2a3.5 3.5 0 00-5-5l-1 1M9.5 6.5a3.5 3.5 0 00-5 0l-2 2a3.5 3.5 0 005 5l1-1',
};

function SvgIcon({ path }: { path: string }) {
  return (
    <svg
      viewBox='0 0 16 16'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.35'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <path d={path} />
    </svg>
  );
}

const website = contact.social.website.replace(/^https?:\/\/(www\.)?/, '');
const linkedin = contact.social.linkedin.replace(/^https?:\/\//, '');
const github = contact.social.github.replace(/^https?:\/\//, '');
const phone = contact.phone.mobile.replace(
  /(\+94)(\d{2})(\d{3})(\d{4})/,
  '$1 $2 $3 $4',
);

const CVContent = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <>
      <style>{styles}</style>
      <div className='cv-page' ref={ref}>
        {/* SIDEBAR */}
        <aside className='cv-sb'>
          <div>
            <div className='sb-name'>{contact.name}</div>
            <div className='sb-title'>{contact.designation}</div>
          </div>

          <div className='sb-divider' />

          <div>
            <div className='sb-label'>Contact</div>
            {(
              [
                [ICONS.pin, contact.country],
                [ICONS.email, contact.email.personal],
                [ICONS.phone, phone],
                [ICONS.globe, website],
                [ICONS.link, linkedin],
                [ICONS.link, github],
              ] as [string, string][]
            ).map(([path, val]) => (
              <div className='ci' key={val}>
                <SvgIcon path={path} />
                {val}
              </div>
            ))}
          </div>

          <div className='sb-divider' />

          <div>
            <div className='sb-label'>Core Competencies</div>
            <div className='lc-list'>
              {about.leadership.map((item) => (
                <div className='lc-item' key={item}>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className='sb-divider' />

          <div>
            <div className='sb-label'>Technical Stack</div>
            {Object.entries(cvSkills).map(([group, tags]) => (
              <div className='sg' key={group}>
                <div className='sg-title'>{group}</div>
                <div className='sg-tags'>
                  {tags.map((t) => (
                    <span className='sg-tag' key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* MAIN */}
        <main className='cv-main'>
          <section>
            <div className='sh'>Profile</div>
            <p className='summary'>{about.summary}</p>
          </section>

          <section>
            <div className='sh'>Experience</div>
            {experience.map((co) => (
              <div className='co-block' key={co.company}>
                <div className='co-head'>
                  <span>
                    <span className='co-name'>{co.company}</span>
                    {co.companyNote && (
                      <span className='co-note'>({co.companyNote})</span>
                    )}
                  </span>
                  <span className='co-loc'>{co.location}</span>
                </div>
                <div className='roles'>
                  {co.roles.map((role) => (
                    <div className='cv-role' key={role.title}>
                      <div className='role-head'>
                        <span className='role-title'>{role.title}</span>
                        <span className='role-period'>{role.period}</span>
                      </div>
                      <ul className='cv-blist'>
                        {role.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>

          <section>
            <div className='sh'>Education</div>
            {education.map((e) => (
              <div className='edu-row' key={e.degree}>
                <div>
                  <div className='edu-deg'>{e.degree}</div>
                  <div className='edu-inst'>{e.institution}</div>
                  <div className='edu-det'>{e.detail}</div>
                </div>
                <span className='edu-yr'>{e.period}</span>
              </div>
            ))}
          </section>
        </main>
      </div>
    </>
  );
});

CVContent.displayName = 'CVContent';

export default CVContent;
