import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MainLayout from '@/layouts/MainLayout';
import VideoConference from '@/components/VideoConference';
import { Video } from 'lucide-react'; // Fixed missing import

const StudySession: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [sessionTitle, setSessionTitle] = useState<string>('Collaborative Study Session');

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Study Session</h1>
        
        {/* Video Conference Component */}
        <VideoConference sessionId={id || 'defaultSessionId'} sessionTitle={sessionTitle} />
      </div>
    </MainLayout>
  );
};

export default StudySession;
