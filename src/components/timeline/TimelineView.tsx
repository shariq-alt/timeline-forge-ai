
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Timeline, Goal } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Clock, Plus, Trash, Check, Calendar, UserCircle } from 'lucide-react';

const TimelineView = () => {
  const { id } = useParams<{ id: string }>();
  const [timeline, setTimeline] = useState<Timeline | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newGoal, setNewGoal] = useState<{ [key: string]: string }>({});

  React.useEffect(() => {
    // In a real app, fetch from API
    try {
      const timelines = JSON.parse(localStorage.getItem('timelines') || '[]');
      const foundTimeline = timelines.find((t: Timeline) => t.id === id);
      
      if (foundTimeline) {
        setTimeline(foundTimeline);
      } else {
        setError('Timeline not found');
      }
    } catch (err) {
      setError('Failed to load timeline');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const handleAddGoal = (segmentId: string) => {
    if (!newGoal[segmentId]?.trim()) return;

    const updatedTimeline = {...timeline} as Timeline;
    const segmentIndex = updatedTimeline.segments.findIndex(
      segment => segment.id === segmentId
    );

    if (segmentIndex > -1) {
      const newGoalItem: Goal = {
        id: crypto.randomUUID(),
        text: newGoal[segmentId],
        completed: false,
        segmentId
      };

      updatedTimeline.segments[segmentIndex].goals.push(newGoalItem);
      setTimeline(updatedTimeline);
      
      // Reset input field
      setNewGoal(prev => ({ ...prev, [segmentId]: '' }));
      
      // Update in localStorage
      const timelines = JSON.parse(localStorage.getItem('timelines') || '[]');
      const timelineIndex = timelines.findIndex((t: Timeline) => t.id === id);
      if (timelineIndex > -1) {
        timelines[timelineIndex] = updatedTimeline;
        localStorage.setItem('timelines', JSON.stringify(timelines));
      }
    }
  };

  const toggleGoalCompletion = (segmentId: string, goalId: string) => {
    const updatedTimeline = {...timeline} as Timeline;
    const segmentIndex = updatedTimeline.segments.findIndex(
      segment => segment.id === segmentId
    );

    if (segmentIndex > -1) {
      const goalIndex = updatedTimeline.segments[segmentIndex].goals.findIndex(
        goal => goal.id === goalId
      );

      if (goalIndex > -1) {
        updatedTimeline.segments[segmentIndex].goals[goalIndex].completed = 
          !updatedTimeline.segments[segmentIndex].goals[goalIndex].completed;
        
        setTimeline(updatedTimeline);
        
        // Update in localStorage
        const timelines = JSON.parse(localStorage.getItem('timelines') || '[]');
        const timelineIndex = timelines.findIndex((t: Timeline) => t.id === id);
        if (timelineIndex > -1) {
          timelines[timelineIndex] = updatedTimeline;
          localStorage.setItem('timelines', JSON.stringify(timelines));
        }
      }
    }
  };

  const deleteGoal = (segmentId: string, goalId: string) => {
    const updatedTimeline = {...timeline} as Timeline;
    const segmentIndex = updatedTimeline.segments.findIndex(
      segment => segment.id === segmentId
    );

    if (segmentIndex > -1) {
      updatedTimeline.segments[segmentIndex].goals = 
        updatedTimeline.segments[segmentIndex].goals.filter(
          goal => goal.id !== goalId
        );
      
      setTimeline(updatedTimeline);
      
      // Update in localStorage
      const timelines = JSON.parse(localStorage.getItem('timelines') || '[]');
      const timelineIndex = timelines.findIndex((t: Timeline) => t.id === id);
      if (timelineIndex > -1) {
        timelines[timelineIndex] = updatedTimeline;
        localStorage.setItem('timelines', JSON.stringify(timelines));
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !timeline) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">Error</h3>
        <p className="text-muted-foreground">{error || 'Timeline not found'}</p>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      {/* Timeline Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">{timeline.title}</h1>
        <p className="text-muted-foreground mb-4">{timeline.description}</p>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Created: {new Date(timeline.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{timeline.segments.length} segments</span>
          </div>
          <div className="flex items-center">
            <UserCircle className="h-4 w-4 mr-1" />
            <span>{timeline.isPublic ? 'Public' : 'Private'}</span>
          </div>
        </div>
      </div>

      {/* Timeline Segments */}
      <div className="space-y-6">
        {timeline.segments.map((segment, index) => (
          <React.Fragment key={segment.id}>
            {/* Connector line between segments (except for first one) */}
            {index > 0 && <div className="timeline-connector" />}
            
            <Card className="timeline-segment animate-fade-in">
              <CardHeader className="pb-2">
                <CardTitle>{segment.title}</CardTitle>
                <CardDescription>
                  {segment.goals.length === 0 
                    ? "No goals defined yet." 
                    : `${segment.goals.filter(g => g.completed).length}/${segment.goals.length} goals completed`}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {/* Goals List */}
                <ul className="space-y-2 mb-4">
                  {segment.goals.map(goal => (
                    <li key={goal.id} className="flex items-start gap-2 p-2 rounded-md hover:bg-accent group">
                      <button 
                        onClick={() => toggleGoalCompletion(segment.id, goal.id)}
                        className={`flex-shrink-0 h-5 w-5 mt-0.5 rounded border ${
                          goal.completed 
                            ? 'bg-primary border-primary' 
                            : 'border-input'
                        } flex items-center justify-center`}
                      >
                        {goal.completed && <Check className="h-3 w-3 text-primary-foreground" />}
                      </button>
                      
                      <span className={`flex-grow ${goal.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {goal.text}
                      </span>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 h-6 w-6"
                        onClick={() => deleteGoal(segment.id, goal.id)}
                      >
                        <Trash className="h-3 w-3" />
                      </Button>
                    </li>
                  ))}
                </ul>
                
                {/* Add Goal Form */}
                <div className="flex gap-2">
                  <Textarea 
                    placeholder="Add a new goal..."
                    className="min-h-[2.5rem] flex-grow"
                    value={newGoal[segment.id] || ''}
                    onChange={(e) => setNewGoal({ ...newGoal, [segment.id]: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleAddGoal(segment.id);
                      }
                    }}
                  />
                  <Button 
                    onClick={() => handleAddGoal(segment.id)} 
                    size="sm"
                    variant="secondary"
                    className="flex-shrink-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default TimelineView;
