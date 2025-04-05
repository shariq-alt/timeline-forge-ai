
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Timeline } from '@/types';
import TimelineCard from '@/components/timeline/TimelineCard';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

const ExploreSection = () => {
  const [timelines, setTimelines] = useState<Timeline[]>([]);
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

  useEffect(() => {
    // In a real app, fetch from API
    try {
      const storedTimelines = JSON.parse(localStorage.getItem('timelines') || '[]');
      const publicTimelines = storedTimelines.filter((t: Timeline) => t.isPublic);
      setTimelines(publicTimelines.slice(0, 3)); // Only show first 3 for the homepage
    } catch (err) {
      console.error('Failed to load sample timelines', err);
    }
  }, []);

  return (
    <section className="py-16 bg-accent/30">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Explore Timelines</h2>
            <p className="text-muted-foreground">
              Discover public timelines created by the community
            </p>
          </div>
          {isRouterAvailable && (
            <Button asChild variant="outline" className="mt-4 md:mt-0">
              <Link to="/explore">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          )}
          {!isRouterAvailable && (
            <Button variant="outline" className="mt-4 md:mt-0" onClick={() => window.location.href = '/explore'}>
              View All <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          )}
        </div>

        {timelines.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {timelines.map(timeline => (
              <TimelineCard key={timeline.id} timeline={timeline} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-card rounded-lg border">
            <h3 className="font-medium mb-2">No timelines yet</h3>
            <p className="text-muted-foreground mb-4">
              Be the first to create and share a public timeline!
            </p>
            {isRouterAvailable ? (
              <Button asChild>
                <Link to="/create">Create Timeline</Link>
              </Button>
            ) : (
              <Button onClick={() => window.location.href = '/create'}>
                Create Timeline
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ExploreSection;
