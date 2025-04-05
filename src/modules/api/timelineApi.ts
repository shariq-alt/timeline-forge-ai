
import { supabase } from '@/integrations/supabase/client';
import { Timeline, TimelineSegment, Goal } from '@/types';

export type CreateTimelineDto = {
  title: string;
  description?: string;
  type: string;
  isPublic: boolean;
};

export type UpdateTimelineDto = {
  id: string;
  title?: string;
  description?: string;
  type?: string;
  isPublic?: boolean;
};

export type CreateSegmentDto = {
  timelineId: string;
  title: string;
  position: number;
};

export type UpdateSegmentDto = {
  id: string;
  title?: string;
  position?: number;
};

export type CreateGoalDto = {
  segmentId: string;
  text: string;
  completed?: boolean;
};

export type UpdateGoalDto = {
  id: string;
  text?: string;
  completed?: boolean;
};

// Timeline endpoints
export const createTimeline = async (timeline: CreateTimelineDto): Promise<Timeline> => {
  const user = supabase.auth.getUser();
  if (!(await user).data.user) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('timelines')
    .insert({
      title: timeline.title,
      description: timeline.description,
      type: timeline.type,
      is_public: timeline.isPublic,
      user_id: (await user).data.user!.id
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return mapTimelineFromDb(data);
};

export const getTimelines = async (): Promise<Timeline[]> => {
  const user = await supabase.auth.getUser();
  if (!user.data.user) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('timelines')
    .select(`
      *,
      segments:timeline_events(
        *
      )
    `)
    .eq('user_id', user.data.user.id);

  if (error) throw new Error(error.message);
  return data.map(mapTimelineFromDb);
};

export const getPublicTimelines = async (): Promise<Timeline[]> => {
  const { data, error } = await supabase
    .from('timelines')
    .select(`
      *,
      segments:timeline_events(
        *
      )
    `)
    .eq('is_public', true);

  if (error) throw new Error(error.message);
  return data.map(mapTimelineFromDb);
};

export const getTimelineById = async (id: string): Promise<Timeline> => {
  const { data, error } = await supabase
    .from('timelines')
    .select(`
      *,
      segments:timeline_events(
        *
      )
    `)
    .eq('id', id)
    .single();

  if (error) throw new Error(error.message);
  return mapTimelineFromDb(data);
};

export const updateTimeline = async (timeline: UpdateTimelineDto): Promise<Timeline> => {
  const { data, error } = await supabase
    .from('timelines')
    .update({
      title: timeline.title,
      description: timeline.description,
      type: timeline.type,
      is_public: timeline.isPublic,
      updated_at: new Date().toISOString()
    })
    .eq('id', timeline.id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return mapTimelineFromDb(data);
};

export const deleteTimeline = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('timelines')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);
};

// Timeline Segment endpoints
export const createSegment = async (segment: CreateSegmentDto): Promise<TimelineSegment> => {
  const { data, error } = await supabase
    .from('timeline_events')
    .insert({
      timeline_id: segment.timelineId,
      title: segment.title,
      event_date: new Date().toISOString(),
      position: segment.position
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return mapSegmentFromDb(data);
};

export const updateSegment = async (segment: UpdateSegmentDto): Promise<TimelineSegment> => {
  const { data, error } = await supabase
    .from('timeline_events')
    .update({
      title: segment.title,
      position: segment.position,
      updated_at: new Date().toISOString()
    })
    .eq('id', segment.id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return mapSegmentFromDb(data);
};

export const deleteSegment = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('timeline_events')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);
};

// Goal endpoints
export const createGoal = async (goal: CreateGoalDto): Promise<Goal> => {
  // For simplicity, goals are stored as part of timeline_events data
  // In a real implementation, this would be a separate table
  return {
    id: `goal-${Date.now()}`, // Simplified ID generation for this example
    text: goal.text,
    completed: goal.completed || false,
    segmentId: goal.segmentId
  };
};

export const updateGoal = async (goal: UpdateGoalDto): Promise<Goal> => {
  // Simplified implementation
  return {
    id: goal.id,
    text: goal.text || '',
    completed: goal.completed || false,
    segmentId: '' // Would need to be fetched in real implementation
  };
};

export const deleteGoal = async (id: string): Promise<void> => {
  // Simplified implementation
};

// Helper functions to map database objects to application types
function mapTimelineFromDb(data: any): Timeline {
  return {
    id: data.id,
    title: data.title,
    description: data.description || '',
    type: data.type,
    segments: data.segments ? data.segments.map(mapSegmentFromDb) : [],
    isPublic: data.is_public,
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at),
    userId: data.user_id
  };
}

function mapSegmentFromDb(data: any): TimelineSegment {
  return {
    id: data.id,
    title: data.title,
    goals: [], // Would need to be fetched separately in a real implementation
    timelineId: data.timeline_id,
    position: data.position || 0
  };
}
