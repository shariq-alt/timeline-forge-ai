
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import ExploreSection from '@/components/home/ExploreSection';

const Index = () => {
  return (
    <AppLayout>
      <HeroSection />
      <FeaturesSection />
      <ExploreSection />
    </AppLayout>
  );
};

export default Index;
