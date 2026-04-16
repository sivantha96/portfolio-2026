'use client';

import CVContent from '@/components/CVContent';
import { useCallback, useEffect, useRef, useState } from 'react';

const PAGE_WIDTH = 920; // natural design width of .cv-page (px)

export default function CVPage() {
  const contentRef = useRef<HTMLDivElement>(null);
  const pageStyleRef = useRef<HTMLStyleElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Scale the CV to fit the viewport on narrow screens by setting a CSS custom
  // property that the @media screen rule in CVContent picks up via `zoom`.
  useEffect(() => {
    const update = () => {
      const scale = Math.min(1, window.innerWidth / PAGE_WIDTH);
      document.documentElement.style.setProperty('--cv-zoom', String(scale));
      setIsMobile(window.innerWidth < 768);
    };
    update();
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('resize', update);
      document.documentElement.style.removeProperty('--cv-zoom');
    };
  }, []);

  const preparePrint = useCallback(() => {
    if (contentRef.current) {
      const el = contentRef.current;

      // Measure at print width (794px ≈ 210mm) for accurate page height.
      el.style.width = '794px';
      el.style.maxWidth = '794px';
      el.style.overflow = 'visible';
      void el.getBoundingClientRect();
      const heightMm = Math.ceil(el.scrollHeight * 0.264583);
      el.style.width = '';
      el.style.maxWidth = '';
      el.style.overflow = '';

      pageStyleRef.current?.remove();
      const ps = document.createElement('style');
      ps.textContent = `@page { size: 210mm ${heightMm}mm; margin: 0; }`;
      document.head.appendChild(ps);
      pageStyleRef.current = ps;
    }

    window.print();
  }, []);

  // Restore theme and clean up @page style after the print dialog closes.
  useEffect(() => {
    let savedTheme: string | null = null;

    const handleBeforePrint = () => {
      const html = document.documentElement;
      savedTheme = html.classList.contains('dark') ? 'dark' : 'light';
    };

    const handleAfterPrint = () => {
      if (savedTheme) {
        const html = document.documentElement;
        html.classList.remove('dark', 'light');
        html.classList.add(savedTheme);
      }
      pageStyleRef.current?.remove();
      pageStyleRef.current = null;
    };

    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);

    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
      pageStyleRef.current?.remove();
    };
  }, []);

  // Auto-trigger print on desktop only. Mobile browsers commonly ignore the
  // @page size CSS, causing multi-page output, so skip auto-print there.
  useEffect(() => {
    if (isMobile) return;
    const timer = setTimeout(preparePrint, 800);
    return () => clearTimeout(timer);
  }, [isMobile, preparePrint]);

  return (
    <div className='cv-shell'>
      <CVContent ref={contentRef} />
      {isMobile && (
        <div className='mt-6 flex flex-col items-center gap-3 pb-4 text-center print:hidden'>
          <p className='text-xs text-muted-foreground'>
            For best quality, open on a desktop browser
          </p>
          <button
            onClick={preparePrint}
            className='rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-sm'>
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
}
