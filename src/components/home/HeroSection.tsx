
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ChevronRight } from 'lucide-react';

const HeroSection = () => {
  const [isRouterAvailable, setIsRouterAvailable] = useState(false);
  
  // Check if we're in a router context
  useEffect(() => {
    try {
      // If this doesn't throw, we're in a router context
      setIsRouterAvailable(true);
    } catch (error) {
      console.error('Router context not available:', error);
      setIsRouterAvailable(false);
    }
  }, []);

  return (
    <div className="relative bg-accent overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-transparent" />
      </div>

      <div className="container relative z-10 py-16 md:py-24 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 text-center md:text-left">
            <div className="inline-block bg-primary/40 px-3 py-1.5 rounded-full text-sm font-medium text-foreground">
              Organize your path with ease
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Build and Share <br />
              <span className="text-primary">Timeline Paths</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-md mx-auto md:mx-0">
              Create structured timelines, set goals, and track progress.
              Perfect for learning paths, project plans, and roadmaps.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              {isRouterAvailable ? (
                <>
                  <Button asChild size="lg" className="transition-all duration-300 hover:scale-105">
                    <Link to="/create">
                      Create Timeline <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="transition-all duration-300 hover:bg-accent hover:text-accent-foreground">
                    <Link to="/explore">
                      Explore Timelines
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button size="lg" onClick={() => window.location.href = '/create'} className="transition-all duration-300 hover:scale-105">
                    Create Timeline <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => window.location.href = '/explore'} className="transition-all duration-300 hover:bg-accent hover:text-accent-foreground">
                    Explore Timelines
                  </Button>
                </>
              )}
            </div>
          </div>
          
          <div className="hidden md:flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Calendar icon positioned at top-left of card */}
              <div className="absolute -top-6 -left-6 bg-primary/30 rounded-lg p-5 shadow-md z-10">
                <Calendar className="h-10 w-10 text-primary" />
              </div>
              
              {/* Main timeline card mockup */}
              <div className="bg-card relative rounded-lg p-6 shadow-lg z-0">
                <div className="space-y-2 mb-4">
                  <div className="h-6 bg-accent rounded-md w-3/4"></div>
                  <div className="h-4 bg-accent/70 rounded-md w-1/2"></div>
                </div>
                <div className="space-y-3">
                  <div className="timeline-segment h-12 w-full bg-accent/50 rounded-md"></div>
                  <div className="timeline-connector mx-auto h-6"></div>
                  <div className="timeline-segment h-12 w-full bg-accent/50 rounded-md"></div>
                  <div className="timeline-connector mx-auto h-6"></div>
                  <div className="timeline-segment h-12 w-full bg-accent/50 rounded-md"></div>
                </div>
              </div>
              
              {/* Clock icon positioned at bottom-right of card */}
              <div className="absolute -bottom-6 -right-6 bg-primary/30 rounded-lg p-5 shadow-md z-10">
                <Clock className="h-10 w-10 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
