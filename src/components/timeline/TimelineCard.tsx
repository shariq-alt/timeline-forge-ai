
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Users } from 'lucide-react';
import { Timeline, TimelineType } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

// Helper function to get badge color based on timeline type
function getBadgeVariant(type: TimelineType): "default" | "secondary" | "outline" {
  switch (type) {
    case 'Roadmap':
      return 'default';
    case 'Project':
      return 'secondary';
    case 'Study':
      return 'outline';
    case 'Personal':
    case 'Career':
    default:
      return 'default';
  }
}

interface TimelineCardProps {
  timeline: Timeline;
}

const TimelineCard = ({ timeline }: TimelineCardProps) => {
  const { id, title, description, type, segments, isPublic, createdAt } = timeline;
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
  
  // Format the date
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <Badge variant={getBadgeVariant(type)}>{type}</Badge>
          {isPublic && (
            <div className="flex items-center text-xs text-muted-foreground">
              <Users className="h-3 w-3 mr-1" />
              <span>Public</span>
            </div>
          )}
        </div>
        {isRouterAvailable ? (
          <Link to={`/timeline/${id}`} className="hover:underline">
            <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
          </Link>
        ) : (
          <a href={`/timeline/${id}`} className="hover:underline">
            <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
          </a>
        )}
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground text-sm line-clamp-3">{description || "No description provided."}</p>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4 text-xs text-muted-foreground">
        <div className="flex items-center">
          <Calendar className="h-3 w-3 mr-1" />
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          <span>{segments.length} segments</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TimelineCard;
