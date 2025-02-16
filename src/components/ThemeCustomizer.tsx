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
import { useEffect, useState } from 'react';

interface Theme {
  name: string;
  label: string;
  activeColor: string;
  className: string;
}

interface RadiusOption {
  label: string;
  value: string;
}

const themes: Theme[] = [
  {
    name: 'zinc',
    label: 'Zinc',
    activeColor: 'bg-zinc-500',
    className: 'theme-zinc',
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
    name: 'yellow',
    label: 'Yellow',
    activeColor: 'bg-yellow-500',
    className: 'theme-yellow',
  },
  {
    name: 'violet',
    label: 'Violet',
    activeColor: 'bg-violet-500',
    className: 'theme-violet',
  },
];

const radiusOptions: RadiusOption[] = [
  {
    label: '0',
    value: '0',
  },
  {
    label: '0.3',
    value: '0.3',
  },
  {
    label: '0.5',
    value: '0.5',
  },
  {
    label: '0.75',
    value: '0.75',
  },
  {
    label: '1.0',
    value: '1.0',
  },
];

export function ThemeCustomizer() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const [radius, setRadius] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('radius') || '0.5';
    }
    return '0.5';
  });
  const [activeColor, setActiveColor] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('color') || 'zinc';
    }
    return 'zinc';
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleColorChange = (colorTheme: Theme) => {
    document.documentElement.classList.remove(
      ...themes.map((t) => t.className),
    );
    document.documentElement.classList.add(colorTheme.className);
    setActiveColor(colorTheme.name);
    localStorage.setItem('color', colorTheme.name);
  };

  if (!mounted) return null;

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
            <Label>Radius</Label>
            <div className='grid grid-cols-5 gap-2'>
              {radiusOptions.map((option) => (
                <Button
                  key={option.value}
                  variant='outline'
                  size='sm'
                  onClick={() => {
                    setRadius(option.value);
                    localStorage.setItem('radius', option.value);
                    document.documentElement.style.setProperty(
                      '--radius',
                      option.value,
                    );
                  }}
                  className={
                    radius === option.value ? 'border-2 border-primary' : ''
                  }>
                  {option.label}
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
              setRadius('0.5');
              setActiveColor('zinc');
              localStorage.setItem('radius', '0.5');
              localStorage.setItem('color', 'zinc');
              document.documentElement.style.setProperty('--radius', '0.5');
              document.documentElement.classList.remove(
                ...themes.map((t) => t.className),
              );
              document.documentElement.classList.add('theme-zinc');
            }}>
            <Reset className='mr-2 h-4 w-4' />
            Reset
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
