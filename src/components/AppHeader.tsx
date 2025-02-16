import { Menu, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useCallback, useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Sheet, SheetContent } from './ui/sheet';

export const AppHeader = () => {
  const { setTheme, theme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [sheetOpened, setSheetOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggleSheet = useCallback(() => {
    setSheetOpen((prev) => !prev);
  }, []);

  const handleCloseSheet = useCallback(() => {
    setSheetOpen(false);
  }, []);

  const NavItems = () => (
    <>
      <Button
        variant='ghost'
        className='w-full justify-start'
        asChild
        onClick={handleCloseSheet}>
        <a href='#about'>About</a>
      </Button>

      <Button
        variant='ghost'
        className='w-full justify-start'
        asChild
        onClick={handleCloseSheet}>
        <a href='#projects'>Projects</a>
      </Button>
      <Button
        variant='ghost'
        className='w-full justify-start'
        asChild
        onClick={handleCloseSheet}>
        <a href='#skills'>Skills</a>
      </Button>
      <Button
        variant='ghost'
        className='w-full justify-start'
        asChild
        onClick={handleCloseSheet}>
        <a href='#timeline'>Timeline</a>
      </Button>
      <Button
        variant='ghost'
        className='w-full justify-start'
        asChild
        onClick={handleCloseSheet}>
        <a href='#articles'>Articles</a>
      </Button>
    </>
  );

  return (
    <header className='sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-center'>
      <div className='container flex h-14 items-center'>
        <div className='mr-4 ml-6 md:ml-0 flex'>
          <h1 className='text-2xl font-bold'>sivantha.com</h1>
        </div>
        <div className='flex flex-1 items-center justify-between space-x-2 md:justify-end'>
          <nav className='flex items-center space-x-6 text-sm font-medium'>
            <div className='hidden md:flex'>
              <NavItems />
            </div>
          </nav>
          <div className='flex items-center space-x-2'>
            {mounted && (
              <Button
                variant='ghost'
                size='icon'
                aria-label='Toggle Theme'
                className='mr-2'
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                <span className='sr-only'>Toggle theme</span>
                {mounted && theme === 'dark' ? (
                  <Sun className='h-6 w-6' />
                ) : (
                  <Moon className='h-6 w-6' />
                )}
              </Button>
            )}
            <Button
              variant='ghost'
              size='icon'
              aria-label='Open Menu'
              className='md:hidden'
              onClick={handleToggleSheet}>
              <Menu className='h-6 w-6 mr-6' />
            </Button>

            <Sheet open={sheetOpened} onOpenChange={handleToggleSheet}>
              <SheetContent side='right' className='w-[300px] sm:w-[400px]'>
                <nav className='flex flex-col space-y-4'>
                  <NavItems />
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
