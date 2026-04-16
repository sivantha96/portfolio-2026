'use client';

import CVContent from '@/components/CVContent';
import { useEffect, useRef } from 'react';

export default function CVPage() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let savedTheme: string | null = null;
    let pageStyle: HTMLStyleElement | null = null;

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
      pageStyle?.remove();
    };

    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);

    const timer = setTimeout(() => {
      if (contentRef.current) {
        const el = contentRef.current;

        // The browser renders for print at 210mm ≈ 794px (with margin:0).
        // Measuring at the wider screen width underestimates the print height
        // because narrower columns cause more text wrapping.
        // Force the element to print width before measuring so we get the
        // correct scrollHeight.
        el.style.width = '794px';
        el.style.maxWidth = '794px';
        el.style.overflow = 'visible';

        // Synchronous reflow at the new width.
        void el.getBoundingClientRect();

        const heightMm = Math.ceil(el.scrollHeight * 0.264583);

        // Restore inline overrides — the class-based styles take back over.
        el.style.width = '';
        el.style.maxWidth = '';
        el.style.overflow = '';

        pageStyle = document.createElement('style');
        pageStyle.textContent = `@page { size: 210mm ${heightMm}mm; margin: 0; }`;
        document.head.appendChild(pageStyle);
      }

      window.print();
    }, 800);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
      pageStyle?.remove();
    };
  }, []);

  return (
    <div className='cv-shell'>
      <CVContent ref={contentRef} />
    </div>
  );
}
