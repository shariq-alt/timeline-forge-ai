
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import CreateTimelineForm from '@/components/timeline/CreateTimelineForm';

const CreateTimeline = () => {
  return (
    <AppLayout>
      <div className="container py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Create Timeline</h1>
          <p className="text-muted-foreground mb-8">
            Define your timeline structure and we'll generate the segments for you.
          </p>
          
          <CreateTimelineForm />
        </div>
      </div>
    </AppLayout>
  );
};

export default CreateTimeline;
