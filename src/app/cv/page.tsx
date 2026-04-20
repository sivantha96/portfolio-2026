'use client';

import CVContent from '@/components/CVContent';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

const CV_WIDTH_PX = 920;
const PDF_WIDTH_MM = 210;
const CSS_PX_PER_MM = 96 / 25.4;
const PDF_PRINT_ZOOM = (PDF_WIDTH_MM * CSS_PX_PER_MM) / CV_WIDTH_PX;
const PDF_FILE_NAME = 'Sivantha Paranavithana - Senior Engineering Lead.pdf';

export default function CVPage() {
  const contentRef = useRef<HTMLDivElement>(null);
  const pageStyleRef = useRef<HTMLStyleElement | null>(null);
  const [isPreparingPdf, setIsPreparingPdf] = useState(false);
  const [screenScale, setScreenScale] = useState<number | string>(
    'min(1, calc(100vw / 920px))',
  );
  const [frameHeight, setFrameHeight] = useState<number | null>(null);

  useLayoutEffect(() => {
    const viewport = document.querySelector<HTMLMetaElement>(
      'meta[name="viewport"]',
    );
    const update = () => {
      const width = window.innerWidth;

      setScreenScale(Math.min(1, width / CV_WIDTH_PX));
    };

    window.scrollTo(0, 0);
    viewport?.setAttribute('content', 'width=device-width, initial-scale=1');

    update();
    const frame = window.requestAnimationFrame(update);

    window.addEventListener('resize', update);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', update);
    };
  }, []);

  useLayoutEffect(() => {
    const updateFrameHeight = () => {
      const height = contentRef.current?.getBoundingClientRect().height ?? 0;
      setFrameHeight(height ? Math.ceil(height) : null);
    };

    updateFrameHeight();
    const frame = window.requestAnimationFrame(updateFrameHeight);
    const resizeObserver =
      typeof ResizeObserver === 'undefined'
        ? null
        : new ResizeObserver(updateFrameHeight);

    if (contentRef.current) {
      resizeObserver?.observe(contentRef.current);
    }

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
    };
  }, [screenScale]);

  const removePageStyle = useCallback(() => {
    pageStyleRef.current?.remove();
    pageStyleRef.current = null;
  }, []);

  const preparePrint = useCallback(async () => {
    const source = contentRef.current;

    if (!source || isPreparingPdf) return;

    setIsPreparingPdf(true);

    try {
      await document.fonts?.ready;
      await new Promise<void>((resolve) => {
        window.requestAnimationFrame(() => resolve());
      });

      const heightPx = Math.ceil(source.scrollHeight);
      const isMobilePrint = window.innerWidth < 768;

      if (isMobilePrint) {
        const host = document.createElement('div');
        const clone = source.cloneNode(true) as HTMLElement;

        try {
          const [{ snapdom }, { jsPDF }] = await Promise.all([
            import('@zumer/snapdom'),
            import('jspdf'),
          ]);

          host.style.position = 'fixed';
          host.style.left = '-10000px';
          host.style.top = '0';
          host.style.width = `${CV_WIDTH_PX}px`;
          host.style.pointerEvents = 'none';
          host.style.background = '#ffffff';
          host.style.overflow = 'visible';

          clone.style.width = `${CV_WIDTH_PX}px`;
          clone.style.maxWidth = 'none';
          clone.style.transform = 'none';
          clone.style.zoom = '1';
          clone.style.flex = 'none';
          clone.style.borderRadius = '0';
          clone.style.boxShadow = 'none';

          host.appendChild(clone);
          document.body.appendChild(host);

          const canvas = await snapdom.toCanvas(clone, {
            backgroundColor: '#ffffff',
            dpr: Math.min(2, window.devicePixelRatio || 1),
            embedFonts: true,
            width: CV_WIDTH_PX,
            height: clone.scrollHeight,
          });
          const pdfHeightMm = (canvas.height * PDF_WIDTH_MM) / canvas.width;
          const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: [PDF_WIDTH_MM, pdfHeightMm],
          });

          pdf.addImage(
            canvas.toDataURL('image/png'),
            'PNG',
            0,
            0,
            PDF_WIDTH_MM,
            pdfHeightMm,
          );
          pdf.save(PDF_FILE_NAME);
          setIsPreparingPdf(false);

          return;
        } finally {
          host.remove();
        }
      }

      const pageHeightMm =
        Math.ceil((heightPx / CV_WIDTH_PX) * PDF_WIDTH_MM) + 1;
      const pageStyle = document.createElement('style');

      removePageStyle();
      pageStyle.textContent = `
        @page {
          size: ${PDF_WIDTH_MM}mm ${pageHeightMm}mm;
          margin: 0;
        }

        @media print {
          html,
          body,
          html body .cv-shell,
          html body .cv-page-frame {
            height: auto !important;
            overflow: visible !important;
          }

          html body .cv-page {
            width: ${CV_WIDTH_PX}px !important;
            max-width: none !important;
            zoom: ${PDF_PRINT_ZOOM.toFixed(6)} !important;
            transform: none !important;
            transform-origin: top left !important;
          }
        }

      `;

      document.head.appendChild(pageStyle);
      pageStyleRef.current = pageStyle;

      window.print();
    } catch {
      removePageStyle();
      setIsPreparingPdf(false);
    }
  }, [isPreparingPdf, removePageStyle]);

  useEffect(() => {
    const handleAfterPrint = () => {
      removePageStyle();
      setIsPreparingPdf(false);
    };

    window.addEventListener('afterprint', handleAfterPrint);

    return () => {
      window.removeEventListener('afterprint', handleAfterPrint);
      removePageStyle();
    };
  }, [removePageStyle]);

  const cvShellStyle = {
    '--cv-screen-scale': screenScale,
    '--cv-frame-height': frameHeight ? `${frameHeight}px` : 'auto',
  } as CSSProperties;

  return (
    <div className='cv-shell' style={cvShellStyle}>
      <Link
        href='/'
        className='absolute left-5 top-5 z-20 hidden items-center gap-2 font-mono text-[0.64rem] leading-none tracking-[0.1em] uppercase px-3 py-1.5 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all print:hidden md:inline-flex'>
        <span aria-hidden='true'>←</span>
        Back Home
      </Link>
      <div className='relative z-10 flex w-full flex-col items-center gap-3 px-4 py-4 text-center print:hidden'>
        <p className='text-xs text-muted-foreground'>
          <span className='md:hidden'>
            For best quality, open on a desktop browser
          </span>
          <span className='hidden md:inline'>Save a PDF copy of this CV</span>
        </p>
        <button
          onClick={preparePrint}
          disabled={isPreparingPdf}
          className='font-mono text-[0.68rem] tracking-[0.1em] uppercase px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-all disabled:pointer-events-none disabled:opacity-60'>
          {isPreparingPdf ? 'Preparing PDF...' : 'Download PDF'}
        </button>
      </div>
      <div className='cv-page-frame'>
        <CVContent ref={contentRef} />
      </div>
    </div>
  );
}
