'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { TimerResetIcon as Reset } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState } from 'react';

interface Theme {
  name: string;
  label: string;
  activeColor: string;
  className: string;
}

const themes: Theme[] = [
  {
    name: 'yellow',
    label: 'Yellow',
    activeColor: 'bg-yellow-500',
    className: 'theme-yellow',
  },
  {
    name: 'red',
    label: 'Red',
    activeColor: 'bg-red-500',
    className: 'theme-red',
  },
  {
    name: 'rose',
    label: 'Rose',
    activeColor: 'bg-rose-500',
    className: 'theme-rose',
  },
  {
    name: 'orange',
    label: 'Orange',
    activeColor: 'bg-orange-500',
    className: 'theme-orange',
  },
  {
    name: 'green',
    label: 'Green',
    activeColor: 'bg-green-500',
    className: 'theme-green',
  },
  {
    name: 'blue',
    label: 'Blue',
    activeColor: 'bg-blue-500',
    className: 'theme-blue',
  },
  {
    name: 'violet',
    label: 'Violet',
    activeColor: 'bg-violet-500',
    className: 'theme-violet',
  },
];

export function ThemeCustomizer() {
  const { setTheme, resolvedTheme } = useTheme();
  const [activeColor, setActiveColor] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('color') || 'yellow';
    }
    return 'zinc';
  });

  const handleColorChange = (colorTheme: Theme) => {
    document.documentElement.classList.remove(
      ...themes.map((t) => t.className),
    );
    document.documentElement.classList.add(colorTheme.className);
    setActiveColor(colorTheme.name);
    localStorage.setItem('color', colorTheme.name);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' size='icon'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='h-4 w-4'>
            <path d='M12 2v2' />
            <path d='M12 20v2' />
            <path d='m4.93 4.93 1.41 1.41' />
            <path d='m17.66 17.66 1.41 1.41' />
            <path d='M2 12h2' />
            <path d='M20 12h2' />
            <path d='m6.34 17.66-1.41 1.41' />
            <path d='m19.07 4.93-1.41 1.41' />
          </svg>
          <span className='sr-only'>Customize theme</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-[400px]'>
        <DialogHeader>
          <DialogTitle>Theme Customizer</DialogTitle>
        </DialogHeader>
        <div className='space-y-6 py-4'>
          <div className='space-y-2'>
            <Label>Color</Label>
            <div className='grid grid-cols-3 gap-2'>
              {themes.map((item) => (
                <Button
                  key={item.name}
                  variant='outline'
                  size='sm'
                  onClick={() => handleColorChange(item)}
                  className={`justify-start ${item.name === activeColor ? 'border-2 border-primary' : ''}`}>
                  <span
                    className={`mr-1 h-4 w-4 rounded-full ${item.activeColor}`}
                  />
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
          <div className='space-y-2'>
            <Label>Mode</Label>
            <div className='grid grid-cols-3 gap-2'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => setTheme('light')}
                className={
                  resolvedTheme === 'light' ? 'border-2 border-primary' : ''
                }>
                Light
              </Button>
              <Button
                variant='outline'
                size='sm'
                onClick={() => setTheme('dark')}
                className={
                  resolvedTheme === 'dark' ? 'border-2 border-primary' : ''
                }>
                Dark
              </Button>
            </div>
          </div>
          <Button
            variant='outline'
            size='sm'
            className='w-full'
            onClick={() => {
              const currentTheme = resolvedTheme || 'light';
              setTheme(currentTheme);
              setActiveColor('yellow');
              localStorage.setItem('color', 'yellow');
              document.documentElement.classList.remove(
                ...themes.map((t) => t.className),
              );
              document.documentElement.classList.add('theme-yellow');
            }}>
            <Reset className='mr-2 h-4 w-4' />
            Reset
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
