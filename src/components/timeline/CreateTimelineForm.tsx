
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { TimelineType, TimeUnit, Timeline, TimelineSegment } from '@/types';

const CreateTimelineForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'Project' as TimelineType,
    segmentCount: 3,
    timeUnit: 'weekly' as TimeUnit,
    isPublic: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= 52) {
      setFormData(prev => ({ ...prev, segmentCount: value }));
    }
  };

  const generateSegments = (): TimelineSegment[] => {
    const segments: TimelineSegment[] = [];
    const timelineId = uuidv4();

    for (let i = 0; i < formData.segmentCount; i++) {
      let title = '';
      switch (formData.timeUnit) {
        case 'daily':
          title = `Day ${i + 1}`;
          break;
        case 'weekly':
          title = `Week ${i + 1}`;
          break;
        case 'monthly':
          title = `Month ${i + 1}`;
          break;
        case 'yearly':
          title = `Year ${i + 1}`;
          break;
        default:
          title = `Segment ${i + 1}`;
      }

      segments.push({
        id: uuidv4(),
        title,
        goals: [],
        timelineId,
        position: i,
      });
    }

    return segments;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Generate timeline with segments
      const timelineId = uuidv4();
      const segments = generateSegments();
      
      const newTimeline: Timeline = {
        id: timelineId,
        title: formData.title,
        description: formData.description,
        type: formData.type,
        segments: segments,
        isPublic: formData.isPublic,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 'temp-user-id', // In a real app, this would come from authentication
      };

      // In a real app, save to database here
      console.log('Created timeline:', newTimeline);

      // Store in localStorage for now to persist data
      const timelines = JSON.parse(localStorage.getItem('timelines') || '[]');
      timelines.push(newTimeline);
      localStorage.setItem('timelines', JSON.stringify(timelines));

      toast({
        title: "Timeline Created",
        description: "Your timeline has been created successfully.",
      });
      
      // Navigate to the timeline view
      navigate(`/timeline/${timelineId}`);
    } catch (error) {
      console.error('Error creating timeline:', error);
      toast({
        title: "Error",
        description: "Failed to create timeline. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-medium">
          Title
        </label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter a title for your timeline"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe your timeline"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="type" className="block text-sm font-medium">
            Timeline Type
          </label>
          <Select 
            value={formData.type} 
            onValueChange={(value) => handleSelectChange('type', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Roadmap">Roadmap</SelectItem>
              <SelectItem value="Project">Project</SelectItem>
              <SelectItem value="Study">Study</SelectItem>
              <SelectItem value="Personal">Personal</SelectItem>
              <SelectItem value="Career">Career</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="timeUnit" className="block text-sm font-medium">
            Time Unit
          </label>
          <Select 
            value={formData.timeUnit} 
            onValueChange={(value) => handleSelectChange('timeUnit', value as TimeUnit)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select time unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="segmentCount" className="block text-sm font-medium">
          Number of Segments
        </label>
        <Input
          id="segmentCount"
          name="segmentCount"
          type="number"
          min="1"
          max="52"
          value={formData.segmentCount}
          onChange={handleNumberChange}
          className="w-full"
        />
        <p className="text-sm text-muted-foreground">
          This will create {formData.segmentCount} {formData.timeUnit} segments in your timeline.
        </p>
      </div>

      <div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={formData.isPublic}
            onChange={() => setFormData(prev => ({ ...prev, isPublic: !prev.isPublic }))}
            className="rounded border-gray-300 text-primary focus:ring-primary"
          />
          <span className="text-sm">Make this timeline public</span>
        </label>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating...
          </>
        ) : (
          'Create Timeline'
        )}
      </Button>
    </form>
  );
};

export default CreateTimelineForm;
