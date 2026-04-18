'use client';

import { Menu } from 'lucide-react';
import { useCallback, useState } from 'react';
import { ThemeCustomizer } from './ThemeCustomizer';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTitle } from './ui/sheet';

const navItems = [
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#articles', label: 'Writing' },
  { href: '#contact', label: 'Contact' },
];

const NavLinks = ({ onClose }: { onClose?: () => void }) => (
  <>
    {navItems.map(({ href, label }) => (
      <a
        key={href}
        href={href}
        onClick={onClose}
        className='font-mono text-[0.72rem] tracking-[0.08em] uppercase text-muted-foreground hover:text-foreground transition-colors'>
        {label}
      </a>
    ))}
  </>
);

export const AppHeader = () => {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <header className='fixed top-0 left-0 right-0 z-40 grid grid-cols-[auto_1fr] md:grid-cols-3 items-center px-6 md:px-16 py-5 bg-background/92 backdrop-blur-sm border-b border-border'>
      <span className='font-mono text-[0.8rem] tracking-[0.15em] uppercase text-foreground select-none'>
        SP
      </span>

      <nav className='hidden md:flex items-center justify-center gap-10'>
        <NavLinks />
      </nav>

      <div className='flex items-center gap-2 md:gap-3 justify-end'>
        <ThemeCustomizer />

        <button
          onClick={() => window.open('/cv', '_blank')}
          className='hidden md:inline-block font-mono text-[0.72rem] tracking-[0.1em] uppercase px-5 py-2 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all'>
          Download CV
        </button>

        <Button
          variant='ghost'
          size='icon'
          aria-label='Open menu'
          className='md:hidden'
          onClick={() => setOpen(true)}>
          <Menu className='h-5 w-5' />
        </Button>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side='right' className='w-[280px] flex flex-col'>
          <SheetTitle className='sr-only'>Navigation</SheetTitle>
          <nav className='flex flex-col gap-6 pt-8 flex-1'>
            <NavLinks onClose={close} />
          </nav>
          <div className='pb-6'>
            <button
              onClick={() => {
                window.open('/cv', '_blank');
                close();
              }}
              className='w-full font-mono text-[0.72rem] tracking-[0.1em] uppercase px-5 py-2.5 border border-foreground text-foreground text-center hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all'>
              Download CV
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};
