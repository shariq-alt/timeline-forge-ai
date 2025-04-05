
import React, { useEffect, useState } from 'react';
import { Timeline, TimelineType } from '@/types';
import AppLayout from '@/components/layout/AppLayout';
import TimelineCard from '@/components/timeline/TimelineCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const ExploreTimelines = () => {
  const [timelines, setTimelines] = useState<Timeline[]>([]);
  const [filteredTimelines, setFilteredTimelines] = useState<Timeline[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    // In a real app, fetch from API
    try {
      const storedTimelines = JSON.parse(localStorage.getItem('timelines') || '[]');
      const publicTimelines = storedTimelines.filter((t: Timeline) => t.isPublic);
      setTimelines(publicTimelines);
      setFilteredTimelines(publicTimelines);
    } catch (err) {
      console.error('Failed to load timelines', err);
    }
  }, []);

  useEffect(() => {
    let results = timelines;
    
    // Apply type filter if not "all"
    if (activeTab !== 'all') {
      results = results.filter(timeline => timeline.type === activeTab);
    }
    
    // Apply search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        timeline => 
          timeline.title.toLowerCase().includes(query) || 
          timeline.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredTimelines(results);
  }, [searchQuery, activeTab, timelines]);

  return (
    <AppLayout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Explore Timelines</h1>
          <p className="text-muted-foreground">
            Discover and fork public timelines created by the community
          </p>
        </div>

        <div className="mb-8">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search timelines..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="Roadmap">Roadmap</TabsTrigger>
              <TabsTrigger value="Project">Project</TabsTrigger>
              <TabsTrigger value="Study">Study</TabsTrigger>
              <TabsTrigger value="Personal">Personal</TabsTrigger>
              <TabsTrigger value="Career">Career</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-0">
              {/* Content will be shown via filteredTimelines below */}
            </TabsContent>
          </Tabs>
        </div>

        {filteredTimelines.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTimelines.map(timeline => (
              <TimelineCard key={timeline.id} timeline={timeline} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-lg font-medium mb-2">No timelines found</h3>
            <p className="text-muted-foreground mb-4">
              {timelines.length === 0
                ? "Be the first to create and share a timeline!"
                : "Try adjusting your search or filters."}
            </p>
            <Button asChild>
              <a href="/create">Create Timeline</a>
            </Button>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default ExploreTimelines;
