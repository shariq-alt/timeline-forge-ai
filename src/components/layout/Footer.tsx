
import React from 'react';
import { Calendar } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-background border-t py-6">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          <span className="font-medium">TimelineForge</span>
        </div>
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} TimelineForge. All rights reserved.
        </div>
        <div className="flex gap-4 text-sm">
          <a href="#" className="hover:text-primary">Terms</a>
          <a href="#" className="hover:text-primary">Privacy</a>
          <a href="#" className="hover:text-primary">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
