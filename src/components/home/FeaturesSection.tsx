
import React from 'react';
import { Calendar, Share2, GitFork, LineChart } from 'lucide-react';

const features = [
  {
    title: 'Create Timelines',
    description: 'Build structured timelines with customizable segments for any project or learning path.',
    icon: Calendar,
  },
  {
    title: 'Share Knowledge',
    description: 'Make your timelines public to share your expertise and help others.',
    icon: Share2,
  },
  {
    title: 'Fork & Customize',
    description: 'Discover public timelines and fork them to create your own personalized version.',
    icon: GitFork,
  },
  {
    title: 'Track Progress',
    description: 'Keep track of your goals and progress throughout your timeline journey.',
    icon: LineChart,
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Building Better Timelines</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            TimelineForge helps you create structured paths for any learning journey, project plan, or roadmap.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card p-6 rounded-lg border hover:shadow-md transition-all duration-200"
            >
              <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
