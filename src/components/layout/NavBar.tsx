
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Home, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const NavBar = () => {
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Calendar className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">TimelineForge</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-primary">
            Home
          </Link>
          <Link to="/explore" className="text-sm font-medium hover:text-primary">
            Explore
          </Link>
          <Link to="/create" className="text-sm font-medium hover:text-primary">
            Create
          </Link>
          <Button asChild>
            <Link to="/login">
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Link>
          </Button>
        </nav>
        
        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col gap-4 mt-8">
              <Link to="/" className="text-lg font-medium hover:text-primary flex items-center gap-2">
                <Home className="h-5 w-5" />
                Home
              </Link>
              <Link to="/explore" className="text-lg font-medium hover:text-primary flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Explore
              </Link>
              <Link to="/create" className="text-lg font-medium hover:text-primary flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Create
              </Link>
              <Button asChild>
                <Link to="/login" className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Sign In
                </Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default NavBar;
