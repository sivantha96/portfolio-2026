import { Menu } from 'lucide-react';
import { useCallback, useState } from 'react';
import { ThemeCustomizer } from './ThemeCustomizer';
import { Button } from './ui/button';
import { Sheet, SheetContent } from './ui/sheet';

const NavItems = ({ onClose }: { onClose: () => void }) => (
  <>
    <Button
      variant='ghost'
      className='w-full justify-start'
      asChild
      onClick={onClose}>
      <a href='#about'>About</a>
    </Button>

    <Button
      variant='ghost'
      className='w-full justify-start'
      asChild
      onClick={onClose}>
      <a href='#projects'>Projects</a>
    </Button>
    <Button
      variant='ghost'
      className='w-full justify-start'
      asChild
      onClick={onClose}>
      <a href='#skills'>Skills</a>
    </Button>
    <Button
      variant='ghost'
      className='w-full justify-start'
      asChild
      onClick={onClose}>
      <a href='#timeline'>Timeline</a>
    </Button>
    <Button
      variant='ghost'
      className='w-full justify-start'
      asChild
      onClick={onClose}>
      <a href='#articles'>Articles</a>
    </Button>
  </>
);

export const AppHeader = () => {
  const [sheetOpened, setSheetOpen] = useState(false);

  const handleToggleSheet = useCallback(() => {
    setSheetOpen((prev) => !prev);
  }, []);

  const handleCloseSheet = useCallback(() => {
    setSheetOpen(false);
  }, []);

  return (
    <header className='sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/60 flex justify-center'>
      <div className='container flex h-14 items-center mx-auto px-6'>
        <div className='mr-4 ml-6 md:ml-0 flex'>
          <h1 className='text-2xl font-bold'>sivantha.com</h1>
        </div>
        <div className='flex flex-1 items-center justify-between space-x-2 md:justify-end'>
          <nav className='flex items-center space-x-6 text-sm font-medium'>
            <div className='hidden md:flex'>
              <NavItems onClose={handleCloseSheet} />
            </div>
          </nav>
          <div className='flex items-center space-x-2'>
            <ThemeCustomizer />
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
                  <NavItems onClose={handleCloseSheet} />
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
